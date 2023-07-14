import axios from 'axios'
import i18n from 'i18n'

export const apiEndpoint = process.env.REACT_APP_API_ENDPOINT

export const getLangConfig = () => {
  return {
    headers: { 'Accept-Language': i18n.language || 'en' },
  }
}

const http = axios.create({
  baseURL: apiEndpoint,
  ...getLangConfig(),
})

export default http

export const get = (path: any) => http.get(path, {}).then((resp) => resp.data)
export const post = (path: any, data: any, config: any) =>
  http.post(path, data, config).then((resp) => resp.data)

export const makeUrl = (path: any) => `${apiEndpoint}${path}`
