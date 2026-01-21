import BlogForm from './blogForm';
import CommentsList from '../comments/commentsList';
import CommentForm from '../comments/commentForm';
import MarkdownBlog from './markdownBlog';
import PageTitleBar from '../pageTitleBar';
import { GeneralButton, DeleteButton } from '../styles/buttons';

import TabMenu from '../tabMenu';
import Container from '../container';

import * as api from '../../ext/api';
import responseToJsend from '../../ext/responseToJsend';

import { AccessContext } from '../../contexts/AppContexts';
import useRefresh from '../../hooks/useRefresh';

import { useContext, useState } from 'react';
import { useLoaderData, useNavigate, useRouteError } from 'react-router';
import BlogImagesList from './blogImagesList';

export default function BlogPage() {
  const { blog, comments } = useLoaderData();
  const navigate = useNavigate();
  const refresh = useRefresh();

  const accessRef = useContext(AccessContext);

  const [error, setError] = useState(useRouteError());
  const [isCreatingComment, setIsCreatingComment] = useState(false);

  const [editedBlog, setEditedBlog] = useState({
    title: blog.title,
    body: blog.body,
    publishedAt: blog.publishedAt,
  });
  const [isFetching, setIsFetching] = useState(false);
  const [blogValidationErrors, setBlogValidationErrors] = useState(null);
  const [commentValidationErrors, setCommentValidationErrors] = useState(null);

  const [activeTabId, setActiveTabId] = useState('edit');

  async function saveChanges(event) {
    event.preventDefault();
    setIsFetching(true);
    const { response, fetchError } = await api.putBlog(
      accessRef,
      blog.id,
      // This could now be changed just to use editedBlog state??
      new URLSearchParams(new FormData(event.target)),
    );
    if (fetchError) setError(fetchError);
    else {
      const { status, data, error } = await responseToJsend(response);
      setError(error);
      setBlogValidationErrors(data?.validationErrors);
      switch (status) {
        case 'success': {
          refresh();
          break;
        }
      }
    }
    setIsFetching(false);
  }

  async function deleteBlog(event) {
    event.preventDefault();
    setIsFetching(true);
    const { response, fetchError } = await api.deleteBlog(accessRef, blog.id);
    if (fetchError) setError(fetchError);
    else {
      const { status, error } = await responseToJsend(response);
      setError(error);
      switch (status) {
        case 'success': {
          navigate('/blogs');
          break;
        }
      }
    }
    setIsFetching(false);
  }

  async function createComment(event) {
    event.preventDefault();
    setIsFetching(true);
    const { response, fetchError } = await api.postComment(
      accessRef,
      blog.id,
      null,
      new URLSearchParams(new FormData(event.target)),
    );
    if (fetchError) setError(fetchError);
    else {
      const { status, data, error } = await responseToJsend(response);
      setError(error);
      setCommentValidationErrors(data.validationErrors);
      switch (status) {
        case 'success': {
          setIsCreatingComment(false);
          refresh();
          break;
        }
      }
    }
    setIsFetching(false);
  }

  function insertImageLink(image) {
    setEditedBlog({
      ...editedBlog,
      body:
        editedBlog.body +
        `![${image.altText}](${image.url} "${image.displayName}")\n\n`,
    });
  }

  const anyBlogFieldsChanged =
    blog.title !== editedBlog.title ||
    blog.body !== editedBlog.body ||
    // Avoid problems with db and input formatting dates differently.
    new Date(blog.publishedAt).getTime() !=
      new Date(editedBlog.publishedAt).getTime();

  return (
    <main>
      {blog && (
        <>
          <PageTitleBar title={blog.title}>
            <DeleteButton onClick={deleteBlog} disabled={isFetching}>
              Delete
            </DeleteButton>
          </PageTitleBar>
          <Container>
            <TabMenu
              selectedId={activeTabId}
              tabListItems={[
                { id: 'edit', innerText: 'Edit' },
                { id: 'add_images', innerText: 'Add Images' },
                { id: 'preview', innerText: 'Preview' },
              ]}
              onClick={(id) => setActiveTabId(id)}
            />
            <div>
              {activeTabId === 'edit' && (
                <>
                  <h2>Edit</h2>
                  <BlogForm
                    buttonText={'Save changes'}
                    blog={editedBlog}
                    validationErrors={blogValidationErrors}
                    buttonDisabled={isFetching || !anyBlogFieldsChanged}
                    onSubmit={saveChanges}
                    onChange={(updatedBlog) =>
                      setEditedBlog({ ...editedBlog, ...updatedBlog })
                    }
                  />
                </>
              )}
              {activeTabId === 'preview' && (
                <>
                  <h2>Preview</h2>
                  <MarkdownBlog>{editedBlog.body}</MarkdownBlog>
                </>
              )}
              {activeTabId === 'add_images' && (
                <>
                  <h2>Add Images</h2>
                  <BlogImagesList onClick={insertImageLink} />
                </>
              )}
            </div>
          </Container>
          <Container>
            <h3>
              Comments {comments?.length > 0 ? `(${comments.length})` : ''}
            </h3>
            {isCreatingComment ? (
              <>
                <CommentForm
                  buttonText="Submit"
                  initialValues={{ text: '' }}
                  isFetching={isFetching}
                  validationErrors={commentValidationErrors}
                  onSubmit={createComment}
                >
                  <GeneralButton
                    type="button"
                    onClick={() => setIsCreatingComment(false)}
                  >
                    Cancel
                  </GeneralButton>
                </CommentForm>
              </>
            ) : (
              <GeneralButton
                type="button"
                onClick={() => setIsCreatingComment(true)}
              >
                Add comment
              </GeneralButton>
            )}
            <CommentsList
              comments={comments}
              onReply={refresh}
              onDelete={refresh}
            />
            {error && <p>{error.message}</p>}
          </Container>
        </>
      )}
    </main>
  );
}
