<template lang="pug">
.peco-curd-container
  peco-datafilter(ref='datafilter' source='repair' :cols='filterCols' @on-query='onQuery')
  .peco-toolbar
    el-button(type='primary' icon='el-icon-download' @click='doExport') 导出EXCEL
  peco-datagrid(ref='datagrid' source='repair' :cols='cols' :delta-height='299')
    el-table-column(prop='sn' label='订单号' width='200')
    el-table-column(prop='model' label='报修产品' width='120')
    el-table-column(prop='description' label='报修描述' width='200')
    el-table-column(prop='status' label='订单状态' width='100' :formatter='statusFormatter' class-name='redcell')
    el-table-column(prop='customer_name' label='客户姓名' width='150')
    el-table-column(prop='customer_contact' label='客户手机' width='120')
    el-table-column(prop='company_name' label='客户公司' width='200')
    el-table-column(prop='company_province' label='省' width='100')
    el-table-column(prop='company_city' label='市' width='100')
    el-table-column(prop='company_area' label='区' width='100')
    el-table-column(prop='company_address' label='详细地址' width='160')
    el-table-column(prop='dsclerk_name' label='派单文员' width='150')
    el-table-column(prop='dsclerk_mobile' label='派单文员手机' width='150')
    el-table-column(prop='gpleader_name' label='维修组长' width='150')
    el-table-column(prop='gpleader_mobile' label='维修组长手机' width='150')
    el-table-column(prop='tcworker_name' label='维修师傅' width='150')
    el-table-column(prop='tcworker_mobile' label='维修师傅手机' width='150')
    el-table-column(prop='jiean_num' label='出机编码' width='150')
    el-table-column(prop='jiean_date' label='结案日期' width='160')
    el-table-column(prop='jiean_range' label='保内/保外' width='60')
    el-table-column(prop='jiean_charged' label='是否收费' width='60')
    el-table-column(prop='jiean_fittings' label='更换配件' width='60')
    el-table-column(prop='jiean_content' label='维修内容' width='60')
    el-table-column(prop='jiean_comment' label='维修备注' width='60')
    el-table-column(prop='rate_sudu' label='评价速度' width='60')
    el-table-column(prop='rate_taidu' label='评价态度' width='60')
    el-table-column(prop='rate_jishu' label='评价技术' width='60')
    el-table-column(prop='rate_content' label='评价内容' width='160')
    el-table-column(label='维修日志' width='460')
      template(slot-scope='scope')
        p(v-for='event in scope.row.events' :key='event.id')
          span [{{ event.create_time|timestamp-to-text }}]
          span(style='margin-left: 5px') {{ event.who }} ({{ event.mobile }})
          span(style='margin-left: 5px') {{ event.action }}
          span(style='margin-left: 5px') {{ event.content }}
    el-table-column(prop='create_time' label='申请报修时间' width='160' :formatter='timeFormatter')
</template>

<script>
import PecoDatafilter from '../../components/datafilter'
import PecoDatagrid from '../../components/templategrid'
import timestampToText from 'filters/timestampToText'
import statusToText from 'filters/statusToText'

export default {
  components: {
    PecoDatafilter,
    PecoDatagrid
  },
  filters: {
    timestampToText
  },
  data () {
    return {
      filterCols: [
        {
          label: '订单状态',
          prop: 'status',
          filter (query) {
          }
        },
        {
          label: '客户姓名',
          prop: 'customer_name',
          filter (query) {
            if (query !== '') {
              this.$store.dispatch('repair/filterQuery', { field: 'customer_name', query }).then(_ => true)
            }
          }
        },
        {
          label: '联系方式',
          prop: 'customer_contact',
          filter (query) {
            if (query !== '') {
              this.$store.dispatch('repair/filterQuery', { field: 'customer_contact', query }).then(_ => true)
            }
          }
        },
        {
          label: '所在公司',
          prop: 'customer_company',
          filter (query) {
            if (query !== '') {
              this.$store.dispatch('repair/filterQuery', { field: 'customer_company', query }).then(_ => true)
            }
          }
        },
        {
          label: '出机编码',
          prop: 'machine_sn',
          filter (query) {
            if (query !== '') {
              this.$store.dispatch('repair/filterQuery', { field: 'machine_sn', query }).then(_ => true)
            }
          }
        }
      ],
      cols: [
        {
          label: '订单号',
          prop: 'sn',
          width: 200
        },
        {
          label: '报修产品',
          prop: 'model',
          width: 120
        },
        {
          label: '报修描述',
          prop: 'description',
          width: 200
        },
        {
          label: '订单状态',
          prop: 'status',
          width: 100,
          styleclass: 'redcell',
          formatter (row, column, cellValue, index) {
            return statusToText(cellValue)
          }
        },
        {
          label: '客户姓名',
          prop: 'customer_name',
          width: 150
        },
        {
          label: '客户手机',
          prop: 'customer_contact',
          width: 120
        },
        {
          label: '客户公司',
          prop: 'company_name',
          width: 200
        },
        {
          label: '省',
          prop: 'company_province',
          width: 100
        },
        {
          label: '市',
          prop: 'company_city',
          width: 100
        },
        {
          label: '区',
          prop: 'company_area',
          width: 100
        },
        {
          label: '详细地址',
          prop: 'company_address',
          width: 160
        },
        {
          label: '派单文员',
          prop: 'dsclerk_name',
          width: 150
        },
        {
          label: '派单文员手机',
          prop: 'dsclerk_mobile',
          width: 150
        },
        {
          label: '维修组长',
          prop: 'gpleader_name',
          width: 150
        },
        {
          label: '维修组长手机',
          prop: 'gpleader_mobile',
          width: 150
        },
        {
          label: '维修师傅',
          prop: 'tcworker_name',
          width: 150
        },
        {
          label: '维修师傅手机',
          prop: 'tcworker_mobile',
          width: 150
        },
        {
          label: '出机编码',
          prop: 'jiean_num',
          width: 160
        },
        {
          label: '结案日期',
          prop: 'jiean_date',
          width: 160
        },
        {
          label: '保内/保外',
          prop: 'jiean_range',
          width: 60
        },
        {
          label: '是否收费',
          prop: 'jiean_charged',
          width: 60
        },
        {
          label: '更换配件',
          prop: 'jiean_fittings',
          width: 160
        },
        {
          label: '维修内容',
          prop: 'jiean_content',
          width: 160
        },
        {
          label: '维修备注',
          prop: 'jiean_comment',
          width: 160
        },
        {
          label: '评价速度',
          prop: 'rate_sudu',
          width: 60
        },
        {
          label: '评价态度',
          prop: 'rate_taidu',
          width: 60
        },
        {
          label: '评价技术',
          prop: 'rate_jishu',
          width: 60
        },
        {
          label: '评价内容',
          prop: 'rate_content',
          width: 160
        },
        {
          label: '维修日志',
          prop: 'events',
          width: 160,
          formatter (row, column, cellValue, index) {
            let events = cellValue
            if (!events || !events.length) return ''
            return events.map(evt => {
              return '[' + timestampToText(evt.create_time) + ']'
                      + evt.who + '(' + evt.mobile + ')'
                      + evt.action + ' '
                      + evt.content
            }).join('\n');
          }
        },
        {
          label: '申请报修时间',
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
      this.$refs.datagrid.exportExcel('客户报修')
    },
    onQuery (query) {
      let { startDate, endDate } = query
      let params = { startDate, endDate }
      let user_ids = []
      let company_id, repair_id
      if (query.customer_name) {
        user_ids.push(query.customer_name)
      }
      if (query.customer_contact) {
        let id = query.customer_contact
        if (user_ids.indexOf(id) === -1) {
          user_ids.push(id)
        }
      }
      if (query.customer_company) {
        company_id = query.customer_company
      }
      if (query.machine_sn) {
        repair_id = query.machine_sn
      }
      if (user_ids.length) {
        params.s = user_ids.join(',')
      }
      if (company_id) {
        params.c = company_id
      }
      if (repair_id) {
        params.r = repair_id
      }
      if (query.status !== '') {
        params.status = query.status
      }
      this.$refs.datagrid.reload(params)
    },
    statusFormatter (row, column, cellValue, index) {
      return statusToText(cellValue)
    },
    timeFormatter (row, column, cellValue, index) {
      return timestampToText(cellValue)
    }
  }
}
</script>
