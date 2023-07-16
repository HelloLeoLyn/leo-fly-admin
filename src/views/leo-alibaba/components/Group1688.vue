<template>
  <div>
    <el-select multiple :value="selectedOption" @change="updateSelectedOption($event)">
      <el-option :label="opt.groupName" :value="opt.id" v-for="opt, key in options"
        :key="key"></el-option>
    </el-select>
  </div>
</template>

<script>
import { category1688Group, categoryToGroup } from '@/utils/category'
export default {
  // props: ['value'],
  props: {
    value: {
      type: Array,
      default: (e) => {
        return e
      }
    },
    categoryID: {
      type: [String, Number],
      default: (e) => {
        return e
      }
    }
  },
  data() {
    return {
      selectedOption: this.value,
      options: category1688Group
    }
  },
  watch: {
    value(newVal) {
      // 当父组件的值变化时，更新子组件的选中项
      this.selectedOption = newVal
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      // 进行数据获取的逻辑
      // 可以使用 axios 或其他方法发送请求获取数据
      // 示例中使用 setTimeout 模拟异步获取数据的过程
      setTimeout(() => {
        // this.$set(this, 'selectedOption', [categoryToGroup[this.categoryID]])
        this.selectedOption = [categoryToGroup[this.categoryID]]
        this.$emit('input', [categoryToGroup[this.categoryID]])
      }, 1000)
    },
    updateSelectedOption(e) {
      // 更新选中项，并通过自定义事件将新值发送给父组件
      this.selectedOption = e
      this.$emit('input', e)
    }
  }
}
</script>