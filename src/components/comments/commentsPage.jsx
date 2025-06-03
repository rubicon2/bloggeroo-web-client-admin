import CommentsList from './commentsList';
import { useLoaderData, useNavigate, useRouteError } from 'react-router';
import { useState } from 'react';

export default function CommentsPage() {
  const comments = useLoaderData();
  const error = useRouteError();
  const navigate = useNavigate();
  // Filter clientside instead of filtering what is selected server side. What was I thinking... ?
  const [query, setQuery] = useState('');

  const filteredComments = comments.filter((comment) => {
    // text, owner.isAdmin, owner.isBanned, owner.name, etc.
    const { name } = comment.owner;
    const text = comment.text.toLowerCase();
    const queryStr = query.toLowerCase();
    return text.includes(queryStr) || name.toLowerCase().includes(queryStr);
  });

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
        <CommentsList
          comments={filteredComments}
          onReply={() => navigate('/comments')}
          onDelete={() => navigate('/comments')}
        />
        {error && <p>{error.message}</p>}
      </div>
    </>
  );
}
