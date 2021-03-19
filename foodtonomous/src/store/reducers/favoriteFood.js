const initialState = {
  favoriteFoods: []
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'favoriteFoods/setFavoriteFoods':
      return {
        ...state,
        favoriteFoods: action.favoriteFoods
      }
    case 'favororiteFoods/addFood':
      return {
        ...state,
        favoriteFoods: state.favoriteFoods.concat(action.newFavoriteFood)
      }
    case 'favoriteFoods/deleteFood':
      return {
        ...state,
        favoriteFoods: [...state.favoriteFoods].filter(food => food.id !== action.foodId)
      }
    default:
      return state
  }
}

export default reducer
