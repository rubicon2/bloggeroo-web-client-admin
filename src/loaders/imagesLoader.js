import requestToSkipTake from '../ext/requestToSkipTake';
import requestToSearchObj from '../ext/requestToSearchObj';
import authFetch from '../ext/authFetch';
import responseToJsend from '../ext/responseToJsend';
import deepMerge from '@rubicon2/deep-merge';
import objToSearchStr from '../ext/objToSearchStr';

const defaultSettings = {
  orderBy: 'displayName',
  sortOrder: 'asc',
  page: 1,
};

export default function imagesLoader(accessRef) {
  return async ({ request }) => {
    // Calculate skip and take from take and page url params.
    const { skip, take } = requestToSkipTake(request, { take: 9 });
    // Overwrite any default settings with those set by the user.
    const settings = {
      ...defaultSettings,
      ...requestToSearchObj(request),
      skip,
      // Take one extra. If data.blogs.length > take, then we know there is another page of info to fetch.
      take: take + 1,
    };
    // Settings that need to merge with existing, not overwrite.
    const searchParamsObj = deepMerge(settings, {
      // A tie-breaker to ensure consistent ordering.
      orderBy: 'id',
    });
    const searchParamsStr = objToSearchStr(searchParamsObj);

    const { response, fetchError } = await authFetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/images?${searchParamsStr}`,
      accessRef,
    );
    if (fetchError) throw fetchError;

    const { data, error } = await responseToJsend(response);
    if (error) throw error;

    const atLastPage = data.images.length <= take;
    return { images: data.images.slice(0, take), atLastPage };
  };
}
