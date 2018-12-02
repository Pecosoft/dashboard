<template lang="pug">
.peco-curd-container
  .peco-toolbar
    el-button(type='primary' icon='el-icon-download' @click='doExport') 导出EXCEL
    el-button(type='primary' icon='el-icon-circle-plus' @click='onAdd') 添加
  peco-datagrid(ref='datagrid' source='productcate' :cols='cols' :delta-height='188')
    el-table-column(prop='name' label='分类')
    el-table-column(prop='create_time' label='添加时间' width='160')
      template(slot-scope='scope')
        span {{ scope.row.create_time|timestampToText }}
    el-table-column(label='操作' width='160')
      template(slot-scope='scope')
        el-button(type='danger' size='small' @click='onDel(scope.row)') 删除
        el-button(type='warning' size='small' @click='onEdit(scope.row)') 编辑
  el-dialog(:title='editMode ? "编辑分类" : "添加分类"' :visible.sync='formDialogShow')
    el-form(ref='form' :model='form' :rules='rules' :label-width='formLabelWidth')
      el-row
        el-col(:span='12')
          el-form-item(label='分类名称' label-width='80px' prop='name')
            el-input(v-model='form.name' autocomplete='off')
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
      formDialogShow: false,
      editMode: false,
      editId: '',
      formLabelWidth: '90px',
      rules: {
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ]
      },
      form: {
        name: ''
      },
      cols: [
        {
          label: '分类',
          prop: 'cate_name'
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
      this.$refs.datagrid.exportExcel('产品分类')
    },
    onAdd () {
      if (this.editMode) {
        this.editMode = false
        this.form = {
          name: ''
        }
        this.resetForm()
      }
      this.formDialogShow = true
    },
    onEdit (row) {
      if (!this.editMode) {
        this.editMode = true
      }
      this.editId = row.id
      this.form = {
        name: row.name
      }
      this.formDialogShow = true
    },
    onDel (row) {
      this.$confirm('此操作将永久删除该产品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        services['productcate'].delete(row.id).then(res => {
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
          let prom = this.editMode ? services['productcate'].update(this.editId, this.form) : services['productcate'].create(this.form)
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
