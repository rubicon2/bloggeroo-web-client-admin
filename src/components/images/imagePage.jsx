import PageTitleBar from '../pageTitleBar';
import ImageUpdateForm from './imageUpdateForm';
import Container from '../container';
import { DeleteButton } from '../styles/buttons';

import * as api from '../../ext/api';
import responseToJsend from '../../ext/responseToJsend';

import { AccessContext } from '../../contexts/AppContexts';
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
    const { response, fetchError } = await api.putImage(
      accessRef,
      image.id,
      new FormData(event.target),
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

  async function deleteImage(event) {
    event.preventDefault();
    if (image.blogs.length > 0) {
      setError(
        new Error(
          'You cannot delete an image that has been used in blogs. Remove the links from the blogs, then try to delete this image again.',
        ),
      );
      return;
    }
    setIsFetching(true);
    const { response, fetchError } = await api.deleteImage(accessRef, image.id);
    if (fetchError) setError(fetchError);
    else {
      const { status, error } = await responseToJsend(response);
      setError(error);
      switch (status) {
        case 'success': {
          navigate('/images');
          break;
        }
      }
    }
    setIsFetching(false);
  }

  const deleteDisabled = image.blogs.length > 0;

  return (
    <main>
      <PageTitleBar title={image.displayName}>
        <DeleteButton
          onClick={deleteImage}
          disabled={deleteDisabled}
          title={
            deleteDisabled
              ? 'Cannot delete image while it is used in blogs'
              : ''
          }
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
        {error && <p aria-live="polite">{error.message}</p>}
      </Container>
    </main>
  );
}
