<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="4" :offset="0" v-for="index in 5" :key="index">
        <a class="pcitrueArea" href="javascript:void(0);" @click="handleImageClick">
          <img v-if="value.imageList[index - 1]" :src="value.imageList[index - 1].url" alt="" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </a>
      </el-col>
    </el-row>
    <el-dialog title="" :visible.sync="visible" width="80%">
      <ImageSteward key="primaryPicture" v-if="product" @onConfirm="onConfirmPrimaryPicture"
        :count="5" :product="product"></ImageSteward>
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
import ImageSteward from '@/views/leo-image/components/ImageSteward.vue'
export default {
  components: { ImageSteward },
  props: {
    value: {
      type: Object,
      default: (e) => {
        return e
      }
    },
    product: {
      type: Object,
      default: (e) => {
        return e
      }
    }
  },
  watch: {
    value(newVal) {
      console.log(newVal)
    },
    product(newVal) {
      console.log(newVal)
    }
  },
  methods: {
    handleImageClick() {
      this.visible = !this.visible
    },
    onConfirmPrimaryPicture(images) {
      console.log(images)
      this.value.imageList = images.map((img) => {
        return { url: img.url }
      })
      this.$emit('input', this.value)
      this.visible = !this.visible
    }
  },
  data() {
    return {
      visible: false
    }
  }
}
</script>
