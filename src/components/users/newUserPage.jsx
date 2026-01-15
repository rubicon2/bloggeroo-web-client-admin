import Container from '../container';
import PageTitleBar from '../pageTitleBar';
import UserForm from './userForm';

import * as api from '../../ext/api';
import responseToJsend from '../../ext/responseToJsend';

import { AccessContext } from '../../contexts/AppContexts';

import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';

export default function NewUserPage() {
  const accessRef = useContext(AccessContext);
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const [validationErrors, setValidationErrors] = useState(null);
  const [error, setError] = useState(null);

  async function createUser(event) {
    event.preventDefault();
    setIsFetching(true);
    const { response, fetchError } = await api.postUser(
      accessRef,
      new URLSearchParams(new FormData(event.target)),
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
