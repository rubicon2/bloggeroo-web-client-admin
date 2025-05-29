import BlogForm from './blogForm';
import { UserStateContext, UserDispatchContext } from '../contexts/UserContext';
import authFetch from '../ext/authFetch';
import { useNavigate } from 'react-router';
import { useState, useContext } from 'react';

export default function NewBlogPage() {
  const { accessToken } = useContext(UserStateContext);
  const dispatch = useContext(UserDispatchContext);
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const [validationErrors, setValidationErrors] = useState(null);
  const [error, setError] = useState(null);

  async function createBlog(event) {
    event.preventDefault();
    setIsFetching(true);
    // User id is decoded from jwt on server side that is sent as part of access code. Don't need to decode on here!!!
    const { response, access, fetchError } = await authFetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/blogs`,
      accessToken,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(new FormData(event.target)),
      },
    );
    if (access)
      dispatch({ type: 'refreshed_access_token', accessToken: access });
    if (fetchError) setError(fetchError);
    else {
      const responseJson = await response?.json();
      switch (responseJson?.status) {
        case 'success': {
          navigate('/blogs');
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
    <main>
      <h2>New Blog</h2>
      <BlogForm
        buttonText={'Create Blog'}
        initialValues={{ title: '', body: '' }}
        isFetching={isFetching}
        validationErrors={validationErrors}
        onSubmit={createBlog}
      />
      {error && <p>{error.message}</p>}
    </main>
  );
}
