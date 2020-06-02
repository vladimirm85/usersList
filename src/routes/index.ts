import { Home } from '../components/Home';
import { P404 } from '../components/404';
import { User } from '../components/User';
import { UseDataHandling } from '../components/Userrrrrr';

export const routesProperties = [
  {
    name: 'home',
    url: '/',
    component: Home,
    exact: true,
  },
  {
    name: 'user',
    url: '/:id',
    component: User,
    exact: true,
  },
  {
    name: 'user',
    url: '/:id/update',
    component: UseDataHandling,
    exact: true,
  },
  {
    url: '*',
    component: P404,
  },
];

// const UrlBuild = function (name, params) {
//   if (!RoutesMap.hasOwnProperty(name)) {
//     return null;
//   }

//   let url = RoutesMap[name];

//   for (let key in params) {
//     url = url.replace(':' + key, params[key]);
//   }

//   return url;
// };

const RoutesMap: any = {};

routesProperties.forEach((route) => {
  if (route.hasOwnProperty('name')) {
    if (route.name) {
      RoutesMap[route.name] = route.url;
    }
  }
});

export { RoutesMap };
