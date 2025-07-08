import UnstyledList from '../unstyledList';
import LineSeparatedListItem from '../lineSeparatedListItem';
import CommentsListComment from './commentsListComment';
import { useState } from 'react';

export default function CommentsList({
  comments,
  onReply,
  onDelete,
  createParentCommentLink,
}) {
  const [activeCommentId, setActiveCommentId] = useState(null);
  return (
    <>
      {comments?.length > 0 ? (
        <UnstyledList>
          {comments.map((comment) => (
            <LineSeparatedListItem key={comment.id}>
              <CommentsListComment
                comment={comment}
                createParentCommentLink={createParentCommentLink}
                isActiveComment={comment.id === activeCommentId}
                setActiveComment={(c) => setActiveCommentId(c?.id)}
                onReply={onReply}
                onDelete={onDelete}
              />
            </LineSeparatedListItem>
          ))}
        </UnstyledList>
      ) : (
        <p>No comments found.</p>
      )}
    </>
  );
}
