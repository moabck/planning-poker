import { SIGN_IN_USER_SUCCESS, SIGN_IN_USER_LOADING, SIGN_IN_USER_FAILED } from './actions.js'
import { PLACE_VOTE_SUCCESS, PLACE_VOTE_LOADING, PLACE_VOTE_FAILED } from '../components/actions.js'
import { CREATE_POLL_SUCCESS, CREATE_POLL_LOADING, CREATE_POLL_FAILED } from '../components/actions.js'
import { SIGN_OUT_USER } from '../components/actions.js'
import { CHANGE, NO_CHANGE } from './actions.js'
import { Map } from 'immutable'
import Immutable from 'immutable'
const rootReducer = (state = Map(), action) => {
  switch (action.type) {
    case SIGN_IN_USER_SUCCESS:
      state = state.set('user', Immutable.fromJS(action.user))
      return state.set('polls', Immutable.fromJS(action.polls || []))
    case SIGN_IN_USER_FAILED:
      return state.set('signInFailed', true)
    case SIGN_IN_USER_LOADING:
      return state.set('loading', true)
    case SIGN_OUT_USER:
      return state.set('user', undefined)
    case PLACE_VOTE_SUCCESS:
      return state.set('polls', Immutable.fromJS(action.polls || []))
    case PLACE_VOTE_LOADING:
      return state.set('loading', true)
    case CREATE_POLL_SUCCESS:
      return state.set('polls', Immutable.fromJS(action.polls || []))
    case CREATE_POLL_LOADING:
      return state.set('loading', true)
    case CHANGE:
      return state.set('polls', Immutable.fromJS(action.polls || []))
    case NO_CHANGE:
    case PLACE_VOTE_FAILED:
    case CREATE_POLL_FAILED:
    default:
      return state
  }
}

export default rootReducer