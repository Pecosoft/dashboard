<template lang="pug">
  .peco-data-filter
    el-form(:inline='true')
      el-form-item(label='开始日期')
        el-date-picker(v-model='startDate' type='date' placeholder='选择开始日期')
      el-form-item(label='结束日期')
        el-date-picker(v-model='endDate' type='date' placeholder='选择结束日期')
      el-form-item(label='公司')
        el-select(v-model='company' placeholder='选择公司' filterable remote :loading='loading' :remote-method='remoteMethod')
      el-form-item
        el-button(type='primary' @click='onSubmit') 查询
</template>

<script>
export default {
  data () {
    return {
      startDate: '',
      endDate: '',
      company: '',
      loading: false
    }
  },
  methods: {
    remoteMethod (query) {
      console.log(query)
    },
    onSubmit () {

    }
  }
}
</script>
