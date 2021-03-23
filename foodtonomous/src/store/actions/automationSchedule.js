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
      console.log(data, '<<<< auto scedule')
      dispatch(setAutoSchedule(data.automationSchedules))
    } catch (error) {
      console.log(error)
    }
  }
}

export function addSchedule (form) {
  return async (dispatch) => {
    try {
      const {data} = await serverAxios({
        method: "POST",
        url: '/automationSchedules',
        data: form
      })
      // dispatch(getAutoSchedule())
    } catch (error) {
      console.log(error)
    }
  }
}

export function updateScheduleStatus({id, isActive}) {
  return async (dispatch) => {
    try {
      const { data } = await serverAxios({
        method: 'PATCH',
        url: '/automationSchedules/' + id,
        data: {isActive}
      })
    } catch(err) {
      console.log(err)
    }
  }
}
