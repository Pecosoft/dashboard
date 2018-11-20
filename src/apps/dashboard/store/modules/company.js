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
    async fetch ({ state }, { start, end }) {
      let res = await services['company'].fetch({ start, end })
      let { data, count } = res
      if (data && data.length) {
        data = plainRows(data)
        state.sourceData = state.sourceData.concat(data)
        state.total = count
        res.data = data
      }
      return res
    }
  }
}
