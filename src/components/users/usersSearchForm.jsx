import formToFields from '../../ext/formToFields';
import { useSearchParams } from 'react-router';

export default function UsersSearchForm() {
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
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          Email:
          <input type="text" name="email" />
        </label>
        <label>
          Only Admins?
          <input type="checkbox" name="isAdmin" />
        </label>
        <label>
          Only Banned?
          <input type="checkbox" name="isBanned" />
        </label>
      </fieldset>
      <fieldset>
        <legend>Sort</legend>
        <label>
          Sort by:
          <select name="orderBy" defaultValue="email">
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="createdAt">Joined date</option>
            <option value="updatedAt">Updated date</option>
          </select>
        </label>
        <label>
          Sort order:
          <select name="sortOrder" defaultValue="asc">
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
