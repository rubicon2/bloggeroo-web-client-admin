import styled from 'styled-components';

const LineSeparatedListItem = styled.li`
  // For even spacing between items.
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid var(--theme-soft-outline-color);

  &:last-of-type {
    // Since border will be gone, no need for padding and margin.
    // Remove padding here. That way, if margin doubles up with a following element, margin collapse will occur.
    padding-bottom: 0;
    border-bottom: 0px;
  }
`;

export default LineSeparatedListItem;
