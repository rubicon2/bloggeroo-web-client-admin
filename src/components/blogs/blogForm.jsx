import { GeneralButton } from '../styles/buttons';
import { Form, FormRow } from '../styles/blogForm';
import fixInputDate from '../../ext/fixInputDate';
import styled from 'styled-components';

const BlogTextArea = styled.textarea`
  resize: vertical;
`;

export default function BlogForm({
  blog,
  validationErrors,
  buttonText,
  buttonDisabled,
  // All fields are handled within this form component, but for markdown preview
  // to get the value of body, we need to report any changes to the field values.
  onChange = () => {},
  onSubmit = () => {},
}) {
  return (
    <Form onSubmit={onSubmit}>
      <FormRow>
        Title:
        <input
          type="text"
          name="title"
          value={blog.title}
          onChange={(e) => onChange({ ...blog, title: e.target.value })}
          required={true}
        />
        <small>{validationErrors?.title}</small>
      </FormRow>
      <FormRow>
        Published at:
        <input
          type="datetime-local"
          name="publishedAt"
          value={fixInputDate(blog.publishedAt)}
          onChange={(e) => onChange({ ...blog, publishedAt: e.target.value })}
        />
        <small>{validationErrors?.publishedAt}</small>
      </FormRow>
      <FormRow>
        Body:
        <BlogTextArea
          name="body"
          rows="80"
          value={blog.body}
          onChange={(e) => onChange({ ...blog, body: e.target.value })}
        />
        <small>{validationErrors?.body}</small>
      </FormRow>
      <GeneralButton type="submit" disabled={buttonDisabled}>
        {buttonText}
      </GeneralButton>
    </Form>
  );
}
