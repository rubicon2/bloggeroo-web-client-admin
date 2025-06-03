import authFetch from '../ext/authFetch';
import responseToJsend from '../ext/responseToJsend';

export default function blogsLoader(accessRef) {
  return async () => {
    const { response, fetchError } = await authFetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/blogs`,
      accessRef,
    );
    if (fetchError) throw fetchError;
    const { data, error } = await responseToJsend(response);
    if (error) throw error;
    return data.blogs;
  };
}
