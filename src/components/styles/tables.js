import styled from 'styled-components';

const FixedTable = styled.table`
  table-layout: fixed;
  width: 100%;
`;

const MarginFixedTable = styled(FixedTable)`
  margin-bottom: 1rem;
`;

export { FixedTable, MarginFixedTable };
