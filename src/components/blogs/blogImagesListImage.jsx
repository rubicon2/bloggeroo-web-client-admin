import { GeneralButton } from '../styles/buttons';
import styled from 'styled-components';

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
`;

const ImageH3 = styled.h3`
  margin-top: 0;
`;

export default function BlogImagesListImage({ image, onClick = () => {} }) {
  return (
    <ImageContainer key={image.id} onClick={onClick}>
      <div>
        <ImageH3>{image.displayName}</ImageH3>
        <img src={image.url} alt={image.altText} />
      </div>
      <GeneralButton type="button">Insert</GeneralButton>
    </ImageContainer>
  );
}
