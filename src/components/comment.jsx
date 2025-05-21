import { useLoaderData, useRouteError, Link } from 'react-router';

export function commentLoader(accessToken) {
  return async ({ params }) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/comments/${params.commentId}`,
      {
        headers: {
          Authorization: accessToken ? 'Bearer ' + accessToken : '',
        },
      },
    );
    const json = await response.json();
    switch (json.status) {
      case 'success': {
        return json;
      }
      case 'fail': {
        throw new Error(json.data.message);
      }
      case 'error': {
        throw new Error(json.message);
      }
    }
  };
}

export default function Comment() {
  const error = useRouteError();
  const json = useLoaderData();
  const comment = json.data.comment;
  return (
    <>
      {comment && (
        <>
          <h2>By {comment.owner.name}</h2>
          <small>At {comment.createdAt}</small>
          <p>{comment.text}</p>
          {comment.parentCommentId && (
            <small>
              <Link to={`/comments/${comment.parentCommentId}`}>
                In response to this comment
              </Link>
            </small>
          )}
        </>
      )}
      {error && <p>{error}</p>}
    </>
  );
}
