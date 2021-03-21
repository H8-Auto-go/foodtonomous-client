const initialState = {
    userPosition: {},
    markerPosition: {},
    restaurantPosition: {},
    orderedFood: {}
  }
  
  function reducer(state = initialState, {type, payload}) {
    switch(type) {
      case 'SET_USERPOSITION/USERPOSITION':
        return {
          ...state,
          userPosition: payload
        }
      case 'SET_MARKERPOSITION/MARKERPOSITION':
        return {
          ...state,
          markerPosition: payload
        }
      case 'SET_RESTAURANTPOSITION/RESTAURANTPOSITION':
        return {
          ...state,
          restaurantPosition: payload
        }
      case 'SET_ORDEREDFOOD/ORDEREDFOOD':
      return {
        ...state,
          orderedFood: payload
      }
      default:
        return state
    }
  }
  
  export default reducer
  