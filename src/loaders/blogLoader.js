import authFetch from '../ext/authFetch';
import responseToJsend from '../ext/responseToJsend';

export default function blogLoader(accessRef) {
  // If blogLoader tries to load a non-existent blog, accessToken is always null?
  // This was because I was testing by typing garbo into the address bar for the blogId.
  // That seems to cause the entire app to re-initialise, and the reducer uses the initialValue of { accessToken: null }.
  // If I navigate to a bad link inside the app by making the Links incorrect, then it works as expected.
  return async ({ params }) => {
    const blogPromise = authFetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/blogs/${params.blogId}`,
      accessRef,
    );
    const commentsPromise = authFetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/comments?blogId=${params.blogId}&orderBy=createdAt&orderBy=id&sortOrder=desc`,
      accessRef,
    );

    const { response: blogResponse, fetchError: blogFetchError } =
      await blogPromise;
    const { response: commentsResponse, fetchError: commentsFetchError } =
      await commentsPromise;

    if (blogFetchError) throw blogFetchError;
    if (commentsFetchError) throw commentsFetchError;

    const { data: blogData, error: blogError } =
      await responseToJsend(blogResponse);
    const { data: commentsData, error: commentsError } =
      await responseToJsend(commentsResponse);

    if (blogError) throw blogError;
    if (commentsError) throw commentsError;

    return { blog: blogData.blog, comments: commentsData.comments };
  };
}
