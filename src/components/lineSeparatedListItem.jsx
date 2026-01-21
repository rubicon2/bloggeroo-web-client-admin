import styled from 'styled-components';

const LineSeparatedListItem = styled.li`
  border-bottom: 2px solid var(--theme-soft-outline-color);

  &:last-of-type {
    border-bottom: 0px;
  }
`;

export default LineSeparatedListItem;
