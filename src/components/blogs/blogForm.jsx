import { GeneralButton } from '../styles/buttons';
import { Form, FormRow } from '../styles/blogForm';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const BlogTextArea = styled.textarea`
  resize: vertical;
`;

export default function BlogForm({
  buttonText,
  initialValues,
  isFetching,
  validationErrors,
  // All fields are handled within this form component, but for markdown preview
  // to get the value of body, we need to report any changes to the field values.
  onChange = () => {},
  onSubmit = () => {},
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

  useEffect(() => {
    onChange({
      title,
      body,
      publishedAt,
    });
  }, [onChange, title, body, publishedAt]);

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
        Published at:
        <input
          type="datetime-local"
          name="publishedAt"
          value={publishedAt}
          onChange={(e) => setPublishedAt(e.target.value)}
        />
        <small>{validationErrors?.publishedAt}</small>
      </FormRow>
      <FormRow>
        Body:
        <BlogTextArea
          name="body"
          rows="80"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <small>{validationErrors?.body}</small>
      </FormRow>
      <GeneralButton type="submit" disabled={isFetching || !haveFieldsChanged}>
        {buttonText}
      </GeneralButton>
    </Form>
  );
}
