import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { placeVoteData } from './actions.js'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'

const hasVoted = (userId, poll) => {
  let hasVoted = false
  let vote = null
  if (poll.get('options')) {
    poll.get('votes').forEach((voteObject) => {
      if (voteObject.get('userId') === userId) {
        hasVoted = true
        vote = voteObject.get('vote')
      }
    })
  }
  return { hasVoted: hasVoted, vote: vote }
}

const countVotes = (poll) => {
  if (!poll.get('options')) {
    return []
  }
  const voteCount = poll
    .get('options')
    .reduce((voteCount, option) => ({ ...voteCount, [option]: 0 }), {})
  poll.get('votes').forEach((vote) => (voteCount[vote.get('vote')] += 1))
  return Object.keys(voteCount).map((key) => voteCount[key])
}

const VoteChart = ({ user, pollId, polls, placeVoteData }) => {
  const poll = polls
    .filter((pollObject) => pollObject.get('id') === pollId)
    .first()
  const [getHasVoted, setHasVoted] = useState({ hasVoted: false, vote: null })
  useEffect(() => {
    setHasVoted(hasVoted(user.get('id'), poll))
  }, [user, poll])

  const options = {
    chart: {
      id: 'poll',
      toolbar: { show: false },
    },
    xaxis: {
      categories: poll.get('options').toJS() || [],
    },
    yaxis: {
      min: 0,
      max: 6,
      tickAmount: 6,
      forceNiceScale: true,
      labels: { formatter: (value) => Math.round(value) },
    },
  }
  const series = [
    {
      name: 'votes',
      data: countVotes(poll),
    },
  ]

  return (
    <div>
      {getHasVoted.hasVoted ? (
        <Chart
          height={'410px'}
          options={options}
          type={'bar'}
          series={series}
        />
      ) : (
        <div style={{ height: '410px' }}>
          <div style={{ margin: '10em' }}>
            <Typography variant='h6' color='textSecondary' align='center'>
              You will be able to see the result of the vote on this task as
              soon as you've placed your own vote. You will also be able to
              change your vote at a later time if you want to.
            </Typography>
          </div>
        </div>
      )}
      <div style={{ textAlign: 'center' }}>
        {poll.get('options')
          ? poll.get('options').map((option) => (
              <Button
                key={option}
                onClick={() =>
                  placeVoteData({ poll: poll, option, userId: user.get('id') })
                }
                style={{ marginLeft: '2em', marginRight: '2em' }}
                variant='contained'
                disabled={getHasVoted.vote === option}
              >
                {option}
              </Button>
            ))
          : null}
      </div>
    </div>
  )
}

export default connect(null, { placeVoteData: placeVoteData })(VoteChart)
