import {serverAxios, axios} from "./apis/axios"

export const setAutoSchedule = (payload) => ({
  type: 'SET_AUTO_SCHEDULE/SCHEDULE',
  payload
})


export function getAutoSchedule (params) {
  // console.log('===================');
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: 'http://10.0.2.2:3000/automationSchedule'
      })
      // const response = await data.json()
      // console.log(data[0].food);
      dispatch(setAutoSchedule(data[0].food))
    } catch (error) {
      console.log(error)
    }
  }
}