import { GeneralButton } from '../styles/buttons';
import { Form, FormRow } from '../styles/searchForm';
import { useState } from 'react';

export default function UserForm({
  buttonText,
  initialValues,
  isFetching,
  validationErrors,
  onSubmit,
}) {
  const [email, setEmail] = useState(initialValues?.email || '');
  const [name, setName] = useState(initialValues?.name || '');
  const [password, setPassword] = useState(initialValues?.password || '');
  const [confirmPassword, setConfirmPassword] = useState(
    initialValues.password || '',
  );
  const [isBanned, setIsBanned] = useState(initialValues?.isBanned || false);
  const [isAdmin, setIsAdmin] = useState(initialValues?.isAdmin || false);

  return (
    <Form onSubmit={onSubmit}>
      <FormRow>
        Email:
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <small>{validationErrors?.email}</small>
      </FormRow>
      <FormRow>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <small>{validationErrors?.name}</small>
      </FormRow>
      <FormRow>
        Password:
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <small>{validationErrors?.password}</small>
      </FormRow>
      <FormRow>
        Confirm password:
        <input
          type="password"
          name="confirm_password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <small>{validationErrors?.confirm_password}</small>
      </FormRow>
      <FormRow>
        Is Banned?
        <input
          type="checkbox"
          name="is_banned"
          checked={isBanned}
          onChange={(e) => setIsBanned(e.target.checked)}
        />
        <small>{validationErrors?.is_banned}</small>
      </FormRow>
      <FormRow>
        Is Admin?
        <input
          type="checkbox"
          name="is_admin"
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
        />
        <small>{validationErrors?.is_admin}</small>
      </FormRow>
      <GeneralButton type="submit" disabled={isFetching}>
        {buttonText}
      </GeneralButton>
    </Form>
  );
}
