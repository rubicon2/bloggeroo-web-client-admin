import PageTitleBar from '../pageTitleBar';
import Container from '../container';
import DeleteButton from '../deleteButton';
import UserPageBlogs from './userPageBlogs';
import UserPageComments from './userPageComments';
import { AccessContext } from '../../contexts/AppContexts';
import authFetch from '../../ext/authFetch';
import responseToJsend from '../../ext/responseToJsend';

import { useContext, useState } from 'react';
import { useLoaderData, useNavigate, useRouteError } from 'react-router';

export default function UserPage() {
  const user = useLoaderData();
  const navigate = useNavigate();

  const accessRef = useContext(AccessContext);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [isBanned, setIsBanned] = useState(user.isBanned);
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);

  // routeError, fetchError, validationErrors? 3 types of errors? This sucks.
  // Could initialise error to useRouteError result? Then at least only 2 types.
  const [error, setError] = useState(useRouteError());
  const [validationErrors, setValidationErrors] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const haveFieldsChanged =
    user.email !== email ||
    user.name !== name ||
    user.isBanned !== isBanned ||
    user.isAdmin !== isAdmin;

  async function saveChanges(event) {
    event.preventDefault();
    setIsFetching(true);
    const { response, fetchError } = await authFetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/users/${user.id}`,
      accessRef,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'put',
        body: JSON.stringify({
          email,
          name,
          isBanned,
          isAdmin,
        }),
      },
    );

    if (fetchError) setError(fetchError);
    else {
      const { status, data, error } = await responseToJsend(response);
      if (error) setError(error);
      setValidationErrors(data?.validationErrors);
      switch (status) {
        case 'success': {
          navigate('/users');
          break;
        }
      }
    }
    setIsFetching(false);
  }

  return (
    <>
      {user && (
        <>
          <h2>
            {user.email} - {user.name}
          </h2>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <small>{validationErrors?.email}</small>
          </label>
          <label>
            Name:
            <input
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <small>{validationErrors?.name}</small>
          </label>
          <div>
            Banned
            <input
              type="checkbox"
              name="is_banned"
              checked={isBanned}
              onChange={(e) => setIsBanned(e.target.checked)}
            />
          </div>
          <div>
            Admin
            <input
              type="checkbox"
              name="is_admin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </div>
          <button
            type="button"
            disabled={isFetching || !haveFieldsChanged}
            onClick={saveChanges}
          >
            Save Changes
          </button>
          <DeleteButton
            url={`${import.meta.env.VITE_SERVER_URL}/admin/users/${user.id}`}
            onDelete={() => navigate('/users')}
          >
            Delete
          </DeleteButton>
        </>
      )}
      {error && <p>{error.message}</p>}
      <UserPageBlogs blogs={user.blogs} />
      <UserPageComments comments={user.comments} />
    </>
  );
}
