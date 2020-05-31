import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { User } from '../reducer';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';

const spaceBetween = { display: 'flex', justifyContent: 'space-between' };

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const UsersTable = (props: any) => {
  const users: User[] = props.users;
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Action</TableCell>
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
                <div style={spaceBetween}>
                  <Delete />
                  <Edit />
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
