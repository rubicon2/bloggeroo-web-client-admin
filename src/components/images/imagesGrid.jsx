import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: min-content;
  gap: 1rem;
  place-items: center;

  & img {
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }
`;

export default function ImagesGrid({ children }) {
  return <Grid>{children}</Grid>;
}
