import TabbedContainer from '../tabbedContainer';
import ImageForm from '../images/imageForm';
import { NavButton } from '../styles/buttons';
import UnstyledList from '../unstyledList';

import * as api from '../../ext/api';
import responseToJsend from '../../ext/responseToJsend';
import { AccessContext } from '../../contexts/AppContexts';

import { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

const SideScrollList = styled(UnstyledList)`
  overflow-x: scroll;
  display: flex;
  gap: 1rem;
  padding: 0;

  * {
    width: 250px;
  }
`;

const SideScrollListItem = styled.li``;

export default function BlogImagesList({ onClick, onUpload }) {
  const accessRef = useContext(AccessContext);
  const [images, setImages] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [error, setError] = useState(null);

  const getImages = useCallback(async () => {
    const { response, fetchError } = await api.getImages(accessRef);
    if (fetchError) setError(fetchError);
    else {
      const { status, data, error } = await responseToJsend(response);
      setError(error);
      switch (status) {
        case 'success':
          setImages(data.images);
          break;
      }
    }
  }, [accessRef]);

  async function postImage(event) {
    setIsFetching(true);
    event.preventDefault();
    const { response, fetchError } = await api.postImage(
      accessRef,
      new FormData(event.target),
    );
    if (fetchError) setError(fetchError);
    else {
      const { status, data, error } = await responseToJsend(response);
      setError(error);
      switch (status) {
        case 'success': {
          setIsUploadingImage(false);
          // Update list.
          getImages();
          // Add image to blog as if it has been clicked on.
          // onClick(data.image);
          // Or maybe, store uploaded image and scroll to it?
        }
      }
    }
    setIsFetching(false);
  }

  useEffect(() => {
    getImages();
  }, [getImages]);

  const imagesDisplayNameOrder = images.sort((a, b) =>
    a.displayName.localeCompare(b.displayName),
  );

  return (
    <TabbedContainer
      tabs={[
        {
          id: 'browse',
          labelText: 'Browse',
          content: (
            <>
              <SideScrollList>
                {imagesDisplayNameOrder.map((image) => (
                  <SideScrollListItem
                    key={image.id}
                    onClick={() => onClick(image)}
                  >
                    <h3>{image.displayName}</h3>
                    <img src={image.url} alt={image.altText} />
                    <button type="button">Insert</button>
                  </SideScrollListItem>
                ))}
              </SideScrollList>
            </>
          ),
        },
        {
          id: 'upload',
          labelText: 'Upload',
          content: (
            <ImageForm
              buttonText="Submit"
              isFetching={isFetching}
              validationErrors={[]}
              onSubmit={postImage}
            />
          ),
        },
      ]}
    />
  );
}
