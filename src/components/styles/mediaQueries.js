import { devices } from '../../mediaQueries';
import styled from 'styled-components';

const MediaMobileOnly = styled.div`
  @media ${devices.tablet} {
    display: none;
  }
`;

const MediaTabletAndLarger = styled.div`
  display: none;
  @media ${devices.tablet} {
    display: block;
  }
`;

const MediaLaptopAndLarger = styled.div`
  display: none;
  @media ${devices.laptop} {
    display: block;
  }
`;

const MediaDesktopOnly = styled.div`
  display: none;
  @media ${devices.desktop} {
    display: block;
  }
`;

export {
  MediaMobileOnly,
  MediaTabletAndLarger,
  MediaLaptopAndLarger,
  MediaDesktopOnly,
};
