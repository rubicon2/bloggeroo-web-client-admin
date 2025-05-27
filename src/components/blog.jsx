import DeleteButton from './deleteButton';
import { UserDispatchContext, UserStateContext } from '../contexts/UserContext';
import useComments from '../hooks/useComments';
import authFetch from '../ext/authFetch';

import { useContext, useState } from 'react';
import { useLoaderData, useNavigate, useRouteError } from 'react-router';

export function blogLoader(accessToken) {
  // If blogLoader tries to load a non-existent blog, accessToken is always null?
  // This was because I was testing by typing garbo into the address bar for the blogId.
  // That seems to cause the entire app to re-initialise, and the reducer uses the initialValue of { accessToken: null }.
  // If I navigate to a bad link inside the app by making the Links incorrect, then it works as expected.
  return async ({ params }) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/blogs/${params.blogId}`,
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

export default function Blog() {
  const json = useLoaderData();
  const { blog } = json.data;
  const navigate = useNavigate();

  const { accessToken } = useContext(UserStateContext);
  const dispatch = useContext(UserDispatchContext);

  const [title, setTitle] = useState(blog.title);
  const [body, setBody] = useState(blog.body);
  const [isFetching, setIsFetching] = useState(false);
  const [validationErrors, setValidationErrors] = useState(null);
  const [error, setError] = useState(useRouteError());

  const haveFieldsChanged = title !== blog.title || body !== blog.body;

  // Fetch comments in a separate fetch so query can change order, filter out certain ones, etc.
  // Split out into a separate component later.
  const { comments } = useComments(
    `blogId=${blog?.id}&orderBy=createdAt&sortOrder=desc`,
  );

  async function saveChanges(event) {
    event.preventDefault();
    setIsFetching(true);
    const { response, access, fetchError } = await authFetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/blogs/${blog.id}`,
      accessToken,
      {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          body,
        }),
      },
    );
    if (access)
      dispatch({ type: 'refreshed_access_token', accessToken: access });
    if (fetchError) setError(fetchError);
    else {
      const responseJson = await response.json();
      switch (responseJson.status) {
        case 'success': {
          navigate('/blogs');
          break;
        }
        case 'fail': {
          if (responseJson.data.validationErrors)
            setValidationErrors(responseJson.data.validationErrors);
          if (responseJson.data.message) setError(responseJson.data.message);
          break;
        }
        case 'error': {
          setError(responseJson.message);
          break;
        }
      }
    }
    setIsFetching(false);
  }

  return (
    <>
      {blog && (
        <>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <small>{validationErrors?.title}</small>
          </label>
          <small>By {blog.owner.name}</small>
          <DeleteButton
            url={`${import.meta.env.VITE_SERVER_URL}/admin/blogs/${blog.id}`}
          >
            Delete
          </DeleteButton>
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
          <button
            type="button"
            disabled={isFetching || !haveFieldsChanged}
            onClick={saveChanges}
          >
            Save Changes
          </button>
          <h3>Comments</h3>
          {comments?.length > 0 ? (
            <ul>
              {comments.map((comment) => (
                <div key={comment.id}>{comment.text}</div>
              ))}
            </ul>
          ) : (
            <p>There are no comments.</p>
          )}
        </>
      )}
      {error && <p>{error.message}</p>}
    </>
  );
}
