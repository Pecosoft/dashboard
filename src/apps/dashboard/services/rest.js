import request from './request'

export default class Rest {
  constructor (resource) {
    this.resource = resource
  }

  async create (data) {
    let resData = await request('post', this.resource, data)
    return resData
  }

  async update (id, data) {
    let resData = await request('put', this.resource + '/' + id, data)
    return resData
  }

  async read (id, params = {}) {
    let resData = await request('get', this.resource + '/' + id, params)
    return resData
  }

  async delete (id) {
    let resData = await request('delete', this.resource + '/' + id)
    return resData
  }

  async fetch (params = {}) {
    let resData = await request('get', this.resource, params)
    return resData
  }
}
