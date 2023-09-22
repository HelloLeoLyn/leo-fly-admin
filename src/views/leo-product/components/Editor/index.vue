<template>
  <div class="leo-product-editor">
    <el-button :type="type" :size="size" @click="handleClick"
      :class="{'fix':isFix}">{{editorName}}</el-button>
    <el-dialog title="product助手" :visible.sync="visible" width="60%">
      {{ productId }}
      <el-button type="primary" size="default" @click="handleJsonClick">Json</el-button>
      <el-row :gutter="20">
        <el-col :span="4" :offset="0" v-for="(key, index) in keys" :key="index"
          style="padding: 5px 0;">
          <el-button class="leo-product-helper-button" type="primary" size="default"
            @click="handleKeyClick(key)">{{ key }}</el-button>
        </el-col>
      </el-row>

      <el-input v-model="content" type="textarea" placeholder="" size="normal" clearable></el-input>
      <span slot="footer">
        <el-button @click="visible = false">Cancel</el-button>
        <el-button type="primary">OK</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    editorName: {
      type: String,
      default: '产品编辑器'
    },
    productId: {
      type: [Number, String],
      default: (e) => {
        return e
      }
    },
    product: {
      type: Object,
      default: (e) => {
        return e
      }
    },
    size: {
      type: String,
      default: (e) => {
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
    }
  },
  watch: {
    product(newval) {
      this.keys = Object.keys(newval)
    },
    productId(newval) {
      console.log(newval)
    }
  },
  data() {
    return {
      content: null,
      visible: false,
      keys: []
    }
  },
  methods: {
    handleClick() {
      this.visible = !this.visible
    },
    handleKeyClick(key) {
      this.content = JSON.stringify(this.product[key])
    },
    handleJsonClick() {
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
