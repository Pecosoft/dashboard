<template lang="pug">
.peco-curd-container
  .peco-toolbar
    el-button(type='primary' icon='el-icon-download' @click='doExport') 导出EXCEL
    el-button(type='primary' icon='el-icon-circle-plus' @click='onAdd') 添加
  peco-datagrid(ref='datagrid' source='product' :cols='cols' :delta-height='188')
    el-table-column(prop='cate_name' label='产品分类')
    el-table-column(prop='name' label='产品型号')
    el-table-column(prop='avatar' label='产品图片' width='120')
      template(slot-scope='scope')
        img(class='grid-avatar' :src='scope.row.avatar')
    el-table-column(prop='create_time' label='添加时间' width='160')
      template(slot-scope='scope')
        span {{ scope.row.create_time|timestampToText }}
    el-table-column(label='操作' width='160')
      template(slot-scope='scope')
        el-button(type='danger' size='small' @click='onDel(scope.row)') 删除
        el-button(type='warning' size='small' @click='onEdit(scope.row)') 编辑
  el-dialog(:title='editMode ? "编辑产品" : "添加产品"' :visible.sync='formDialogShow')
    el-form(ref='form' :model='form' :rules='rules' :label-width='formLabelWidth')
      el-row
        el-col(:span='20')
          el-form-item(label='产品分类' label-width='80px' prop='cate')
            el-select(v-model='form.cate' placeholder='请选择分类' style='width: 240px')
              el-option(v-for='opt in cateOptions' :key='opt.id' :label='opt.name' :value='opt.id')
      el-row
        el-col(:span='12')
          el-form-item(label='产品名称' label-width='80px' prop='name')
            el-input(v-model='form.name' autocomplete='off')
      el-row
        el-col(:span='20')
          el-form-item(label='产品图片' label-width='80px' prop='avatar')
            el-upload(class='avatar-uploader'
                      name='image'
                      :data='params'
                      :action='uploadImageAction'
                      :auto-upload='true'
                      :show-file-list='false'
                      :on-success='handleAvatarSuccess'
                      :on-change='handleOnFileChange'
                      :before-upload='beforeAvatarUpload')
              img(:src='imgUrl' v-if='imgUrl' class='avatar')
              i(v-else class='el-icon-plus avatar-uploader-icon')
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
import { uploadImage } from '../../services/resources'
import services from '../../services'
import auth from '../../services/auth'

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
      cateOptions: [
        {
          id: 1,
          name: '金属加工中心'
        },
        {
          id: 2,
          name: '玻璃加工中心'
        }
      ],
      rules: {
        name: [
          { required: true, message: '请输入产品名称', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        cate: [
          { required: true, message: '请选择分类', trigger: 'change' }
        ],
        avatar: [
          { required: true, message: '请上传产品图片', trigger: 'change' }
        ]
      },
      form: {
        name: '',
        cate: '',
        avatar: ''
      },
      imgUrl: '',
      uploadImageAction: uploadImage,
      params: auth.get(),
      cols: [
        {
          label: '产品分类',
          prop: 'cate_name'
        },
        {
          label: '产品型号',
          prop: 'name'
        },
        {
          label: '产品图片',
          prop: 'avatar',
          type: 'image'
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
    this.$store.dispatch('productcate/fetch', { reload: true, args: {} }).then(res => {
      this.cateOptions = res.data
    })
  },
  methods: {
    doExport () {
      this.$refs.datagrid.exportExcel('产品')
    },
    onAdd () {
      // if (!this.districts.length) {
      //   this.$store.dispatch('district/fetch').then(res => {
      //     this.districts = res
      //     console.log('districts', res)
      //   })
      // }
      if (this.editMode) {
        this.editMode = false
        this.form = {
          name: '',
          cate: '',
          avatar: ''
        }
        this.resetForm()
        this.imgUrl = ''
      }
      this.formDialogShow = true
    },
    onEdit (row) {
      if (!this.editMode) {
        this.editMode = true
      }
      this.editId = row.id
      this.form = {
        name: row.name,
        cate: row.cate,
        avatar: '/' + row.avatar.split(/\/\/.*?\//)[1]
      }
      this.imgUrl = row.avatar
      this.formDialogShow = true
    },
    onDel (row) {
      this.$confirm('此操作将永久删除该产品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        services['product'].delete(row.id).then(res => {
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
          let method = this.editMode ? 'update' : 'create'
          let prom = this.editMode ? services['product'].update(this.editId, this.form) : services['product'].create(this.form)
          prom.then(_ => {
            this.$message({
              showClose: true,
              message: '保存成功！',
              type: 'success'
            })
            loading.close()
            this.resetForm()
            this.imgUrl = ''
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
    },
    handleOnFileChange (file, fileList) {
      if (file && file.raw) {
        this.imgUrl = URL.createObjectURL(file.raw)
      }
    },
    handleAvatarSuccess(res, file) {
      this.form.avatar = res.data
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.grid-avatar {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
</style>
