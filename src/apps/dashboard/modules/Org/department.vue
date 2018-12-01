<template lang="pug">
.peco-curd-container
  .peco-toolbar
    el-button(type='primary' icon='el-icon-download' @click='doExport') 导出EXCEL
  peco-datagrid(ref='datagrid' source='department' :cols='cols' :delta-height='188')
</template>

<script>
import PecoDatafilter from '../../components/datafilter'
import PecoDatagrid from '../../components/datagrid'
import timestampToText from 'filters/timestampToText'

export default {
  components: {
    PecoDatafilter,
    PecoDatagrid
  },
  data () {
    return {
      cols: [
        {
          label: '上级部门',
          prop: 'parent_name'
        },
        {
          label: '部门名称',
          prop: 'name'
        },
        {
          label: '部门负责人',
          prop: 'leader_name'
        },
        {
          label: '添加时间',
          prop: 'create_time',
          width: 160,
          formatter (row, column, cellValue, index) {
            return cellValue ? timestampToText(cellValue) : '-'
          }
        }
      ]
    }
  },
  mounted () {
    this.$refs.datagrid.reload()
  },
  methods: {
    doExport () {
      this.$refs.datagrid.exportExcel('部门')
    }
  }
}
</script>
