import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { User, StoreInterface } from '../reducer';
import { fetchUsers } from '../actions';

interface MapStateToPropsType {
  users: User[];
  loaderStatus: string;
}

interface MapDispatchToPropsType {
  fetchUsers: typeof fetchUsers;
}

type AppProps = MapStateToPropsType & MapDispatchToPropsType;

const _App: React.FC<AppProps> = (props: AppProps): JSX.Element => {
  const { users, loaderStatus, fetchUsers } = props;

  React.useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div>
      <div onClick={() => console.log(props)}>LogProps</div>
      {loaderStatus === 'pending' ? (
        <div>Loading</div>
      ) : (
        users.map((user: any) => <div key={user.id}>{user.name}</div>)
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
  bindActionCreators({ fetchUsers }, dispatch);

export const App = connect(mapStateToProps, mapDispatchToProps)(_App);
