import authFetch from '../ext/authFetch';
import requestToSkipTake from '../ext/requestToSkipTake';
import requestToSearchStr from '../ext/requestToSearchStr';
import responseToJsend from '../ext/responseToJsend';

export default function usersLoader(accessRef) {
  return async ({ request }) => {
    const { skip, take } = requestToSkipTake(request);
    const searchParams = requestToSearchStr(request);
    const { response, fetchError } = await authFetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/users?skip=${skip}&take=${take + 1}&orderBy=name&sortOrder=asc&${searchParams}`,
      accessRef,
    );
    if (fetchError) throw fetchError;
    const { data, error } = await responseToJsend(response);
    if (error) throw error;
    const atLastPage = data.users.length <= take;
    return { users: data.users.slice(0, take), atLastPage };
  };
}
