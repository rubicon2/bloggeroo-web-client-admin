import Container from '../container';
import PageTitleBar from '../pageTitleBar';
import ImagesGrid from './imagesGrid';
import PageNav from '../pageNav';
import ImagesSearchForm from './ImagesSearchForm';

import { GeneralButton } from '../styles/buttons';
import { MobileMarginContainer, Cols, Sticky } from '../styles/mainPage';
import { MediaMobileOnly, MediaTabletAndLarger } from '../styles/mediaQueries';

import useSearchParamsPageNumber from '../../hooks/useSearchParamsPageNumber';

import { useState } from 'react';
import { useLoaderData, Link } from 'react-router';

export default function ImagesPage() {
  const { images, atLastPage } = useLoaderData();
  const [currentPageNumber, setCurrentPageNumber] = useSearchParamsPageNumber();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  return (
    <main>
      <MobileMarginContainer>
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
      </MobileMarginContainer>
      <Container>
        {isMobileSearchOpen && (
          // Form seemed sluggish on Firefox but only when touch simulation was turned on?
          <MediaMobileOnly>
            <ImagesSearchForm />
          </MediaMobileOnly>
        )}
        <Cols>
          <div>
            <ImagesGrid images={images} />
            <PageNav
              currentPageNumber={currentPageNumber}
              onPageChange={setCurrentPageNumber}
              atLastPage={atLastPage}
            />
          </div>
          <MediaTabletAndLarger>
            <Sticky>
              <ImagesSearchForm />
            </Sticky>
          </MediaTabletAndLarger>
        </Cols>
      </Container>
    </main>
  );
}
