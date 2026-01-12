import Container from '../container';
import DeleteButton from '../deleteButton';
import PageTitleBar from '../pageTitleBar';
import ImageUpdateForm from './imageUpdateForm';

import { AccessContext } from '../../contexts/AppContexts';
import authFetch from '../../ext/authFetch';
import responseToJsend from '../../ext/responseToJsend';
import useRefresh from '../../hooks/useRefresh';

import { useContext, useState } from 'react';
import { useLoaderData, useNavigate, useRouteError } from 'react-router';

export default function ImagePage() {
  const accessRef = useContext(AccessContext);
  const image = useLoaderData();
  const navigate = useNavigate();
  const refresh = useRefresh();

  const [isFetching, setIsFetching] = useState(false);
  const [validationErrors, setValidationErrors] = useState(null);
  const [error, setError] = useState(useRouteError());

  async function updateImage(event) {
    event.preventDefault();
    setIsFetching(true);
    const { response, fetchError } = await authFetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/images/${image.id}`,
      accessRef,
      {
        method: 'PUT',
        body: new FormData(event.target),
      },
    );
    if (fetchError) setError(fetchError);
    else {
      const { status, data, error } = await responseToJsend(response);
      setError(error);
      setValidationErrors(data?.validationErrors);
      switch (status) {
        case 'success':
          refresh();
          break;
      }
    }
    setIsFetching(false);
  }

  const deleteDisabled = image.blogs.length > 0;

  return (
    <main>
      <PageTitleBar title={image.displayName}>
        <DeleteButton
          url={`${import.meta.env.VITE_SERVER_URL}/admin/images/${image.id}`}
          onDelete={() => navigate('/images')}
          disabled={deleteDisabled}
        >
          Delete
        </DeleteButton>
      </PageTitleBar>
      <Container>
        <img src={image.url} alt={image.altText} />
        <ImageUpdateForm
          key={image.updatedAt}
          image={image}
          isFetching={isFetching}
          validationErrors={validationErrors}
          onSubmit={updateImage}
        />
        {error && <p>{error.message}</p>}
      </Container>
    </main>
  );
}
