import * as api from '../ext/api';
import responseToJsend from '../ext/responseToJsend';

export default function commentLoader(accessRef) {
  return async ({ params }) => {
    const { response, fetchError } = await api.getComment(
      accessRef,
      params.commentId,
    );
    if (fetchError) throw fetchError;
    const { data, error } = await responseToJsend(response);
    if (error) throw error;
    return data.comment;
  };
}
