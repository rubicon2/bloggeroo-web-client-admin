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
