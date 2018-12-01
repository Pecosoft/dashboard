/* eslint-disable */
import plainRows from 'utils/plainRows'
import services from '../../services'

function mergeChildren (list) {
  let mergeList = []
  for (let i = 0, len = list.length; i < len; i++) {
    let cate_name = list[i].name
    mergeList = mergeList.concat(list[i].children.map(item => {
      item.cate_name = cate_name
      return item
    }))
  }
  return mergeList
}

export default {
  namespaced: true,
  state: {
    sourceData: [],
    total: 0
  },
  actions: {
    async fetch ({ state }, params) {
      let res = await services['product'].fetch({args: params.args})
      let { data, count } = res
      if (params.reload) {
        data = mergeChildren(data)
        state.sourceData = data
        state.total = count
      } else if (data && data.length) {
        data = mergeChildren(data)
        state.sourceData = state.sourceData.concat(data)
        state.total += count
      }
      res.data = data
      return res
    }
  }
}
