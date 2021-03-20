const initialState = {
  isAuthenticate: false
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'users/setIsAuthenticate':
      return {
        ...state,
        isAuthenticate: action.isAuthenticate
      }
    default:
      return state
  }
}

export default reducer
