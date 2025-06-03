import BlogForm from './blogForm';
import DeleteButton from '../deleteButton';
import CommentsList from '../comments/commentsList';
import CommentForm from '../comments/commentForm';
import authFetch from '../../ext/authFetch';
import responseToJsend from '../../ext/responseToJsend';

import { useContext, useState } from 'react';
import { useLoaderData, useNavigate, useRouteError } from 'react-router';
import { AccessContext } from '../../contexts/AppContexts';

export default function BlogPage() {
  const { blog, comments } = useLoaderData();
  const navigate = useNavigate();

  const accessRef = useContext(AccessContext);

  const [isFetching, setIsFetching] = useState(false);
  const [blogValidationErrors, setBlogValidationErrors] = useState(null);
  const [commentValidationErrors, setCommentValidationErrors] = useState(null);
  const [error, setError] = useState(useRouteError());
  const [isCreatingComment, setIsCreatingComment] = useState(false);

  function reloadBlog() {
    navigate(`/blogs/${blog.id}`);
  }

  async function saveChanges(event) {
    event.preventDefault();
    setIsFetching(true);
    const { response, fetchError } = await authFetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/blogs/${blog.id}`,
      accessRef,
      {
        method: 'put',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(new FormData(event.target)),
      },
    );
    if (fetchError) setError(fetchError);
    else {
      const { status, data, error } = await responseToJsend(response);
      setError(error);
      setBlogValidationErrors(data?.validationErrors);
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
    const { response, fetchError } = await authFetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/comments?blogId=${blog.id}`,
      accessRef,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(new FormData(event.target)),
      },
    );
    if (fetchError) setError(fetchError);
    else {
      const { status, data, error } = await responseToJsend(response);
      setError(error);
      setCommentValidationErrors(data.validationErrors);
      switch (status) {
        case 'success': {
          setIsCreatingComment(false);
          reloadBlog();
          break;
        }
      }
    }
    setIsFetching(false);
  }

  return (
    <>
      {blog && (
        <>
          <h2>{blog.title}</h2>
          <small>By {blog.owner.name}</small>
          <DeleteButton
            url={`${import.meta.env.VITE_SERVER_URL}/admin/blogs/${blog.id}`}
          >
            Delete
          </DeleteButton>
          <BlogForm
            buttonText={'Save changes'}
            initialValues={blog}
            isFetching={isFetching}
            validationErrors={blogValidationErrors}
            onSubmit={saveChanges}
          />
          <h3>Comments {comments?.length > 0 ? `(${comments.length})` : ''}</h3>
          {isCreatingComment ? (
            <>
              <CommentForm
                buttonText="Submit"
                initialValues={{ text: '' }}
                isFetching={isFetching}
                validationErrors={commentValidationErrors}
                onSubmit={createComment}
              />
              <button type="button" onClick={() => setIsCreatingComment(false)}>
                Cancel
              </button>
            </>
          ) : (
            <button type="button" onClick={() => setIsCreatingComment(true)}>
              Add comment
            </button>
          )}
          <CommentsList comments={comments} onReply={reloadBlog} />
        </>
      )}
      {error && <p>{error.message}</p>}
    </>
  );
}
