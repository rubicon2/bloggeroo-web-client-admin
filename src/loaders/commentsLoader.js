import authFetch from '../ext/authFetch';
import requestToSearchStr from '../ext/requestToSearchStr';
import requestToSkipTake from '../ext/requestToSkipTake';
import responseToJsend from '../ext/responseToJsend';

export default function commentsLoader(accessRef) {
  return async ({ request }) => {
    const { skip, take } = requestToSkipTake(request);
    const searchParams = requestToSearchStr(request, [skip, take]);
    const { response, fetchError } = await authFetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/comments?skip=${skip}&take=${take + 1}&orderBy=createdAt&sortOrder=desc&${searchParams}`,
      accessRef,
    );
    if (fetchError) throw fetchError;
    const { data, error } = await responseToJsend(response);
    if (error) throw error;
    const atLastPage = data.comments.length <= take;
    return { comments: data.comments.slice(0, take), atLastPage };
  };
}
