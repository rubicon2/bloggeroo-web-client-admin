import Container from '../container';
import PageTitleBar from '../pageTitleBar';
import ImageForm from './imageForm';
import { AccessContext } from '../../contexts/AppContexts';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import authFetch from '../../ext/authFetch';
import responseToJsend from '../../ext/responseToJsend';

export default function NewImagePage() {
  const accessRef = useContext(AccessContext);
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const [validationErrors, setValidationErrors] = useState(null);
  const [error, setError] = useState(null);

  async function createImage(event) {
    event.preventDefault();
    setIsFetching(true);
    const { response, fetchError } = await authFetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/images`,
      accessRef,
      {
        method: 'POST',
        body: new FormData(event.target),
      },
    );
    if (fetchError) setError(fetchError);
    else {
      const { status, data, error } = await responseToJsend(response);
      setError(error);
      setValidationErrors(data?.validationErrors);
      switch (status) {
        case 'success': {
          navigate('/images');
          break;
        }
      }
    }
    setIsFetching(false);
  }

  return (
    <main>
      <PageTitleBar title="New Image" />
      <Container>
        <ImageForm
          isFetching={isFetching}
          validationErrors={validationErrors}
          onSubmit={createImage}
        />
        {error && <p>{error.message}</p>}
      </Container>
    </main>
  );
}
