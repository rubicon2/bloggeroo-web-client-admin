import TabbedContainer from '../tabbedContainer';
import ImagesGrid from '../images/imagesGrid';
import BlogImagesListImage from './blogImagesListImage';
import ImageForm from '../images/imageForm';
import ImagesSearchForm from '../images/imagesSearchForm';
import { Cols, Sticky } from '../styles/mainPage';
import { GeneralButton } from '../styles/buttons';
import { MediaMobileOnly, MediaTabletAndLarger } from '../styles/mediaQueries';

import * as api from '../../ext/api';
import responseToJsend from '../../ext/responseToJsend';
import formToFields from '../../ext/formToFields';
import objToSearchStr from '../../ext/objToSearchStr';
import { AccessContext } from '../../contexts/AppContexts';

import { useCallback, useContext, useEffect, useState } from 'react';

export default function BlogImagesList({ onClick }) {
  const accessRef = useContext(AccessContext);
  const [images, setImages] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [searchParamsStr, setSearchParamsStr] = useState('orderBy=displayName');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const getImages = useCallback(async () => {
    const { response, fetchError } = await api.getImages(
      accessRef,
      searchParamsStr,
    );
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
  }, [accessRef, searchParamsStr]);

  async function postImage(event) {
    setIsFetching(true);
    event.preventDefault();
    const { response, fetchError } = await api.postImage(
      accessRef,
      new FormData(event.target),
    );
    if (fetchError) setError(fetchError);
    else {
      const { status, error } = await responseToJsend(response);
      setError(error);
      switch (status) {
        case 'success': {
          // Update list.
          getImages();
        }
      }
    }
    setIsFetching(false);
  }

  function handleSearchForm(event) {
    event.preventDefault();
    const formFields = formToFields(event.target);
    const searchParamsStr = objToSearchStr(formFields);
    setSearchParamsStr(searchParamsStr);
  }

  useEffect(() => {
    getImages();
  }, [getImages]);

  return (
    <>
      <TabbedContainer
        tabs={[
          {
            id: 'browse',
            labelText: 'Browse',
            content: (
              <>
                <MediaMobileOnly>
                  <GeneralButton
                    style={{ width: '100%', marginBottom: '1rem' }}
                    type="button"
                    onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                    aria-label={
                      isMobileSearchOpen
                        ? 'Close search form'
                        : 'Show search form'
                    }
                  >
                    {isMobileSearchOpen ? 'Close' : 'Search'}
                  </GeneralButton>
                  {isMobileSearchOpen && (
                    <ImagesSearchForm onSubmit={handleSearchForm} />
                  )}
                </MediaMobileOnly>
                <Cols>
                  <ImagesGrid>
                    {images.map((image) => (
                      <BlogImagesListImage
                        image={image}
                        onClick={() => onClick(image)}
                      />
                    ))}
                  </ImagesGrid>
                  <MediaTabletAndLarger>
                    <Sticky>
                      <ImagesSearchForm onSubmit={handleSearchForm} />
                    </Sticky>
                  </MediaTabletAndLarger>
                </Cols>
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
      {error && <p>{error.message}</p>}
    </>
  );
}
