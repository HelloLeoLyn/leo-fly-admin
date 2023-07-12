<template>
  <div>
    <el-cascader ref="cascader" :props="{ checkStrictly: true }" :value="value" placeholder="试试搜索：指南" :options="options"
      filterable @change="change" style="width:300px">
    </el-cascader>
    <el-button @click="getCategory" v-if="categoryContent">{{ categoryContent }}</el-button>
    <el-tooltip :content="listToString(value, '-')" placement="bottom" effect="light">
      <el-button class="el-icon-warning-outline" />
    </el-tooltip>
  </div>
</template>
<script>
import { listToString } from '@/utils//index'
import { category1688 } from '@/utils/category'
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [String, Number, Array],
      default: (e) => {
        return e
      }
    },
    categoryContent: {
      type: String,
      defaults: () => { }
    }
  },
  data() {
    return {
      options: category1688,
      dict: {}
    }
  },
  methods: {
    getCategory() {
      const nodes = this.$refs['cascader'].getCheckedNodes()
      this.$emit('getCategory', nodes[0].data, nodes[0].pathNodes)
    },
    change(e) {
      if (typeof e == 'object' && Array.isArray(e)) {
        this.$emit('change', e[e.length - 1])
      } else {
        this.$emit('change', e)
      }
    },
    listToString
  }
}
</script>