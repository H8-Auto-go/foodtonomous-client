const initialState = {
  isAuthenticate: false,
  user: {}
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'users/setIsAuthenticate':
      return {
        ...state,
        isAuthenticate: action.isAuthenticate
      }
      case 'users/setUser':
        return {
          ...state,
          user: action.user
        }
    default:
      return state
  }
}

export default reducer
