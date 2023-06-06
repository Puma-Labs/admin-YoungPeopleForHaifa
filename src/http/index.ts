import axios from 'axios'

// export const BACKEND = 'http://134.209.103.158'
export const BACKEND = 'http://localhost:5003'

export const API_URL = `${BACKEND}/api/v1`

// export const API_URL = '/api/v1'
// export const BACKEND = '/'

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

$api.interceptors.request.use((config: any) => {
  config.headers.Authorization = `bearer ${localStorage.getItem('token')}`
  return config
})

export const $public = (url: string) => {
  if (url[0] === '/' && BACKEND[BACKEND.length - 1] === '/') {
    url = url.substring(1)
    console.log('url:::', url)
    return `${BACKEND}${url}`
  } else if (url[0] !== '/' && BACKEND[BACKEND.length - 1] !== '/') {
    return `${BACKEND}/${url}`
  } else {
    return `${BACKEND}${url}`
  }

}

export default $api
