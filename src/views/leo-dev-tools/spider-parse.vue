<template>
  <div class="app-container">
    <el-input v-model="html" type="textarea" :rows="10"></el-input>
    <el-button @click="send">send</el-button>
    <el-input :value="JSON.stringify(result)" type="textarea"></el-input>
  </div>
</template>

<script>
import { htmlParse } from '@/api/leo-auto-part'
export default {
  data() {
    return {
      html: '',
      result: ''
    }
  },
  methods: {
    send() {
      htmlParse({ html: this.html }).then((res) => {
        this.result = res.data
      })
    }
  }
}
</script>

<style>
</style>