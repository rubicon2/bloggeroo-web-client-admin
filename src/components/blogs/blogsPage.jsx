import PageNav from '../pageNav';
import { useState } from 'react';
import { Link, useLoaderData, useRouteError } from 'react-router';

export default function BlogsPage() {
  const { blogs, atLastPage } = useLoaderData();
  const error = useRouteError();
  const [query, setQuery] = useState('');

  const filteredBlogs = blogs.filter((blog) => {
    const queryStr = query.toLowerCase().trim();
    return (
      blog.title.toLowerCase().includes(queryStr) ||
      blog.body.toLowerCase().includes(queryStr)
    );
  });

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
        {filteredBlogs &&
          filteredBlogs.map((blog) => {
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
        {error && <p>{error.message}</p>}
        <PageNav atLastPage={atLastPage} />
      </div>
    </>
  );
}
