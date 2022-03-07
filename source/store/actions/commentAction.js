import { SET_COMMENT_EDIT, SET_COMMENT_SHOW, SET_COMMENT_VALUE } from '../types';


export const setCommentShow = (_id) => async (dispatch) => {

  dispatch({

    type: SET_COMMENT_SHOW,

    payload: _id

  })

}


export const setCommentValue = (text) => async (dispatch) => {

  dispatch({

    type: SET_COMMENT_VALUE,

    payload: text

  })

}


export const setCommentEdit = (data) => async (dispatch) => {

  dispatch({

    type: SET_COMMENT_EDIT,

    payload: data

  })

}