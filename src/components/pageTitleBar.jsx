import Container from './container';
import { devices } from '../mediaQueries';
import styled from 'styled-components';

const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr;

  @media ${devices.tablet} {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Children = styled.div`
  display: flex;
  gap: 1rem;

  & * {
    width: 100%;
  }
`;

export default function PageTitleBar({ title = 'Page Title', children }) {
  return (
    <Container>
      <Header>
        <h2>{title}</h2>
        {children && <Children>{children}</Children>}
      </Header>
    </Container>
  );
}
