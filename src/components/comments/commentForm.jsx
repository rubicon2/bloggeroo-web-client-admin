import { Form, FormRow } from '../styles/searchForm';
import { GeneralButton } from '../styles/buttons';
import { useState } from 'react';
import styled from 'styled-components';

const CommentTextArea = styled.textarea`
  resize: vertical;
`;

export default function CommentForm({
  buttonText,
  initialValues,
  isFetching,
  validationErrors,
  onSubmit,
}) {
  const [text, setText] = useState(initialValues.text);
  const haveFieldsChanged = initialValues.text !== text;

  return (
    <Form onSubmit={onSubmit}>
      <CommentTextArea
        name="text"
        id="text"
        rows="10"
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-labelledby="Edit comment"
      />
      <small>{validationErrors?.text}</small>
      <GeneralButton type="submit" disabled={isFetching || !haveFieldsChanged}>
        {buttonText}
      </GeneralButton>
      {validationErrors?.blogId && <p>Error: {validationErrors.blogId}</p>}
    </Form>
  );
}
