<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :span="6" v-for="item,key in components" :key="key">
        <el-card shadow="hover" body-style="height:180px">
          <p>{{item.comment}}</p>
          <el-button type="primary" plain @click="handleBtnClk(item)">点击显示</el-button>
          <el-button v-clipboard:copy="copy(item.code)" v-clipboard:success="clipboardSuccess"
            type="primary" icon="el-icon-document">
            复制
          </el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :title="lDialog.title" :visible.sync="lDialog.show" width="800">
      <el-input type="textarea" v-model="lDialog.content" :rows="lDialog.input_row" />
      <el-image v-if="lDialog.image" :src="lDialog.image" />
      <el-button @click="generate">
        生成
      </el-button>
      <el-button v-clipboard:copy="lDialog.content" v-clipboard:success="clipboardSuccess"
        type="primary" icon="el-icon-document">
        复制
      </el-button>
    </el-dialog>
  </div>
</template>
<script>
import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive
export default {
  directives: {
    clipboard
  },
  name: 'LeoImageIndex',
  data() {
    return {
      components: [
        {
          comment: 'base64转图片',
          key: 'base64',
          code: ''
        }
      ],
      lDialog: {
        title: '',
        show: false,
        content: {
          code: null
        },
        input_row: 5,
        image: ''
      }
    }
  },

  methods: {
    generate() {
      this.lDialog.image = 'data:image/png;base64,' + this.lDialog.content
    },
    handleBtnClk(sql) {
      this.lDialog.show = true
      this.lDialog.title = sql.comment
      this.lDialog.content = this.objToString(sql.code)
      const length = this.lDialog.content.split('\n').length
      console.log(length)
      this.lDialog.input_row = length > 5 ? length : 5
    },
    copy(obj) {
      return this.objToString(obj)
    },
    objToString(obj) {
      if (typeof obj === 'object') {
        let temp = ''
        if (obj.constructor === Array) {
          obj.forEach((no) => {
            temp = temp + no + '\n'
          })
        }
        return temp
      } else {
        return obj
      }
    },
    clipboardSuccess() {
      this.$message({
        message: 'Copy successfully',
        type: 'success',
        duration: 1500
      })
    }
  }
}
</script>