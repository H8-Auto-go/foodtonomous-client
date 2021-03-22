import {serverAxios, axios} from "./apis/axios"
import AsyncStorage from "@react-native-async-storage/async-storage";

export function register({email, password}) {
  return async () => {
    try {
      const avatar = await axios({
        method: "GET",
        url: `https://avatars.dicebear.com/api/avataaars/${user.name}.svg?style=circle`
      })
      await serverAxios({
        method: "POST",
        url: "/users/register",
        data: {
          avatar,
          email,
          password
        }
      })
    } catch(err) {
      console.log(err)
    }
  }
}

export function login(user, navigation) {
  return async () => {
    try {
      const {data} = await serverAxios({
        method: "POST",
        url: "/login/user",
        data: user
      })
      await AsyncStorage.setItem('access_token', JSON.stringify(data.access_token))
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
  return async () => {
    try {
      const {data} = await serverAxios({
        method: "POST",
        url: "/login/driver",
        data: driver
      })
      await AsyncStorage.setItem('access_token', JSON.stringify(data.access_token))
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
