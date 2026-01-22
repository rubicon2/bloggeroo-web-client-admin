import PageTitleBar from '../pageTitleBar';
import TabbedContainer from '../tabbedContainer';
import BlogForm from './blogForm';
import BlogHeader from './blogHeader';
import MarkdownBlog from './markdownBlog';
import BlogImagesList from './blogImagesList';
import CommentsList from '../comments/commentsList';
import CommentForm from '../comments/commentForm';

import Container from '../container';
import { GeneralButton, DeleteButton } from '../styles/buttons';

import * as api from '../../ext/api';
import responseToJsend from '../../ext/responseToJsend';

import { AccessContext } from '../../contexts/AppContexts';
import useRefresh from '../../hooks/useRefresh';

import { useContext, useState } from 'react';
import { useLoaderData, useNavigate, useRouteError } from 'react-router';

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
            <TabbedContainer
              tabs={[
                {
                  id: 'edit',
                  labelText: 'Edit',
                  content: (
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
                  ),
                },
                {
                  id: 'preview',
                  labelText: 'Preview',
                  content: (
                    <>
                      <BlogHeader blog={blog} />
                      <MarkdownBlog>{editedBlog.body}</MarkdownBlog>
                    </>
                  ),
                },
                {
                  id: 'images',
                  labelText: 'Add Images',
                  content: <BlogImagesList onClick={insertImageLink} />,
                },
                {
                  id: 'comments',
                  labelText: `Comments (${comments?.length})`,
                  content: (
                    <>
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
                    </>
                  ),
                },
              ]}
            />
          </Container>
          <Container>{error && <p>{error.message}</p>}</Container>
        </>
      )}
    </main>
  );
}
