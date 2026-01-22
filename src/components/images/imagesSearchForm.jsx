import {
  Form,
  FormFieldsetGrid,
  FormRow,
  FormButtons,
} from '../styles/searchForm';
import { GeneralButton } from '../styles/buttons';

export default function ImagesSearchForm({ onSubmit = () => {} }) {
  return (
    <Form onSubmit={onSubmit}>
      <FormFieldsetGrid>
        <legend>Search</legend>
        <FormRow>
          Display Name:
          <input type="text" name="displayName" />
        </FormRow>
        <FormRow>
          Alt Text:
          <input type="text" name="altText" />
        </FormRow>
        <FormRow>
          From date:
          <input type="date" name="fromUpdatedDate" />
        </FormRow>
        <FormRow>
          To date:
          <input type="date" name="toUpdatedDate" />
        </FormRow>
      </FormFieldsetGrid>
      <FormFieldsetGrid>
        <legend>Sort</legend>
        <FormRow>
          Sort by:
          <select name="orderBy" defaultValue="displayName">
            <option value="displayName">Display name</option>
            <option value="altText">Alt text</option>
            <option value="createdAt">Created date</option>
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
