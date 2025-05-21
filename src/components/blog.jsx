import { useLoaderData } from 'react-router';
import useComments from '../hooks/useComments';

export function blogLoader(accessToken) {
  return async ({ params }) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/blogs/${params.blogId}`,
      {
        headers: {
          Authorization: accessToken ? 'Bearer ' + accessToken : '',
        },
      },
    );
    const json = await response.json();
    return json;
  };
}

export default function Blog() {
  const json = useLoaderData();
  const { blog, error } = json.data;

  // Fetch comments in a separate fetch so query can change order, filter out certain ones, etc.
  // Split out into a separate component later.
  const { comments } = useComments(
    `blogId=${blog?.id}&orderBy=createdAt&sortOrder=desc`,
  );

  return (
    <>
      {blog && (
        <>
          <h2>{blog.title}</h2>
          <small>By {blog.owner.name}</small>
          <p>{blog.body}</p>
          <h3>Comments</h3>
          {comments?.length > 0 ? (
            <ul>
              {comments.map((comment) => (
                <div key={comment.id}>{comment.text}</div>
              ))}
            </ul>
          ) : (
            <p>There are no comments.</p>
          )}
        </>
      )}
      {error && <p>{error}</p>}
    </>
  );
}
