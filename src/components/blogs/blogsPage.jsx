import useBlogs from '../../hooks/useBlogs';
import { useState } from 'react';
import { Link } from 'react-router';

export default function BlogsPage() {
  const [query, setQuery] = useState('');
  const { blogs, error } = useBlogs(query);

  return (
    <>
      <input
        type="text"
        name="query"
        id="query"
        onChange={(e) => setQuery(e.currentTarget.value)}
      />
      <h2>Blogs</h2>
      <div>
        <Link to="/blogs/new">
          <button type="button">New Blog</button>
        </Link>
        {blogs &&
          blogs.map((blog) => {
            return (
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
            );
          })}
        {error && <p>{error}</p>}
      </div>
    </>
  );
}
