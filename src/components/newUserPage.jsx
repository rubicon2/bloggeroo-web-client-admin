import UserForm from './userForm';
import { UserStateContext, UserDispatchContext } from '../contexts/UserContext';
import authFetch from '../ext/authFetch';
import { useNavigate } from 'react-router';
import { useContext, useState } from 'react';

export default function NewUserPage() {
  const { accessToken } = useContext(UserStateContext);
  const dispatch = useContext(UserDispatchContext);
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const [validationErrors, setValidationErrors] = useState(null);
  const [error, setError] = useState(null);

  async function createUser(event) {
    event.preventDefault();
    setIsFetching(true);
    const { response, access, fetchError } = await authFetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/users`,
      accessToken,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(new FormData(event.target)),
      },
    );
    if (access)
      dispatch({ type: 'refreshed_access_token', accessToken: access });
    if (fetchError) setError(fetchError);
    else {
      const json = await response?.json();
      switch (json?.status) {
        case 'success': {
          navigate('/users');
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
    }
    setIsFetching(false);
  }

  return (
    <main>
      <h2>New User</h2>
      <UserForm
        buttonText={'Create User'}
        initialValues={{}}
        isFetching={isFetching}
        validationErrors={validationErrors}
        onSubmit={createUser}
      />
      {error && <p>{error.message}</p>}
    </main>
  );
}
