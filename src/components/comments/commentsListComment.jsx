import CommentForm from './commentForm';
import DeleteButton from '../deleteButton';
import { GeneralButton } from '../styles/buttons';

import { AccessContext } from '../../contexts/AppContexts';
import authFetch from '../../ext/authFetch';
import responseToJsend from '../../ext/responseToJsend';
import { Link } from 'react-router';
import { useContext, useState } from 'react';
import styled from 'styled-components';

const CommentButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export default function CommentsListComment({
  comment,
  isActiveComment,
  setActiveComment,
  onReply,
  onDelete,
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
    else {
      const { status, data, error } = await responseToJsend(response);
      setError(error);
      setValidationErrors(data?.validationErrors);
      switch (status) {
        case 'success': {
          // Close form.
          setActiveComment(null);
          // Let parent components know that reply happened, i.e. stuff needs to be fetched again.
          if (onReply) onReply();
          break;
        }
      }
    }
    setIsFetching(false);
  }

  return (
    <div>
      <h3>{comment.createdAt}</h3>
      <small>by {comment.owner.name}</small>
      <p>{comment.text}</p>
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
          <CommentButtons>
            <Link to={`/comments/${comment.id}`}>
              <GeneralButton type="button">Edit</GeneralButton>
            </Link>
            <GeneralButton
              type="button"
              onClick={() => setActiveComment(comment)}
            >
              Reply
            </GeneralButton>
            <DeleteButton
              url={`${import.meta.env.VITE_SERVER_URL}/admin/comments/${comment.id}`}
              onDelete={onDelete}
            >
              Delete
            </DeleteButton>
          </CommentButtons>
        </>
      )}
      {error && <p>{error.message}</p>}
    </div>
  );
}
