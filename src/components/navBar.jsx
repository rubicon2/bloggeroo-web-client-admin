import LogOutButton from './logOutButton';
import { UserContext } from '../contexts/AppContexts';
import { useContext } from 'react';
import { Link } from 'react-router';

export default function NavBar() {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <nav>
      <ul>
        {isLoggedIn ? (
          <>
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
              <LogOutButton />
            </li>
          </>
        ) : (
          <li>
            <Link to="/">Log In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
