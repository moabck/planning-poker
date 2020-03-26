import axios from 'axios'

export const SIGN_IN_USER_LOADING = 'SIGN_IN_USER_LOADING'
export const SIGN_IN_USER_SUCCESS = 'SIGN_IN_USER_SUCCESS'
export const SIGN_IN_USER_FAILED = 'SIGN_IN_USER_FAILED'
export const CHANGE = 'CHANGE'
export const NO_CHANGE = 'NO_CHANGE'

export const authorizeUser = ({ username, password }) => (dispatch) => {
  dispatch({ type: SIGN_IN_USER_LOADING })
  return axios
    .get(`http://localhost:8080/api/sign-in/${username}/${password}`)
    .then((response) => {
      dispatch({ type: SIGN_IN_USER_SUCCESS, user: response.data.user, polls: response.data.polls})
    })
    .catch(() => dispatch({ type: SIGN_IN_USER_FAILED }))
}

export const checkForChange = ( polls ) => (dispatch) => {
  return axios
    .get(`http://localhost:8080/api/check-for-change/${polls.hashCode()}`)
    .then((response) => {
      if (response.data.change) {
        dispatch({ type: CHANGE, polls: response.data.polls})
      } else {
        dispatch({ type: NO_CHANGE })
      }
    })
}
