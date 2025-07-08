import { devices } from '../../mediaQueries';
import styled from 'styled-components';

const Form = styled.form`
  display: grid;
  gap: 1rem;
`;

const FormFieldsetGrid = styled.fieldset`
  display: grid;
  gap: 1rem;
`;

const FormRow = styled.label`
  display: grid;
  align-items: center;

  & input[type='checkbox'] {
    justify-self: right;
  }

  @media ${devices.phone} {
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
  }
`;

const FormButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export { Form, FormFieldsetGrid, FormRow, FormButtons };
