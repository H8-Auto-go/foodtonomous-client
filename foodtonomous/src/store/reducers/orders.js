const initialState = {
  order: {},
  currentOrder: null
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'orders/createOrder':
      return {
        ...state,
        order: action.order
      }
    case 'orders/setOrder':
      console.log(action.order, '<<<<<<<<<<<<<<di reducer')
      return {
        ...state,
        currentOrder: action.order
      }
    default:
      return state
  }
}

export default reducer
