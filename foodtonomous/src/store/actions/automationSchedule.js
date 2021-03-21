import {serverAxios, axios} from "./apis/axios"

export const setAutoSchedule = (payload) => ({
  type: 'SET_AUTO_SCHEDULE/SCHEDULE',
  payload
})


export function getAutoSchedule (params) {
  // console.log('===================');
  return async (dispatch) => {
    try {
      const {data} = await serverAxios({
        method: "GET",
        url: '/automationSchedules'
      })
      // const response = await data.json()
      console.log('dari action', data);
      dispatch(setAutoSchedule(data.automationSchedules))
    } catch (error) {
      console.log(error)
    }
  }
}