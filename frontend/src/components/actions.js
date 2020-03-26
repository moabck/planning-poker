import axios from 'axios'

export const PLACE_VOTE_LOADING = 'PLACE_VOTE_LOADING'
export const PLACE_VOTE_SUCCESS = 'PLACE_VOTE_SUCCESS'
export const PLACE_VOTE_FAILED = 'PLACE_VOTE_FAILED'

export const CREATE_POLL_LOADING = 'CREATE_POLL_LOADING'
export const CREATE_POLL_SUCCESS = 'CREATE_POLL_SUCCESS'
export const CREATE_POLL_FAILED = 'CREATE_POLL_FAILED'

export const SIGN_OUT_USER = 'SIGN_OUT_USER'

export const signOutUser = () => (dispatch) => {
  dispatch({type: SIGN_OUT_USER})
}

export const placeVoteData = ({ poll, option, userId }) => (dispatch) => {
  dispatch({ type: PLACE_VOTE_LOADING })
  return axios
    .post('http://localhost:8080/api/vote', [poll, option, userId])
    .then((response) => {
      dispatch({ type: PLACE_VOTE_SUCCESS, polls: response.data.polls })
    })
    .catch(() => dispatch({ type: PLACE_VOTE_FAILED }))
}

export const createPoll = ({pollId, creationDate, title, description, creator, options}) => (dispatch) => {
  dispatch({ type: CREATE_POLL_LOADING })
  return axios
    .post('http://localhost:8080/api/create-new-poll', [pollId, creationDate, title, description, creator, options])
    .then((response) => {
      dispatch({ type: CREATE_POLL_SUCCESS, polls: response.data.polls })
    })
    .catch(() => dispatch({ type: CREATE_POLL_FAILED }))
}