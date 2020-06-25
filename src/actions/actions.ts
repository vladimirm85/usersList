import { ActionTypes } from './types';
import { User, AuthUser } from '../reducer';

export interface RequestApi {
  type: ActionTypes.requestApi;
}

export const requestApi = (): RequestApi => ({
  type: ActionTypes.requestApi,
});

export interface RequestSuccess {
  type: ActionTypes.requestSuccess;
}

export const requestSuccess = (): RequestSuccess => ({
  type: ActionTypes.requestSuccess,
});

export interface RequestFailed {
  type: ActionTypes.requestFailed;
  payload: {
    requestError: Error;
  };
}

export const requestFailed = (requestError: Error): RequestFailed => ({
  type: ActionTypes.requestFailed,
  payload: {
    requestError,
  },
});

export interface FetchAuthUser {
  type: ActionTypes.fetchAuthUser;
  payload: {
    authUser: AuthUser;
  };
}

export interface SignData {
  email: string;
  password: string;
}

export interface SignWithEmailAndPassword {
  type: ActionTypes.signUpAuthUser;
  payload: {
    signData: SignData;
  };
}

export const signUpAuthUser = (signData: SignData) => ({
  type: ActionTypes.signUpAuthUser,
  payload: {
    signData,
  },
});

export const signInAuthUser = (signData: SignData) => ({
  type: ActionTypes.signInAuthUser,
  payload: {
    signData,
  },
});

export const signOutAuthUser = () => ({
  type: ActionTypes.signOutAuthUser,
});

export const fetchAuthUser = (authUser: AuthUser): FetchAuthUser => ({
  type: ActionTypes.fetchAuthUser,
  payload: {
    authUser,
  },
});

export interface FetchUsers {
  type: ActionTypes.fetchUsers;
  payload: {
    users: User[];
  };
}

export const fetchUsers = (users: User[]): FetchUsers => ({
  type: ActionTypes.fetchUsers,
  payload: {
    users,
  },
});

export const handleFetchUsers = () => ({
  type: ActionTypes.handleFetchUsers,
});

export interface AddUser {
  type: ActionTypes.addUser;
  payload: {
    user: User;
  };
}

export const addUser = (user: User): AddUser => ({
  type: ActionTypes.addUser,
  payload: {
    user,
  },
});

export const handleAddUser = (user: User) => ({
  type: ActionTypes.handleAddUser,
  payload: {
    user,
  },
});

export interface DeleteUser {
  type: ActionTypes.deleteUser;
  payload: {
    id: string;
  };
}

export const deleteUser = (id: string): DeleteUser => ({
  type: ActionTypes.deleteUser,
  payload: {
    id,
  },
});

export const handleDeleteUser = (id: string) => ({
  type: ActionTypes.handleDeleteUser,
  payload: {
    id,
  },
});

export interface UpdateUser {
  type: ActionTypes.updateUser;
  payload: {
    user: User;
  };
}

export const updateUser = (user: User): UpdateUser => ({
  type: ActionTypes.updateUser,
  payload: {
    user,
  },
});

export const handleUpdateUser = (user: User) => ({
  type: ActionTypes.handleUpdateUser,
  payload: {
    user,
  },
});
