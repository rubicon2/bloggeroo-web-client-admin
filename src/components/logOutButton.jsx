import { UserDispatchContext } from '../contexts/UserContext';
import { useState, useContext } from 'react';

export default function LogOutButton() {
  const dispatch = useContext(UserDispatchContext);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  async function logOut(event) {
    event.preventDefault();
    setIsFetching(true);
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

      if (response.ok) {
        dispatch({
          type: 'logged_out',
        });
      }
    } catch (error) {
      setError(error.message);
    }
    setIsFetching(false);
  }

  return (
    <form onSubmit={logOut}>
      <button type="submit" disabled={isFetching}>
        Log Out
      </button>
      {error && <small>{error}</small>}
    </form>
  );
}
