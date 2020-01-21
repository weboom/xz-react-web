import { combineReducers } from 'redux'
import { user } from './user.redux'
import { chat } from './chat.redux'
import { reducer as AccountReducer } from './account.redux'

export default combineReducers({
  user,
  chat,
  account: AccountReducer
})