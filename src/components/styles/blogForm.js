import styled from 'styled-components';

const Form = styled.form`
  display: grid;
  grid-auto-rows: min-content;
  gap: 1rem;
`;

const FormRow = styled.label`
  display: grid;
  grid-auto-rows: min-content;

  input[type='checkbox'] {
    justify-self: right;
  }
`;

export { Form, FormRow };
