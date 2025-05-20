import LogOutButton from './logOutButton';
import { UserStateContext } from '../contexts/UserContext';
import { useContext } from 'react';
import { Link } from 'react-router';

export default function NavBar() {
  const state = useContext(UserStateContext);
  const isLoggedIn = state.accessToken !== null;

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
          {isLoggedIn ? <LogOutButton /> : <Link to="/log-in">Log In</Link>}
        </li>
      </ul>
    </nav>
  );
}
