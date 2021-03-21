import {serverAxios, axios} from "./apis/axios"
import socket from './apis/socket'
export function createOrder(order) {
  return async () => {
    try {
      // console.log(order, '<<diacorder')
      socket.emit('create order', order)
    } catch(err) {
      console.log(err)
    }
  }
}

export function getOrder() {
  return async (dispatch) => {
    try {
      socket.on('broadcast', order => {
        alert(order)
        dispatch({ type: 'orders/setOrder', order })
      })
      socket.on('hello', message => {
        alert(message)
      })
    } catch(err) {
      console.log(err)
    }
  }
}
