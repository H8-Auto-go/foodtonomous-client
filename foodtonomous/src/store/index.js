import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import favoriteFoodsReducer from './reducers/favoriteFood';
import restaurantsReducer from './reducers/restaurant';
import usersReducer from './reducers/users'
import scheduleReducer from './reducers/schedule'

const rootReducer = combineReducers({
  favoriteFoods: favoriteFoodsReducer,
  restaurants: restaurantsReducer,
  users: usersReducer,
  schedule: scheduleReducer,
})


const store = createStore(rootReducer, applyMiddleware(thunk))
export default store
