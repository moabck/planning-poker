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
    margin: theme.spacing(3, 0, 2),
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
        />
        <Button
          type='submit'
          variant='contained'
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
