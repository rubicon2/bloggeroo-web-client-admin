import { useState } from 'react';

export default function CommentForm({
  buttonText,
  initialValues,
  isFetching,
  validationErrors,
  onSubmit,
}) {
  const [text, setText] = useState(initialValues.text);

  return (
    <form onSubmit={onSubmit}>
      <textarea
        name="text"
        id="text"
        cols="60"
        rows="10"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <small>{validationErrors?.text}</small>
      <button type="submit" disabled={isFetching}>
        {buttonText}
      </button>
      {validationErrors?.blogId && <p>Error: {validationErrors.blogId}</p>}
    </form>
  );
}
