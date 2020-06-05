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
    geo?: {
      lat?: string;
      lng?: string;
    };
  };
  phone?: string;
  website?: string;
  company?: {
    name?: string;
    catchPhrase?: string;
    bs?: string;
  };
}

export const userDataValidation = (values: User): ErrorInterface => {
  const errors: any = {};
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
    errors.address.street = 'Required';
  }
  if (!values.address.suite) {
    errors.address.suite = 'Required';
  }
  if (!values.address.city) {
    errors.address.city = 'Required';
  }
  if (!values.address.zipcode) {
    errors.address.zipcode = 'Required';
  }
  if (!values.address.geo.lat) {
    errors.address.geo.lat = 'Required';
  }
  if (!values.address.geo.lng) {
    errors.address.geo.lng = 'Required';
  }
  if (!values.phone) {
    errors.phone = 'Required';
  }
  if (!values.website) {
    errors.website = 'Required';
  }
  if (!values.company.name) {
    errors.company.name = 'Required';
  }
  if (!values.company.catchPhrase) {
    errors.company.catchPhrase = 'Required';
  }
  if (!values.company.bs) {
    errors.company.bs = 'Required';
  }
  return errors;
};
