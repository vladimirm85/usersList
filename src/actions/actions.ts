import { ActionTypes } from './types';
import { User } from '../reducer';

export interface RequestFetchUsers {
  type: ActionTypes.requestFetchUsers;
}

export const requestFetchUsers = (): RequestFetchUsers => ({
  type: ActionTypes.requestFetchUsers,
});

export interface RequestFetchUsersSuccess {
  type: ActionTypes.requestFetchUsersSuccess;
  payload: {
    users: User[];
  };
}

export const requestFetchUsersSuccess = (
  users: User[]
): RequestFetchUsersSuccess => ({
  type: ActionTypes.requestFetchUsersSuccess,
  payload: {
    users,
  },
});

export interface RequestFetchUsersFailed {
  type: ActionTypes.requestFetchUsersFailed;
}

export const requestFetchUsersFailed = (): RequestFetchUsersFailed => ({
  type: ActionTypes.requestFetchUsersFailed,
});

export const fetchUsers = () => ({
  type: ActionTypes.fetchUsers,
});
