import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Dispatch, bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import { Delete, Edit } from '@material-ui/icons';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
} from '@material-ui/core';
import { User as UserInterface, StoreInterface } from '../reducer';
import { handleDeleteUser, openDialog } from '../actions';

const useStyles = makeStyles({
  table: {
    maxWidth: '700px',
    margin: 'auto',
  },
  cursorPointer: {
    cursor: 'pointer',
  },
});

interface MapStateToPropsType {
  users: UserInterface[];
}

interface MapDispatchToPropsType {
  handleDeleteUser: typeof handleDeleteUser;
  openDialog: typeof openDialog;
}

type UserProps = MapStateToPropsType &
  MapDispatchToPropsType &
  RouteComponentProps;

const _User: React.FC<UserProps> = (props: UserProps): JSX.Element => {
  const { users, handleDeleteUser, openDialog, match, history } = props;
  const [user, setUser] = React.useState<UserInterface | undefined>(undefined);
  const classes = useStyles();

  React.useEffect(() => {
    const userId = match.url.slice(6);
    const user = users.find((user) => user.id === userId);
    user && setUser(user);
  }, [users, match.url]);

  return (
    <div>
      {!user ? (
        <div>400</div>
      ) : (
        <Container fixed>
          <TableContainer className={classes.table} component={Paper}>
            <Table className={classes.table} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={3}>
                    <h2>User Data</h2>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={'acyionButton'}>
                  <TableCell colSpan={1}>
                    <Edit
                      className={classes.cursorPointer}
                      onClick={() => {
                        user.id && history.push(`/edit/${user.id}`);
                      }}
                    />
                  </TableCell>
                  <TableCell align="right" colSpan={2}>
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
                  </TableCell>
                </TableRow>
                <TableRow key={'userName'}>
                  <TableCell>Name:</TableCell>
                  <TableCell align="right" colSpan={2}>
                    {user.name}
                  </TableCell>
                </TableRow>
                <TableRow key={'userUserName'}>
                  <TableCell>Username:</TableCell>
                  <TableCell align="right" colSpan={2}>
                    {user.username}
                  </TableCell>
                </TableRow>
                <TableRow key={'userEmail'}>
                  <TableCell>Email:</TableCell>
                  <TableCell align="right" colSpan={2}>
                    {user.email}
                  </TableCell>
                </TableRow>
                <TableRow key={'userAddress'}>
                  <TableCell colSpan={3}>Address:</TableCell>
                </TableRow>
                <TableRow key={'userStreet'}>
                  <TableCell rowSpan={4} />
                  <TableCell>Street</TableCell>
                  <TableCell align="right">{user.address.street}</TableCell>
                </TableRow>
                <TableRow key={'userSuite'}>
                  <TableCell>Suite</TableCell>
                  <TableCell align="right">{user.address.suite}</TableCell>
                </TableRow>
                <TableRow key={'userCity'}>
                  <TableCell>City</TableCell>
                  <TableCell align="right">{user.address.city}</TableCell>
                </TableRow>
                <TableRow key={'userZipcode'}>
                  <TableCell>Zipcode</TableCell>
                  <TableCell align="right">{user.address.zipcode}</TableCell>
                </TableRow>
                <TableRow key={'userPhone'}>
                  <TableCell>Phone:</TableCell>
                  <TableCell align="right" colSpan={2}>
                    {user.phone}
                  </TableCell>
                </TableRow>
                <TableRow key={'userWebsite'}>
                  <TableCell>Website:</TableCell>
                  <TableCell align="right" colSpan={2}>
                    {user.website}
                  </TableCell>
                </TableRow>
                <TableRow key={'userCompany'}>
                  <TableCell colSpan={3}>Company:</TableCell>
                </TableRow>
                <TableRow key={'userCompanyName'}>
                  <TableCell rowSpan={2} />
                  <TableCell>Company Name</TableCell>
                  <TableCell align="right">{user.company.name}</TableCell>
                </TableRow>
                <TableRow key={'userCompanyCatchPhrase'}>
                  <TableCell>Company catchphrase</TableCell>
                  <TableCell align="right">
                    {user.company.catchPhrase}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      )}
    </div>
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
  bindActionCreators({ handleDeleteUser, openDialog }, dispatch);

export const User = connect(mapStateToProps, mapDispatchToProps)(_User);
