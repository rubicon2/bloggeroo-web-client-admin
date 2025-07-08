import { Link } from 'react-router';
import styled from 'styled-components';

const UserPageListLink = styled(Link)`
  // display: flex;
  // justify-content: space-between;
  display: grid;
  grid-template-columns: 2fr max-content;
  gap: 1rem;
  border-bottom: 1px solid var(--theme-shadow);
`;

export default UserPageListLink;
