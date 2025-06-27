import Container from '../container';
import PageNav from '../pageNav';
import BlogsSearchForm from './blogsSearchForm';
import BlogsList from './blogsList';
import PageTitleBar from '../pageTitleBar';
import { Cols, Sticky } from '../styles/mainPage';
import { GeneralButton } from '../styles/buttons';

import useSearchParamsPageNumber from '../../hooks/useSearchParamsPageNumber';
import { Link, useLoaderData, useRouteError } from 'react-router';

export default function BlogsPage() {
  const { blogs, atLastPage } = useLoaderData();
  const error = useRouteError();
  const [currentPageNumber, setCurrentPageNumber] = useSearchParamsPageNumber();
  return (
    <>
      <PageTitleBar title="Blogs">
        <Link to="/blogs/new">
          <GeneralButton type="button">New</GeneralButton>
        </Link>
      </PageTitleBar>
      <Container>
        <Cols>
          <main>
            <BlogsList blogs={blogs} />
            {error && <p>{error.message}</p>}
            <PageNav
              currentPageNumber={currentPageNumber}
              onPageChange={setCurrentPageNumber}
              atLastPage={atLastPage}
            />
          </main>
          <aside>
            <Sticky>
              <BlogsSearchForm />
            </Sticky>
          </aside>
        </Cols>
      </Container>
    </>
  );
}
