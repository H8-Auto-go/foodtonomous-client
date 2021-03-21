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
      console.log('ini login user')
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
      console.log('ini login driver')
      const {data} = await serverAxios({
        method: "POST",
        url: "/login/driver",
        data: driver
      })
      console.log(data);
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
      console.log(access_token, '>>>>>> 319283718943')
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
