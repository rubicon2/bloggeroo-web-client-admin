import BlogForm from './blogForm';
import CommentsList from '../comments/commentsList';
import CommentForm from '../comments/commentForm';
import MarkdownBlog from './markdownBlog';

import WideContainer from '../wideContainer';
import GridTwoCol from '../styles/gridTwoCol';
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

  const [isFetching, setIsFetching] = useState(false);
  const [blogValidationErrors, setBlogValidationErrors] = useState(null);
  const [commentValidationErrors, setCommentValidationErrors] = useState(null);
  const [error, setError] = useState(useRouteError());
  const [isCreatingComment, setIsCreatingComment] = useState(false);
  const [markdown, setMarkdown] = useState(`# No markdown to preview yet!`);

  async function saveChanges(event) {
    event.preventDefault();
    setIsFetching(true);
    const { response, fetchError } = await api.putBlog(
      accessRef,
      blog.id,
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

  return (
    <main>
      {blog && (
        <>
          <WideContainer>
            <GridTwoCol>
              <div>
                <h2>Edit</h2>
                <BlogForm
                  buttonText={'Save changes'}
                  initialValues={blog}
                  isFetching={isFetching}
                  validationErrors={blogValidationErrors}
                  onSubmit={saveChanges}
                  onChange={({ body }) => setMarkdown(body)}
                />
              </div>
              <div>
                <h2>Preview</h2>
                <MarkdownBlog>{markdown}</MarkdownBlog>
              </div>
            </GridTwoCol>
            <DeleteButton onClick={deleteBlog} disabled={isFetching}>
              Delete
            </DeleteButton>
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
          </WideContainer>
        </>
      )}
    </main>
  );
}
