const initialState = {
  isAuthenticate: false,
  user: {},
  userId: "",
  driverId: "",
  messages: [{
    sender: 'user',
    text: 'Halo gan, masih dimana cuy'
  },
    {
      sender: 'user',
      text: 'cepetan dikit dong bang, dah lapar anjir'
    },{
    sender: 'driver',
      text: 'iya cu bentar ya, ini ngantri nya lama'
    },{
    sender: 'user',
      text: 'okedeh gue tunggu 5 mnit kalo ga dateng gue samperin kesana!'
    }]
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'users/setIsAuthenticate':
      return {
        ...state,
        isAuthenticate: action.isAuthenticate
      }
    case 'users/setMessages':
      return {
        ...state,
        messages: [...state.messages, action.message]
      }
    case 'users/setOrder':
      console.log(action.order, '><><><>')
      return {
        ...state,
        userId: action.order.socketUserId,
        driverId: action.order.socketDriverId
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
