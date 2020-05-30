import React from 'react';
import { connect } from 'react-redux';
import { User } from '../reducer';
import { fetchUsers } from '../actions';

interface AppProps {}

const App /* : React.FC<AppProps> */ = (props: any): JSX.Element => {
  React.useEffect(() => {
    props.dispatch(fetchUsers());
  }, []);
  return (
    <div>
      <div onClick={() => console.log(props)}>LogProps</div>
      {props.users.map((user: any) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};

export default connect((state) => {
  console.log(state);
  return state;
})(App);
