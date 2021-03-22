import {serverAxios, axios} from "./apis/axios"
import socket from './apis/socket'
export function createOrder(order) {
  return async () => {
    try {
      socket.emit('create order', order)
    } catch(err) {
      console.log(err)
    }
  }
}

export function getOrder(orderId) {
  return async (dispatch) => {
    try {
      const {data} = await serverAxios({
        method: 'GET',
        url: '/orders/' + orderId
      })
      console.log(data, 'ADADADAD>??>?>?>?>>?')
      dispatch({type: 'users/setOrder', order: data})
    } catch(err) {
      console.log(err)
    }
  }
}
