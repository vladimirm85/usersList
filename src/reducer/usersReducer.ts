import { ActionTypes, Action } from '../actions';

export interface User {
  id?: string;
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
  };
}

export interface UsersStateInterface {
  users: User[];
}

const initialState: UsersStateInterface = {
  users: [],
};

export const usersReducer = (
  state = initialState,
  action: Action
): UsersStateInterface => {
  switch (action.type) {
    case ActionTypes.fetchUsers:
      return {
        ...state,
        users: action.payload.users,
      };
    case ActionTypes.addUser:
      return {
        ...state,
        users: [...state.users, action.payload.user],
      };
    case ActionTypes.updateUser:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id !== action.payload.user.id
            ? { ...user }
            : { ...action.payload.user }
        ),
      };
    case ActionTypes.deleteUser:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload.id),
      };
    default:
      return state;
  }
};
