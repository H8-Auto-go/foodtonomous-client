const initialState = {
  order: [],
  availableOrder: null
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'orders/createOrder':
      return {
        ...state,
        order: action.order
      }
    case 'orders/setOrder':
      return {
        ...state,
        availableOrder: action.order
      }
    default:
      return state
  }
}

export default reducer
