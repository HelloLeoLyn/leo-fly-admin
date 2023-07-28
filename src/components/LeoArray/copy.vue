<template>
  <div class="leo-array-copy">
    <el-dropdown @command="e => this.command = e" split-button @click="handleCommand">
      复制<i class="el-icon-copy-document el-icon--right"></i>{{ command }}
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="json">Json String</el-dropdown-item>
        <el-dropdown-item command="space">空格/space/ </el-dropdown-item>
        <el-dropdown-item command="comma">逗号/comma/,</el-dropdown-item>
        <el-dropdown-item command="vertical">竖线/Vertical Bar/|,</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import clip from '@/utils/clipboard'
import { listToString } from '@/utils'
export default {
  props: {
    value: {
      type: Array,
      default: (e) => {
        return e
      }
    }
  },
  data() {
    return {
      command: 'json'
    }
  },
  methods: {
    handleCommand(event) {
      let val
      if (this.command == 'json') {
        val = JSON.stringify(this.value)
      } else if (this.command == 'space') {
        val = listToString(this.value, ' ')
      } else if (this.command == 'comma') {
        val = listToString(this.value, ',')
      } else if (this.command == 'vertical') {
        val = listToString(this.value, '|')
      }
      clip(val, event)
    }
  }
}
</script>