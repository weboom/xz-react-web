import { combineReducers } from 'redux'
import { user } from './user.redux'
import { chat } from './chat.redux'

export default combineReducers({
  user,
  chat
})