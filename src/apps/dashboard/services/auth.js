/* eslint-disable */
import Cookie from 'js-cookie'
import axios from 'axios'
import { authUser, authLogin } from './resources'

const auth = {
  login () {
    let app = 'dashboard'
    let loginUrl = authLogin + app

    return location.href = loginUrl
  },
  set (query) {
    let { app, access_token } = query

    if (!access_token) {
      access_token = Cookie.get('access_token')
      if (!access_token) return auth.login()
    } else {
      Cookie.set('access_token', access_token)
      if (!app) {
        app = 'dashboard'
      }
      Cookie.set('app', app)
    }
  },
  async user (app) {
    let access_token = Cookie.get('access_token') || '-'
    if (app === undefined) {
      app = 'dashboard'
    }

    if (!access_token) {
      return auth.login()
    }

    let res = await axios.post(authUser, { app, access_token })
    let { errcode, data } = res.data

    if (errcode == 100) {
      return auth.login()
    }
    return data
  },
  get () {
    let app = Cookie.get('app') || '-'
    let access_token = Cookie.get('access_token') || '-'
    let timestamp = parseInt(new Date().getTime() / 1000)
    let signature = this.signature(app, access_token, timestamp)
    return {
      app,
      access_token,
      timestamp,
      signature
    }
  },
  signature (app, access_token, timestamp) {
    return [app, access_token, timestamp].sort().join('')
  }
}

export default auth
