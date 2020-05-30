import { put, takeEvery, call } from 'redux-saga/effects';
import API from '../api';
import { User } from '../reducer';
import {
  ActionTypes,
  requestFetchUsers,
  RequestFetchUsers,
  requestFetchUsersSuccess,
  RequestFetchUsersSuccess,
  requestFetchUsersFailed,
  RequestFetchUsersFailed,
} from '../actions';

export function* watchFetchUsers() {
  yield takeEvery(ActionTypes.fetchUsers, fetchUserAsync);
}

export function* fetchUserAsync() {
  try {
    yield put<RequestFetchUsers>(requestFetchUsers());
    const users = yield call(() =>
      API.get<User[]>('').then((user) => user.data)
    );
    yield put<RequestFetchUsersSuccess>(requestFetchUsersSuccess(users));
  } catch (error) {
    console.log(error);
    yield put<RequestFetchUsersFailed>(requestFetchUsersFailed());
  }
}
