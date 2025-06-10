import formToFields from '../../ext/formToFields';
import { useSearchParams } from 'react-router';

export default function BlogsSearchForm() {
  const [, setSearchParams] = useSearchParams();

  function handleForm(event) {
    event.preventDefault();
    const formFields = formToFields(event.target);
    // Make sure we land on the first page of results, otherwise
    // could end up on a non-existent second page with no results.
    if (formFields.publishedAt) {
      formFields.publishedAt = null;
    }
    setSearchParams({ ...formFields, page: 1 });
  }

  return (
    <form onSubmit={handleForm}>
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
        <input type="checkbox" name="publishedAt" />
      </label>
      <button type="reset">Clear Filters</button>
      <button type="submit">Search</button>
    </form>
  );
}
