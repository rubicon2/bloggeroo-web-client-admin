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
      <label>
        Author:
        <input type="text" name="author" />
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
      <button type="submit">Search</button>
    </form>
  );
}
