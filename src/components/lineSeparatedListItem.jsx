import styled from 'styled-components';

const LineSeparatedListItem = styled.li`
  border-bottom: 2px solid var(--theme-grey);

  &:last-of-type {
    border-bottom: 0px;
  }
`;

export default LineSeparatedListItem;
