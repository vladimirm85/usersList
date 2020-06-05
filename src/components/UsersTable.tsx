import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { User } from '../reducer';
import { handleDeleteUser } from '../actions';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import { Delete, Edit, Info } from '@material-ui/icons';

const useStyles = makeStyles({
  actionIcons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  firstColumnWidth: {
    width: '90px',
  },
  cursorPointer: {
    cursor: 'pointer',
  },
});

interface UsersTableProps {
  users: User[];
  handleDeleteUser: typeof handleDeleteUser;
}

export const UsersTable = (props: UsersTableProps) => {
  const { users, handleDeleteUser } = props;
  const classes = useStyles();
  const history = useHistory();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" className={classes.firstColumnWidth}>
              Action
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="center">Username</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={`userId${user.id}`}>
              <TableCell>
                <div className={classes.actionIcons}>
                  <Info
                    className={classes.cursorPointer}
                    onClick={() => history.push(`/user/${user.id}`)}
                  />
                  <Edit
                    className={classes.cursorPointer}
                    onClick={() => {
                      user.id && history.push(`/edit/${user.id}`);
                    }}
                  />
                  <Delete
                    className={classes.cursorPointer}
                    onClick={() => user.id && handleDeleteUser(user.id)}
                  />
                </div>
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell align="center">{user.username}</TableCell>
              <TableCell align="center">{user.email}</TableCell>
              <TableCell align="right">{user.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
