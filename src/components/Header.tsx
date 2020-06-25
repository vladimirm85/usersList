import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Dispatch, bindActionCreators } from 'redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Typography, Toolbar } from '@material-ui/core';
import { AuthUser, StoreInterface } from '../reducer';
import { signOutAuthUser } from '../actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: '10px',
    },
    home: {
      cursor: 'pointer',
      flexGrow: 1,
    },
    addUser: {
      cursor: 'pointer',
    },
    signOut: {
      cursor: 'pointer',
      marginLeft: '20px',
    },
  })
);

interface MapStateToPropsType {
  authUser: AuthUser;
}

interface MapDispatchToPropsType {
  signOutAuthUser: typeof signOutAuthUser;
}

type HeaderProps = MapStateToPropsType & MapDispatchToPropsType;

const _Header: React.FC<HeaderProps> = (props: HeaderProps): JSX.Element => {
  const { authUser, signOutAuthUser } = props;
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.home}
            onClick={() => history.push('/')}
          >
            Home
          </Typography>
          <Typography
            className={classes.addUser}
            onClick={() => history.push('/add')}
          >
            Add User
          </Typography>
          {authUser.id && (
            <Typography
              className={classes.signOut}
              onClick={() => signOutAuthUser()}
            >
              Sign Out
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = ({
  authUserReducer,
}: StoreInterface): MapStateToPropsType => {
  return {
    authUser: authUserReducer.authUser,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType =>
  bindActionCreators({ signOutAuthUser }, dispatch);

export const Header = connect(mapStateToProps, mapDispatchToProps)(_Header);
