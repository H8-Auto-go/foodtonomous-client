import axios from 'axios'

const serverAxios = axios.create({
  baseURL: 'http://10.0.2.2:3000'
})

export {
  serverAxios,
  axios
}
