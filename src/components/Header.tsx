import React from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar, Typography, Toolbar } from '@material-ui/core';

const cursorPointer = {
  cursor: 'pointer',
};

export const Header = () => {
  const history = useHistory();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography onClick={() => history.push('/')} style={cursorPointer}>
          Home
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
