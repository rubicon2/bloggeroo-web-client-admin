import Container from './container';
import LogOutButton from './logOutButton';
import { UserContext } from '../contexts/AppContexts';
import { useContext } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const ButtonListItem = styled.li`
  margin-left: auto;
`;

export default function NavBar() {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <nav style={{ backgroundColor: 'pink' }}>
      <Container>
        <NavList>
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
              <ButtonListItem>
                <LogOutButton />
              </ButtonListItem>
            </>
          ) : (
            <ButtonListItem>
              <Link to="/">Log In</Link>
            </ButtonListItem>
          )}
        </NavList>
      </Container>
    </nav>
  );
}
