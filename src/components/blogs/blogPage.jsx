import BlogForm from './blogForm';
import DeleteButton from '../deleteButton';
import CommentsList from '../comments/commentsList';
import CommentForm from '../comments/commentForm';
import useComments from '../../hooks/useComments';
import authFetch from '../../ext/authFetch';

import { useContext, useState } from 'react';
import { useLoaderData, useNavigate, useRouteError } from 'react-router';
import { AccessContext } from '../../contexts/AppContexts';

export default function BlogPage() {
  const json = useLoaderData();
  const { blog } = json.data;
  const navigate = useNavigate();

  const accessRef = useContext(AccessContext);

  const [isFetching, setIsFetching] = useState(false);
  const [blogValidationErrors, setBlogValidationErrors] = useState(null);
  const [commentValidationErrors, setCommentValidationErrors] = useState(null);
  const [error, setError] = useState(useRouteError());
  const [isCreatingComment, setIsCreatingComment] = useState(false);
  // Set to a uuid if we want to force the useComments fetch to re-run, as it will only
  // re-run the useAuthFetch useEffect if the url changes or the user login status changes.
  // I am clearly creating custom hooks incorrectly or misunderstanding some central aspect of react.
  const [forceFetchId, setForceFetchId] = useState('');

  // Fetch comments in a separate fetch so query can change order, filter out certain ones, etc.
  // Split out into a separate component later.
  const { comments } = useComments(
    `blogId=${blog?.id}&orderBy=createdAt&sortOrder=desc&fetchId=${forceFetchId}`,
  );

  function updateComments() {
    // Butttt we need to update the comments as part of state, otherwise the component will not re-render.
    // But we have used useComments hook which has its own state. Otherwise it is a nice tidy way of getting
    // the comments and any errors that might occur, but this is a problem. A big one.
    // And useAuthFetch won't re-run unless the url is different. SO APPEND SOME RANDOM UUID TO MAKE IT RE-RUN!!!!
    // This is one of the worst things I have ever done in my life. Will keep on working to try and find
    // a solution that actually makes sense and isn't the hackiest garbage I have ever made.
    setForceFetchId(crypto.randomUUID());
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
      const responseJson = await response.json();
      switch (responseJson.status) {
        case 'success': {
          navigate('/blogs');
          break;
        }
        case 'fail': {
          if (responseJson.data.validationErrors)
            setBlogValidationErrors(responseJson.data.validationErrors);
          if (responseJson.data.message)
            setError(new Error(responseJson.data.message));
          break;
        }
        case 'error': {
          setError(new Error(responseJson.message));
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
      const responseJson = await response.json();
      switch (responseJson.status) {
        case 'success': {
          // Close comment input text area.
          setIsCreatingComment(false);
          // Refresh the page with the new comment.
          updateComments();
          break;
        }
        case 'fail': {
          if (responseJson.data.validationErrors)
            setCommentValidationErrors(responseJson.data.validationErrors);
          if (responseJson.data.message)
            setError(new Error(responseJson.data.message));
          break;
        }
        case 'error': {
          setError(new Error(responseJson.message));
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
          <CommentsList comments={comments} onReply={updateComments} />
        </>
      )}
      {error && <p>{error.message}</p>}
    </>
  );
}
