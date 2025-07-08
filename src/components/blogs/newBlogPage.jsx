import PageTitleBar from '../pageTitleBar';
import Container from '../container';
import BlogForm from './blogForm';

import { AccessContext } from '../../contexts/AppContexts';
import authFetch from '../../ext/authFetch';
import responseToJsend from '../../ext/responseToJsend';
import { useNavigate } from 'react-router';
import { useState, useContext } from 'react';

export default function NewBlogPage() {
  const accessRef = useContext(AccessContext);
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const [validationErrors, setValidationErrors] = useState(null);
  const [error, setError] = useState(null);

  async function createBlog(event) {
    event.preventDefault();
    setIsFetching(true);
    // User id is decoded from jwt on server side that is sent as part of access code. Don't need to decode on here!!!
    const { response, fetchError } = await authFetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/blogs`,
      accessRef,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(new FormData(event.target)),
      },
    );
    if (fetchError) setError(fetchError);
    else {
      const { status, data, error } = await responseToJsend(response);
      setError(error);
      setValidationErrors(data?.validationErrors);
      switch (status) {
        case 'success': {
          navigate('/blogs');
          break;
        }
      }
    }
    setIsFetching(false);
  }

  return (
    <main>
      <PageTitleBar title="New Blog" />
      <Container>
        <BlogForm
          buttonText={'Create Blog'}
          initialValues={{ title: '', body: '' }}
          isFetching={isFetching}
          validationErrors={validationErrors}
          onSubmit={createBlog}
        />
        {error && <p>{error.message}</p>}
      </Container>
    </main>
  );
}
