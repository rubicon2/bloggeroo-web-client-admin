import { GeneralButton } from '../styles/buttons';
import { Form, FormRow } from '../styles/blogForm';
import { useState, useEffect } from 'react';

export default function ImageForm({
  buttonText = 'Submit',
  initialValues = { displayName: '', altText: '' },
  isFetching,
  validationErrors = { array: [] },
  // All fields are handled within this form component, but just in case.
  onChange = () => {},
  onSubmit = () => {},
}) {
  const [displayName, setDisplayName] = useState(initialValues.displayName);
  const [altText, setAltText] = useState(initialValues.altText);

  useEffect(() => {
    onChange({
      displayName,
      altText,
    });
  }, [onChange, displayName, altText]);

  return (
    <Form encType="multipart/form-data" onSubmit={onSubmit}>
      <FormRow>
        Image:
        <input type="file" name="image" required />
        <small>{validationErrors?.image}</small>
      </FormRow>
      <FormRow>
        Display Name:
        <input
          type="text"
          name="displayName"
          autoComplete="off"
          required
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <small>{validationErrors?.displayName}</small>
      </FormRow>
      <FormRow>
        Alt Text:
        <input
          type="text"
          name="altText"
          autoComplete="off"
          required
          onChange={(e) => setAltText(e.target.name)}
        />
        <small>{validationErrors?.altText}</small>
      </FormRow>
      <GeneralButton type="submit" disabled={isFetching}>
        {buttonText}
      </GeneralButton>
    </Form>
  );
}
