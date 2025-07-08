import PageTitleBar from '../pageTitleBar';
import Container from '../container';
import CommentForm from './commentForm';
import DeleteButton from '../deleteButton';
import { MobileMarginContainer } from '../styles/mainPage';

import { AccessContext } from '../../contexts/AppContexts';
import authFetch from '../../ext/authFetch';
import responseToJsend from '../../ext/responseToJsend';
import dateTimeFormatter from '../../ext/dateTimeFormatter';

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
    <main>
      {comment && (
        <>
          <MobileMarginContainer>
            <PageTitleBar title={`Edit comment by ${comment.owner.name}`}>
              <DeleteButton
                url={`${import.meta.env.VITE_SERVER_URL}/admin/comments/${comment.id}`}
                onDelete={() => navigate('/comments')}
              >
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
