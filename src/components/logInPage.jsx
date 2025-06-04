import { AccessContext, UserContext } from '../contexts/AppContexts';
import responseToJsend from '../ext/responseToJsend';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';

export default function LogInPage() {
  const accessRef = useContext(AccessContext);
  const { setIsLoggedIn } = useContext(UserContext);
  const [validationErrors, setValidationErrors] = useState(null);
  const [error, setError] = useState(null);
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
      const { status, data, error } = await responseToJsend(response);
      setError(error);
      switch (status) {
        case 'success': {
          // Refresh token will be sent over in http response httpOnly cookie header.
          // Save access token.
          accessRef.current = data.access;
          setIsLoggedIn(true);
          setValidationErrors(null);
          // Redirect to blogs page.
          navigate('/blogs');
          break;
        }
        case 'fail': {
          if (data.validationErrors) {
            setValidationErrors(data.validationErrors);
          }
          if (data.message) {
            setValidationErrors({
              password: [data.message],
              array: [data.message],
            });
          }
          break;
        }
      }
    } catch (error) {
      setValidationErrors(null);
      setError(error);
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
      {error && <p>{error.message}</p>}
    </>
  );
}
