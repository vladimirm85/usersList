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

export interface StoreInterface {
  usersReducer: UsersStateInterface;
  requestsReducer: RequestsStateInterface;
  authUserReducer: AuthUserStateInterface;
}

export const reducers: Reducer<StoreInterface> = combineReducers<
  StoreInterface
>({ usersReducer, requestsReducer, authUserReducer });

export type User = UserInterface;
export type AuthUser = AuthUserInterface;
