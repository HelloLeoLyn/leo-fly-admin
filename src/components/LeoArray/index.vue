<template>
  <div class="Leo-array">
    <el-row>
      <el-col :span="24" :lg="8" :md="12" :offset="0" v-for="item, key in list" :key="key">
        <el-input v-if="key == list.length - 1" v-model="list[key]" placeholder="" size="normal" clearable
          @change="change">
          <el-button slot="append" icon="el-icon-minus" @click="delCol(key)"></el-button>
          <el-button slot="append" icon="el-icon-plus" @click="addCol"></el-button>
        </el-input>
        <el-input v-else v-model="list[key]" placeholder="" size="normal" clearable @change="change">
          <el-button slot="append" icon="el-icon-minus" @click="delCol(key)"></el-button></el-input>
      </el-col>
      <el-col :span="24" :lg="8" :md="12" :offset="0">
        <Copy :value="list"></Copy>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Copy from './copy.vue'
export default {
  props: {
    value: {
      type: Array,
      default: (e) => {
        return e
      }
    }
  },
  components: { Copy },
  watch: {
    value(newVal) {
      // 当父组件的值变化时，更新子组件的选中项
      this.list = newVal
    }
  },
  data() {
    return {
      list: []
    }
  },
  methods: {
    change() {
      this.$emit('input', this.list)
    },
    delCol(index) {
      this.list.splice(index, 1)
      this.change()
    },
    addCol() {
      this.list.push('')
      this.change()
    },
  }
}
</script>