import CommentForm from './commentForm';
import DeleteButton from '../deleteButton';
import { AccessContext } from '../../contexts/AppContexts';
import authFetch from '../../ext/authFetch';
import { useContext, useState } from 'react';
import { useLoaderData, useRouteError, Link, useNavigate } from 'react-router';

export default function CommentPage() {
  const json = useLoaderData();
  const comment = json.data.comment;
  const navigate = useNavigate();

  const accessRef = useContext(AccessContext);

  const [error, setError] = useState(useRouteError());
  const [validationErrors, setValidationErrors] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  async function updateComment(event) {
    event.preventDefault();
    setIsFetching(true);
    const { response, fetchError: newFetchError } = await authFetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/comments/${comment.id}`,
      accessRef,
      {
        method: 'put',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(new FormData(event.target)),
      },
    );
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
        <div key={comment.id}>
          <h2>By {comment.owner.name}</h2>
          <small>At {comment.createdAt}</small>
          <CommentForm
            buttonText={'Save'}
            initialValues={{ text: comment.text }}
            isFetching={isFetching}
            validationErrors={validationErrors}
            onSubmit={updateComment}
          />
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
        </div>
      )}
      {error && <p>{error.message}</p>}
    </>
  );
}
