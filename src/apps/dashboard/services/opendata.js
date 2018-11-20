import request from './request'
import { provinceCityArea as provinceCityAreaResource } from './resources'

export const provinceCityArea = async _ => {
  let resData = await request('post', provinceCityAreaResource)
  return resData
}
