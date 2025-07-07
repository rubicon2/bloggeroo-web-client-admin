import Container from './container';
import { devices } from '../mediaQueries';
import styled from 'styled-components';

const HeaderBackground = styled.header`
  position: relative;
  z-index: 2;
  background-color: white;
`;

const HeaderContainer = styled(Container)`
  text-align: center;
  @media ${devices.tablet} {
    text-align: left;
  }

  & h1 {
    margin: 0;
    padding: 1rem 0;
  }
`;

export default function Header() {
  return (
    <HeaderBackground>
      <HeaderContainer>
        <h1>Bloggeroo Admin</h1>
      </HeaderContainer>
    </HeaderBackground>
  );
}
