import WideContainer from '../wideContainer';
import GridTwoCol from '../styles/gridTwoCol';
import BlogForm from './blogForm';
import MarkdownBlog from './markdownBlog';

import * as api from '../../ext/api';
import responseToJsend from '../../ext/responseToJsend';

import { AccessContext } from '../../contexts/AppContexts';

import { useNavigate } from 'react-router';
import { useState, useContext } from 'react';

export default function NewBlogPage() {
  const accessRef = useContext(AccessContext);
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const [validationErrors, setValidationErrors] = useState(null);
  const [error, setError] = useState(null);
  const [markdown, setMarkdown] = useState(`# No markdown to preview yet!`);

  async function createBlog(event) {
    event.preventDefault();
    setIsFetching(true);
    // User id is decoded from jwt on server side that is sent as part of access code. Don't need to decode on here!!!
    const { response, fetchError } = await api.postBlog(
      accessRef,
      new URLSearchParams(new FormData(event.target)),
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
      <WideContainer>
        <GridTwoCol>
          <div>
            <h2>Edit</h2>
            <BlogForm
              buttonText={'Create Blog'}
              initialValues={{ title: '', body: '' }}
              isFetching={isFetching}
              validationErrors={validationErrors}
              onSubmit={createBlog}
              onChange={({ body }) => setMarkdown(body)}
            />
          </div>
          <div>
            <h2>Preview</h2>
            <MarkdownBlog>{markdown}</MarkdownBlog>
          </div>
        </GridTwoCol>
        {error && <p>{error.message}</p>}
      </WideContainer>
    </main>
  );
}
