import React from 'react';
import { TextField } from 'mui-rff';

export interface UserForm {
  size: number;
  field: JSX.Element;
}

export const userFormFields: UserForm[] = [
  {
    size: 4,
    field: <h3>Name</h3>,
  },
  {
    size: 8,
    field: <TextField name="name" margin="none" required={true} />,
  },
  {
    size: 4,
    field: <h3>Username</h3>,
  },
  {
    size: 8,
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
    size: 4,
    field: <h3>Email</h3>,
  },
  {
    size: 8,
    field: (
      <TextField label="Email" name="email" margin="none" required={true} />
    ),
  },
  {
    size: 12,
    field: <h3>Address</h3>,
  },
  {
    size: 1,
    field: <div></div>,
  },
  {
    size: 3,
    field: <h3>Street</h3>,
  },
  {
    size: 8,
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
    size: 1,
    field: <div></div>,
  },
  {
    size: 3,
    field: <h3>Suite</h3>,
  },
  {
    size: 8,
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
    size: 1,
    field: <div></div>,
  },
  {
    size: 3,
    field: <h3>City</h3>,
  },
  {
    size: 8,
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
    size: 1,
    field: <div></div>,
  },
  {
    size: 3,
    field: <h3>Zipcode</h3>,
  },
  {
    size: 8,
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
    size: 4,
    field: <h3>Website</h3>,
  },
  {
    size: 8,
    field: (
      <TextField label="Website" name="website" margin="none" required={true} />
    ),
  },
  {
    size: 12,
    field: <h3>Company</h3>,
  },
  {
    size: 1,
    field: <div></div>,
  },
  {
    size: 3,
    field: <h3>Name</h3>,
  },
  {
    size: 8,
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
    size: 1,
    field: <div></div>,
  },
  {
    size: 3,
    field: <h3>Catchphrase</h3>,
  },
  {
    size: 8,
    field: (
      <TextField
        label="Catch Phrase"
        name="company.catchPhrase"
        margin="none"
        required={true}
      />
    ),
  },
  {
    size: 1,
    field: <div></div>,
  },
  {
    size: 3,
    field: <h3>BS</h3>,
  },
  {
    size: 8,
    field: (
      <TextField label="BS" name="company.bs" margin="none" required={true} />
    ),
  },
];
