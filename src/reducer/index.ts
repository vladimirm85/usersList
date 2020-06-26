import { combineReducers, Reducer } from 'redux';
import {
  User as UserInterface,
  usersReducer,
  UsersStateInterface,
} from './usersReducer';
import { requestsReducer, RequestsStateInterface } from './requestsReducer';
import {
  AuthUser as AuthUserInterface,
  authUserReducer,
  AuthUserStateInterface,
} from './authUserReducer';
import { dialogReducer, DialogStateInterface } from './dialogReducer';

export interface StoreInterface {
  usersReducer: UsersStateInterface;
  requestsReducer: RequestsStateInterface;
  authUserReducer: AuthUserStateInterface;
  dialogReducer: DialogStateInterface;
}

export const reducers: Reducer<StoreInterface> = combineReducers<
  StoreInterface
>({ usersReducer, requestsReducer, authUserReducer, dialogReducer });

export type User = UserInterface;
export type AuthUser = AuthUserInterface;
export type DialogInterface = DialogStateInterface;
