import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Form } from 'react-final-form';
import { RouteComponentProps } from 'react-router-dom';
import { Paper, Grid, Button } from '@material-ui/core';
import { handleUpdateUser, handleAddUser } from '../actions';
import { userFormFields, UserForm } from '../helpers/userFormFields';
import { UserDefaultData } from '../helpers/userDefaultData';
import { userDataValidation } from '../helpers/userDataValidation';
import { User, StoreInterface } from '../reducer';

interface MapStateToPropsType {
  users: User[];
}

interface MapDispatchToPropsType {
  handleUpdateUser: typeof handleUpdateUser;
  handleAddUser: typeof handleAddUser;
}

type _UserDataHandling = MapStateToPropsType &
  MapDispatchToPropsType &
  RouteComponentProps;

const _UserDataHandling: React.FC<_UserDataHandling> = (
  props: _UserDataHandling
): JSX.Element => {
  const { users, match, handleUpdateUser, handleAddUser } = props;
  let initialUserData: User = UserDefaultData;
  if (match.url !== '/add') {
    const userId = parseInt(match.url.slice(6));
    const user = users.find((user: User) => user.id === userId);
    user && (initialUserData = user);
  }

  const onSubmit = (user: User) => {
    match.url === '/add' ? handleAddUser(user) : handleUpdateUser(user);
  };

  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <Form
        onSubmit={onSubmit}
        initialValues={initialUserData}
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
                    {match.url === '/add' ? 'Add User' : 'Update User'}
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

const mapStateToProps = ({
  usersReducer,
}: StoreInterface): MapStateToPropsType => {
  return {
    users: usersReducer.users,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType =>
  bindActionCreators({ handleUpdateUser, handleAddUser }, dispatch);

export const UserDataHandling = connect(
  mapStateToProps,
  mapDispatchToProps
)(_UserDataHandling);
