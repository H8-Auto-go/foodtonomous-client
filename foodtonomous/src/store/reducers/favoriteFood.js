const initialState = {
  favoriteFoods: []
}

function reducer(state = initialState, {type, payload}) {
  switch(type) {
    case 'SET_FAVOURITEFOODS/FAVOURITESFOODS':
      return {
        ...state,
        favoriteFoods: payload
      }
    case 'favororiteFoods/addFood':
      return {
        ...state,
        favoriteFoods: state.favoriteFoods.concat(payload)
      }
    case 'favoriteFoods/deleteFood':
      return {
        ...state,
        favoriteFoods: [...state.favoriteFoods].filter(food => food.id !== payload)
      }
    default:
      return state
  }
}

export default reducer
