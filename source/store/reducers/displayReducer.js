import * as t from '../types'

const initState = {

  loader: {

    showLoader: true,

    loaderText: "Welcome to Little Gathering"

  }


}


const displayReducer = (state = initState, action) => {

  switch (action.type) {

    case t.SET_DIS_SHOW_LOADER:

      return { ...state, loader: { ...state.loader, showLoader: action.payload } }

    case t.SET_DIS_SHOW_LOADER_TEXT:

      return { ...state, loader: { ...state.loader, loaderText: action.payload } }

    default:

      return { ...state }
  }

}

export default displayReducer;