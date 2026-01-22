import BlogHeader from './blogHeader';
import MarkdownBlog from './markdownBlog';
import ListItemButtonsContainer from '../listItemButtonsContainer';
import { GeneralButton, DeleteButton } from '../styles/buttons';

import * as api from '../../ext/api';
import responseToJsend from '../../ext/responseToJsend';
import createBlogPreviewText from '../../ext/createBlogPreviewText';
import dateTimeFormatter from '../../ext/dateTimeFormatter';

import { AccessContext } from '../../contexts/AppContexts';
import useRefresh from '../../hooks/useRefresh';

import { useContext, useState } from 'react';
import { Link } from 'react-router';

export default function BlogsListBlog({ blog }) {
  const refresh = useRefresh();
  const accessRef = useContext(AccessContext);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  const blogPreview = createBlogPreviewText(blog);

  async function deleteBlog(event) {
    event.preventDefault();
    setIsFetching(true);
    const { response, fetchError } = await api.deleteBlog(accessRef, blog.id);
    if (fetchError) setError(fetchError);
    else {
      const { status, error } = await responseToJsend(response);
      setError(error);
      switch (status) {
        case 'success': {
          refresh();
          break;
        }
      }
    }
    setIsFetching(false);
  }

  return (
    <div>
      <BlogHeader blog={blog} />
      <MarkdownBlog>{blogPreview}</MarkdownBlog>
      <ListItemButtonsContainer>
        <Link to={`/blogs/${blog.id}`}>
          <GeneralButton type="button" disabled={isFetching}>
            Edit
          </GeneralButton>
        </Link>
        <DeleteButton onClick={deleteBlog} disabled={isFetching}>
          Delete
        </DeleteButton>
      </ListItemButtonsContainer>
      {error && <p aria-live="polite">{error.message}</p>}
    </div>
  );
}
