import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import favoriteFoodsReducer from './reducers/favoriteFood';
import restaurantsReducer from './reducers/restaurant';
import usersReducer from './reducers/users'
import scheduleReducer from './reducers/schedule'
import historyReducer from './reducers/historyFood'
import userPositionReducer from './reducers/userPosition'
// import historyFoodsReducer from './reducers/historyFood'
import orderReducer from './reducers/orders'
const rootReducer = combineReducers({
  favoriteFoods: favoriteFoodsReducer,
  restaurants: restaurantsReducer,
  users: usersReducer,
  schedule: scheduleReducer,
  historyFoods: historyReducer,
  userPosition: userPositionReducer,
  orders: orderReducer
  // historyFoods: historyFoodsReducer
})


const store = createStore(rootReducer, applyMiddleware(thunk))
export default store
