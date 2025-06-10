import PageNav from '../pageNav';
import BlogsSearchForm from './blogsSearchForm';
import BlogsList from './blogsList';
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
        <BlogsList blogs={blogs} />
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
