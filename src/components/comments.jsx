import useComments from '../hooks/useComments';
import { useState } from 'react';
import { Link } from 'react-router';

export default function Comments() {
  const [query, setQuery] = useState('');
  const { comments, error } = useComments(query);

  return (
    <>
      <input
        type="text"
        name="query"
        id="query"
        onChange={(e) => setQuery(e.currentTarget.value)}
      />
      <h2>Comments</h2>
      <div>
        {comments &&
          comments.map((comment) => {
            return (
              <Link key={comment.id} to={`/comments/${comment.id}`}>
                <h3>
                  By {comment.owner.name} at{' '}
                  {comment.createdAt
                    ? new Date(comment.createdAt).toDateString()
                    : 'never'}
                </h3>
                <p>{comment.text}</p>
              </Link>
            );
          })}
        {error && <p>{error}</p>}
      </div>
    </>
  );
}
