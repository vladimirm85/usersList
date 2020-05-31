import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Dispatch, bindActionCreators } from 'redux';
import { User as UserInterface, StoreInterface } from '../reducer';
import { handleDeleteUser } from '../actions';

interface MapStateToPropsType {
  users: UserInterface[];
  loaderStatus: string;
}

interface MapDispatchToPropsType {
  handleDeleteUser: typeof handleDeleteUser;
}

type UserProps = MapStateToPropsType &
  MapDispatchToPropsType &
  RouteComponentProps;

const _User: React.FC<UserProps> = (props: UserProps): JSX.Element => {
  const { users, loaderStatus, handleDeleteUser, match } = props;
  const userId = parseInt(match.url.slice(1));
  const [user, setUser] = React.useState<UserInterface | undefined>(undefined);

  React.useEffect(() => {
    const userIndex = users.findIndex((user) => user.id === userId);
    userIndex === -1 ? console.log('fetchUser') : setUser(users[userIndex]);
  }, [userId, users]);

  return <div>{!user ? <div>404</div> : <div>{user.name}</div>}</div>;
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

export const User = connect(mapStateToProps, mapDispatchToProps)(_User);
