import authFetch from '../ext/authFetch';
import responseToJsend from '../ext/responseToJsend';

export default function blogLoader(accessRef) {
  // If blogLoader tries to load a non-existent blog, accessToken is always null?
  // This was because I was testing by typing garbo into the address bar for the blogId.
  // That seems to cause the entire app to re-initialise, and the reducer uses the initialValue of { accessToken: null }.
  // If I navigate to a bad link inside the app by making the Links incorrect, then it works as expected.
  return async ({ params }) => {
    const { response, fetchError } = await authFetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/blogs/${params.blogId}`,
      accessRef,
    );
    if (fetchError) throw fetchError;
    const { data, error } = await responseToJsend(response);
    if (error) throw error;
    return data.blog;
  };
}
