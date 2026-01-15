import PageTitleBar from '../pageTitleBar';
import Container from '../container';
import CommentForm from './commentForm';
import { MobileMarginContainer } from '../styles/mainPage';
import { DeleteButton } from '../styles/buttons';

import * as api from '../../ext/api';
import responseToJsend from '../../ext/responseToJsend';
import dateTimeFormatter from '../../ext/dateTimeFormatter';

import { AccessContext } from '../../contexts/AppContexts';
import useRefresh from '../../hooks/useRefresh';

import { useContext, useState } from 'react';
import { useLoaderData, useRouteError, Link, useNavigate } from 'react-router';

export default function CommentPage() {
  const comment = useLoaderData();
  const navigate = useNavigate();
  const refresh = useRefresh();

  const accessRef = useContext(AccessContext);

  const [error, setError] = useState(useRouteError());
  const [validationErrors, setValidationErrors] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  async function updateComment(event) {
    event.preventDefault();
    setIsFetching(true);
    const { response, fetchError } = await api.putComment(
      accessRef,
      comment.id,
      new URLSearchParams(new FormData(event.target)),
    );
    if (fetchError) setError(fetchError);
    else {
      const { status, data, error } = await responseToJsend(response);
      setError(error);
      setValidationErrors(data?.validationErrors);
      switch (status) {
        case 'success': {
          refresh();
          break;
        }
      }
    }
    setIsFetching(false);
  }

  async function deleteComment(event) {
    event.preventDefault();
    setIsFetching(true);
    const { response, fetchError } = await api.deleteComment(
      accessRef,
      comment.id,
    );
    if (fetchError) setError(fetchError);
    else {
      const { status, error } = await responseToJsend(response);
      setError(error);
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
    <main>
      {comment && (
        <>
          <MobileMarginContainer>
            <PageTitleBar title={`Edit comment by ${comment.owner.name}`}>
              <DeleteButton onClick={deleteComment} disabled={isFetching}>
                Delete
              </DeleteButton>
            </PageTitleBar>
          </MobileMarginContainer>
          <Container>
            <small>
              At {dateTimeFormatter.format(new Date(comment.createdAt))}
            </small>
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
            {error && <p>{error.message}</p>}
          </Container>
        </>
      )}
    </main>
  );
}
