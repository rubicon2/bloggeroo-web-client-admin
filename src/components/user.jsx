import DeleteButton from './deleteButton';
import { UserDispatchContext, UserStateContext } from '../contexts/UserContext';
import authFetch from '../ext/authFetch';

import { useContext, useState } from 'react';
import { Link, useLoaderData, useNavigate, useRouteError } from 'react-router';

export function userLoader(accessToken) {
  return async ({ params }) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/users/${params.userId}`,
      {
        headers: {
          Authorization: accessToken ? 'Bearer ' + accessToken : '',
        },
      },
    );
    const json = await response.json();
    switch (json.status) {
      case 'success': {
        return json;
      }
      case 'fail': {
        throw new Error(json.data.message);
      }
      case 'error': {
        throw new Error(json.message);
      }
    }
  };
}

export default function User() {
  const json = useLoaderData();
  const user = json.data.user;
  const navigate = useNavigate();

  const { accessToken } = useContext(UserStateContext);
  const dispatch = useContext(UserDispatchContext);

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
    const {
      response,
      access,
      fetchError: authFetchError,
    } = await authFetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/users/${user.id}`,
      accessToken,
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

    if (access)
      dispatch({ type: 'refreshed_access_token', accessToken: access });
    if (authFetchError) setError(authFetchError);
    else {
      const responseJson = await response?.json();
      switch (responseJson.status) {
        case 'success': {
          navigate('/users');
          break;
        }
        case 'fail': {
          if (responseJson.data.validationErrors)
            setValidationErrors(responseJson.data.validationErrors);
          if (responseJson.data.message)
            setError(new Error(responseJson.data.message));
          break;
        }
        case 'error': {
          setError(new Error(responseJson.message));
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
            successRedirect={'/users'}
          >
            Delete
          </DeleteButton>
        </>
      )}
      {error && <p>{error}</p>}
      <h3>Blogs</h3>
      {user.blogs?.length > 0 ? (
        <ul>
          {user.blogs.map((blog) => (
            <Link to={`/blogs/${blog.id}`}>
              <li>{blog.title}</li>
            </Link>
          ))}
        </ul>
      ) : (
        <p>This user has not made any blogs.</p>
      )}
      <h3>Comments</h3>
      {user.comments?.length > 0 ? (
        <ul>
          {user.comments.map((comment) => (
            <Link to={`/comments/${comment.id}`}>
              <li>
                <Link to={`/blogs/${comment.blogId}`}>For this blog</Link>
                <div>{comment.createdAt}</div>
                <div>{comment.text}</div>
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p>This user has not made any comments.</p>
      )}
    </>
  );
}
