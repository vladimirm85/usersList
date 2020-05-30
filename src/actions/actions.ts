import { ActionTypes } from './types';
import { User } from '../reducer';

export interface RequestApi {
  type: ActionTypes.requestApi;
}

export const requestApi = (): RequestApi => ({
  type: ActionTypes.requestApi,
});

export interface RequestFailed {
  type: ActionTypes.requestFailed;
}

export const requestFailed = (): RequestFailed => ({
  type: ActionTypes.requestFailed,
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

export interface DeleteUser {
  type: ActionTypes.deleteUser;
  payload: {
    id: number;
  };
}

export const deleteUser = (id: number): DeleteUser => ({
  type: ActionTypes.deleteUser,
  payload: {
    id,
  },
});

export const handleDeleteUser = (id: number) => ({
  type: ActionTypes.handleDeleteUser,
  payload: {
    id,
  },
});
