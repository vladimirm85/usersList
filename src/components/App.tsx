import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { routesProperties } from '../routes';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Grid } from '@material-ui/core';
import { Header } from './Header';
import { User, StoreInterface } from '../reducer';
import { handleFetchUsers } from '../actions';

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
}

interface MapDispatchToPropsType {
  handleFetchUsers: typeof handleFetchUsers;
}

type AppProps = MapStateToPropsType & MapDispatchToPropsType;

const _App: React.FC<AppProps> = (props: AppProps): JSX.Element => {
  const { users, handleFetchUsers } = props;
  React.useEffect(() => {
    if (!users.length) {
      handleFetchUsers();
    }
  }, [handleFetchUsers, users]);
  return (
    <Router>
      <Grid container direction="column">
        <Grid item>
          <Header />
        </Grid>
        <Grid item container>
          <Grid item xs={false} sm={2} />
          <Grid item xs={12} sm={8}>
            <Switch>{routesComponents}</Switch>
          </Grid>
          <Grid item xs={false} sm={2} />
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
  };
};

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType =>
  bindActionCreators({ handleFetchUsers }, dispatch);

export const App = connect(mapStateToProps, mapDispatchToProps)(_App);
