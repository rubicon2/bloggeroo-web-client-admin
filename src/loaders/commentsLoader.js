import authFetch from '../ext/authFetch';
import objToSearchStr from '../ext/objToSearchStr';
import requestToSearchObj from '../ext/requestToSearchObj';
import requestToSkipTake from '../ext/requestToSkipTake';
import responseToJsend from '../ext/responseToJsend';
import deepMerge from '@rubicon2/deep-merge';

const defaultSettings = {
  orderBy: 'createdAt',
  sortOrder: 'desc',
  page: 1,
};

export default function commentsLoader(accessRef) {
  return async ({ request }) => {
    // Calculate skip and take from take and page url params.
    const { skip, take } = requestToSkipTake(request);
    // Turn into an obj so we can merge with default settings if none set by user.
    const settings = {
      ...defaultSettings,
      ...requestToSearchObj(request),
      skip,
      // Take one extra. If data.comments.length > take, then we know there is another page of info to fetch.
      take: take + 1,
    };
    const searchParamsObj = deepMerge(settings, {
      orderBy: 'id',
    });
    const searchParamsStr = objToSearchStr(searchParamsObj);
    const { response, fetchError } = await authFetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/comments?${searchParamsStr}`,
      accessRef,
    );
    if (fetchError) throw fetchError;
    const { data, error } = await responseToJsend(response);
    if (error) throw error;
    const atLastPage = data.comments.length <= take;
    return { comments: data.comments.slice(0, take), atLastPage };
  };
}
