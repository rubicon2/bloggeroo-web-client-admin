import ListItemButtonsContainer from '../listItemButtonsContainer';
import { GeneralButton } from '../styles/buttons';
import DeleteButton from '../deleteButton';
import MarkdownBlog from './markdownBlog';
import createBlogPreviewText from '../../ext/createBlogPreviewText';
import dateTimeFormatter from '../../ext/dateTimeFormatter';
import { Link } from 'react-router';
import styled from 'styled-components';

const BlogHeader = styled.h3`
  margin-bottom: 0;
`;

export default function BlogsListBlog({ blog, onDelete }) {
  const blogPreview = createBlogPreviewText(blog);
  return (
    <div>
      <BlogHeader>{blog.title}</BlogHeader>
      <small>
        By {blog.owner.name} at{' '}
        {blog.publishedAt
          ? dateTimeFormatter.format(new Date(blog.publishedAt))
          : 'never'}
      </small>
      <MarkdownBlog>{blogPreview}</MarkdownBlog>
      <ListItemButtonsContainer>
        <Link to={`/blogs/${blog.id}`}>
          <GeneralButton type="button">Edit</GeneralButton>
        </Link>
        <DeleteButton
          url={`${import.meta.env.VITE_SERVER_URL}/admin/blogs/${blog.id}`}
          onDelete={onDelete}
        >
          Delete
        </DeleteButton>
      </ListItemButtonsContainer>
    </div>
  );
}
