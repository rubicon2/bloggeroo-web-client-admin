import DeleteButton from './deleteButton';
import useComments from '../hooks/useComments';
import { useLoaderData, useRouteError } from 'react-router';

export function blogLoader(accessToken) {
  // If blogLoader tries to load a non-existent blog, accessToken is always null?
  // This was because I was testing by typing garbo into the address bar for the blogId.
  // That seems to cause the entire app to re-initialise, and the reducer uses the initialValue of { accessToken: null }.
  // If I navigate to a bad link inside the app by making the Links incorrect, then it works as expected.
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

export default function Blog() {
  const error = useRouteError();
  const json = useLoaderData();
  const { blog } = json.data;

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
          <DeleteButton
            url={`${import.meta.env.VITE_SERVER_URL}/admin/blogs/${blog.id}`}
          >
            Delete
          </DeleteButton>
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
