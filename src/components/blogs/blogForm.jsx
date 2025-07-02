import { GeneralButton } from '../styles/buttons';
import { Form, FormRow } from '../styles/searchForm';
import { useState } from 'react';
import styled from 'styled-components';

// Otherwise with a long blog, the label will appear comically far down.
const BlogTextAreaLabelText = styled.div`
  align-self: start;
`;

const BlogTextArea = styled.textarea`
  resize: vertical;
`;

export default function BlogForm({
  buttonText,
  initialValues,
  isFetching,
  validationErrors,
  onSubmit,
}) {
  const [title, setTitle] = useState(initialValues.title);
  const [body, setBody] = useState(initialValues.body);
  // Cut off the .00Z at the end of a date string if it appears.
  // That stops the datetime-local from correctly displaying the existing date.
  // What an annoying quirk. Why does it not work with the .00Z, if that is part
  // of the standardised date format? The server returns the datetime as stored
  // by prisma. In fact if the Z appears at all even without the .00, it fails to show.
  const publishedAtInitialValue = initialValues.publishedAt
    ? initialValues.publishedAt.split('.')[0]
    : '';

  const [publishedAt, setPublishedAt] = useState(publishedAtInitialValue);

  const haveFieldsChanged =
    initialValues.title !== title ||
    initialValues.body !== body ||
    publishedAtInitialValue !== publishedAt;
  return (
    <Form onSubmit={onSubmit}>
      <FormRow>
        Title:
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required={true}
        />
        <small>{validationErrors?.title}</small>
      </FormRow>
      <FormRow>
        <BlogTextAreaLabelText>Body:</BlogTextAreaLabelText>
        <BlogTextArea
          name="body"
          rows="20"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <small>{validationErrors?.body}</small>
      </FormRow>
      <FormRow>
        Published at:
        <input
          type="datetime-local"
          name="publishedAt"
          value={publishedAt}
          onChange={(e) => setPublishedAt(e.target.value)}
        />
        <small>{validationErrors?.publishedAt}</small>
      </FormRow>
      <GeneralButton type="submit" disabled={isFetching || !haveFieldsChanged}>
        {buttonText}
      </GeneralButton>
    </Form>
  );
}
