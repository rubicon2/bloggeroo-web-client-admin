import CommentForm from './commentForm';
import DeleteButton from '../deleteButton';
import { GeneralButton } from '../styles/buttons';
import ListItemButtonsContainer from '../listItemButtonsContainer';

import { AccessContext } from '../../contexts/AppContexts';
import authFetch from '../../ext/authFetch';
import responseToJsend from '../../ext/responseToJsend';
import dateTimeFormatter from '../../ext/dateTimeFormatter';
import { Link } from 'react-router';
import { useContext, useState } from 'react';
import styled from 'styled-components';

const CommentHeading = styled.h3`
  margin-bottom: 0;
`;

export default function CommentsListComment({
  comment,
  // This is horrible, but not sure how else to customise commentList comment links via parent.
  // Needs to be able to be an object or a string.
  // i.e. on blog want to scroll over to the comment (so use hash), but on commentsPage want to go
  // straight to comment - only 5 comments loaded at once so not certain to be listed on current page.
  createParentCommentLink = (comment) => ({
    hash: `#${comment.parentCommentId}`,
  }),
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
    <div id={comment.id}>
      <CommentHeading>
        {dateTimeFormatter.format(new Date(comment.createdAt))}
      </CommentHeading>
      <small>by {comment.owner.name}</small>
      {comment.parentCommentId && (
        <div>
          <small>
            <Link to={createParentCommentLink(comment)} reloadDocument>
              In response to this comment
            </Link>
          </small>
        </div>
      )}
      <p>{comment.text}</p>
      {isActiveComment ? (
        <>
          <CommentForm
            buttonText={'Reply'}
            initialValues={{ text: '' }}
            isFetching={isFetching}
            validationErrors={validationErrors}
            onSubmit={createReply}
          >
            <GeneralButton type="button" onClick={() => setActiveComment(null)}>
              Cancel
            </GeneralButton>
          </CommentForm>
        </>
      ) : (
        <>
          <ListItemButtonsContainer>
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
          </ListItemButtonsContainer>
        </>
      )}
      {error && <p>{error.message}</p>}
    </div>
  );
}
