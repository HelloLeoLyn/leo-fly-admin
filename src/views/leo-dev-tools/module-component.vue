<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :span="6" v-for="route,key in asyncRoutes" :key="key">
        <el-card shadow="hover" body-style="height:180px">
          <p>{{route.path}}</p>
          <el-button type="primary" plain @click="handleBtnClk(route)">点击显示</el-button>
          <el-button v-clipboard:copy="objToString(route)" v-clipboard:success="clipboardSuccess"
            type="primary" icon="el-icon-document">
            复制
          </el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :title="children_dialog.title" :visible.sync="children_dialog.show" width="800">
      <div v-for="item,key in children_dialog.items" :key="key">
        {{item}}
      </div>
      <el-button v-clipboard:copy="children_dialog.content" v-clipboard:success="clipboardSuccess"
        type="primary" icon="el-icon-document">
        复制
      </el-button>
    </el-dialog>
  </div>
</template>
<script>
// const {
//   asyncRoutes,
//   constantRoutes
// } = require('mock/role/routes')
import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive
export default {
  directives: {
    clipboard
  },
  data() {
    return {
      // asyncRoutes,
      // constantRoutes,
      children_dialog: {
        show: false,
        items: [],
        title: ''
      }
    }
  },
  created() {},
  methods: {
    handleBtnClk(routes) {
      this.children_dialog.show = true
      this.children_dialog.title = routes.children[0].meta.title
      this.children_dialog.items = routes.children
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