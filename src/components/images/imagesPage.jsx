import Container from '../container';
import PageTitleBar from '../pageTitleBar';
import ImagesGrid from './imagesGrid';
import { GeneralButton } from '../styles/buttons';
import { MobileMarginContainer } from '../styles/mainPage';

import { useLoaderData, Link } from 'react-router';

export default function ImagesPage() {
  const { images, atLastPage } = useLoaderData();
  return (
    <main>
      <MobileMarginContainer>
        <PageTitleBar title="Images">
          <Link to="/images/new">
            <GeneralButton type="button">New</GeneralButton>
          </Link>
        </PageTitleBar>
      </MobileMarginContainer>
      <Container>
        <ImagesGrid images={images} />
      </Container>
    </main>
  );
}
