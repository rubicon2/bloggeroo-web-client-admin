import CommentsListComment from './commentsListComment';
import { useState } from 'react';

export default function CommentsList({ comments }) {
  const [activeCommentId, setActiveCommentId] = useState(null);
  return (
    <>
      {comments?.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <CommentsListComment
                comment={comment}
                isActiveComment={comment.id === activeCommentId}
                setActiveComment={(c) => setActiveCommentId(c?.id)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>There are no comments.</p>
      )}
    </>
  );
}
