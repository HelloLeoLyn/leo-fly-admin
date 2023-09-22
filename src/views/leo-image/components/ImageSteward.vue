<template>
  <div class="app-container">
    <el-button type="primary" size="default" @click="handleImageClick"
      >编辑图片</el-button
    >
    <el-dialog title="" :visible.sync="visible" width="80%">
      <steward
        @onConfirm="onConfirm"
        :count="5"
        :product-id="productId"
      ></steward>
      <span slot="footer">
        <el-button @click="visible = false">Cancel</el-button>
        <el-button type="primary">OK</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style lang="scss">
.pcitrueArea {
  text-align: center;
  justify-content: center;
  display: flex;
  width: 178px;
  height: 178px;
  border: 1px gray dotted;
  border-radius: 6px;
}
</style>
<script>
import steward from '@/views/leo-image/steward/index.vue'
export default {
  components: { steward },
  props: {
    productId: [Number, String],
    default: e => {
      return e
    }
  },
  methods: {
    handleImageClick () {
      this.visible = !this.visible
    },
    onConfirm (images) {
      this.$emit('onConfirm', images)
      this.visible = !this.visible
    }
  },
  data () {
    return {
      visible: false
    }
  }
}
</script>
