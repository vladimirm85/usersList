import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { User, StoreInterface } from '../reducer';
import { handleDeleteUser } from '../actions';
import { UsersTable } from './UsersTable';

interface MapStateToPropsType {
  users: User[];
}

interface MapDispatchToPropsType {
  handleDeleteUser: typeof handleDeleteUser;
}

type HomeProps = MapStateToPropsType & MapDispatchToPropsType;

const _Home: React.FC<HomeProps> = (props: HomeProps): JSX.Element => {
  const { users, handleDeleteUser } = props;

  return (
    <div>
      <h1>Users:</h1>
      <UsersTable users={users} handleDeleteUser={handleDeleteUser} />
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
  bindActionCreators({ handleDeleteUser }, dispatch);

export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home);
