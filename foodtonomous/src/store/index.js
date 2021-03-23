import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import favoriteFoodsReducer from './reducers/favoriteFood';
import restaurantsReducer from './reducers/restaurant';
import usersReducer from './reducers/users'
import scheduleReducer from './reducers/schedule'
import historyReducer from './reducers/historyFood'
import userPositionReducer from './reducers/userPosition'
import orderReducer from './reducers/orders'
import destinationReducer from './reducers/dataDestination'
const rootReducer = combineReducers({
  favoriteFoods: favoriteFoodsReducer,
  orders: orderReducer,
  restaurants: restaurantsReducer,
  users: usersReducer,
  schedule: scheduleReducer,
  historyFoods: historyReducer,
  userPosition: userPositionReducer,
  orders: orderReducer,
  destination: destinationReducer
})


const store = createStore(rootReducer, applyMiddleware(thunk))
export default store
