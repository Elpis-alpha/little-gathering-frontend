import { combineReducers } from 'redux'

import userReducer from './userReducer'

import displayReducer from './displayReducer'

import commentReducer from './commentReducer'




const rootReducer = combineReducers({

  user: userReducer,

  commentForm: commentReducer,

  display: displayReducer

})

export default rootReducer;