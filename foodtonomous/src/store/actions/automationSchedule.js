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
      dispatch(setAutoSchedule(data.automationSchedules))
    } catch (error) {
      console.log(error)
    }
  }
}

export function addSchedule (form) {
  console.log(form);
  return async (dispatch) => {
    try {
      const {data} = await serverAxios({
        method: "POST",
        url: '/automationSchedules'
      })
      dispatch(getAutoSchedule())
    } catch (error) {
      console.log(error)
    }
  }
}
