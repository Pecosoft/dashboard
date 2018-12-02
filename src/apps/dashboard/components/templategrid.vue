<template lang="pug">
  .peco-data-grid
    el-table(
      :data='tableData'
      :height='tableHeight'
      style='width: 100%'
      stripe
      border
      highlight-current-row
      @select='onSelect'
      @select-all='onSelectAll'
      @selection-change='onSelectChange'
      v-loading='loading'
    )
      el-table-column(type='selection' v-if='tableData.length' fixed :width='40' align='center' header-align='center')
      slot
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
import exportExcel from 'utils/exportExcel'
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
      default: 249
    },
    cols: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    let winH = winHeight()
    return {
      tableHeight: winH - this.deltaHeight,
      fields: [],
      query: {},
      pageSize: 10,
      currentPage: 1,
      selectAll: false,
      selection: [],
      loading: false
    }
  },
  watch: {
    deltaHeight (newVal) {
      this.tableHeight = winHeight() - newVal
    }
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
    reload (query) {
      if (query) {
        this.query = query
      }
      let params = Object.assign({}, this.query)
      this.$Progress.start()
      this.loading = true
      this.$store.dispatch(this.source + '/fetch', { reload: true, args: params }).then(res => {
        this.$Progress.finish()
        this.loading = false
        if (!this.fields.length) {
          let { data } = res
          this.fields = parseFieldsFromRowData(data[0])
        }
      }).catch(error => {
        this.$Progress.fail()
        this.loading = false
      })
    },
    exportExcel (filePrefix) {
      let srccols = this.cols
      let tableData = this.selectAll ? this.sourceData : (this.selection.length ? this.selection : this.tableData)
      let cols = srccols.map(col => {
        return { label: col.label, width: col.width / 20, prop: col.prop }
      })
      let rows = tableData.map(row => {
        let rowdata = Object.assign({}, row)
        for (let i = 0, len = srccols.length; i < len; i++) {
          let { prop, formatter } = srccols[i]
          if (prop && typeof formatter === 'function') {
            rowdata[prop] = formatter(null, null, row[prop])
          }
        }
        return rowdata
      })
      exportExcel(filePrefix, rows, cols)
    },
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
      let params = Object.assign({}, needPager, this.query)
      this.loading = true
      this.$store.dispatch(this.source + '/fetch', {args: params}).then(_ => {
        this.loading = false
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
      let params = Object.assign({}, needPager, this.query)
      this.loading = true
      this.$store.dispatch(this.source + '/fetch', {args: params}).then(_ => {
        this.loading = false
        this.currentPage = currentPage
      })
    },
    onSelect (selection, row) {
      this.selectAll = false
    },
    onSelectAll (selection) {
      if (selection.length) {
        this.selectAll = true
      } else {
        this.selectAll = false
      }
    },
    onSelectChange (selection) {
      this.selection = selection
    }
  }
}
</script>

<style lang="stylus">
.el-table
  & th
    background: #f5f7fa
td.redcell
  & .cell
    color: #f00
</style>
