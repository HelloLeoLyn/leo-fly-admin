<template>
  <div class="leo-eidt-pane">
    <div>{{content}}<el-button @click="dialogVisible = true" type="text" size="small"
        class="el-icon-edit"></el-button>
    </div>
    <el-dialog title="update" :visible.sync="dialogVisible">
      <el-row>
        <el-col :span="span" v-for="item,key in list" :key="key">
          <el-input v-model="item.value" />
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirmClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { deepClone, listToString } from '@/utils/index'
export default {
  name: 'LeoEditPane',
  props: {
    options: {
      type: Array,
      required: true
    },
    span: {
      type: Number,
      default: () => {
        return 24
      }
    }
  },
  data() {
    return {
      list: [],
      dialogVisible: false,
      content: ''
    }
  },
  mounted() {
    let temp = this.options.map((e) => {
      const { key, value } = e
      return { key, value }
    })
    this.list = deepClone(temp)
    this.content = listToString(this.list.map((m) => m.value))
  },
  methods: {
    handleConfirmClick() {
      this.dialogVisible = false
      this.content = listToString(this.list.map((m) => m.value))
      this.$emit('onConfirmClick', this.list)
    }
  }
}
</script>
