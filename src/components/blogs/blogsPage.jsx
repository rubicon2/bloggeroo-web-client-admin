import PageNav from '../pageNav';
import BlogsSearchForm from './blogsSearchForm';
import useSearchParamsPageNumber from '../../hooks/useSearchParamsPageNumber';
import { Link, useLoaderData, useRouteError } from 'react-router';

export default function BlogsPage() {
  const { blogs, atLastPage } = useLoaderData();
  const error = useRouteError();
  const [currentPageNumber, setCurrentPageNumber] = useSearchParamsPageNumber();

  return (
    <>
      <BlogsSearchForm />
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
        {error && <p>{error.message}</p>}
        <PageNav
          currentPageNumber={currentPageNumber}
          onPageChange={setCurrentPageNumber}
          atLastPage={atLastPage}
        />
      </div>
    </>
  );
}
