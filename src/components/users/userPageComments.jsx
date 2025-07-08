import { MarginFixedTable } from '../styles/tables';
import PageNav from '../pageNav';
import dateTimeFormatter from '../../ext/dateTimeFormatter';
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
        <>
          <MarginFixedTable>
            <thead>
              <tr>
                <th>Comment</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {comments
                .filter(
                  (comment, index) => index >= firstIndex && index <= lastIndex,
                )
                .map((comment) => (
                  <tr key={comment.id}>
                    <td>
                      <Link to={`/comments/${comment.id}`}>{comment.text}</Link>
                    </td>
                    <td>
                      {dateTimeFormatter.format(new Date(comment.createdAt))}
                    </td>
                  </tr>
                ))}
            </tbody>
          </MarginFixedTable>
          <PageNav
            currentPageNumber={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
            atLastPage={atLastPage}
          />
        </>
      ) : (
        <p>This user has not made any comments.</p>
      )}
    </section>
  );
}
