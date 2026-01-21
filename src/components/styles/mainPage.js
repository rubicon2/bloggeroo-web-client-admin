import { devices } from '../../mediaQueries';
import styled from 'styled-components';

const Cols = styled.div`
  position: relative;

  @media ${devices.tablet} {
    display: grid;
    gap: 1rem;
    grid-template-columns: 2fr 1fr;
  }
`;

const Sticky = styled.div`
  height: min-content;
  position: sticky;
  top: 48px;
`;

const MobileMarginContainer = styled.div`
  margin: 1rem 0;

  @media ${devices.tablet} {
    margin-bottom: 0;
  }
`;

export { Cols, Sticky, MobileMarginContainer };
