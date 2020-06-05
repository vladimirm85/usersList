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
    geo: {
      lat: string;
      lng: string;
    };
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
  isLoading: boolean;
}

const initialState: StateInterface = { users: [], isLoading: true };

export const reducer = (
  state = initialState,
  action: Action
): StateInterface => {
  switch (action.type) {
    case ActionTypes.requestApi:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.fetchUsers:
      return {
        ...state,
        users: action.payload.users,
        isLoading: false,
      };
    case ActionTypes.addUser:
      return {
        ...state,
        users: [...state.users, action.payload.user],
        isLoading: false,
      };
    case ActionTypes.updateUser:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id !== action.payload.user.id
            ? { ...user }
            : { ...action.payload.user }
        ),
        isLoading: false,
      };
    case ActionTypes.deleteUser:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload.id),
        isLoading: false,
      };
    case ActionTypes.requestFailed:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
