import API from '../api';
import { ActionTypes } from './types';
import { put, takeEvery, call } from 'redux-saga/effects';
import { User } from '../reducer';

interface FetchUsersActionInterface {
  type: ActionTypes.fetchUsers;
  payload: {
    users: User[];
  };
}

const requestFetchUsers = () => ({
  type: ActionTypes.requestFetchUsers,
  payload: {},
});

const requestFetchUsersSuccess = (users: User[]) => ({
  type: ActionTypes.requestFetchUsersSuccess,
  payload: {
    users,
  },
});

const requestFetchUsersFailed = () => ({
  type: ActionTypes.requestFetchUsersSuccess,
  payload: {},
});

export const fetchUsers = () => ({
  type: ActionTypes.fetchUsers,
});

export function* watchFetchUsers() {
  yield takeEvery(ActionTypes.fetchUsers, fetchUserAsync);
}

export function* fetchUserAsync() {
  try {
    yield put(requestFetchUsers());
    const users = yield call(() => API.get('').then((user) => user.data));
    yield put(requestFetchUsersSuccess(users));
  } catch (error) {
    console.log(error);
    yield put(requestFetchUsersFailed());
  }
}
