import styled from 'styled-components';

const GeneralButton = styled.button`
  background-color: rgb(32, 133, 240);
  color: white;

  &:hover {
    filter: brightness(0.8);
  }

  &:focus {
    outline: solid 1px black;
  }
`;

const DeleteButton = styled(GeneralButton)`
  background-color: rgb(238, 56, 141);
`;

export { GeneralButton, DeleteButton };
