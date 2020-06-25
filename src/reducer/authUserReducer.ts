import { ActionTypes, Action } from '../actions';

export interface AuthUser {
  displayName: string;
  photoUrl: string;
  id: string;
}

export interface AuthUserStateInterface {
  authUser: AuthUser;
}

const initialState: AuthUserStateInterface = {
  authUser: {
    displayName: '',
    photoUrl: '',
    id: '',
  },
};

export const authUserReducer = (
  state = initialState,
  action: Action
): AuthUserStateInterface => {
  switch (action.type) {
    case ActionTypes.fetchAuthUser:
      return {
        ...state,
        authUser: action.payload.authUser,
      };
    default:
      return state;
  }
};
