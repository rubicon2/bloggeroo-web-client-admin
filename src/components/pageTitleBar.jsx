import Container from './container';
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function PageTitleBar({ title = 'Page Title', children }) {
  return (
    <Container>
      <Header>
        <h2>{title}</h2>
        {children && <div>{children}</div>}
      </Header>
    </Container>
  );
}
