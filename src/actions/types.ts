import {
  RequestApi,
  RequestFailed,
  FetchUsers,
  DeleteUser,
  UpdateUser,
} from './actions';

export enum ActionTypes {
  requestApi = 'REQUEST_API',
  requestFailed = 'REQUEST_FAILD',
  fetchUsers = 'FETCH_USERS',
  handleFetchUsers = 'HANDLE_FETCH_USERS',
  deleteUser = 'DELETE_USER',
  handleDeleteUser = 'HANDLE_DELETE_USER',
  updateUser = 'UPDATE_USER',
  handleUpdateUser = 'HANDLE_UPDATE_USER',
}

export type Action =
  | RequestApi
  | FetchUsers
  | RequestFailed
  | DeleteUser
  | UpdateUser;
