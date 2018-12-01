<template lang="pug">
.peco-curd-container
  peco-datafilter(ref='datafilter' :cols='filterCols' @on-query='onQuery')
  .peco-toolbar
    el-button(type='primary' icon='el-icon-download' @click='doExport') 导出EXCEL
  peco-datagrid(ref='datagrid' source='repair' :cols='cols')
</template>

<script>
import PecoDatafilter from '../../components/datafilter'
import PecoDatagrid from '../../components/datagrid'
import timestampToText from 'filters/timestampToText'
import statusToText from 'filters/statusToText'

export default {
  components: {
    PecoDatafilter,
    PecoDatagrid
  },
  data () {
    return {
      filterCols: [
        {
          label: '公司',
          prop: 'company',
          filter (value, row, column) {
            console.log('搜索：', value)
          }
        }
      ],
      cols: [
        {
          label: '订单号',
          prop: 'sn',
          width: 200
        },
        {
          label: '订单状态',
          prop: 'status',
          width: 100,
          styleclass: 'redcell',
          formatter (row, column, cellValue, index) {
            return statusToText(cellValue)
          }
        },
        {
          label: '报修产品',
          prop: 'product_name',
          width: 120
        },
        {
          label: '客户姓名',
          prop: 'user_name',
          width: 100
        },
        {
          label: '客户手机',
          prop: 'user_mobile',
          width: 120
        },
        {
          label: '客户公司',
          prop: 'user_company',
          width: 200
        },
        {
          label: '省市区',
          prop: 'user_addr',
          width: 160
        },
        {
          label: '详细地址',
          prop: 'user_block',
          width: 160
        },
        {
          label: '申请报修时间',
          prop: 'create_time',
          width: 160,
          formatter (row, column, cellValue, index) {
            return timestampToText(cellValue)
          }
        }
      ]
    }
  },
  mounted () {
    let query = this.$refs.datafilter.getQuery()
    this.$refs.datagrid.reload(query)
  },
  methods: {
    doExport () {
      this.$refs.datagrid.exportExcel('客户报修')
    },
    onQuery (query) {
      console.log('提交查询', query)
      this.$refs.datagrid.reload(Object.assign({}, { company: 'pecosoft' }, query))
    }
  }
}
</script>
