import React from 'react';
import { TextField } from 'mui-rff';

export interface UserForm {
  size: number;
  field: JSX.Element;
}

export const userFormFields: UserForm[] = [
  {
    size: 12,
    field: <h3>User Data:</h3>,
  },
  {
    size: 6,
    field: <TextField label="Name" name="name" margin="none" required={true} />,
  },
  {
    size: 6,
    field: (
      <TextField
        label="Username"
        name="username"
        margin="none"
        required={true}
      />
    ),
  },
  {
    size: 12,
    field: (
      <TextField label="Email" name="email" margin="none" required={true} />
    ),
  },
  {
    size: 12,
    field: <h3>Address</h3>,
  },
  {
    size: 6,
    field: (
      <TextField
        label="Street"
        name="address.street"
        margin="none"
        required={true}
      />
    ),
  },
  {
    size: 6,
    field: (
      <TextField
        label="Suite"
        name="address.suite"
        margin="none"
        required={true}
      />
    ),
  },
  {
    size: 6,
    field: (
      <TextField
        label="City"
        name="address.city"
        margin="none"
        required={true}
      />
    ),
  },
  {
    size: 6,
    field: (
      <TextField
        label="Zipcode"
        name="address.zipcode"
        margin="none"
        required={true}
      />
    ),
  },
  {
    size: 12,
    field: (
      <TextField label="Phone" name="phone" margin="none" required={true} />
    ),
  },
  {
    size: 12,
    field: (
      <TextField label="Website" name="website" margin="none" required={true} />
    ),
  },
  {
    size: 12,
    field: <h3>Company</h3>,
  },
  {
    size: 12,
    field: (
      <TextField
        label="Name"
        name="company.name"
        margin="none"
        required={true}
      />
    ),
  },
  {
    size: 12,
    field: (
      <TextField
        label="Catch Phrase"
        name="company.catchPhrase"
        margin="none"
        required={true}
      />
    ),
  },
];
