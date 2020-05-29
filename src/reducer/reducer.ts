import { User, ActionTypes } from '../actions';

interface StateInterface {
  users: User[];
  loaderStatus: string;
}

const initialState: StateInterface = { users: [], loaderStatus: 'init' };

export const reducer = (state = initialState, action: any): StateInterface => {
  switch (action.type) {
    case ActionTypes.fetchUsers:
      return {
        ...state,
        users: action.payload.users,
      };
    default:
      return state;
  }
};
