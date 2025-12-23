import { devices } from '../../mediaQueries';
import styled from 'styled-components';

const GridTwoCol = styled.div`
  display: grid;
  gap: 1rem 5rem;

  @media (${devices.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
`;

export default GridTwoCol;
