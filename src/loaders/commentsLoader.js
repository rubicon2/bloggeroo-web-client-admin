import authFetch from '../ext/authFetch';
import requestToSkipTake from '../ext/requestToSkipTake';
import responseToJsend from '../ext/responseToJsend';

export default function commentsLoader(accessRef) {
  return async ({ request }) => {
    const { skip, take } = requestToSkipTake(request);
    const { response, fetchError } = await authFetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/comments?skip=${skip}&take=${take + 1}&orderBy=createdAt&sortOrder=desc`,
      accessRef,
    );
    if (fetchError) throw fetchError;
    const { data, error } = await responseToJsend(response);
    if (error) throw error;
    const atLastPage = data.comments.length <= take;
    return { comments: data.comments.slice(0, take), atLastPage };
  };
}
