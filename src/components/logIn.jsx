import { UserDispatchContext } from '../contexts/UserContext';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';

export default function LogIn() {
  const dispatch = useContext(UserDispatchContext);
  const [validationErrors, setValidationErrors] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();

  async function attemptLogIn(event) {
    event.preventDefault();
    setIsFetching(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/admin/account/log-in`,
        {
          method: 'post',
          // Need this, otherwise cookie header in response is ignored by browser.
          // Same-site doesn't work even though both client and server are on localhost. Whatever...
          // I guess most of the time the cookie is going to be sent from a backend on a different domain anyway.
          credentials: 'include',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams(new FormData(event.currentTarget)),
        },
      );
      const json = await response.json();
      switch (json.status) {
        case 'success': {
          // Refresh token will be sent over in http response httpOnly cookie header.
          // Save access token.
          dispatch({
            type: 'logged_in',
            accessToken: json.data.access,
          });
          setValidationErrors(null);
          // Redirect to home page.
          navigate('/');
          break;
        }
        case 'fail': {
          if (json.data.validationErrors) {
            setValidationErrors(json.data.validationErrors);
          }
          if (json.data.message) {
            setValidationErrors({
              password: [json.data.message],
              array: [json.data.message],
            });
          }
          break;
        }
        case 'error': {
          throw new Error(json.message);
        }
      }
    } catch (error) {
      setValidationErrors({
        array: [error.message],
      });
    }
    setIsFetching(false);
  }

  return (
    <>
      <h2>Log In</h2>
      <form onSubmit={attemptLogIn}>
        <label htmlFor="email">
          Email:
          <input type="email" name="email" id="email" />
          <small>{validationErrors?.email ? validationErrors.email : ''}</small>
        </label>
        <label htmlFor="password">
          Password:
          <input type="password" name="password" id="password" />
          <small>
            {validationErrors?.password ? validationErrors.password : ''}
          </small>
        </label>
        <button type="submit" disabled={isFetching}>
          Log In
        </button>
      </form>
      {validationErrors && (
        <ul>
          {validationErrors.array.map((error) => (
            <li>{error}</li>
          ))}
        </ul>
      )}
    </>
  );
}
