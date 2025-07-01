import Container from './container';
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Children = styled.div`
  display: flex;
  gap: 1rem;
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
