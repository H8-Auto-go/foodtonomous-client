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
        url: "/users/login",
        data: user
      })
      console.log(data);
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
