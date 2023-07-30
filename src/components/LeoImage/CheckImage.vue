<template>
  <div>
    <el-button @click="check" type="text">选择</el-button>
    <el-dialog :visible.sync="visible" width="1100">
      <el-row :gutter="5" v-if="images">
        <el-col v-for="image in images" :key="image.id" style="width:180px;">
          <vue-hover-mask @click="handleClick(image)">
            <el-image :src="image.url" width="100%" class="leo-product-images-item" />
            <label style="position: absolute" :ref="'checked' + image.id"
              :class="{ 'leo-sm-label-checked': image.checked }"><i class="el-icon-check leo-icon-check"></i></label>
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
    draggable,
  },
  data() {
    return {
      visible: false,
    }
  },
  props: {
    images: {
      type: Array,
      required: true
    }
  },

  methods: {
    handleClick(image) {
      const key = this.getIdIndex(this.images, image.id)
      if (image.checked) {
        this.images[key].checked = !this.images[key].checked
        this.$refs['checked' + image.id][0].className = 'leo-sm-label-checked'
      } else {
        this.images[key].checked = true
        this.$refs['checked' + image.id][0].className = ''
      }
      this.$emit('input', this.images)
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
      this.$emit('input', this.images)
    },
    check() {
      this.visible = !this.visible
    },
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