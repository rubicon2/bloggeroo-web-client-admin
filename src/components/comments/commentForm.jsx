import { Form } from '../styles/searchForm';
import ListItemButtonsContainer from '../listItemButtonsContainer';
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
  children,
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
        aria-label="Edit comment"
      />
      {validationErrors?.text && <small>{validationErrors?.text}</small>}
      <ListItemButtonsContainer>
        {children}
        <GeneralButton
          type="submit"
          disabled={isFetching || !haveFieldsChanged}
        >
          {buttonText}
        </GeneralButton>
      </ListItemButtonsContainer>
      {validationErrors?.blogId && <p>Error: {validationErrors.blogId}</p>}
    </Form>
  );
}
