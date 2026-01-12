import { Form, FormRow } from '../styles/blogForm';
import { GeneralButton } from '../styles/buttons';
import { useState } from 'react';
import { Link } from 'react-router';

export default function ImageUpdateForm({
  image,
  validationErrors = { image: '', displayName: '', altText: '' },
  isFetching,
  onSubmit = () => {},
}) {
  const [displayName, setDisplayName] = useState(image.displayName);
  const [altText, setAltText] = useState(image.altText);

  function resetFields() {
    setDisplayName(image.displayName);
    setAltText(image.altText);
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormRow>
        URL (read-only):
        <input value={image.url} readOnly />
      </FormRow>
      <FormRow>
        Replace Image:
        <input type="file" name="image" />
        <small>{validationErrors?.image}</small>
      </FormRow>
      <FormRow>
        Display Name:
        <input
          name="displayName"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <small>{validationErrors?.displayName}</small>
      </FormRow>
      <FormRow>
        Alt Text:
        <input
          name="altText"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
        />
        <small>{validationErrors?.altText}</small>
      </FormRow>
      <FormRow>
        Used In Blogs ({image.blogs.length}):
        {image.blogs.length > 0 ? (
          <ul>
            {image.blogs.map((blog) => (
              <Link key={blog.id} to={`/blogs/${blog.id}`}>
                <li>{blog.title}</li>
              </Link>
            ))}
          </ul>
        ) : (
          <p>This image has not been used in any blogs.</p>
        )}
      </FormRow>
      <FormRow>
        Created at:
        <input
          type="datetime-local"
          value={image.createdAt.split('Z')[0]}
          readOnly
        />
      </FormRow>
      <FormRow>
        Updated at:
        <input
          type="datetime-local"
          value={image.updatedAt.split('Z')[0]}
          readOnly
        />
      </FormRow>
      <GeneralButton type="button" onClick={resetFields}>
        Reset
      </GeneralButton>
      <GeneralButton type="submit" disabled={isFetching}>
        Update Image
      </GeneralButton>
    </Form>
  );
}
