<template>
  <div class="leo-product-helper">
    <el-button type="primary" size="default" @click="handleClick" class="fix"
      >product助手</el-button
    >
    <el-dialog title="product助手" :visible.sync="visible" width="60%">
      <el-button type="primary" size="default" @click="handleJsonClick"
        >Json</el-button
      >
      <el-button
        type="primary"
        size="default"
        @click="handleOpenFolder(product.id)"
        >打开图片文件夹</el-button
      >
      <el-row :gutter="20">
        <el-col
          :span="4"
          :offset="0"
          v-for="(key, index) in keys"
          :key="index"
          style="padding: 5px 0"
        >
          <el-button
            class="leo-product-helper-button"
            type="primary"
            size="default"
            @click="handleKeyClick(key)"
            >{{ key }}</el-button
          >
        </el-col>
      </el-row>

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
import { api_file_open } from '@/api/leo-file.js'
import { imgBase } from '@/api/local-setting'
export default {
  props: {
    productId: {
      type: [Number, String],
      default: e => {
        return e
      }
    },
    product: {
      type: Object,
      default: e => {
        return e
      }
    }
  },
  watch: {
    product (newval) {
      this.keys = Object.keys(newval)
    },
    productId (newval) {
      console.log(newval)
    }
  },
  data () {
    return {
      content: null,
      visible: false,
      keys: []
    }
  },
  methods: {
    handleClick () {
      this.visible = !this.visible
    },
    handleKeyClick (key) {
      this.content = JSON.stringify(this.product[key])
    },
    handleJsonClick () {
      let { subject, base } = this.product.jsonList[0].json
      this.content = JSON.stringify({ subject, base })
    },
    handleOpenFolder (productId) {
      api_file_open(imgBase + productId)
    }
  }
}
</script>
<style lang="scss">
.leo-product-helper {
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
