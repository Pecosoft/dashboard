<template lang="pug">
  .peco-data-grid
    el-table(
      :data='tableData'
      :height='tableHeight'
      style='width: 100%'
      stripe
      border
      highlight-current-row
    )
      el-table-column(type='selection' v-if='tableData.length' fixed :width='40' align='center' header-align='center')
      template(v-for='(field, key) in fields')
        el-table-column(
          v-if='fieldFormatter(field) == "time"'
          :prop='field'
          :label='fieldLabel(field)'
          :width='fieldWidth(field)'
          :formatter='timeFormatter'
        )
        el-table-column(
          v-else
          :prop='field'
          :label='fieldLabel(field)'
          :width='fieldWidth(field)'
        )

    el-pagination(
      layout='total, sizes, prev, pager, next, jumper'
      :total='total'
      :page-size='pageSize'
      :current-page='currentPage'
      @size-change='handleOnSizeChange'
      @current-change='handleOnCurrentChange'
    )
</template>

<script>
import parseFieldsFromRowData from 'utils/parseFieldsFromRowData'
import winHeight from 'utils/winHeight'
import pagerNeed from 'utils/pagerNeed'
import { on, off } from 'utils/dom'
import timestampToText from 'filters/timestampToText'
import fieldLabel from '../config/fieldLabel'
import fieldWidth from '../config/fieldWidth'
import fieldFormatter from '../config/fieldFormatter'

export default {
  props: {
    source: {
      type: String
    },
    deltaHeight: {
      type: Number,
      default: 127
    }
  },
  data () {
    let winH = winHeight()
    return {
      tableHeight: winH - 127,
      fields: [],
      pageSize: 10,
      currentPage: 1
    }
  },
  watch: {
    deltaHeight (newVal) {
      this.tableHeight = winHeight() - newVal
    }
  },
  created () {
    this.$Progress.start()
    this.$store.dispatch(this.source + '/fetch', { start:0, end: 100 }).then(res => {
      this.$Progress.finish()
      if (!this.fields.length) {
        let { data } = res
        this.fields = parseFieldsFromRowData(data[0])
      }
    }).catch(error => {
      this.$Progress.fail()
    })
  },
  mounted () {
    // let that = this
    // on(window, 'resize', function () {
    //   that.tableHeight = winHeight() - that.deltaHeight
    // })
  },
  computed: {
    total () {
      return this.$store.state[this.source].total
    },
    sourceData () {
      return this.$store.state[this.source].sourceData
    },
    tableData () {
      let { pageSize, currentPage, sourceData } = this
      let start = (currentPage-1) * pageSize
      let end = start + pageSize
      return sourceData.slice(start, end)
    }
  },
  methods: {
    fieldLabel (field) {
      return fieldLabel[field] || field
    },
    fieldWidth (field) {
      return fieldWidth[field] ? fieldWidth[field] + 'px' : ''
    },
    fieldFormatter (field) {
      return fieldFormatter[field] || ''
    },
    timeFormatter (row, column, cellValue, index) {
      return timestampToText(cellValue)
    },
    handleOnSizeChange (pageSize) {
      let { currentPage, sourceData } = this
      let needPager = pagerNeed(sourceData, currentPage, pageSize)
      if (!needPager) {
        this.pageSize = pageSize
        return
      }
      this.$store.dispatch(this.source + '/fetch', needPager).then(_ => {
        this.pageSize = pageSize
      })
    },
    handleOnCurrentChange (currentPage) {
      let { pageSize, sourceData } = this
      let needPager = pagerNeed(sourceData, currentPage, pageSize)
      if (!needPager) {
        this.currentPage = currentPage
        return
      }
      this.$store.dispatch(this.source + '/fetch', needPager).then(_ => {
        this.currentPage = currentPage
      })
    }
  }
}
</script>

<style lang="stylus">
.el-table
  & th
    background: #f5f7fa
</style>
