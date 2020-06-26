import React from 'react';
import { useHistory } from 'react-router-dom';
import { Delete, Edit, Info, Search } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import {
  InputBase,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import { handleDeleteUser, openDialog } from '../actions';
import { User } from '../reducer';

const useStyles = makeStyles({
  actionIcons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cursorPointer: {
    cursor: 'pointer',
  },
  addUserButton: {
    display: 'flex',
    alignItems: 'center',
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
  openDialog: typeof openDialog;
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
  const { users, handleDeleteUser, openDialog } = props;
  const classes = useStyles();
  const history = useHistory();

  const [filter, setFfilter] = React.useState('');
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(filter) ||
      user.username.toLowerCase().includes(filter) ||
      user.email.toLowerCase().includes(filter) ||
      user.phone.toLowerCase().includes(filter)
  );

  return (
    <React.Fragment>
      <div className={classes.addUserButton}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push('/add')}
        >
          Add User
        </Button>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <Search />
          </div>
          <Box {...boxProps}>
            <InputBase
              className={classes.input}
              placeholder="Search…"
              onChange={(e) => {
                setFfilter(e.target.value.toLowerCase());
              }}
            />
          </Box>
        </div>
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
                      onClick={() =>
                        user.id &&
                        openDialog(
                          `Delete user ${user.name}?`,
                          handleDeleteUser,
                          user.id
                        )
                      }
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
