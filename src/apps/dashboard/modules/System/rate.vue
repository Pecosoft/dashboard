<template lang="pug">
.peco-curd-container
  .peco-form(style='padding: 15px 15px 10px; background: #fff')
    el-form(ref='form')
      el-row
        el-col(:span='24')
          el-form-item(label='结案后，客户未评论，设置连续提醒' label-width='250px')
            el-input-number(v-model='max' @change='handleChange' :min='1')
            |
            | 天
</template>

<script>
import request from '../../services/request'
import { configTaskRate } from '../../services/resources'
import { parse } from 'babylon';

export default {
  data () {
    return {
      max: ''
    }
  },
  methods: {
    handleChange () {
      request('post', configTaskRate, { max: this.max })
    }
  },
  mounted () {
    request('get', configTaskRate, { max: this.max }).then(res => {
      this.max = parseInt(res.data)
    })
  }
}
</script>
