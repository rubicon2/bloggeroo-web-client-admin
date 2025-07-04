import Container from './container';
import { devices } from '../mediaQueries';
import styled from 'styled-components';

const HeaderContainer = styled(Container)`
  text-align: center;
  @media ${devices.tablet} {
    text-align: left;
  }
`;

export default function Header() {
  return (
    <header>
      <HeaderContainer>
        <h1>Bloggeroo Admin</h1>
      </HeaderContainer>
    </header>
  );
}
