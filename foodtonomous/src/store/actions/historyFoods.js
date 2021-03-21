import { serverAxios, axios } from './apis/axios'

export const setFavouriteFoods = (payload) => ({
    type: 'SET_HISTORYFOODS/HISTORYSFOODS',
    payload
})

export function getFavouriteFoods () {
  return async (dispatch) => {
    try {
      const {data} = await serverAxios({
        method: "GET",
        url: '/users/history'
      })
      // console.log('dari action favouriteFoods', data);
      dispatch(setFavouriteFoods(data))
    } catch (error) {
      console.log(error)
    }
  }
}