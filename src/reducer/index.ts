import { combineReducers, Reducer } from 'redux';
import { reducer, User as UserInterface } from './reducer';

export interface StoreInterface {
  usersReducer: { users: UserInterface[]; isLoading: boolean };
}

export const reducers: Reducer<StoreInterface> = combineReducers<
  StoreInterface
>({ usersReducer: reducer });

export type User = UserInterface;
