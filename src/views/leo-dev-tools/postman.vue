<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select slot="prepend" v-model="request.method" placeholder="请选择" class="filter-item">
        <el-option value="get">get</el-option>
        <el-option value="post">post</el-option>
        <el-option value="put">put</el-option>
        <el-option value="delete">delete</el-option>
      </el-select>
      <el-select v-model="request.http" placeholder="请选择" class="filter-item">
        <el-option value="http://">http://</el-option>
        <el-option value="https://">https://</el-option>
        <el-option value="ws://">ws://</el-option>
      </el-select>
      <el-select v-model="request.ip" placeholder="请选择" class="filter-item">
        <el-option v-for="item, key in ip_list" :key="key" :value="item">{{ item }}</el-option>
      </el-select>
      :
      <el-select v-model="request.port" placeholder="请选择" class="filter-item">
        <el-option v-for="item, key in port_list" :key="key" :value="item">{{ item }}</el-option>
      </el-select>
      <el-input v-model="request.api" placeholder="API" style="width: 600px" class="filter-item" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="send">
        Send
      </el-button>
      <el-tabs v-model="request.params_type" @tab-click="handleClick">
        <el-tab-pane name="params" label="params">
          <el-table :data="param_list" border>
            <el-table-column label="key">
              <template slot-scope="{row, $index}">
                <el-input v-model="row.key" @keyup.native="handleInputKeydown($index)">
                  <template slot="append">
                    <el-button @click="row.key = ''">clear</el-button>
                  </template>
                </el-input>
              </template>
            </el-table-column>
            <el-table-column label="value">
              <template slot-scope="{row , $index}">
                <el-input v-model="row.value" @keyup.native="handleInputKeydown($index)">
                  <template slot="append">
                    <el-button @click="row.value = ''">clear</el-button>
                  </template>
                </el-input>
              </template>
            </el-table-column>
            <el-table-column label="action">
              <template slot-scope="{$index}">
                <el-button @click="deleteRow($index)">delete</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane name="body" label="body">
          <el-input v-model="request.bodyStr" type="textarea" rows="8" />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="result" v-html="result" />
  </div>
</template>
<script>
import request from '@/utils/request'
// import { host, auto_part_port } from '@/api/index'
import waves from '@/directive/waves' // waves directive
import Cookies from 'js-cookie'
export default {
  name: 'postman',
  directives: { waves },
  data() {
    return {
      request: {
        params_type: 'params',
        bodyStr: '',
        method: 'get',
        http: 'http://',
        port: 8082,
        api: '/',
        ip: '192.168.101.70'
      },
      param_list: [
        {
          key: '',
          value: ''
        }
      ],
      result: null,
      ip_list: ['127.0.0.1', '192.168.101.70'],
      port_list: [8082, 8081, 8080, 80],
      context: ''
    }
  },
  mounted() {
    const tmp = Cookies.get('generator.api')
    if (tmp) {
      this.request = JSON.parse()
    }
  },
  methods: {
    handleClick() { },
    send() {
      Cookies.set('generator.api', JSON.stringify(this.request))
      console.log(this.request)
      const options = {
        url:
          this.request.http +
          this.request.ip +
          ':' +
          this.request.port +
          this.request.api,
        method: this.request.method,
        // params: this.params(),
        data: this.body()
      }
      request(options)
        .then((res) => {
          this.result = res
        })
        .catch((e) => {
          this.result = e
        })
    },
    params() {
      if (this.request.params_type !== 'params') {
        return undefined
      }
      const params = {}
      this.param_list.forEach((i) => {
        if (i.key) {
          params[i.key] = i.value
        }
      })
      return params
    },
    body() {
      if (this.request.params_type !== 'body') {
        return undefined
      }
      if (this.request.bodyStr === '') {
        return { author: 'Leo Lyn' }
      }
      return JSON.parse(this.request.bodyStr)
    },
    handleInputKeydown($index) {
      if (this.param_list.length <= $index + 1) {
        this.addRow()
      }
    },
    addRow() {
      this.param_list.push({
        key: '',
        value: ''
      })
    },
    deleteRow(index) {
      if (this.param_list.length === index + 1) {
        Object.keys(this.param_list[index]).forEach((key) => {
          this.param_list[index][key] = ''
        })
      } else {
        this.param_list.splice(index, 1)
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
