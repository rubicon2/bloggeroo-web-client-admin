import styled from 'styled-components';

const Form = styled.form`
  display: grid;
  gap: 1rem;
`;

const FormFieldsetGrid = styled.fieldset`
  display: grid;
  gap: 1rem;
  border-radius: 5px;
  border: 1px solid var(--theme-outline-color);
`;

const FormRow = styled.label`
  display: grid;
  grid-auto-rows: repeat(2, min-content);
  align-items: center;

  & input[type='checkbox'] {
    justify-self: right;
  }
`;

const FormButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export { Form, FormFieldsetGrid, FormRow, FormButtons };
