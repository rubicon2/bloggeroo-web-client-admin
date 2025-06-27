import authFetch from '../ext/authFetch';
import requestToSkipTake from '../ext/requestToSkipTake';
import responseToJsend from '../ext/responseToJsend';
import requestToSearchObj from '../ext/requestToSearchObj';
import objToSearchStr from '../ext/objToSearchStr';
import deepMerge from '@rubicon2/deep-merge';

const defaultSettings = {
  orderBy: 'email',
  sortOrder: 'asc',
  page: 1,
};

export default function usersLoader(accessRef) {
  return async ({ request }) => {
    // Calculate skip and take from take and page url params.
    const { skip, take } = requestToSkipTake(request);
    // Turn into an obj so we can merge with default settings if none set by user.
    const settings = {
      ...defaultSettings,
      ...requestToSearchObj(request),
      skip,
      // Take one extra. If data.users.length > take, then we know there is another page of info to fetch.
      take: take + 1,
    };
    const searchParamsObj = deepMerge(settings, {
      orderBy: 'id',
    });
    const searchParamsStr = objToSearchStr(searchParamsObj);
    const { response, fetchError } = await authFetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/users?${searchParamsStr}`,
      accessRef,
    );
    if (fetchError) throw fetchError;
    const { data, error } = await responseToJsend(response);
    if (error) throw error;
    const atLastPage = data.users.length <= take;
    return { users: data.users.slice(0, take), atLastPage };
  };
}
