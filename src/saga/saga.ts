import { put, takeEvery, call, all } from 'redux-saga/effects';
import { history } from '../components/App';
import { getUsresApi, addUserApi, deleteUserApi, updateUserApi } from '../api';
import {
  ActionTypes,
  requestApi,
  RequestApi,
  requestFailed,
  RequestFailed,
  fetchUsers,
  FetchUsers,
  addUser,
  AddUser,
  deleteUser,
  DeleteUser,
  updateUser,
  UpdateUser,
} from '../actions';

export function* watchFetchUsers() {
  yield takeEvery(ActionTypes.handleFetchUsers, fetchUserAsync);
}

export function* fetchUserAsync() {
  try {
    yield put<RequestApi>(requestApi());
    const users = yield call(() => getUsresApi());
    yield put<FetchUsers>(fetchUsers(users));
  } catch (error) {
    console.log(error);
    yield put<RequestFailed>(requestFailed(error));
  }
}

export function* watchDeleteUser() {
  yield takeEvery(ActionTypes.handleDeleteUser, deleteUserAsync);
}

export function* deleteUserAsync(action: DeleteUser) {
  const id = action.payload.id;
  try {
    yield put<RequestApi>(requestApi());
    yield call(() => deleteUserApi(id));
    history.push('/');
    yield put<DeleteUser>(deleteUser(id));
  } catch (error) {
    console.log(error);
    yield put<RequestFailed>(requestFailed(error));
  }
}

export function* watchUpdateUser() {
  yield takeEvery(ActionTypes.handleUpdateUser, updateUserAsync);
}

export function* updateUserAsync(action: UpdateUser) {
  const user = action.payload.user;
  try {
    yield put<RequestApi>(requestApi());
    yield call(() => updateUserApi(user));
    history.push(`/user/${user.id}`);
    yield put<UpdateUser>(updateUser(user));
  } catch (error) {
    console.log(error);
    yield put<RequestFailed>(requestFailed(error));
  }
}

export function* watchAddUser() {
  yield takeEvery(ActionTypes.handleAddUser, addUserAsync);
}

export function* addUserAsync(action: AddUser) {
  const user = action.payload.user;
  try {
    yield put<RequestApi>(requestApi());
    const addedUser = yield call(() => addUserApi(user));
    history.push('/');
    yield put<AddUser>(addUser(addedUser));
  } catch (error) {
    console.log(error);
    yield put<RequestFailed>(requestFailed(error));
  }
}

export function* rootSaga() {
  yield all([
    watchFetchUsers(),
    watchAddUser(),
    watchDeleteUser(),
    watchUpdateUser(),
  ]);
}
