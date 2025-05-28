import { useState } from 'react';

export default function BlogForm({
  buttonText,
  initialValues,
  isFetching,
  validationErrors,
  onSubmit,
}) {
  const [title, setTitle] = useState(initialValues.title);
  const [body, setBody] = useState(initialValues.body);
  const [publishedAt, setPublishedAt] = useState(initialValues.publishedAt);

  const haveFieldsChanged =
    initialValues.title !== title || initialValues.body || body;
  return (
    <form onSubmit={onSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required={true}
        />
        <small>{validationErrors?.title}</small>
      </label>
      <label>
        Body:
        <textarea
          name="body"
          cols="60"
          rows="10"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <small>{validationErrors?.body}</small>
      </label>
      <label>
        Published at:
        <input
          type="datetime-local"
          name="publishedAt"
          value={publishedAt}
          onChange={(e) => setPublishedAt(e.target.value)}
        />
        <small>{validationErrors?.publishedAt}</small>
      </label>
      <button type="submit" disabled={isFetching || !haveFieldsChanged}>
        {buttonText}
      </button>
    </form>
  );
}
