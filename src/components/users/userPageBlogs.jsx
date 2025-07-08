import PageNav from '../pageNav';
import { MarginFixedTable } from '../styles/tables';
import dateTimeFormatter from '../../ext/dateTimeFormatter';
import { Link } from 'react-router';
import { useState } from 'react';

export default function UserPageBlogs({
  blogs,
  blogsPerPage = 5,
  defaultPage = 1,
}) {
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const firstIndex = (currentPage - 1) * blogsPerPage;
  const lastIndex = firstIndex + blogsPerPage - 1;
  const atLastPage = lastIndex >= blogs.length - 1;

  return (
    <section>
      <h3>Blogs</h3>
      {blogs?.length > 0 ? (
        <>
          <MarginFixedTable>
            <thead>
              <tr>
                <th>Title</th>
                <th>Published Date</th>
                <th>Created Date</th>
              </tr>
            </thead>
            <tbody>
              {blogs
                .filter(
                  (blog, index) => index >= firstIndex && index <= lastIndex,
                )
                .map((blog) => (
                  <tr key={blog.id}>
                    <td>
                      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </td>
                    <td>
                      {blog.publishedAt
                        ? dateTimeFormatter.format(new Date(blog.publishedAt))
                        : 'Never'}
                    </td>
                    <td>
                      {dateTimeFormatter.format(new Date(blog.createdAt))}
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
        <p>This user has not made any blogs.</p>
      )}
    </section>
  );
}
