import CommentsList from './commentsList';
import useComments from '../../hooks/useComments';
import { useState } from 'react';

export default function CommentsPage() {
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
