import { combineReducers, Reducer } from 'redux';
import { reducer, User as UserInterface, UsersStateInterface } from './reducer';

export interface StoreInterface {
  usersReducer: UsersStateInterface;
}

export const reducers: Reducer<StoreInterface> = combineReducers<
  StoreInterface
>({ usersReducer: reducer });

export type User = UserInterface;
