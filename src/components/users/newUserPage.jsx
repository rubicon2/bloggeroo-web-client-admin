import Container from '../container';
import PageTitleBar from '../pageTitleBar';
import UserForm from './userForm';

import { AccessContext } from '../../contexts/AppContexts';
import authFetch from '../../ext/authFetch';
import responseToJsend from '../../ext/responseToJsend';
import { useNavigate } from 'react-router';
import { useContext, useState } from 'react';

export default function NewUserPage() {
  const accessRef = useContext(AccessContext);
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const [validationErrors, setValidationErrors] = useState(null);
  const [error, setError] = useState(null);

  async function createUser(event) {
    event.preventDefault();
    setIsFetching(true);
    const { response, fetchError } = await authFetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/users`,
      accessRef,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(new FormData(event.target)),
      },
    );
    if (fetchError) setError(fetchError);
    else {
      const { status, data, error } = await responseToJsend(response);
      // If no error, responseToJsend will return a null error.
      setError(error);
      // Likewise, if validationErrors does not exist, this will set the state to undefined.
      setValidationErrors(data.validationErrors);
      switch (status) {
        case 'success': {
          navigate('/users');
          break;
        }
      }
    }
    setIsFetching(false);
  }

  return (
    <main>
      <PageTitleBar title="New User" />
      <Container>
        <UserForm
          buttonText={'Create User'}
          initialValues={{}}
          isFetching={isFetching}
          validationErrors={validationErrors}
          onSubmit={createUser}
        />
        {error && <p>{error.message}</p>}
      </Container>
    </main>
  );
}
