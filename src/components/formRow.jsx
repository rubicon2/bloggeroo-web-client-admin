import styled from 'styled-components';

const LabelText = styled.div`
  margin-bottom: 0.2rem;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function FormRow({ label, children }) {
  return (
    <label>
      <LabelText>{label}:</LabelText>
      <Row>{children}</Row>
    </label>
  );
}
