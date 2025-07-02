import Container from './container';
import LogOutButton from './logOutButton';
import { NavButton } from './styles/buttons';
import { UserContext } from '../contexts/AppContexts';
import { useContext } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

const Nav = styled.nav`
  position: sticky;
  z-index: 1;
  top: 0;
  background-color: var(--theme-main-color);

  & * {
    color: white;
  }
`;

const ContainerNoPadding = styled(Container)`
  padding: 0;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  // To stop outline being obscured on one side or the other, when selected via keyboard.
  gap: 5px;
`;

const RightButton = styled.li`
  margin-left: auto;
`;

export default function NavBar() {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <Nav>
      <ContainerNoPadding>
        <NavList>
          {isLoggedIn ? (
            <>
              <li>
                <NavButton as={Link} to="/blogs">
                  Blogs
                </NavButton>
              </li>
              <li>
                <NavButton as={Link} to="/comments">
                  Comments
                </NavButton>
              </li>
              <li>
                <NavButton as={Link} to="/users">
                  Users
                </NavButton>
              </li>
              <RightButton>
                <LogOutButton />
              </RightButton>
            </>
          ) : (
            <RightButton>
              <Link to="/">Log In</Link>
            </RightButton>
          )}
        </NavList>
      </ContainerNoPadding>
    </Nav>
  );
}
