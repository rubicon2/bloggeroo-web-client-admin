import authFetch from '../ext/authFetch';
import responseToJsend from '../ext/responseToJsend';
import requestToSkipTake from '../ext/requestToSkipTake';
import requestToSearchStr from '../ext/requestToSearchStr';

export default function blogsLoader(accessRef) {
  return async ({ request }) => {
    const { skip, take } = requestToSkipTake(request);
    const searchParams = requestToSearchStr(request, ['skip', 'take']);
    const { response, fetchError } = await authFetch(
      // Take one extra. If data.blogs.length > take, then we know there is another page of info to fetch.
      `${import.meta.env.VITE_SERVER_URL}/admin/blogs?skip=${skip}&take=${take + 1}&orderBy=createdAt&sortOrder=desc&${searchParams}`,
      accessRef,
    );
    if (fetchError) throw fetchError;
    const { data, error } = await responseToJsend(response);
    if (error) throw error;
    const atLastPage = data.blogs.length <= take;
    return { blogs: data.blogs.slice(0, take), atLastPage };
  };
}
