import { ActionTypes, Action } from '../actions';

export interface User {
  id?: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface StateInterface {
  users: User[];
  loaderStatus: string;
}

const initialState: StateInterface = { users: [], loaderStatus: 'init' };

export const reducer = (
  state = initialState,
  action: Action
): StateInterface => {
  switch (action.type) {
    case ActionTypes.requestApi:
      return {
        ...state,
        loaderStatus: 'pending',
      };
    case ActionTypes.fetchUsers:
      return {
        ...state,
        users: action.payload.users,
        loaderStatus: 'ready',
      };
    case ActionTypes.deleteUser:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload.id),
        loaderStatus: 'ready',
      };
    case ActionTypes.requestFailed:
      return {
        ...state,
        loaderStatus: 'ready',
      };
    default:
      return state;
  }
};
