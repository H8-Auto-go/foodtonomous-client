import {serverAxios, axios} from "./apis/axios"

export const setFavouriteFoods = (payload) => ({
    type: 'SET_FAVOURITEFOODS/FAVOURITESFOODS',
    payload
})

export function getFavouriteFoods () {
  return async (dispatch) => {
    try {
      const {data} = await serverAxios({
        method: "GET",
        url: '/favoriteFoods'
      })
      dispatch(setFavouriteFoods(data))
    } catch (error) {
      console.log(error)
    }
  }
}