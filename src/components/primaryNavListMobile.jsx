import UnstyledList from './unstyledList';
import { NavButton } from './styles/buttons';
import LogOutButton from './logOutButton';
import { Link } from 'react-router';
import { useState } from 'react';
import styled from 'styled-components';

import menuIcon from '../static/icons/menu_48px.svg';

const NavList = styled(UnstyledList)`
  position: absolute;
  width: 100%;

  display: grid;
  grid-auto-rows: 1fr;
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
`;

export default function PrimaryNavListMobile({ isLoggedIn }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <NavList>
      {isLoggedIn ? (
        <>
          <li>
            <NavButton onClick={() => setMenuOpen(!menuOpen)}>
              <img
                src={menuIcon}
                alt=""
                aria-label={
                  menuOpen ? 'Close main Navigation' : 'Open main navigation'
                }
              />
            </NavButton>
          </li>
          {menuOpen && (
            <>
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
            </>
          )}
        </>
      ) : (
        <NavButton to="/">Log In</NavButton>
      )}
    </NavList>
  );
}
