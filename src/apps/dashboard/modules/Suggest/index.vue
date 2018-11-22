<template lang="pug">
.peco-curd-container
  peco-datafilter
  .peco-toolbar
    el-button(type='primary' icon='el-icon-download') 导出EXCEL
  peco-datagrid(source='suggest')
</el-breadcrumb>
</template>

<script>
import PecoDatafilter from '../../components/datafilter'
import PecoDatagrid from '../../components/datagrid'

export default {
  components: {
    PecoDatafilter,
    PecoDatagrid
  },
  data () {
    return {
    }
  },
  mounted () {
  }
}
</script>
