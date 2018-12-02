/* eslint-disable */
import plainRows from 'utils/plainRows'
import services from '../../services'
import request from '../../services/request'
import { fieldCustomerName, fieldCustomerContact, fieldCustomerCompany, fieldMachineSn } from '../../services/resources'

const fieldResMap = {
  'customer_name': fieldCustomerName,
  'customer_contact': fieldCustomerContact,
  'customer_company': fieldCustomerCompany,
  'machine_sn': fieldMachineSn
}

export default {
  namespaced: true,
  state: {
    sourceData: [],
    total: 0,
    filterOpts: {
      customer_name: [],
      customer_contact: [],
      customer_company: [],
      machine_sn: [],
      status: [
        {
          label: '受理中',
          value: 1
        },
        {
          label: '结案完',
          value: 2
        }
      ]
    }
  },
  actions: {
    async fetch ({ state }, params) {
      let res = await services['repair'].fetch({args: params.args})
      let { data, count } = res
      if (params.reload) {
        // data = plainRows(data)
        state.sourceData = data
        state.total = count
      } else if (data && data.length) {
        // data = plainRows(data)
        state.sourceData = state.sourceData.concat(data)
        state.total += count
      }
      res.data = data
      return res
    },
    async filterQuery ({ state }, params) {
      let { field, query } = params
      let resource = fieldResMap[field]
      if (!resource) return
      let res = await request('post', resource, { query })
      let { data, count } = res

      state.filterOpts[field] = data || []
      console.log(state.filterOpts)
      return res.data
    }
  }
}
