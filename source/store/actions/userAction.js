import * as t from '../types'

export const setUserData = (data) => async (dispatch) => {

  dispatch({

    type: t.SET_USER_DATA,

    payload: data

  })

}


export const setTestedData = (data) => async (dispatch) => {

  dispatch({

    type: t.SET_TESTED_DATA,

    payload: data

  })

}


export const removeUserData = () => async (dispatch) => {

  dispatch({

    type: t.REMOVE_USER_DATA

  })

}