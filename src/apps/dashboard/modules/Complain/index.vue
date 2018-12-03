<template lang="pug">
.peco-curd-container
  peco-datafilter(ref='datafilter' :cols='filterCols' @on-query='onQuery')
  .peco-toolbar
    el-button(type='primary' icon='el-icon-download' @click='doExport') 导出EXCEL
  peco-datagrid(ref='datagrid' source='complain' :cols='cols')
</template>

<script>
import PecoDatafilter from '../../components/datafilter'
import PecoDatagrid from '../../components/datagrid'
import timestampToText from 'filters/timestampToText'
import statusToText from 'filters/complainStatus'

export default {
  components: {
    PecoDatafilter,
    PecoDatagrid
  },
  data () {
    return {
      filterCols: [
      ],
      cols: [
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
          prop: 'user_intro',
          width: 200
        },
        {
          label: '投诉描述',
          prop: 'description'
        },
        {
          label: '联系方式',
          prop: 'contact',
          width: 100
        },
        {
          label: '处理状态',
          prop: 'status',
          width: 100,
          styleclass: 'redcell',
          formatter (row, column, cellValue, index) {
            return statusToText(cellValue)
          }
        },
        {
          label: '投诉时间',
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
      this.$refs.datagrid.exportExcel('客户投诉')
    },
    onQuery (query) {
      console.log('提交查询', query)
      this.$refs.datagrid.reload(Object.assign({}, { }, query))
    }
  }
}
</script>
