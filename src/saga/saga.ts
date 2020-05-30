import { put, takeEvery, call, all } from 'redux-saga/effects';
import API from '../api';
import { User } from '../reducer';
import {
  ActionTypes,
  requestApi,
  RequestApi,
  requestFailed,
  RequestFailed,
  fetchUsers,
  FetchUsers,
  deleteUser,
  DeleteUser,
} from '../actions';

export function* watchFetchUsers() {
  yield takeEvery(ActionTypes.handleFetchUsers, fetchUserAsync);
}

export function* fetchUserAsync() {
  try {
    yield put<RequestApi>(requestApi());
    const users = yield call(() =>
      API.get<User[]>('').then((user) => user.data)
    );
    yield put<FetchUsers>(fetchUsers(users));
  } catch (error) {
    console.log(error);
    yield put<RequestFailed>(requestFailed());
  }
}

export function* watchDeleteUser() {
  yield takeEvery(ActionTypes.handleDeleteUser, deleteUserAsync);
}

export function* deleteUserAsync(action: DeleteUser) {
  const id = action.payload.id;
  try {
    yield put<RequestApi>(requestApi());
    yield call(() => API.delete(`/${id}`));
    yield put<DeleteUser>(deleteUser(id));
  } catch (error) {
    console.log(error);
    yield put<RequestFailed>(requestFailed());
  }
}

export function* rootSaga() {
  yield all([watchFetchUsers(), watchDeleteUser()]);
}
