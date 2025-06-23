import formToFields from '../../ext/formToFields';
import { useSearchParams } from 'react-router';

export default function CommentsSearchForm() {
  const [, setSearchParams] = useSearchParams();

  function handleForm(event) {
    event.preventDefault();
    const formFields = formToFields(event.target);
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
          Blog title:
          <input type="text" name="blog.title" />
        </label>
        <label>
          Text:
          <input type="text" name="text" />
        </label>
        <label>
          From date:
          <input type="date" name="fromDate" />
        </label>
        <label>
          To date:
          <input type="date" name="toDate" />
        </label>
      </fieldset>
      <fieldset>
        <legend>Sort</legend>
        <label>
          Sort by:
          <select name="orderBy" defaultValue="createdAt">
            <option value="owner.name">Author</option>
            <option value="createdAt">Date</option>
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
