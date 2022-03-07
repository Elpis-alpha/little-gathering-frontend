import { SET_COMMENT_SHOW, SET_COMMENT_VALUE, SET_COMMENT_EDIT } from '../types';

const initState = {

  show: "", value: "", edit: false

}


const commentReducer = (state = initState, action) => {

  switch (action.type) {

    case SET_COMMENT_SHOW:

      return { ...state, show: action.payload, value: "", edit: false }

    case SET_COMMENT_VALUE:

      return { ...state, value: action.payload }

    case SET_COMMENT_EDIT:

      return { ...state, edit: action.payload.edit, show: action.payload.show, value: action.payload.value }

    default:

      return { ...state }
  }

}

export default commentReducer;