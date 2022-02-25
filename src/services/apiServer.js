import axios from 'axios'

export default axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
