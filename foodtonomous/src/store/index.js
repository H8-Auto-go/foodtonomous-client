import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import favoriteFoodsReducer from './reducers/favoriteFood';
import restaurantsReducer from './reducers/restaurant';
import usersReducer from './reducers/users'

const rootReducer = combineReducers({
  favoriteFoods: favoriteFoodsReducer,
  restaurants: restaurantsReducer,
  users: usersReducer
})


const store = createStore(rootReducer, applyMiddleware(thunk))
export default store
