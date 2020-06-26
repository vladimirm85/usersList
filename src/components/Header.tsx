import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Dispatch, bindActionCreators } from 'redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { AuthUser, StoreInterface } from '../reducer';
import { signOutAuthUser } from '../actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    title: {
      display: 'none',
      cursor: 'pointer',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    userMenu: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
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

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const signHandle = (option?: string) => {
    option ? history.push(`/${option}`) : signOutAuthUser();
    setAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {authUser.id ? (
        <MenuItem onClick={() => signHandle()}>Sign Out</MenuItem>
      ) : (
        <Fragment>
          <MenuItem onClick={() => signHandle('signin')}>Sign In</MenuItem>
          <MenuItem onClick={() => signHandle('signup')}>Sign Up</MenuItem>
        </Fragment>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            className={classes.title}
            variant="h6"
            noWrap
            onClick={() => history.push('/')}
          >
            Home
          </Typography>
          <div className={classes.grow} />
          <div className={classes.userMenu}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
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
