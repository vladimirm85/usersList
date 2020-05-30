import {
  RequestFetchUsers,
  RequestFetchUsersFailed,
  RequestFetchUsersSuccess,
} from './actions';

export enum ActionTypes {
  fetchUsers = 'FETCH_USERS',
  requestFetchUsers = 'REQUEST_FETCH_USERS',
  requestFetchUsersSuccess = 'REQUEST_FETCH_USERS_SUCCESS',
  requestFetchUsersFailed = 'REQUEST_FETCH_USERS_FAILD',
}

export type Action =
  | RequestFetchUsers
  | RequestFetchUsersSuccess
  | RequestFetchUsersFailed;
