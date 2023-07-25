<template>
  <div>
    <el-row style="background-color: #aad9ef;margin: 5px; padding: 10px; display: flex;
        flex-wrap: wrap;">
      <draggable :list="checkedList">
        <el-col v-for="image, index in checkedList" :key="index"
          style=" width: 200px;height: 200px;">
          <vue-hover-mask>
            <el-image :src="image.url" width="100%" class="leo-product-images-item" />
            <template v-slot:action>
              <el-button type="text" size="mini" @click="handleRemoveBtnClick(image)">
                删除
              </el-button>
            </template>
          </vue-hover-mask>
        </el-col>
        <el-col>
          <el-button @click="check" type="text">选择</el-button>
          <el-button @click="upload" type="text">上传</el-button>
        </el-col>
      </draggable>
    </el-row>
    <el-dialog :visible.sync="visible" width="1100">
      <el-row :gutter="5" v-if="images">
        <el-col v-for="image in images" :key="image.id" style="width:180px;">
          <vue-hover-mask @click="handleClick(image)">
            <el-image :src="image.url" width="100%" class="leo-product-images-item" />
            <label style="position: absolute" :ref="'checked' + image.id"
              :class="{ 'leo-sm-label-checked': image.checked }"><i
                class="el-icon-check leo-icon-check"></i></label>
            <template v-slot:action>
            </template>
          </vue-hover-mask>
        </el-col>

      </el-row>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
.leo-product-images-item {
  width: 100%;
  min-width: 150px;
  min-height: 150px;
}

.background {
  // background-image: url('http://localhost:8080/img/8/40547.jpg');
  background-size: cover;
  width: 200px;
  /* 背景图片的宽度 */
  height: 200px;
  /* 背景图片的高度 */
  position: relative;
}

.overlay-image {
  position: absolute;
  // top: 200px;
  /* 图片距离背景顶部的距离 */
  // left: 300px;
  /* 图片距离背景左侧的距离 */
  width: 200px;
  /* 图片的宽度 */
  height: 200px;
  /* 图片的高度 */
}
</style>
<script>
import draggable from 'vuedraggable'
import VueHoverMask from 'vue-hover-mask'

export default {
  components: {
    VueHoverMask,
    draggable
  },
  data() {
    return {
      visible: false,
      image: {},
      checkedList: []
    }
  },
  props: {
    value: {
      type: Object,
      required: true
    },
    images: {
      type: Array,
      required: true
    }
  },
  watch: {
    value(newValue) {
      this.checkedList = this.images.filter((img) => img.checked)
      this.image = newValue
    }
  },
  methods: {
    alibaba(images) {
      return {
        isWatermark: false,
        isWatermarkFrame: false,
        watermarkPosition: false,
        images
      }
    },
    handleClick(image) {
      const key = this.getIdIndex(this.images, image.id)
      if (image.checked) {
        this.images[key].checked = !this.images[key].checked
        this.$refs['checked' + image.id][0].className = 'leo-sm-label-checked'
      } else {
        this.images[key].checked = true
        this.$refs['checked' + image.id][0].className = ''
      }
      this.checkedList = this.images.filter((img) => img.checked)
      this.$emit('input', this.alibaba(this.checkedList))
    },

    handleCustomzedClick(e) {
      this.$emit('onCustomzedClick', e)
    },

    getIdIndex(list, id) {
      return list.findIndex((img) => {
        return img.id == id
      })
    },

    handleRemoveBtnClick(image) {
      const index = this.images.findIndex((img) => {
        return img.id == image.id
      })
      this.images[index].checked = !this.images[index].checked
      this.checkedList = this.images.filter((img) => img.checked)
      this.$emit('input', this.alibaba(this.checkedList))
    },
    check() {
      this.visible = !this.visible
    },
    upload() {
      this.$emit('upload', this.images)
    }
  }
}
</script>
<style lang='scss' scoped>
@import url('//at.alicdn.com/t/font_1262845_52b6h42svd7.css');

.iconfont {
  font-size: 25px;
}

.leo-icon-check {
  font-size: 12px;
  margin-top: 11px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.leo-sm-label-main {
  font-weight: 700;
  right: -15px;
  top: -6px;
  width: 40px;
  height: 24px;
  background: #13ce66;
  text-align: center;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-box-shadow: 0 0 1pc 1px rgb(0 0 0 / 20%);
}

.leo-sm-label-checked {
  span {
    font-size: 12px;
    margin-top: 11px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  font-weight: 700;
  left: -15px;
  top: -6px;
  width: 40px;
  height: 24px;
  background: #ea1313;
  text-align: center;
  -webkit-transform: rotate(45deg);
  transform: rotate(135deg);
  -webkit-box-shadow: 0 0 1pc 1px rgb(0 0 0 / 20%);
}
</style>