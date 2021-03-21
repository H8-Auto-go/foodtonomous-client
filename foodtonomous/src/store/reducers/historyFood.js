const initialState = {
    historyFoods: []
  }

  function reducer(state = initialState, {type, payload}) {
    switch(type) {
      case 'SET_HISTORYFOODS/HISTORYSFOODS':
        return {
          ...state,
          favoriteFoods: payload
        }
      default:
        return state
    }
  }
  
  export default reducer
  