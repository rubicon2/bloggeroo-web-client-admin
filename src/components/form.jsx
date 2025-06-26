import styled from 'styled-components';

const FormContainer = styled.form`
  display: grid;
  grid-auto-rows: auto;
  gap: 1rem;
  max-width: 400px;
`;

export default function Form({ children, ...rest }) {
  return <FormContainer {...rest}>{children}</FormContainer>;
}
