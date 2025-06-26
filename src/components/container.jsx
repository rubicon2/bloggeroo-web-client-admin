import styled from 'styled-components';

const ContainerDiv = styled.div`
  max-width: 760px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export default function Container({ children }) {
  return <ContainerDiv>{children}</ContainerDiv>;
}
