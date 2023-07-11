<template>
  <div style="" class="leo-product-item">
    <!-- 图片 -->
    <img style="width: 200px; height: 200px" :src="product.images[0].url">
    <div style="width: 100%; height: 100px; background-color: #F6F6F6; text-align: center;">
      <!-- 菜品名称 -->
      <div style="height: 5px;"></div>
      <div>
        <label style="font-size: 20px">菜品名称</label>
      </div>
      <!-- 价格 -->
      <div style="margin-top: 1px">
        <label style="color: #696969">10元</label>
      </div>
      <!-- 购买 -->
      <div style="margin-top: 1px">
        <input type="button" value="+" class="fileinput-button">
        <input type="button" value="+" class="fileinput-button">
        <input type="button" value="+" class="fileinput-button">
        <el-checkbox />
        <el-button type="text">more+</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {},
  mounted() {
    console.log(this.product)
  }
}
</script>
<style lang="scss">
.leo-product-item {
  width: 200px;
  height: 300px;
  background-color: #dcdcdc;
  display: table-cell;
  border: 1px solid blue;
}
</style>