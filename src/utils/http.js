import qs from 'qs'
import axios from 'axios'
import cookies from 'js-cookie'
import Url from 'url-parse'
import * as store from 'store'

axios.interceptors.request.use(
  function (config) {
    const token = store.get('token') || ''

    const url = new Url(config.url, true)
    url.query.token = token
    config.url = url.toString()

    if (!config.data) {
      config.data = {}
    }
    
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    let res = response.data
    if (+res.retCode === 0) {
      res.success = true
    }
    return res
  },
  error => {
    Promise.reject(error)
  }
)

export default axios
