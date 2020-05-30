import { ActionTypes } from '../actions';

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

export const reducer = (state = initialState, action: any): StateInterface => {
  switch (action.type) {
    case ActionTypes.requestFetchUsersSuccess:
      return {
        ...state,
        users: action.payload.users,
      };
    default:
      return state;
  }
};
