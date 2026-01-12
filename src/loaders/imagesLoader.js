import authFetch from '../ext/authFetch';
import responseToJsend from '../ext/responseToJsend';

export default function imagesLoader(accessRef) {
  return async ({ request }) => {
    const { response, fetchError } = await authFetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/images`,
      accessRef,
    );
    if (fetchError) throw fetchError;
    const { data, error } = await responseToJsend(response);
    if (error) throw error;
    return { images: data.images, atLastPage: true };
  };
}
