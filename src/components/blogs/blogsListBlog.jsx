import { Link } from 'react-router';

export default function BlogsListBlog({ blog }) {
  return (
    <>
      <Link key={blog.id} to={`/blogs/${blog.id}`}>
        <h3>{blog.title}</h3>
        <small>
          By {blog.owner.name} at{' '}
          {blog.publishedAt
            ? new Date(blog.publishedAt).toDateString()
            : 'never'}
        </small>
        <p>{blog.body}</p>
      </Link>
    </>
  );
}
