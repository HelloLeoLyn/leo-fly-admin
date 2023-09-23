<template>
  <div class="leo-product-editor">
    <el-button
      :type="type"
      :size="size"
      @click="handleClick"
      :class="{ fix: isFix }"
      >{{ editorName }}</el-button
    >
    <el-dialog title="product助手" :visible.sync="visible" width="60%">
      <el-select v-model="params[0].key" class="filter-item">
        <el-option v-for="key in keys" :key="key" :label="key" :value="key" />
      </el-select>
      <el-input
        v-model="content"
        type="textarea"
        placeholder=""
        size="normal"
        clearable
      ></el-input>
      <span slot="footer">
        <el-button @click="visible = false">Cancel</el-button>
        <el-button type="primary">OK</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { api_property_class_get } from '@/api/leo-property.js'
import productDict from '@/dict/product'
export default {
  props: {
    editorName: {
      type: String,
      default: '产品编辑器'
    },
    product: {
      type: Object,
      default: null
    },
    size: {
      type: String,
      default: e => {
        return e
      }
    },
    type: {
      type: String,
      default: 'primary'
    },
    isFix: {
      type: Boolean,
      default: false
    },
    isBatch: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    product (newval) {
      this.keys = Object.keys(newval)
    }
  },
  data () {
    return {
      content: null,
      visible: false,
      keys: [],
      params: [{ key: null, value: null }]
    }
  },
  created () {
    this.getClassProperties()
  },
  methods: {
    getClassProperties () {
      api_property_class_get('com.leo.fly.db.product.entity.Product').then(
        res => {
          this.keys = res.data
          console.log(this.keys);
        }
      )
    },
    handleClick () {
      this.visible = !this.visible
    },
    handleKeyClick (key) {
      this.content = JSON.stringify(this.product[key])
    },
    handleJsonClick () {
      this.content = JSON.stringify(this.product)
    }
  }
}
</script>
<style lang="scss">
.leo-product-editor {
  .fix {
    position: fixed;
    top: 300px;
    right: 0;
    z-index: 1;
    // background-color: rgb(244, 250, 250);
  }
  &-button {
    width: 150px;
  }
}
</style>
