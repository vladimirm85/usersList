import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { routesProperties } from '../routes';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Grid, Backdrop, CircularProgress } from '@material-ui/core';
import { Header } from './Header';
import { User, StoreInterface } from '../reducer';
import { handleFetchUsers } from '../actions';

import { createBrowserHistory } from 'history';

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

interface MapDispatchToPropsType {
  handleFetchUsers: typeof handleFetchUsers;
}

type AppProps = MapStateToPropsType & MapDispatchToPropsType;

const _App: React.FC<AppProps> = (props: AppProps): JSX.Element => {
  const { users, isLoading, handleFetchUsers } = props;
  React.useEffect(() => {
    if (!users.length) {
      handleFetchUsers();
    }
  }, [handleFetchUsers, users]);

  return (
    <Router history={history}>
      <Grid container direction="column">
        <Grid item>
          <Header />
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
}: StoreInterface): MapStateToPropsType => {
  return {
    users: usersReducer.users,
    isLoading: usersReducer.isLoading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType =>
  bindActionCreators({ handleFetchUsers }, dispatch);

export const App = connect(mapStateToProps, mapDispatchToProps)(_App);
