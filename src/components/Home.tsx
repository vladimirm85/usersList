import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { User, StoreInterface } from '../reducer';
import { handleFetchUsers, handleDeleteUser } from '../actions';

interface MapStateToPropsType {
  users: User[];
  loaderStatus: string;
}

interface MapDispatchToPropsType {
  handleFetchUsers: typeof handleFetchUsers;
  handleDeleteUser: typeof handleDeleteUser;
}

type HomeProps = MapStateToPropsType & MapDispatchToPropsType;

const _Home: React.FC<HomeProps> = (props: HomeProps): JSX.Element => {
  const { users, loaderStatus, handleFetchUsers, handleDeleteUser } = props;

  React.useEffect(() => {
    handleFetchUsers();
  }, [handleFetchUsers]);

  const usersElement = users.map((user: User) => (
    <div key={user.id} onClick={() => user.id && handleDeleteUser(user.id)}>
      <Link to={`/${user.id}`}>{user.name}</Link>
    </div>
  ));

  return (
    <div>
      <h1>Users:</h1>
      {loaderStatus === 'pending' ? <div>Loading</div> : usersElement}
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
  bindActionCreators({ handleFetchUsers, handleDeleteUser }, dispatch);

export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home);
