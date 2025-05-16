import { useState } from 'react';
import useSessionStorage from '../hooks/useSessionStorage';
import { Link } from 'react-router';

async function logOut(event, setAccess) {
  event.preventDefault();
  // Send to server.
  try {
    // Tell server this user has logged out and give refresh token so it can be added to revoke list.
    // Server will clear refresh token from cookie. Need to return errors if it fails.
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/account/log-out`,
      {
        method: 'post',
        mode: 'cors',
        credentials: 'include',
      },
    );
    const json = await response.json();
    console.log('log out response:', json);
  } catch (error) {
    console.log('log out error:', error);
  }
}

export default function NavBar() {
  const [access, setAccess] = useSessionStorage('access', null);
  const [error, setError] = useState(null);

  async function logOut(event) {
    event.preventDefault();
    // Send to server.
    try {
      // Tell server this user has logged out and give refresh token so it can be added to revoke list.
      // Server will clear refresh token from cookie. Need to return errors if it fails.
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/admin/account/log-out`,
        {
          method: 'post',
          mode: 'cors',
          credentials: 'include',
        },
      );
      const json = await response.json();
      console.log('log out response:', json);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/blogs">Blogs</Link>
        </li>
        <li>
          <Link to="/comments">Comments</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          {access ? (
            <form
              action={`${import.meta.env.VITE_SERVER_URL}/account/log-out`}
              method="post"
              onSubmit={(event) => {
                logOut(event);
                setAccess(null);
              }}
            >
              <button type="submit">Log Out</button>
              {error && <small>{error}</small>}
            </form>
          ) : (
            <Link to="/log-in">Log In</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
