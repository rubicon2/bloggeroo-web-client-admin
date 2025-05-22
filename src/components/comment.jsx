import { useContext, useState } from 'react';
import DeleteButton from './deleteButton';
import { useLoaderData, useRouteError, Link, useNavigate } from 'react-router';
import authFetch from '../ext/authFetch';
import { UserDispatchContext, UserStateContext } from '../contexts/UserContext';

export function commentLoader(accessToken) {
  return async ({ params }) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/comments/${params.commentId}`,
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

export default function Comment() {
  const error = useRouteError();
  const json = useLoaderData();
  const comment = json.data.comment;
  const navigate = useNavigate();
  const [text, setText] = useState(comment.text);
  const state = useContext(UserStateContext);
  const dispatch = useContext(UserDispatchContext);
  const [fetchError, setFetchError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  async function updateComment(event) {
    event.preventDefault();
    setIsFetching(true);
    try {
      const { access, fetchError: newFetchError } = await authFetch(
        `${import.meta.env.VITE_SERVER_URL}/admin/comments/${comment.id}`,
        state.accessToken,
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
      navigate('/comments');
      if (newFetchError) throw newFetchError;
    } catch (error) {
      setFetchError(error.message);
    }
    setIsFetching(false);
  }

  return (
    <>
      {comment && (
        <>
          <h2>By {comment.owner.name}</h2>
          <small>At {comment.createdAt}</small>
          <form onSubmit={updateComment}>
            <textarea
              name="text"
              id="text"
              cols="60"
              rows="10"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button type="submit">Save</button>
          </form>
          {fetchError && <p>{fetchError}</p>}
          {comment.parentCommentId && (
            <small>
              <Link to={`/comments/${comment.parentCommentId}`}>
                In response to this comment
              </Link>
            </small>
          )}
          <DeleteButton
            url={`${import.meta.env.VITE_SERVER_URL}/admin/comments/${comment.id}`}
            successRedirect={'/comments'}
          >
            Delete
          </DeleteButton>
        </>
      )}
      {error && <p>{error}</p>}
    </>
  );
}
