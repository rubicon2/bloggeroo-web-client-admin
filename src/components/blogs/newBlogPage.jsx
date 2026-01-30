import PageTitleBar from '../pageTitleBar';
import TabbedContainer from '../tabbedContainer';
import BlogForm from './blogForm';
import BlogHeader from './blogHeader';
import MarkdownBlog from './markdownBlog';
import BlogImagesList from './blogImagesList';
import Container from '../container';

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

  const [blog, setBlog] = useState({
    title: '',
    owner: {
      name: 'Author Name',
    },
    body: '',
    publishedAt: null,
  });

  async function createBlog(event) {
    event.preventDefault();
    setIsFetching(true);
    // User id is decoded from jwt on server side that is sent as part of access code. Don't need to decode on here!!!
    const { response, fetchError } = await api.postBlog(
      accessRef,
      // This could be changed just to use the blog state??
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

  function insertImageLink(image) {
    setBlog({
      ...blog,
      body:
        blog.body +
        `![${image.altText}](${image.url} "${image.displayName}")\n\n`,
    });
  }

  return (
    <main>
      <PageTitleBar title="New Blog" />
      <Container>
        <TabbedContainer
          onTabChange={() => {
            setError(null);
            setValidationErrors(null);
          }}
          tabs={[
            {
              id: 'edit',
              labelText: 'Edit',
              content: (
                <BlogForm
                  buttonText={'Save changes'}
                  blog={blog}
                  validationErrors={validationErrors}
                  buttonDisabled={isFetching}
                  onSubmit={createBlog}
                  onChange={(updatedBlog) =>
                    setBlog({ ...blog, ...updatedBlog })
                  }
                />
              ),
            },
            {
              id: 'preview',
              labelText: 'Preview',
              content: (
                <>
                  <BlogHeader blog={blog} />
                  <MarkdownBlog>{blog.body}</MarkdownBlog>
                  {error && <p>{error.message}</p>}
                </>
              ),
            },
            {
              id: 'images',
              labelText: 'Add Images',
              content: (
                <>
                  <BlogImagesList onClick={insertImageLink} />
                  {error && <p>{error.message}</p>}
                </>
              ),
            },
          ]}
        />
      </Container>
    </main>
  );
}
