import DeleteButton from './deleteButton';
import { UserDispatchContext, UserStateContext } from '../contexts/UserContext';
import authFetch from '../ext/authFetch';

import { useContext, useState } from 'react';
import { useLoaderData, useRouteError, Link, useNavigate } from 'react-router';

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
  const json = useLoaderData();
  const comment = json.data.comment;
  const navigate = useNavigate();

  const state = useContext(UserStateContext);
  const dispatch = useContext(UserDispatchContext);

  const [text, setText] = useState(comment.text);
  const [error, setError] = useState(useRouteError());
  const [validationErrors, setValidationErrors] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  async function updateComment(event) {
    event.preventDefault();
    setIsFetching(true);
    const {
      response,
      access,
      fetchError: newFetchError,
    } = await authFetch(
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
    if (newFetchError) setError(newFetchError);
    else {
      const responseJson = await response?.json();
      switch (responseJson.status) {
        case 'success': {
          navigate('/comments');
          break;
        }
        case 'fail': {
          if (responseJson.data.validationErrors)
            setValidationErrors(responseJson.data.validationErrors);
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
            <small>{validationErrors?.text}</small>
            <button type="submit" disabled={isFetching}>
              Save
            </button>
          </form>
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
      {error && <p>{error.message}</p>}
    </>
  );
}
