<template lang="pug">
.peco-curd-container
  .peco-toolbar
    el-button(type='primary' icon='el-icon-download' @click='doExport') 导出EXCEL
    el-button(type='primary' icon='el-icon-circle-plus' @click='onAdd') 添加
  peco-datagrid(ref='datagrid' source='employee' :cols='cols' :delta-height='188')
    el-table-column(prop='cate_text' label='岗位' width='120')
    el-table-column(prop='name' label='姓名' width='120')
    el-table-column(prop='account' label='账号' width='120')
    el-table-column(prop='passwd_init' label='初始密码' width='120')
    el-table-column(prop='mobile' label='手机' width='120')
    el-table-column(prop='weixin' label='绑定微信' width='160')
    el-table-column(prop='province' label='省' width='160')
    el-table-column(prop='city' label='市' width='160')
    el-table-column(prop='area' label='区' width='160')
    el-table-column(prop='create_time' label='添加时间' width='160')
      template(slot-scope='scope')
        span {{ scope.row.create_time|timestampToText }}
    el-table-column(label='操作' width='160')
      template(slot-scope='scope')
        el-button(type='danger' size='small' @click='onDel(scope.row)') 删除
        el-button(type='warning' size='small' @click='onEdit(scope.row)') 编辑
  el-dialog(:title='editMode ? "编辑员工账号" : "添加员工账号"' :visible.sync='formDialogShow')
    el-form(ref='form' :model='form' :rules='rules' :label-width='formLabelWidth')
      el-row
        el-col(:span='10')
          el-form-item(label='姓名' label-width='80px' prop='name')
            el-input(v-model='form.name' :disabled='editMode' autocomplete='off')
        el-col(:span='10')
          el-form-item(label='手机' label-width='80px' :prop='editMode ? "" : "mobile"')
            el-input(v-model='form.mobile' :disabled='editMode' autocomplete='off')
        el-col(:span='10')
          el-form-item(label='账号' label-width='80px' prop='account')
            el-input(v-model='form.account' :disabled='editMode' autocomplete='off')
        el-col(:span='10')
          el-form-item(label='初始密码' label-width='80px' prop='passwd')
            el-input(v-model='form.passwd' :disabled='editMode' autocomplete='off')
      el-row
        el-col(:span='20')
          el-form-item(label='职位' label-width='80px' prop='cate')
            el-select(v-model='form.cate' :disabled='editMode && !form.cate' placeholder='请选择职位' style='width: 240px')
              el-option(v-for='opt in cateOptions' :key='opt.id' :label='opt.name' :value='opt.id')
      el-row
        el-col(:span='20')
          el-form-item(label='地区' label-width='80px' prop='district')
            el-cascader(:options='districts' v-model='form.district' placeholder='请选择省市区' style='width: 240px')
      el-row
        el-col(:span='10')
          el-form-item(label-width='80px')
            el-button(type='primary' @click='onSubmit') 提交
            el-button(@click='onCancel') 取消
</template>

<script>
import PecoDatafilter from '../../components/datafilter'
import PecoDatagrid from '../../components/templategrid'
import timestampToText from 'filters/timestampToText'
import services from '../../services'

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
      editMode: false,
      editId: '',
      formDialogShow: false,
      formLabelWidth: '90px',
      cateOptions: [
        {
          id: 0,
          name: '超级管理员'
        },
        {
          id: 1,
          name: '派单文员'
        },
        {
          id: 2,
          name: '维修组长'
        },
        {
          id: 3,
          name: '维修师傅'
        },
        {
          id: 4,
          name: '主管'
        },
        {
          id: 5,
          name: '经理'
        },
        {
          id: 6,
          name: '总监'
        }
      ],
      districts: [],
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机', trigger: 'change' },
          { pattern: /^1[3578]{1}[0-9]{9}$/, message: '手机格式错误', trigger: 'blur' }
        ],
        cate: [
          { required: true, message: '请选择职位', trigger: 'change' }
        ],
        account: [
          { required: true, message: '请输入账号', trigger: 'change' }
        ],
        passwd: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
        district: [
          { type: 'array', required: true, message: '请选择省市区', trigger: 'change' }
        ]
      },
      form: {
        name: '',
        mobile: '',
        cate: '',
        account: '',
        passwd: '',
        district: []
      },
      cols: [
        {
          label: '岗位',
          prop: 'cate_text',
          width: 120
        },
        {
          label: '姓名',
          prop: 'name',
          width: 120
        },
        {
          label: '账号',
          prop: 'account',
          width: 120
        },
        {
          label: '初始密码',
          prop: 'passwd_init',
          width: 120
        },
        {
          label: '手机',
          prop: 'mobile',
          width: 120
        },
        {
          label: '绑定微信',
          prop: 'weixin',
          width: 160
        },
        {
          label: '省',
          prop: 'province'
        },
        {
          label: '市',
          prop: 'city'
        },
        {
          label: '区',
          prop: 'area'
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
      this.$refs.datagrid.exportExcel('员工')
    },
    onAdd () {
      if (!this.districts.length) {
        this.$store.dispatch('district/fetch').then(res => {
          this.districts = res
        })
      }
      if (this.editMode) {
        this.editMode = false
        this.form = {
          name: '',
          mobile: '',
          cate: '',
          account: '',
          passwd: '',
          district: []
        }
        this.resetForm()
      }
      this.formDialogShow = true
    },
    resetForm() {
      this.$refs['form'].resetFields()
    },
    onCancel () {
      this.resetForm()
      this.formDialogShow = false
    },
    onEdit (row) {
      if (!this.districts.length) {
        this.$store.dispatch('district/fetch').then(res => {
          this.districts = res
        })
      }
      if (!this.editMode) {
        this.editMode = true
      }
      this.editId = row.id
      this.form = {
        name: row.name,
        mobile: row.mobile,
        cate: row.cate,
        account: row.account,
        passwd: row.passwd_init,
        district: [row.provinceid, row.cityid, row.areaid]
      }
      this.formDialogShow = true
    },
    onDel (row) {
      this.$confirm('此操作将永久删除该产品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        services['employee'].delete(row.id).then(res => {
          this.$refs.datagrid.reload()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    resetForm() {
      this.$refs['form'].resetFields()
    },
    onCancel () {
      this.resetForm()
      this.formDialogShow = false
    },
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: '提交中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          let prom = this.editMode ? services['employee'].update(this.editId, this.form) : services['employee'].create(this.form)
          prom.then(_ => {
            this.$message({
              showClose: true,
              message: '保存成功！',
              type: 'success'
            })
            loading.close()
            this.resetForm()
            this.formDialogShow = false
            this.$refs.datagrid.reload()
          }).catch(error => {
            this.$message({
              showClose: true,
              message: '保存失败！',
              type: 'error'
            })
            loading.close()
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
