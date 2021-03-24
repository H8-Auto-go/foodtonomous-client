import {serverAxios, axios} from "./apis/axios"

export const setAutoSchedule = (payload) => ({
  type: 'SET_AUTO_SCHEDULE/SCHEDULE',
  payload
})


export function getAutoSchedule (form) {
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

export function addSchedule (form, navigation) {
  // console.log(form);
  return async (dispatch) => {
    try {
      const {data} = await serverAxios({
        method: "POST",
        url: '/automationSchedules/',
        data: {
          time: form.time,
          isActive: form.isActive,
          restaurantId: form.restaurantId,
          foodId: form.foodId
        }
      })
      navigation.navigate('Home')
      // dispatch(getAutoSchedule())
    } catch (error) {
      console.log(error)
    }
  }
}

export function updateScheduleStatus({id, isActive}) {
  return async (dispatch) => {
    try {
      console.log('testing')
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


export function deleteSchedule(id) {
  return async (dispatch) => {
    try {
      console.log(id, '<<<< id delete')
      const { data } = await serverAxios({
        method: 'DELETE',
        url: '/automationSchedules/' + id,
      })
      console.log('berhasil hapus =========================')
      dispatch(getAutoSchedule())
    } catch(err) {
      console.log(err)
    }
  }
}