import { Home } from '../components/Home';
import { P404 } from '../components/404';
import { User } from '../components/User';
import { UserDataHandling } from '../components/UserDataHandling';
import { AuthUserSign } from '../components/AuthUserSign';

export const routesProperties = [
  {
    name: 'home',
    url: '/',
    component: Home,
    exact: true,
  },
  {
    name: 'user',
    url: '/user/:id',
    component: User,
    exact: true,
  },
  {
    name: 'userAdd',
    url: '/add',
    component: UserDataHandling,
    exact: true,
  },
  {
    name: 'userEdit',
    url: '/edit/:id',
    component: UserDataHandling,
    exact: true,
  },
  {
    name: 'signup',
    url: '/signup',
    component: AuthUserSign,
    exact: true,
  },
  {
    name: 'signin',
    url: '/signin',
    component: AuthUserSign,
    exact: true,
  },
  {
    url: '*',
    component: P404,
  },
];
