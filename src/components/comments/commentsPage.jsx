import CommentsList from './commentsList';
import PageNav from '../pageNav';
import useRefresh from '../../hooks/useRefresh';
import useSearchParamsPageNumber from '../../hooks/useSearchParamsPageNumber';
import { useLoaderData, useRouteError } from 'react-router';
import { useState } from 'react';

export default function CommentsPage() {
  const { comments, atLastPage } = useLoaderData();
  const error = useRouteError();
  const refresh = useRefresh();
  // Filter clientside instead of filtering what is selected server side. What was I thinking... ?
  const [query, setQuery] = useState('');
  const [currentPageNumber, setCurrentPageNumber] = useSearchParamsPageNumber();

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
          onReply={refresh}
          onDelete={refresh}
        />
        {error && <p>{error.message}</p>}
      </div>
      <PageNav
        currentPageNumber={currentPageNumber}
        onPageChange={setCurrentPageNumber}
        atLastPage={atLastPage}
      />
    </>
  );
}
