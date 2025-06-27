import {
  Form,
  FormFieldsetGrid,
  FormRow,
  FormButtons,
} from '../styles/searchForm';
import { GeneralButton } from '../styles/buttons';
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
    <Form onSubmit={handleForm}>
      <FormFieldsetGrid>
        <legend>Search</legend>
        <FormRow>
          Name:
          <input type="text" name="name" />
        </FormRow>
        <FormRow>
          Email:
          <input type="text" name="email" />
        </FormRow>
        <FormRow>
          Only Admins?
          <input type="checkbox" name="isAdmin" />
        </FormRow>
        <FormRow>
          Only Banned?
          <input type="checkbox" name="isBanned" />
        </FormRow>
      </FormFieldsetGrid>
      <FormFieldsetGrid>
        <legend>Sort</legend>
        <FormRow>
          Sort by:
          <select name="orderBy" defaultValue="email">
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="createdAt">Joined date</option>
            <option value="updatedAt">Updated date</option>
          </select>
        </FormRow>
        <FormRow>
          Sort order:
          <select name="sortOrder" defaultValue="asc">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </FormRow>
      </FormFieldsetGrid>
      <FormButtons>
        <GeneralButton type="reset">Clear Filters</GeneralButton>
        <GeneralButton type="submit">Search</GeneralButton>
      </FormButtons>
    </Form>
  );
}
