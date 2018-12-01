<template lang="pug">
.peco-curd-container
  .peco-toolbar
    el-button(type='primary' icon='el-icon-download' @click='doExport') 导出EXCEL
  peco-datagrid(ref='datagrid' source='product' :cols='cols' :delta-height='188')
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
          label: '产品分类',
          prop: 'cate_name'
        },
        {
          label: '产品型号',
          prop: 'name'
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
      this.$refs.datagrid.exportExcel('产品')
    }
  }
}
</script>
