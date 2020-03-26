import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { authorizeUser } from './actions.js'
import { connect } from 'react-redux'
import { Redirect, useLocation } from 'react-router-dom'

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
    width: '100%',
    marginTop: theme.spacing(1),

  },
  submit: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
}))

const SignIn = ({ user, signInFailed, authorizeUser }) => {
  const classes = useStyles()
  const location = useLocation().pathname.replace('/sign-in', '')
  const handleSubmit = (event) => {
    event.preventDefault()
    const username = event.target[0].value
    const password = event.target[2].value
    authorizeUser({ username: username, password: password })
  }
  if (user && user.get('id')) {
    return <Redirect to={location} />
  }
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        {signInFailed ? (
          <p>
            Sign in failed. Please check username and password and try again.
          </p>
        ) : null}
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='username'
            label='Email Address'
            name='username'
            autoFocus
            color='secondary'
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            color='secondary'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='secondary'
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default connect(
  (state) => ({ user: state.get('user'), signInFailed: state.get('signInFailed') }),
  { authorizeUser: authorizeUser }
)(SignIn)
