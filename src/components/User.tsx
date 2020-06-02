import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Dispatch, bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
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
import { handleDeleteUser } from '../actions';

const useStyles = makeStyles({
  table: {
    width: '700px',
    margin: 'auto',
  },
});

interface MapStateToPropsType {
  users: UserInterface[];
}

interface MapDispatchToPropsType {
  handleDeleteUser: typeof handleDeleteUser;
}

type UserProps = MapStateToPropsType &
  MapDispatchToPropsType &
  RouteComponentProps;

const _User: React.FC<UserProps> = (props: UserProps): JSX.Element => {
  const { users, handleDeleteUser, match } = props;
  const userId = parseInt(match.url.slice(1));
  const [user, setUser] = React.useState<UserInterface | undefined>(undefined);
  const classes = useStyles();

  React.useEffect(() => {
    const user = users.find((user) => user.id === userId);
    user && setUser(user);
  }, [userId, users]);

  return (
    <div>
      {!user ? (
        <div>404</div>
      ) : (
        <Container fixed>
          <TableContainer className={classes.table} component={Paper}>
            <Table className={classes.table} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={3}>
                    User Details
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
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
                <TableRow key={'userCompanyBs'}>
                  <TableCell>Company BS</TableCell>
                  <TableCell align="right">{user.company.bs}</TableCell>
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
  bindActionCreators({ handleDeleteUser }, dispatch);

export const User = connect(mapStateToProps, mapDispatchToProps)(_User);
