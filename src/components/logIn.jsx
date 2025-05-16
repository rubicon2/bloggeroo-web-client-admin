import useSessionStorage from '../hooks/useSessionStorage';
import { useState } from 'react';
import { useNavigate } from 'react-router';

// Log In state should be stored in context or something, so all the components that need to know
// can easily get it. Currently, if the user logs in, other components don't update their state, just the nav bar.
// If the user logs out, no components update. So, the user state will need to be put in a context/reducer??, and when it
// gets updated, all the components using it will know to be updated.
export default function LogIn() {
  const [validationErrors, setValidationErrors] = useState(null);
  const [, setAccess] = useSessionStorage('access', null);
  const navigate = useNavigate();

  // Should this be outside the functional component?
  async function attemptLogIn(event) {
    event.preventDefault();
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
          setAccess(json.data.access);
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
        <button type="submit">Log In</button>
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
