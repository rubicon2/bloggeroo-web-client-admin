import * as api from '../ext/api';
import responseToJsend from '../ext/responseToJsend';

export default function userLoader(accessRef) {
  return async ({ params }) => {
    const { response, fetchError } = await api.getUser(
      accessRef,
      params.userId,
    );
    if (fetchError) throw fetchError;
    const { data, error } = await responseToJsend(response);
    if (error) throw error;
    return data.user;
  };
}
