import {serverAxios, axios} from "./apis/axios"

export const setUserPosition = (payload) => ({
    type: 'SET_USERPOSITION/USERPOSITION',
    payload
})


export const setmarkerPosition = (payload) => ({
    type: 'SET_MARKERPOSITION/MARKERPOSITION',
    payload
})

export const setRestauranPosiion = (payload) => ({
    type: 'SET_RESTAURANTPOSITION/RESTAURANTPOSITION',
    payload
})

export function getOrderData () {
  return async (dispatch) => {
    try {
      const {data} = await serverAxios({
        method: "GET",
        url: '/orders'
      })
      dispatch(setmarkerPosition(data.driver))
      dispatch(setRestauranPosiion(data.restaurant))
    //   console.log(data.driver);
    //   console.log(data.restaurant);
    //   console.log(data.food);
    // //   dispatch(setFavouriteFoods(data))
    } catch (error) {
      console.log(error)
    }
  }
}