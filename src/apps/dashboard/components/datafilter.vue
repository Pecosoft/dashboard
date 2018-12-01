<template lang="pug">
  .peco-data-filter
    el-form(:inline='true')
      el-form-item(label='开始日期')
        el-date-picker(v-model='filterForm.startDate' format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type='date' placeholder='选择开始日期')
      el-form-item(label='结束日期')
        el-date-picker(v-model='filterForm.endDate' format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type='date' placeholder='选择结束日期')
      el-form-item(v-for='col in cols' :key='col.prop' :label='col.label')
        el-select(v-model='filterForm[col.prop]' :placeholder='"请选择" + col.label' filterable remote :loading='loading' :remote-method='col.filter')
      el-form-item
        el-button(type='primary' @click='onSubmit') 查询
</template>

<script>
import moment from 'moment'

export default {
  props: {
    cols: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    let startDate = moment().startOf('month').format('YYYY-MM-DD')
    let endDate = moment().format('YYYY-MM-DD')
    let form = {
      startDate: startDate,
      endDate: endDate
    }
    this.cols.forEach(col => {
      form[col.prop] = ''
    })
    return {
      loading: false,
      filterForm: form
    }
  },
  methods: {
    getQuery () {
      return this.filterForm
    },
    onSubmit () {
      this.$emit('on-query', this.filterForm)
    }
  }
}
</script>
