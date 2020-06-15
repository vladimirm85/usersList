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

  // const addUser = () => {
  //   users.forEach((user) => {
  //     const UserDefaultData = {
  //       name: user.name,
  //       username: user.username,
  //       email: user.email,
  //       address: {
  //         street: user.address.street,
  //         suite: user.address.suite,
  //         city: user.address.city,
  //         zipcode: user.address.zipcode,
  //       },
  //       phone: user.phone,
  //       website: user.website,
  //       company: {
  //         name: user.company.name,
  //         catchPhrase: user.company.catchPhrase,
  //       },
  //     };
  //     dataBase
  //       .collection('users')
  //       .add(UserDefaultData)
  //       .then((resp) => resp.get().then((resp) => console.log(resp.data())));
  //   });
  // };

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
