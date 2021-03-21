import { serverAxios, axios } from './apis/axios'

export const setHistoryFoods = (payload) => ({
    type: 'SET_HISTORYFOODS/HISTORYSFOODS',
    payload
})

export function getHistoryFoods () {
  return async (dispatch) => {
    try {
      const {data} = await serverAxios({
        method: "GET",
        url: '/users/history'
      })
      dispatch(setHistoryFoods(data))
    } catch (error) {
      console.log(error)
    }
  }
}
