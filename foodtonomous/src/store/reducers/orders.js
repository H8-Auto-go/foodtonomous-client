const initialState = {
  order: []
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'orders/createOrder':
      return {
        ...state,
        order: action.order
      }
    default:
      return state
  }
}

export default reducer
