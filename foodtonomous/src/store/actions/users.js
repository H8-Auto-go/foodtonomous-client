import {serverAxios, axios} from "./apis/axios"
import AsyncStorage from "@react-native-async-storage/async-storage";

export function register(payload, navigation) {
  console.log(payload);
  console.log('kesini 1');
  return async () => {
    try {
      console.log('kesini 2');
      const { data } = await serverAxios({
        method: "POST",
        url: "/register",
        data: payload
      })
      console.log(data);
      navigation.navigate('LoginPage')
    } catch(err) {
      console.log('kesini 3');
      console.log(err)
    }
  }
}

export function login(user, navigation) {
  return async (dispatch) => {
    try {
      const {data} = await serverAxios({
        method: "POST",
        url: "/login/user",
        data: user
      })
      await AsyncStorage.setItem('access_token', JSON.stringify(data.access_token))
      dispatch(getUserData())
      navigation.navigate('Home')
    } catch(err) {
      console.log(err)
    }
  }
}

export function logout(navigation) {
  return async () => {
    try {
      await AsyncStorage.removeItem('access_token')
      navigation.navigate('LoginPage')
    } catch(err) {
      console.log(err)
    }
  }
}


export function loginDriver(driver, navigation) {
  return async (dispatch) => {
    try {
      const {data} = await serverAxios({
        method: "POST",
        url: "/login/driver",
        data: driver
      })
      await AsyncStorage.setItem('access_token', JSON.stringify(data.access_token))
      dispatch(getUserData())
      navigation.navigate('Home')
    } catch(err) {
      console.log(err)
    }
  }
}

export function getUserData() {
  return async (dispatch) => {
    try {
      const access_token = JSON.parse(await AsyncStorage.getItem('access_token'))
      const {data} = await serverAxios({
        method: "GET",
        url: "/users",
        headers: {access_token}
      });
      dispatch({ type: "users/setUser", user:data })
    } catch(err) {
      console.log(err)
    }
  }
}

export function setMessages(message) {
  return (dispatch) => {
    dispatch({type: "users/setMessages", message})
  }
}
