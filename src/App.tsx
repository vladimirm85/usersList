import React from 'react';
import { connect } from 'react-redux';
import { User } from './actions';
import API from './api';

interface AppProps {}

const initialState: User[] = [];

const App /* : React.FC<AppProps> */ = (props: any): JSX.Element => {
  const [users, setUser] = React.useState(initialState);
  React.useEffect(() => {
    console.log('effect');

    API.get('')
      .then((users) => {
        console.log(users.data);
        setUser(users.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <div onClick={() => console.log(props)}>log</div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};

export default connect((state) => {
  console.log(state);
  return state;
})(App);
