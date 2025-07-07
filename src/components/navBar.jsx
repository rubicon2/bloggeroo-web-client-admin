import Container from './container';
import PrimaryNavListDesktop from './primaryNavListDesktop';
import PrimaryNavListMobile from './primaryNavListMobile';
import { MediaMobileOnly, MediaTabletAndLarger } from './styles/mediaQueries';
import { UserContext } from '../contexts/AppContexts';
import { useContext } from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  position: sticky;
  z-index: 1;
  top: 0;
  background-color: var(--theme-main-color);
  box-shadow: 5px 5px 5px 5px var(--theme-shadow);

  & * {
    color: white;
  }
`;

const ContainerNoPadding = styled(Container)`
  padding: 0;
`;

export default function NavBar() {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <Nav aria-label="primary navigation">
      <ContainerNoPadding>
        <MediaMobileOnly>
          <PrimaryNavListMobile isLoggedIn={isLoggedIn} />
        </MediaMobileOnly>
        <MediaTabletAndLarger>
          <PrimaryNavListDesktop isLoggedIn={isLoggedIn} />
        </MediaTabletAndLarger>
      </ContainerNoPadding>
    </Nav>
  );
}
