import authFetch from '../ext/authFetch';
import responseToJsend from '../ext/responseToJsend';
import requestToSkipTake from '../ext/requestToSkipTake';
import requestToSearchObj from '../ext/requestToSearchObj';
import objToSearchStr from '../ext/objToSearchStr';

const defaultSettings = {
  orderBy: 'publishedAt',
  sortOrder: 'desc',
  page: 1,
};

export default function blogsLoader(accessRef) {
  return async ({ request }) => {
    // Calculate skip and take from take and page url params.
    const { skip, take } = requestToSkipTake(request);
    // Turn into an obj so we can merge with default settings if none set by user.
    const searchParamsObj = {
      ...defaultSettings,
      ...requestToSearchObj(request),
      skip,
      // Take one extra. If data.blogs.length > take, then we know there is another page of info to fetch.
      take: take + 1,
    };
    const searchParamsStr = objToSearchStr(searchParamsObj);
    const { response, fetchError } = await authFetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/blogs?${searchParamsStr}`,
      accessRef,
    );
    if (fetchError) throw fetchError;
    const { data, error } = await responseToJsend(response);
    if (error) throw error;
    const atLastPage = data.blogs.length <= take;
    return { blogs: data.blogs.slice(0, take), atLastPage };
  };
}
