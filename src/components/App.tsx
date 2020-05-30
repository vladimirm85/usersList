import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
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

type AppProps = MapStateToPropsType & MapDispatchToPropsType;

const _App: React.FC<AppProps> = (props: AppProps): JSX.Element => {
  const { users, loaderStatus, handleFetchUsers, handleDeleteUser } = props;

  React.useEffect(() => {
    handleFetchUsers();
  }, [handleFetchUsers]);

  const usersElement = users.map((user: User) => (
    <div key={user.id} onClick={() => user.id && handleDeleteUser(user.id)}>
      {user.name}
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

export const App = connect(mapStateToProps, mapDispatchToProps)(_App);
