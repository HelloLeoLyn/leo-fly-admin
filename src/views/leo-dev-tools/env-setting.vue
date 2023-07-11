<template>
  <div class="app-container">
    <el-row>
      <el-col :span="3" :offset="1" v-for="btn,key in tools" :key="key">
        <el-button plain type="primary" @click="btnClick(btn)">{{btn.content}}</el-button>
      </el-col>
    </el-row>
    <el-dialog>
      <el-input type="textarea" v-model="src"></el-input>
      <el-input type="textarea" v-model="target"></el-input>
    </el-dialog>
  </div>
</template>
<script>
// import { host, auto_part_port } from '@/api/index'
import waves from '@/directive/waves' // waves directive
export default {
  name: 'Generator',
  directives: { waves },
  data() {
    return {
      src: '',
      target: '',
      tools: [
        {
          content: 'Json2Java',
          type: 'url',
          url: 'https://www.json.cn/json/json2java.html'
        }
      ]
    }
  },
  mounted() {},
  methods: {
    btnClick(btn) {
      if (btn.type == 'url') {
        window.open(btn.url)
      }
    }
  }
}
</script>

<style>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
