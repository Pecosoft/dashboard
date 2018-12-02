<template lang="pug">
  .peco-data-filter
    el-form(:inline='true' ref='form' :model='filterForm')
      el-row(v-for='(row, idx) in rowCols' :key='idx')
        el-col.align-right(v-for='col in row' :key='col.prop' :span='6' :offset='col.prop == "btns" ? (4 - row.length)*6 : 0')
          el-form-item(v-if='col.prop == "startDate"' :label='col.label')
            el-date-picker(v-model='filterForm.startDate' format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type='date' placeholder='选择开始日期')
          el-form-item(v-else-if='col.prop == "endDate"' :label='col.label')
            el-date-picker(v-model='filterForm.endDate' format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type='date' placeholder='选择结束日期')
          el-form-item(v-else-if='col.prop == "btns"')
            el-button(type='warning' @click='onReset') 重置
            el-button(type='primary' @click='onSubmit') 查询
          el-form-item(v-else :label='col.label')
            el-select(v-model='filterForm[col.prop]' :placeholder='"请选择" + col.label' filterable remote :loading='loading' :remote-method='col.filter')
              template(v-if='filterOpts[col.prop]')
                el-option(v-for='item in filterOpts[col.prop]'
                  :key='item.value'
                  :label='item.label'
                  :value='item.value')
</template>

<script>
import moment from 'moment'

export default {
  props: {
    source: {
      type: String
    },
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
  mounted () {
  },
  computed: {
    filterOpts () {
      if (!this.source) return {}
      return this.$store.state[this.source].filterOpts
    },
    rowCols () {
      let rowCols = [ [ { label: '开始日期', prop: 'startDate' }, { label: '结束日期', prop: 'endDate' } ] ]
      this.cols.forEach(col => {
        push(col)
      })
      push({ prop: 'btns' })
      function push (col) {
        let lastRow = rowCols[rowCols.length - 1]
        if (lastRow.length > 3) {
          rowCols.push([col])
        } else {
          lastRow.push(col)
        }
      }
      return rowCols
    }
  },
  methods: {
    getQuery () {
      return this.filterForm
    },
    onReset () {
      this.cols.forEach(col => {
        this.filterForm[col.prop] = ''
      })
      this.$refs['form'].resetFields()
    },
    onSubmit () {
      this.$emit('on-query', this.filterForm)
    },
    setLoading (loading) {
      this.loading = loading
    }
  }
}
</script>
