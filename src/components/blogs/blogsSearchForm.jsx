import {
  Form,
  FormFieldsetGrid,
  FormRow,
  FormButtons,
} from '../styles/searchForm';
import { GeneralButton } from '../styles/buttons';
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
    <Form onSubmit={handleForm}>
      <FormFieldsetGrid>
        <legend>Search</legend>
        <FormRow>
          Author:
          <input type="text" name="author" />
        </FormRow>
        <FormRow>
          Title:
          <input type="text" name="title" />
        </FormRow>
        <FormRow>
          Body:
          <input type="text" name="body" />
        </FormRow>
        <FormRow>
          From date:
          <input type="date" name="fromDate" />
        </FormRow>
        <FormRow>
          To date:
          <input type="date" name="toDate" />
        </FormRow>
        <FormRow>
          Only Unpublished?
          <input type="checkbox" name="onlyUnpublished" />
        </FormRow>
      </FormFieldsetGrid>
      <FormFieldsetGrid>
        <legend>Sort</legend>
        <FormRow>
          Sort by:
          <select name="orderBy" defaultValue="publishedAt">
            <option value="owner.name">Author</option>
            <option value="body">Body text</option>
            <option value="publishedAt">Publication date</option>
            <option value="title">Title text</option>
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
