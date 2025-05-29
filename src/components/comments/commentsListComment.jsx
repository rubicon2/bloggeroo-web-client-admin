import CommentForm from './commentForm';
import DeleteButton from '../deleteButton';
import { AccessContext } from '../../contexts/AppContexts';
import authFetch from '../../ext/authFetch';
import { Link } from 'react-router';
import { useContext, useState } from 'react';

export default function CommentsListComment({
  comment,
  isActiveComment,
  setActiveComment,
}) {
  const accessRef = useContext(AccessContext);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  async function createReply(event) {
    event.preventDefault();
    setIsFetching(true);
    const { response, fetchError } = await authFetch(
      `${import.meta.env.VITE_SERVER_URL}/comments?blogId=${comment.blogId}&parentCommentId=${comment.id}`,
      accessRef,
      {
        method: 'post',
        body: new URLSearchParams(new FormData(event.target)),
      },
    );
    if (fetchError) setError(fetchError);
    const json = await response?.json();
    switch (json?.status) {
      case 'success': {
        // Comments on blog will automatically update. Just stop showing reply form and clear it.
        // Lol no it doesn't. React doesn't know it needs to re-render anything.
        // Close the form by setting active comment to null.
        setActiveComment(null);
        break;
      }
      case 'fail': {
        if (json.data.validationErrors)
          setValidationErrors(json.data.validationErrors);
        if (json.data.message) setError(new Error(json.data.message));
        break;
      }
      case 'error': {
        setError(new Error(json.message));
        break;
      }
    }
    setIsFetching(false);
  }

  return (
    <>
      <small>
        {comment.owner.name} - {comment.createdAt}
      </small>
      {comment.text}
      {isActiveComment ? (
        <>
          <CommentForm
            buttonText={'Create comment'}
            initialValues={{ text: '' }}
            isFetching={isFetching}
            validationErrors={validationErrors}
            onSubmit={createReply}
          />
          <button type="button" onClick={() => setActiveComment(null)}>
            Cancel
          </button>
        </>
      ) : (
        <>
          {comment.parentCommentId && (
            <div>
              <small>
                <Link to={`/comments/${comment.parentCommentId}`}>
                  In response to this comment
                </Link>
              </small>
            </div>
          )}
          <div>
            <Link to={`/comments/${comment.id}`}>
              <button type="button">Edit</button>
            </Link>
            <DeleteButton
              url={`${import.meta.env.VITE_SERVER_URL}/admin/comments/${comment.id}`}
              successRedirect={'/comments'}
            >
              Delete
            </DeleteButton>
            <button type="button" onClick={() => setActiveComment(comment)}>
              Reply
            </button>
          </div>
        </>
      )}
      {error && <p>{error.message}</p>}
    </>
  );
}
