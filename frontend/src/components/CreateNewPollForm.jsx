import TextField from '@material-ui/core/TextField'
import Title from './Title'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { createPoll } from './actions'
import DateTime from 'luxon/src/datetime'
import { Redirect } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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

const CreateNewPollForm = ({ user, createPoll }) => {
  const classes = useStyles()
  const handleSubmit = (event) => {
    event.preventDefault()
    const datetime = DateTime.local()
    const pollId = datetime.ts
    createPoll({
      pollId: pollId,
      creationDate: datetime.toISO(),
      title: event.target[0].value,
      description: event.target[2].value,
      creator: user.get('name'),
      options: [1, 2, 3, 5, 8]
    })
    setRedirect(pollId)
  }
  const [getRedirect, setRedirect] = useState()
  if (getRedirect) {
    return <Redirect to={`/poll/${getRedirect}`} />
  }
  return (
    <React.Fragment>
      <Title>New Poll</Title>
      <form onSubmit={handleSubmit} className={classes.form} noValidate>
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='title'
          label='Title'
          name='title'
          autoFocus
          color='secondary'
        />
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='description'
          label='Description'
          name='description'
          multiline={true}
          rows={10}
          maxrows={50}
          color='secondary'
        />
        <Button
          type='submit'
          variant='outlined'
          color='secondary'
          className={classes.submit}
        >
          Create Poll
        </Button>
      </form>
    </React.Fragment>
  )
}

export default connect(null, { createPoll: createPoll })(CreateNewPollForm)
