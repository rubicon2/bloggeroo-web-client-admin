import BlogForm from './blogForm';
import DeleteButton from '../deleteButton';
import CommentsList from '../comments/commentsList';
import CommentForm from '../comments/commentForm';
import useComments from '../../hooks/useComments';
import authFetch from '../../ext/authFetch';
import {
  UserDispatchContext,
  UserStateContext,
} from '../../contexts/UserContext';

import { useContext, useState } from 'react';
import { useLoaderData, useNavigate, useRouteError } from 'react-router';

export function blogLoader(accessToken) {
  // If blogLoader tries to load a non-existent blog, accessToken is always null?
  // This was because I was testing by typing garbo into the address bar for the blogId.
  // That seems to cause the entire app to re-initialise, and the reducer uses the initialValue of { accessToken: null }.
  // If I navigate to a bad link inside the app by making the Links incorrect, then it works as expected.
  return async ({ params }) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/blogs/${params.blogId}`,
      {
        headers: {
          Authorization: accessToken ? 'Bearer ' + accessToken : '',
        },
      },
    );
    const json = await response.json();
    switch (json.status) {
      case 'success': {
        return json;
      }
      case 'fail': {
        throw new Error(json.data.message);
      }
      case 'error': {
        throw new Error(json.message);
      }
    }
  };
}

export default function BlogPage() {
  const json = useLoaderData();
  const { blog } = json.data;
  const navigate = useNavigate();

  const { accessToken } = useContext(UserStateContext);
  const dispatch = useContext(UserDispatchContext);

  const [isFetching, setIsFetching] = useState(false);
  const [blogValidationErrors, setBlogValidationErrors] = useState(null);
  const [commentValidationErrors, setCommentValidationErrors] = useState(null);
  const [error, setError] = useState(useRouteError());
  const [isCreatingComment, setIsCreatingComment] = useState(false);

  // Fetch comments in a separate fetch so query can change order, filter out certain ones, etc.
  // Split out into a separate component later.
  const { comments } = useComments(
    `blogId=${blog?.id}&orderBy=createdAt&sortOrder=desc`,
  );

  async function saveChanges(event) {
    event.preventDefault();
    setIsFetching(true);
    const { response, access, fetchError } = await authFetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/blogs/${blog.id}`,
      accessToken,
      {
        method: 'put',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(new FormData(event.target)),
      },
    );
    if (access)
      dispatch({ type: 'refreshed_access_token', accessToken: access });
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
          if (responseJson.data.message) setError(responseJson.data.message);
          break;
        }
        case 'error': {
          setError(responseJson.message);
          break;
        }
      }
    }
    setIsFetching(false);
  }

  async function createComment(event) {
    event.preventDefault();
    setIsFetching(true);
    const { response, access, fetchError } = await authFetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/comments?blogId=${blog.id}`,
      accessToken,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(new FormData(event.target)),
      },
    );
    if (access)
      dispatch({ type: 'refreshed_access_token', accessToken: access });
    if (fetchError) setError(fetchError);
    else {
      const responseJson = await response.json();
      switch (responseJson.status) {
        case 'success': {
          // Refresh the page with the new comment.
          setIsCreatingComment(false);
          navigate(`/blogs/${blog.id}`);
          break;
        }
        case 'fail': {
          if (responseJson.data.validationErrors)
            setCommentValidationErrors(responseJson.data.validationErrors);
          if (responseJson.data.message) setError(responseJson.data.message);
          break;
        }
        case 'error': {
          setError(responseJson.message);
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
          <CommentsList comments={comments} />
        </>
      )}
      {error && <p>{error.message}</p>}
    </>
  );
}
