import {
  Form,
  FormFieldsetGrid,
  FormRow,
  FormButtons,
} from '../styles/searchForm';
import { GeneralButton } from '../styles/buttons';
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
    <Form onSubmit={handleForm}>
      <FormFieldsetGrid>
        <legend>Search</legend>
        <FormRow>
          Author:
          <input type="text" name="author" />
        </FormRow>
        <FormRow>
          Blog title:
          <input type="text" name="blog.title" />
        </FormRow>
        <FormRow>
          Text:
          <input type="text" name="text" />
        </FormRow>
        <FormRow>
          From date:
          <input type="date" name="fromDate" />
        </FormRow>
        <FormRow>
          To date:
          <input type="date" name="toDate" />
        </FormRow>
      </FormFieldsetGrid>
      <FormFieldsetGrid>
        <legend>Sort</legend>
        <FormRow>
          Sort by:
          <select name="orderBy" defaultValue="createdAt">
            <option value="owner.name">Author</option>
            <option value="createdAt">Date</option>
          </select>
        </FormRow>
        <FormRow>
          Sort order:
          <select name="sortOrder" defaultValue="desc">
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
