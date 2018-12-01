/* eslint-disable */
import plainRows from 'utils/plainRows'
import services from '../../services'

export default {
  namespaced: true,
  state: {
    sourceData: [],
    total: 0
  },
  actions: {
    async fetch ({ state }, params) {
      let res = await services['employee'].fetch({args: params.args})
      let { data, count } = res
      if (params.reload) {
        data = plainRows(data)
        state.sourceData = data
        state.total = count
      } else if (data && data.length) {
        data = plainRows(data)
        state.sourceData = state.sourceData.concat(data)
        state.total += count
      }
      res.data = data
      return res
    }
  }
}
