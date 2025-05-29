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
    <form onSubmit={onSubmit}>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <small>{validationErrors?.email}</small>
      </label>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <small>{validationErrors?.name}</small>
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <small>{validationErrors?.password}</small>
      </label>
      <label>
        Confirm password:
        <input
          type="password"
          name="confirm_password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <small>{validationErrors?.confirm_password}</small>
      </label>
      <label>
        Is Banned?
        <input
          type="checkbox"
          name="is_banned"
          checked={isBanned}
          onChange={(e) => setIsBanned(e.target.checked)}
        />
        <small>{validationErrors?.is_banned}</small>
      </label>
      <label>
        Is Admin?
        <input
          type="checkbox"
          name="is_admin"
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
        />
        <small>{validationErrors?.is_admin}</small>
      </label>
      <button type="submit" disabled={isFetching}>
        {buttonText}
      </button>
    </form>
  );
}
