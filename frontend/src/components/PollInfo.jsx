import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Title from './Title.jsx'
import { DateTime } from 'luxon'

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
})

export default function PollInfo({ pollId, polls }) {
  const poll = polls.filter((pollObject) => pollObject.get('id') === pollId).first()
  const classes = useStyles()
  return (
    <React.Fragment>
      <Typography color='textSecondary' className={classes.depositContext}>
        Created  {DateTime.fromISO(poll.get('creationDate')).toFormat('dd LLL yyyy, hh:mm')}
      </Typography>
      <Title>Description</Title>
      <div style={{paddingTop: '2em'}}>
        {poll.get('description')}
      </div>
    </React.Fragment>
  )
}
