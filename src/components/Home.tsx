import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { User, StoreInterface } from '../reducer';
import { handleDeleteUser } from '../actions';
import { UsersTable } from './UsersTable';

interface MapStateToPropsType {
  users: User[];
  loaderStatus: string;
}

interface MapDispatchToPropsType {
  handleDeleteUser: typeof handleDeleteUser;
}

type HomeProps = MapStateToPropsType & MapDispatchToPropsType;

const _Home: React.FC<HomeProps> = (props: HomeProps): JSX.Element => {
  const { users, loaderStatus, handleDeleteUser } = props;
  const usersElement = users.map((user: User) => (
    <div key={user.id}>
      <Link to={`/${user.id}`}>{user.name}</Link>
    </div>
  ));

  return (
    <div>
      <h1>Users:</h1>
      {loaderStatus === 'pending' ? (
        <div>Loading</div>
      ) : (
        <UsersTable users={users} />
      )}
    </div>
  );
};

const mapStateToProps = ({
  usersReducer,
}: StoreInterface): MapStateToPropsType => {
  return {
    users: usersReducer.users,
    loaderStatus: usersReducer.loaderStatus,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType =>
  bindActionCreators({ handleDeleteUser }, dispatch);

export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home);
