import API from '../api';
import { ActionTypes } from './types';

export interface User {
  id?: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface FetchUsersAction {
  type: ActionTypes.fetchUsers;
  payload: {
    users: User[];
  };
}

const fethcUsers = (users: User[]): FetchUsersAction => ({
  type: ActionTypes.fetchUsers,
  payload: {
    users,
  },
});
