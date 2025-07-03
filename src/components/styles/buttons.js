import styled from 'styled-components';

const GeneralButton = styled.button`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;

  border-color: transparent;
  background-color: var(--theme-main-color);
  color: white;

  &:hover {
    filter: brightness(0.8);
    border-color: #646cff;
  }

  &:focus,
  &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }

  &:disabled {
    filter: saturate(0.2);
    color: lightgrey;
    cursor: not-allowed;
  }
`;

const DeleteButton = styled(GeneralButton)`
  background-color: rgb(238, 56, 141);
`;

const NavButton = styled(GeneralButton)`
  display: block;
  border-radius: 0;
  border: 0;

  // In case as='a' or as={Link}.
  &:hover {
    color: white;
  }
`;

export { GeneralButton, DeleteButton, NavButton };
