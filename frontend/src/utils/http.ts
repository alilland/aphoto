import axios from 'axios'

export const API = axios.create({
  baseURL: process.env.PRIVATE_BACKEND_API,
  headers: {
    'Content-Type': 'application/json'
  }
})

const http = {
  API
}
export default http
