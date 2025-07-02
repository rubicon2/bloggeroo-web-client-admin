import styled from 'styled-components';
import { GeneralButton } from './styles/buttons';

const LeftButton = styled(GeneralButton)`
  grid-column: 1 / span 1;
`;

const RightButton = styled(GeneralButton)`
  grid-column: 3 / span 1;
`;

const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const Page = styled.div`
  text-align: center;
`;

export default function PageNav({
  currentPageNumber,
  onPageChange,
  atLastPage,
}) {
  return (
    <nav>
      <ButtonsContainer>
        {currentPageNumber > 1 && (
          <LeftButton
            type="button"
            onClick={() => onPageChange(currentPageNumber - 1)}
          >
            Previous
          </LeftButton>
        )}
        {!atLastPage && (
          <RightButton
            type="button"
            onClick={() => onPageChange(currentPageNumber + 1)}
          >
            Next
          </RightButton>
        )}
      </ButtonsContainer>
      {!(currentPageNumber === 1 && atLastPage) && (
        <Page>Page: {currentPageNumber}</Page>
      )}
    </nav>
  );
}
