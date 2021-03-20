const initialState = {
  restaurants: []
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'restaurants/setRestaurant':
      return {
        ...state,
        restaurants: action.restaurants
      }
    default:
      return state
  }
}

export default reducer
