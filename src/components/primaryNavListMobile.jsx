import UnstyledList from './unstyledList';
import { NavButton } from './styles/buttons';
import LogOutButton from './logOutButton';
import { Link } from 'react-router';
import { useState } from 'react';
import styled from 'styled-components';

import menuIcon from '../static/icons/menu_48px.svg';

const Menu = styled.div`
  position: relative;
  text-align: center;

  & a,
  & button,
  & img {
    height: 100%;
    padding: 0;
    align-content: center;
  }

  & button {
    width: 100%;
  }

  height: 48px;
`;

const NavList = styled(UnstyledList)`
  position: absolute;
  z-index: -1;
  width: 100%;

  display: grid;
  grid-auto-rows: 48px;

  box-shadow: 5px 5px 5px 5px var(--theme-shadow);
`;

export default function PrimaryNavListMobile({ isLoggedIn }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <Menu>
      {isLoggedIn ? (
        <>
          <NavButton onClick={() => setMenuOpen(!menuOpen)}>
            <img
              src={menuIcon}
              alt=""
              aria-label={
                menuOpen ? 'Close main Navigation' : 'Open main navigation'
              }
            />
          </NavButton>
          {menuOpen && (
            <NavList>
              <li>
                <NavButton
                  as={Link}
                  to="/blogs"
                  onClick={() => setMenuOpen(false)}
                >
                  Blogs
                </NavButton>
              </li>
              <li>
                <NavButton
                  as={Link}
                  to="/comments"
                  onClick={() => setMenuOpen(false)}
                >
                  Comments
                </NavButton>
              </li>
              <li>
                <NavButton
                  as={Link}
                  to="/users"
                  onClick={() => setMenuOpen(false)}
                >
                  Users
                </NavButton>
              </li>
              <li>
                <LogOutButton />
              </li>
            </NavList>
          )}
        </>
      ) : (
        <NavList>
          <NavButton to="/">Log In</NavButton>
        </NavList>
      )}
    </Menu>
  );
}
