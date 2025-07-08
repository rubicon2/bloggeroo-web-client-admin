import { AccessContext, UserContext } from '../contexts/AppContexts';
import { useNavigate } from 'react-router';
import { useState, useContext } from 'react';
import { NavButton } from './styles/buttons';

export default function LogOutButton() {
  const accessRef = useContext(AccessContext);
  const { setIsLoggedIn } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();

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
        accessRef.current = null;
        setIsLoggedIn(false);
        // Redirect user back to log in page.
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
    setIsFetching(false);
  }

  return (
    <NavButton type="button" onClick={logOut} disabled={isFetching}>
      Log Out
      {error && (<div>{error}</div>)}
    </NavButton>
  );
}
