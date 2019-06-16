import { combineReducers } from 'redux'

import { mainReducer as main } from './main'
import { userReducer as user } from './user'

export const rootReducer = combineReducers({
  main,
  user,
})
