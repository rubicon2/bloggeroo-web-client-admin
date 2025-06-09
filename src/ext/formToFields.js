import iteratorToObj from './iteratorToObj';

export default function formToFields(eventTarget) {
  const formData = new FormData(eventTarget);
  const formFields = iteratorToObj(formData);
  // Filter out empty fields.
  for (const key in formFields) {
    if (formFields[key].length === 0) delete formFields[key];
  }
  return formFields;
}
