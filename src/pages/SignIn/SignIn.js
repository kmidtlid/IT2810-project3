import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
  makeStyles,
  CssBaseline,
  Avatar,
  Button,
  TextField,
  Typography,
  Container,
} from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
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
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  mainContainer: {
    marginTop: theme.spacing(15),
  },
}));

function SignIn(props) {
  const classes = useStyles();
  const [username, setUsername] = useState(''); // Used to temporarily save the text from the textfield

  // Query to get a user from the database
  const USER_QUERY = gql`
    query getUser($name: String) {
      getUser(name: $name) {
        _id
        name
        watchlist {
          _id
        }
      }
    }
  `;

  // Mutation to create a new user, and add to the database
  const USER_MUTATION = gql`
    mutation addUser($name: String) {
      addUser(name: $name) {
        _id
        name
      }
    }
  `;

  // A query that has to be called manually with getDelayedUser()
  const [getDelayedUser, { data, loading, error }] = useLazyQuery(USER_QUERY);
  const [
    createUser,
    {
      // Variables need to be set to a different name, since default names have been used already
      data: mutationData,
      loading: mutationLoading,
      error: mutationError,
      called,
    },
  ] = useMutation(USER_MUTATION); // Mutation can be called manually with createUser()

  // Used to temporarily save the text from the textfield
  const onTextChange = (event) => {
    setUsername(event.target.value);
  };

  // Query database to see if a user with the chosen username exist
  const handleSignIn = (name) => {
    getDelayedUser({
      variables: { name },
    });
  };

  // If 'enter' is pressed user should try to log in
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.target.blur();
      handleSignIn(event.target.value);
    }
  };

  // If button is pressed, user should try to log in
  const handleSubmit = (event) => {
    event.preventDefault();
    event.target.blur();
    handleSignIn(username);
  };

  if (loading || mutationLoading) return <p>LOADING</p>;
  if (error || mutationError) return <p>{error.message}</p>;

  if (data && data.getUser) {
    // If a user with the chosen username already exist, redirect to front page
    props.loginUser(data.getUser.name); // Store logged in user in the redux store
    props.createWatchlist(data.getUser.watchlist.map((movie) => movie._id)); // Save the logged in user's watchlist from the database in the redux store
    return <Redirect push to="/" />;
  }
  if (data && !data.getUser && !called && username) {
    // If a user with the chosen username doesn't exist, the user has to be created
    createUser({
      variables: { name: username },
    });
  } else if (mutationData && mutationData.addUser) {
    // If a new user has been created, redirect to front page
    props.loginUser(mutationData.addUser.name); // Store logged in user in the redux store
    props.createWatchlist([]); // A new user has no watchlist stored in the database. Create empty watchlist
    return <Redirect push to="/" />;
  }

  return (
    <Container className={classes.mainContainer} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onKeyDown={handleKeyDown}
            onChange={onTextChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => ({
  loginUser: (username) => dispatch({ type: 'LOGIN_USER', username }), // Store logged in user in the redux store
  createWatchlist: (movies) => dispatch({ type: 'CREATE_WATCHLIST', movies }), // Store user's watchlist from the database in the redux store
});

export default connect(null, mapDispatchToProps)(SignIn);
