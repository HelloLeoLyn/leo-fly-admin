<template>
  <div class="leo-alibaba-description-design">
    <el-tabs v-model="modelName" type="card" tab-position="top" @tab-click="">
      <el-tab-pane label="模板" name="template">
        <div class="preview">
          <img src="https://cbu01.alicdn.com/img/ibank/O1CN01lWgKbO1Uhwoo8VFNK_!!2210530712550-0-cib.jpg" alt="">
          <div style="width: 785px; height: 785px; background-image: url('https://cbu01.alicdn.com/img/ibank/O1CN01AGiQIe1Uhwom77cVp_!!2210530712550-0-cib.jpg'); background-size: cover;">
            <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false" :http-request="e => { }" :on-change="onchange">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <img src="https://cbu01.alicdn.com/img/ibank/O1CN01YJx6ZQ1UhwooAiL5R_!!2210530712550-0-cib.jpg" alt="">
          <img src="https://cbu01.alicdn.com/img/ibank/O1CN01dXWOIU1UhwopkOD5i_!!2210530712550-0-cib.jpg" alt="">
          <img src="https://cbu01.alicdn.com/img/ibank/O1CN01txkFmc1UhwolQrtxf_!!2210530712550-0-cib.jpg" alt="">
          <img src="https://cbu01.alicdn.com/img/ibank/O1CN01Hj9YUA1UhwooAiGwu_!!2210530712550-0-cib.jpg" alt="">
          <img src="https://cbu01.alicdn.com/img/ibank/O1CN01DuqqSt1UhwolQtF7l_!!2210530712550-0-cib.jpg" alt="">
          <img src="https://cbu01.alicdn.com/img/ibank/O1CN01TXwNmy1Uhwos1BVLP_!!2210530712550-0-cib.jpg" alt="">
          <img src="https://cbu01.alicdn.com/img/ibank/O1CN01o4GHyI1UhwooAhbNb_!!2210530712550-0-cib.jpg" alt="">
          <img v-for="img, key in productImages" :src="img" :key="key" alt="" class="productImages">
          <img src="https://cbu01.alicdn.com/img/ibank/O1CN0122gdbE1Uhwom77tBM_!!2210530712550-0-cib.jpg" alt="">
        </div>
      </el-tab-pane>
      <el-tab-pane label="手动" name="munaul">
      </el-tab-pane>
    </el-tabs>
    <div class="">

    </div>
  </div>
</template>
<script>
export default {
  props: {
    productImages: {
      type: Array,
      default: () => { }
    }
  },
  data() {
    return {
      imageUrl: '',
      modelName: 'template',
    }
  },
  created() {
    if (this.productImages)
      this.imageUrl = this.productImages[0]
  },
  methods: {
    onchange(file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    }
  },
}
</script>
<style lang="scss">
.leo-alibaba-description-design {
  vertical-align: bottom;

  .preview {
    line-height: 0px;
    height: 1000px;
    width: 800px;
    overflow: scroll;
    font-size: 0px;
    vertical-align: bottom;

    .target2 {
      width: 785px;
      height: 785px;
      background-image: url('https://cbu01.alicdn.com/img/ibank/O1CN01AGiQIe1Uhwom77cVp_!!2210530712550-0-cib.jpg');
      background-size: cover;
    }

    .productImages {
      width: 785px;
      height: 785px;
      background-color: black;
      padding: 20px 20px 0 20px;
    }

    img {
      width: 100%;
    }
  }
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  line-height: 178px;
  text-align: center;
  font-size: 28px;
  width: 385px;
  height: 385px;
  background-color: beige;
  margin: 200px;
}

.avatar {
  display: block;
  padding: 110px;
  width: 178px;
  height: 785px;
}</style>