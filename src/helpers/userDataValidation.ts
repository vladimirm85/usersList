import { User } from '../reducer';

interface ErrorInterface {
  name?: string;
  username?: string;
  email?: string;
  address?: {
    street?: string;
    suite?: string;
    city?: string;
    zipcode?: string;
  };
  phone?: string;
  website?: string;
  company?: {
    name?: string;
    catchPhrase?: string;
  };
}

export const userDataValidation = (values: User) => {
  const errors: ErrorInterface = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  if (!values.username) {
    errors.username = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.address.street) {
    errors.address && (errors.address.street = 'Required');
  }
  if (!values.address.suite) {
    errors.address && (errors.address.suite = 'Required');
  }
  if (!values.address.city) {
    errors.address && (errors.address.city = 'Required');
  }
  if (!values.address.zipcode) {
    errors.address && (errors.address.zipcode = 'Required');
  }
  if (!values.phone) {
    errors.phone = 'Required';
  }
  if (!values.website) {
    errors.website = 'Required';
  }
  if (!values.company.name) {
    errors.company && (errors.company.name = 'Required');
  }
  if (!values.company.catchPhrase) {
    errors.company && (errors.company.catchPhrase = 'Required');
  }
  return errors;
};
