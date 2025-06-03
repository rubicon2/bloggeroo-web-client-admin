import CommentForm from './commentForm';
import DeleteButton from '../deleteButton';
import { AccessContext } from '../../contexts/AppContexts';
import authFetch from '../../ext/authFetch';
import responseToJsend from '../../ext/responseToJsend';
import { useContext, useState } from 'react';
import { useLoaderData, useRouteError, Link, useNavigate } from 'react-router';

export default function CommentPage() {
  const comment = useLoaderData();
  const navigate = useNavigate();

  const accessRef = useContext(AccessContext);

  const [error, setError] = useState(useRouteError());
  const [validationErrors, setValidationErrors] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  async function updateComment(event) {
    event.preventDefault();
    setIsFetching(true);
    const { response, fetchError } = await authFetch(
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
    if (fetchError) setError(fetchError);
    else {
      const { status, data, error } = await responseToJsend(response);
      setError(error);
      setValidationErrors(data?.validationErrors);
      switch (status) {
        case 'success': {
          navigate('/comments');
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
            onDelete={() => navigate('/comments')}
          >
            Delete
          </DeleteButton>
        </div>
      )}
      {error && <p>{error.message}</p>}
    </>
  );
}
