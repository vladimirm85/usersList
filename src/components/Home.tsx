import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { User, AuthUser, StoreInterface } from '../reducer';
import { handleDeleteUser } from '../actions';
import { UsersTable } from './UsersTable';

interface MapStateToPropsType {
  users: User[];
  authUser: AuthUser;
}

interface MapDispatchToPropsType {
  handleDeleteUser: typeof handleDeleteUser;
}

type HomeProps = MapStateToPropsType & MapDispatchToPropsType;

const _Home: React.FC<HomeProps> = (props: HomeProps): JSX.Element => {
  const { users, authUser, handleDeleteUser } = props;

  return (
    <div>
      <h1>Users:</h1>
      {authUser.id ? (
        <UsersTable users={users} handleDeleteUser={handleDeleteUser} />
      ) : (
        <Redirect to="/signin" />
      )}
    </div>
  );
};

const mapStateToProps = ({
  usersReducer,
  authUserReducer,
}: StoreInterface): MapStateToPropsType => {
  return {
    users: usersReducer.users,
    authUser: authUserReducer.authUser,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType =>
  bindActionCreators({ handleDeleteUser }, dispatch);

export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home);
