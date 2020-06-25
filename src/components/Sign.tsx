import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { Dispatch, bindActionCreators } from 'redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { TextField } from 'mui-rff';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';
import { Form } from 'react-final-form';
import { signInAuthUser, signUpAuthUser } from '../actions';
import { AuthUser, StoreInterface } from '../reducer';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const socialButtonsStyle = {
  fb: {
    margin: 0,
    width: '100%',
  },
  ggl: {
    margin: '10px 0px',
    width: '100%',
  },
  hide: {
    display: 'none',
  },
  show: {
    display: 'block',
  },
};

interface ErrorInterface {
  email?: string;
  password?: string;
}

interface SignData {
  email: string;
  password: string;
}

const signinDataValidation = (values: SignData) => {
  const errors: ErrorInterface = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};

interface MapStateToPropsType {
  authUser: AuthUser;
}

interface MapDispatchToPropsType {
  signUpAuthUser: typeof signUpAuthUser;
  signInAuthUser: typeof signInAuthUser;
}

type SignProps = RouteComponentProps &
  MapStateToPropsType &
  MapDispatchToPropsType;

const _Sign: React.FC<SignProps> = (props: SignProps): JSX.Element => {
  const classes = useStyles();
  const { match, authUser, signUpAuthUser, signInAuthUser } = props;
  const isSigningIn = match.url.slice(1) === 'signin' ? true : false;
  const showSocislButton = isSigningIn
    ? socialButtonsStyle.show
    : socialButtonsStyle.hide;
  const SingText = isSigningIn ? 'Sign In' : 'Sign Up';

  const onSubmit = (value: SignData) => {
    isSigningIn
      ? signInAuthUser({ email: value.email, password: value.password })
      : signUpAuthUser({ email: value.email, password: value.password });
  };

  return (
    <Fragment>
      {authUser.id ? (
        <Redirect to="/" />
      ) : (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {SingText}
            </Typography>
            <Form
              onSubmit={onSubmit}
              validate={signinDataValidation}
              render={({ handleSubmit, submitting }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required={true}
                    fullWidth
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required={true}
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={submitting}
                    className={classes.submit}
                  >
                    {SingText}
                  </Button>
                  <div style={showSocislButton}>
                    <FacebookLoginButton style={socialButtonsStyle.fb} />
                    <GoogleLoginButton style={socialButtonsStyle.ggl} />
                    <Grid container>
                      <Grid item>
                        <Link href="/signup" variant="body2">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                  </div>
                </form>
              )}
            />
          </div>
        </Container>
      )}
    </Fragment>
  );
};

const mapStateToProps = ({
  authUserReducer,
  requestsReducer,
}: StoreInterface): MapStateToPropsType => {
  return {
    authUser: authUserReducer.authUser,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType =>
  bindActionCreators({ signUpAuthUser, signInAuthUser }, dispatch);

export const Sign = connect(mapStateToProps, mapDispatchToProps)(_Sign);
