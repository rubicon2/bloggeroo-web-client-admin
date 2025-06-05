import PageNav from '../pageNav';
import { Link } from 'react-router';
import { useState } from 'react';

export default function UserPageComments({
  comments,
  commentsPerPage = 5,
  defaultPage = 1,
}) {
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const firstIndex = (currentPage - 1) * commentsPerPage;
  const lastIndex = firstIndex + commentsPerPage - 1;
  const atLastPage = lastIndex >= comments.length - 1;

  return (
    <section>
      <h3>Comments</h3>
      {comments?.length > 0 ? (
        <div>
          <ul>
            {comments
              .filter(
                (comment, index) => index >= firstIndex && index <= lastIndex,
              )
              .map((comment) => (
                <Link to={`/comments/${comment.id}`}>
                  <li>
                    <Link to={`/blogs/${comment.blogId}`}>For this blog</Link>
                    <div>{comment.createdAt}</div>
                    <div>{comment.text}</div>
                  </li>
                </Link>
              ))}
          </ul>
          <PageNav
            currentPageNumber={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
            atLastPage={atLastPage}
          />
        </div>
      ) : (
        <p>This user has not made any comments.</p>
      )}
    </section>
  );
}
