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
      <button type="submit">Search</button>
    </form>
  );
}
