import isDev from './isdev'

const remoteHost = '//api.taikan.pecosoft.cn'
const prefix = isDev ? '' : remoteHost

export const product = prefix + '/product'
export const repair = prefix + '/repair'
export const complain = prefix + '/complain'
export const suggest = prefix + '/suggest'
export const dsclerk = prefix + '/dsclerk'
export const gpleader = prefix + '/gpleader'
export const tcworker = prefix + '/tcworker'
export const manager = prefix + '/manager'
export const customer = prefix + '/customer'
export const user = prefix + '/user'
// 授权用户信息
export const authUser = prefix + '/auth_user'
// 授权登录
export const authLogin = '//login.taikan.pecosoft.cn/?app='
// 省市区数据
export const provinceCityArea = prefix + '/areas'
