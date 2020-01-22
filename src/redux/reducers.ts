import { combineReducers } from 'redux'
import { user } from './user.redux'
import { chat } from './chat.redux'
import { reducer as AccountReducer } from './account.redux'
import { reducer as FollowReducer } from './follow.redux'

export default combineReducers({
  user,
  chat,
  follow: FollowReducer,
  account: AccountReducer
})