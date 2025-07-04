import ListItemButtonsContainer from '../listItemButtonsContainer';
import { GeneralButton } from '../styles/buttons';
import DeleteButton from '../deleteButton';
import { Link } from 'react-router';

export default function BlogsListBlog({ blog, onDelete }) {
  return (
    <div>
      <h3>{blog.title}</h3>
      <small>
        By {blog.owner.name} at{' '}
        {blog.publishedAt ? new Date(blog.publishedAt).toDateString() : 'never'}
      </small>
      <p>{blog.body}</p>
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
