<template lang="pug">
.peco-curd-container
  peco-datafilter
  peco-datagrid(source='complain')
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
