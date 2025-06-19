import formToFields from '../../ext/formToFields';
import { useSearchParams } from 'react-router';

export default function BlogsSearchForm() {
  const [, setSearchParams] = useSearchParams();

  function handleForm(event) {
    event.preventDefault();
    const formFields = formToFields(event.target);
    // Make sure we land on the first page of results, otherwise
    // could end up on a non-existent second page with no results.
    setSearchParams({ ...formFields, page: 1 });
  }

  return (
    <form onSubmit={handleForm}>
      <fieldset>
        <legend>Search</legend>
        <label>
          Author:
          <input type="text" name="author" />
        </label>
        <label>
          Title:
          <input type="text" name="title" />
        </label>
        <label>
          Body:
          <input type="text" name="body" />
        </label>
        <label>
          From date:
          <input type="date" name="fromDate" />
        </label>
        <label>
          To date:
          <input type="date" name="toDate" />
        </label>
        <label>
          Only Unpublished?
          <input type="checkbox" name="onlyUnpublished" />
        </label>
      </fieldset>
      <fieldset>
        <legend>Sort</legend>
        <label>
          Sort by:
          <select name="orderBy" defaultValue="publishedAt">
            <option value="owner.name">Author</option>
            <option value="body">Body text</option>
            <option value="publishedAt">Publication date</option>
            <option value="title">Title text</option>
          </select>
        </label>
        <label>
          Sort order:
          <select name="sortOrder" defaultValue="desc">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </fieldset>
      <button type="reset">Clear Filters</button>
      <button type="submit">Search</button>
    </form>
  );
}
