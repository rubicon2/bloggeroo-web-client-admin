import Container from '../container';
import PageNav from '../pageNav';
import BlogsSearchForm from './blogsSearchForm';
import BlogsList from './blogsList';

import useSearchParamsPageNumber from '../../hooks/useSearchParamsPageNumber';
import { Link, useLoaderData, useRouteError } from 'react-router';
import PageTitleBar from '../pageTitleBar';

export default function BlogsPage() {
  const { blogs, atLastPage } = useLoaderData();
  const error = useRouteError();
  const [currentPageNumber, setCurrentPageNumber] = useSearchParamsPageNumber();

  return (
    <>
      <PageTitleBar title="Blogs">
        <Link to="/blogs/new">
          <button type="button">New</button>
        </Link>
      </PageTitleBar>
      <Container>
        <main>
          <BlogsList blogs={blogs} />
          {error && <p>{error.message}</p>}
          <PageNav
            currentPageNumber={currentPageNumber}
            onPageChange={setCurrentPageNumber}
            atLastPage={atLastPage}
          />
        </main>
        <BlogsSearchForm />
      </Container>
    </>
  );
}
