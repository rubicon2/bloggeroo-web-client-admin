import Container from '../container';
import PageTitleBar from '../pageTitleBar';
import ImagesGrid from './imagesGrid';
import ImagesSearchForm from './imagesSearchForm';
import PageNav from '../pageNav';

import { GeneralButton } from '../styles/buttons';
import { Cols, Sticky } from '../styles/mainPage';
import { MediaMobileOnly, MediaTabletAndLarger } from '../styles/mediaQueries';

import formToFields from '../../ext/formToFields';
import useSearchParamsPageNumber from '../../hooks/useSearchParamsPageNumber';

import { useState } from 'react';
import { useLoaderData, useSearchParams, Link } from 'react-router';

export default function ImagesPage() {
  const { images, atLastPage } = useLoaderData();
  const [currentPageNumber, setCurrentPageNumber] = useSearchParamsPageNumber();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [, setSearchParams] = useSearchParams();

  function handleForm(event) {
    event.preventDefault();
    const formFields = formToFields(event.target);
    // Make sure we land on the first page of results, otherwise
    // could end up on a non-existent second page with no results.
    setSearchParams({ ...formFields, page: 1 });
  }
  return (
    <main>
      <PageTitleBar title="Images">
        <MediaMobileOnly>
          <GeneralButton
            type="button"
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            aria-label={
              isMobileSearchOpen ? 'Close search form' : 'Show search form'
            }
          >
            {isMobileSearchOpen ? 'Close' : 'Search'}
          </GeneralButton>
        </MediaMobileOnly>
        <Link to="/images/new">
          <GeneralButton type="button">New</GeneralButton>
        </Link>
      </PageTitleBar>
      <Container>
        {isMobileSearchOpen && (
          // Form seemed sluggish on Firefox but only when touch simulation was turned on?
          <MediaMobileOnly>
            <ImagesSearchForm onSubmit={handleForm} />
          </MediaMobileOnly>
        )}
        <Cols>
          <div>
            <ImagesGrid>
              {images.map((image) => (
                <Link to={`/images/${image.id}`}>
                  <img key={image.id} src={image.url} alt={image.altText} />
                </Link>
              ))}
            </ImagesGrid>
            <PageNav
              currentPageNumber={currentPageNumber}
              onPageChange={setCurrentPageNumber}
              atLastPage={atLastPage}
            />
          </div>
          <MediaTabletAndLarger>
            <Sticky>
              <ImagesSearchForm onSubmit={handleForm} />
            </Sticky>
          </MediaTabletAndLarger>
        </Cols>
      </Container>
    </main>
  );
}
