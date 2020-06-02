import React from 'react';
import { Form } from 'react-final-form';
import { Paper, Grid, Button } from '@material-ui/core';
import { userFormFields, UserForm } from '../helpers/userFormFields';
import { UserDefaultData } from '../helpers/userDefaultData';
import { userDataValidation, UserData } from '../helpers/userDataValidation';
import { User } from '../reducer';

const onSubmit = (props: UserData) => {
  window.alert('sa');
  console.log(props);
};

interface UseDataHandlingProps {
  user: User;
}

export const UseDataHandling = (props: any) => {
  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <Form
        onSubmit={onSubmit}
        initialValues={UserDefaultData}
        validate={userDataValidation}
        render={({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                {userFormFields.map((item: UserForm, idx) => (
                  <Grid item xs={item.size as 1} key={idx}>
                    {item.field}
                  </Grid>
                ))}
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </form>
        )}
      />
    </div>
  );
};
