import { devices } from '../../mediaQueries';
import styled from 'styled-components';

const Cols = styled.div`
  display: grid;
  gap: 1rem;
  position: relative;

  @media ${devices.tablet} {
    grid-template-columns: 1fr 1fr;
  }
`;

const Sticky = styled.div`
  height: min-content;
  position: sticky;
  top: 48px;
`;

export { Cols, Sticky };
