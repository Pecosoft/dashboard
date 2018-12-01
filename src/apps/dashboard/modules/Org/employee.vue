<template lang="pug">
.peco-curd-container
  .peco-toolbar
    el-button(type='primary' icon='el-icon-download' @click='doExport') 导出EXCEL
    el-button(type='primary' icon='el-icon-circle-plus' @click='onAdd') 添加
  peco-datagrid(ref='datagrid' source='employee' :cols='cols' :delta-height='188')
  el-dialog(title='添加员工' :visible.sync='addDialogShow')
    el-form(ref='form' :model='form' :rules='rules' :label-width='formLabelWidth')
      el-row
        el-col(:span='10')
          el-form-item(label='姓名' label-width='80px' prop='name')
            el-input(v-model='form.name' autocomplete='off')
        el-col(:span='10')
          el-form-item(label='手机' label-width='80px' prop='mobile')
            el-input(v-model='form.mobile' autocomplete='off')
        el-col(:span='10')
          el-form-item(label='账号' label-width='80px' prop='account')
            el-input(v-model='form.account' autocomplete='off')
        el-col(:span='10')
          el-form-item(label='初始密码' label-width='80px' prop='passwd')
            el-input(v-model='form.passwd' autocomplete='off')
      el-row
        el-col(:span='20')
          el-form-item(label='职位' label-width='80px' prop='cate')
            el-select(v-model='form.cate' placeholder='请选择职位' style='width: 240px')
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
import PecoDatagrid from '../../components/datagrid'
import timestampToText from 'filters/timestampToText'
import services from '../../services'

export default {
  components: {
    PecoDatafilter,
    PecoDatagrid
  },
  data () {
    return {
      addDialogShow: false,
      formLabelWidth: '90px',
      cateOptions: [
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
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
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
          prop: 'contact',
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
          console.log('districts', res)
        })
      }
      this.addDialogShow = true
    },
    resetForm() {
      this.$refs['form'].resetFields()
    },
    onCancel () {
      this.resetForm()
      this.addDialogShow = false
    },
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: '添加中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          services['employee'].create(this.form).then(_ => {
            this.$message({
              showClose: true,
              message: '添加成功！',
              type: 'success'
            })
            loading.close()
            this.resetForm()
            this.addDialogShow = false
            this.$refs.datagrid.reload()
          }).catch(error => {
            this.$message({
              showClose: true,
              message: '添加失败！',
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
