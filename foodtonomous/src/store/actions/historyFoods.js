import { serverAxios, axios } from './apis/axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
export const setHistoryFoods = (payload) => ({
    type: 'SET_HISTORYFOODS/HISTORYSFOODS',
    payload
})

export function getHistoryFoods () {
  return async (dispatch) => {
    try {
      const access_token = JSON.parse(await AsyncStorage.getItem('access_token'))
      const {data} = await serverAxios({
        method: "GET",
        url: '/orders/history',
        headers: {access_token}
      })
      dispatch(setHistoryFoods(data))
    } catch (error) {
      console.log(error)
    }
  }
}
