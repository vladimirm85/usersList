import React from 'react';
import { useHistory } from 'react-router-dom';
import { InputBase, Box } from '@material-ui/core';
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
import { Delete, Edit, Info, Search } from '@material-ui/icons';

const useStyles = makeStyles({
  actionIcons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cursorPointer: {
    cursor: 'pointer',
  },
  search: {
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 0,
    marginBottom: '10px',
    width: '200px',
  },
  searchIcon: {
    right: '6px',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    paddingLeft: '10px',
    paddingRight: '36px',
  },
});

interface UsersTableProps {
  users: User[];
  handleDeleteUser: typeof handleDeleteUser;
}

const boxProps = {
  bgcolor: 'background.paper',
  borderColor: 'grey.500',
  borderRadius: '8px',
  border: 1,
  width: '200px',
  height: '38px',
  display: 'flex',
  alignItems: 'center',
};

export const UsersTable = (props: UsersTableProps) => {
  const { users, handleDeleteUser } = props;
  const [filteredUsers, setFfilteredUsers] = React.useState(users);
  const classes = useStyles();
  const history = useHistory();

  const usersFilter = (filter: string): void => {
    const filteredUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(filter) ||
        user.username.toLowerCase().includes(filter) ||
        user.email.toLowerCase().includes(filter) ||
        user.phone.toLowerCase().includes(filter)
    );
    setFfilteredUsers(filteredUsers);
  };

  return (
    <React.Fragment>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <Search />
        </div>
        <Box {...boxProps}>
          <InputBase
            className={classes.input}
            placeholder="Search…"
            onChange={(e) => {
              usersFilter(e.target.value.toLowerCase());
            }}
          />
        </Box>
      </div>
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
            {filteredUsers.map((user) => (
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
    </React.Fragment>
  );
};
