import * as t from '../types'

export const setShowLoader = (value) => async (dispatch) => {

  dispatch({

    type: t.SET_DIS_SHOW_LOADER,

    payload: value

  })

}


export const setShowLoaderText = (text) => async (dispatch) => {

  dispatch({

    type: t.SET_DIS_SHOW_LOADER_TEXT,

    payload: text

  })

}

