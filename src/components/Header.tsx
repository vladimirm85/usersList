import React from 'react';
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Typography, Toolbar } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    home: {
      cursor: 'pointer',
      flexGrow: 1,
    },
    addUser: {
      cursor: 'pointer',
    },
  })
);

export const Header = () => {
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
        </Toolbar>
      </AppBar>
    </div>
  );
};
