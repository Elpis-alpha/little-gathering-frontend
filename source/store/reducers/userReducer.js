import * as t from '../types'

const initState = {

  available: false,

  data: {},

  tested: false,

}


const userReducer = (state = initState, action) => {

  switch (action.type) {

    case t.SET_USER_DATA:

      return { ...state, data: action.payload, available: true }

    case t.SET_TESTED_DATA:

      return { ...state, tested: true }

    case t.REMOVE_USER_DATA:

      return { ...state, data: {}, available: false }

    default:

      return { ...state }
  }

}

export default userReducer;