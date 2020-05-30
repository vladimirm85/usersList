import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { routesProperties } from '../routes';

const routesComponents = routesProperties.map((route) => (
  <Route
    path={route.url}
    component={route.component}
    exact={route.exact}
    key={route.url}
  />
));

export const App = (): JSX.Element => {
  return (
    <Router>
      <Switch>{routesComponents}</Switch>
    </Router>
  );
};
