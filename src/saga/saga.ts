import {
  put,
  takeEvery,
  takeLatest,
  call,
  fork,
  all,
  take,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { history } from '../components/App';
import {
  fetchAuthUserApi,
  signUpAuthUserApi,
  signInWithEmailAndPasswordApi,
  signInWithPopupApi,
  signOutAuthUserApi,
  fetchUsresApi,
  addUserApi,
  deleteUserApi,
  updateUserApi,
} from '../api';
import {
  ActionTypes,
  requestApi,
  RequestApi,
  requestSuccess,
  RequestSuccess,
  requestFailed,
  RequestFailed,
  fetchAuthUser,
  FetchAuthUser,
  SignWithEmailAndPassword,
  SignWithPopup,
  fetchUsers,
  FetchUsers,
  addUser,
  AddUser,
  deleteUser,
  DeleteUser,
  updateUser,
  UpdateUser,
} from '../actions';

const getAuthChannel = () =>
  eventChannel((emitter) => fetchAuthUserApi(emitter));

function* watchFetchAuthUser() {
  const channel = yield call(getAuthChannel);
  try {
    while (true) {
      const authUser = yield take(channel);
      yield put<FetchAuthUser>(fetchAuthUser(authUser));
      authUser.id
        ? yield fork(fetchUsersAsync)
        : yield put<RequestSuccess>(requestSuccess());
    }
  } catch (error) {
    yield put<RequestFailed>(requestFailed(error));
  }
}

function* watchSignUpAuthUser() {
  yield takeLatest(ActionTypes.signUpAuthUser, signUpAuthUserAsync);
}

function* signUpAuthUserAsync(action: SignWithEmailAndPassword) {
  const { signData } = action.payload;
  try {
    yield put<RequestApi>(requestApi());
    yield call(signUpAuthUserApi, signData.email, signData.password);
    yield put<RequestSuccess>(requestSuccess());
  } catch (error) {
    yield put<RequestFailed>(requestFailed(error));
  }
}

function* watchSignInWithEmailAndPassword() {
  yield takeLatest(
    ActionTypes.signInWithEmailAndPassword,
    signInWithEmailAndPasswordAsync
  );
}

function* signInWithEmailAndPasswordAsync(action: SignWithEmailAndPassword) {
  const { signData } = action.payload;
  try {
    yield call(
      signInWithEmailAndPasswordApi,
      signData.email,
      signData.password
    );
  } catch (error) {
    yield put<RequestFailed>(requestFailed(error));
  }
}

function* watchSignInWithPopup() {
  yield takeLatest(ActionTypes.signInWithPopup, signInWithPopupAsync);
}

function* signInWithPopupAsync(action: SignWithPopup) {
  const { provider } = action.payload;
  try {
    yield call(signInWithPopupApi, provider);
  } catch (error) {
    yield put<RequestFailed>(requestFailed(error));
  }
}

function* watchSignOutAuthUser() {
  yield takeLatest(ActionTypes.signOutAuthUser, signOutAuthUserAsync);
}

function* signOutAuthUserAsync() {
  try {
    yield put<RequestApi>(requestApi());
    yield call(signOutAuthUserApi);
    yield put<RequestSuccess>(requestSuccess());
  } catch (error) {
    yield put<RequestFailed>(requestFailed(error));
  }
}

function* fetchUsersAsync() {
  try {
    yield put<RequestApi>(requestApi());
    const users = yield call(fetchUsresApi);
    yield put<FetchUsers>(fetchUsers(users));
    yield put<RequestSuccess>(requestSuccess());
  } catch (error) {
    yield put<RequestFailed>(requestFailed(error));
  }
}

function* watchDeleteUser() {
  yield takeEvery(ActionTypes.handleDeleteUser, deleteUserAsync);
}

function* deleteUserAsync(action: DeleteUser) {
  const { id } = action.payload;
  try {
    yield put<RequestApi>(requestApi());
    yield call(deleteUserApi, id);
    history.push('/');
    yield put<DeleteUser>(deleteUser(id));
    yield put<RequestSuccess>(requestSuccess());
  } catch (error) {
    yield put<RequestFailed>(requestFailed(error));
  }
}

function* watchUpdateUser() {
  yield takeEvery(ActionTypes.handleUpdateUser, updateUserAsync);
}

function* updateUserAsync(action: UpdateUser) {
  const { user } = action.payload;
  try {
    yield put<RequestApi>(requestApi());
    yield call(updateUserApi, user);
    history.push(`/user/${user.id}`);
    yield put<UpdateUser>(updateUser(user));
    yield put<RequestSuccess>(requestSuccess());
  } catch (error) {
    yield put<RequestFailed>(requestFailed(error));
  }
}

function* watchAddUser() {
  yield takeEvery(ActionTypes.handleAddUser, addUserAsync);
}

function* addUserAsync(action: AddUser) {
  const { user } = action.payload;
  try {
    yield put<RequestApi>(requestApi());
    const addedUser = yield call(addUserApi, user);
    history.push('/');
    yield put<AddUser>(addUser(addedUser));
    yield put<RequestSuccess>(requestSuccess());
  } catch (error) {
    console.log(error);
    yield put<RequestFailed>(requestFailed(error));
  }
}

export function* rootSaga() {
  yield all([
    watchFetchAuthUser(),
    watchSignUpAuthUser(),
    watchSignInWithEmailAndPassword(),
    watchSignInWithPopup(),
    watchSignOutAuthUser(),
    watchAddUser(),
    watchDeleteUser(),
    watchUpdateUser(),
  ]);
}
