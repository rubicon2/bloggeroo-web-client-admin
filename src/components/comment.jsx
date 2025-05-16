import { useLoaderData, Link } from 'react-router';

export default function Comment() {
  const json = useLoaderData();
  const comment = json.data.comment;
  return (
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
  );
}
