import axios from 'axios'
import auth from './auth'

// 服务请求
const request = async (method, url, params = {}) => {
  let baseParams = auth.get()
  let realparams = Object.assign({}, baseParams, params)

  let res
  if (method === 'get' || method === 'delete') {
    res = await axios[method](url, { params: realparams })
  } else {
    res = await axios[method](url, realparams)
  }
  let data = res.data
  let errcode = parseInt(data.errcode)
  if (errcode) {
    if (errcode === 100) {
      auth.login()
    }
    console.error('[request]错误码: ', data.errcode, data.msg || '')
    return Promise.reject(data)
  }
  return data
}

export default request
