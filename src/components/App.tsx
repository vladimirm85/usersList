import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { routesProperties } from '../routes';
import { connect } from 'react-redux';
import { Grid, Backdrop, CircularProgress } from '@material-ui/core';
import { Header } from './Header';
import { User, StoreInterface } from '../reducer';
import { createBrowserHistory } from 'history';
import { Alerts } from './Alerts';

export const history = createBrowserHistory();

const routesComponents = routesProperties.map((route) => (
  <Route
    path={route.url}
    component={route.component}
    exact={route.exact}
    key={route.url}
  />
));

interface MapStateToPropsType {
  users: User[];
  isLoading: boolean;
}

type AppProps = MapStateToPropsType;

const _App: React.FC<AppProps> = (props: AppProps): JSX.Element => {
  const { isLoading } = props;
  return (
    <Router history={history}>
      <Grid container direction="column">
        <Grid item>
          <Header />
          <Alerts />
        </Grid>
        <Grid item container>
          <Grid item xs={false} sm={1} />
          <Grid item xs={12} sm={10}>
            <Backdrop open={isLoading}>
              <CircularProgress />
            </Backdrop>
            <Switch>{!isLoading && routesComponents}</Switch>
          </Grid>
          <Grid item xs={false} sm={1} />
        </Grid>
      </Grid>
    </Router>
  );
};

const mapStateToProps = ({
  usersReducer,
  requestsReducer,
}: StoreInterface): MapStateToPropsType => {
  return {
    users: usersReducer.users,
    isLoading: requestsReducer.isLoading,
  };
};

export const App = connect(mapStateToProps)(_App);
