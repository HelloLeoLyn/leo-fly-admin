<template>
  <div>
    <el-row>
      <template v-if="this.count">
        <el-col v-for="i in count" :key="i" style=" width: 200px;height: 200px;">
          <!-- <vue-hover-mask>
            <el-image src="" width="100%" class="leo-product-images-item" />
            <template v-slot:action>
              <el-button type="text" size="mini" @click="handleRemoveBtnClick(index)">
                删除
              </el-button>
            </template>
          </vue-hover-mask> -->
          <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
      </template>
    </el-row>
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
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
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
      checkedList: []
    }
  },
  props: {
    images: {
      type: Array,
      default: () => {}
    },
    count: {
      type: Number,
      default: () => {}
    },
    customzedBtn: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    console.log('mounted')
    if (this.count && this.images) {
      if (this.count > this.images.length) {
      } else {
      }
    } else {
      if (this.count && !this.images) {
      } else if (!this.count && this.images) {
      } else {
      }
    }
    this.load()
  },
  watch: {
    images(newValue) {
      console.log('watch images')
      if (newValue) {
        console.log(newValue)
      }
    },
    count(newValue) {
      console.log('watch count')
      if (newValue) {
        console.log(newValue)
      }
    }
  },

  methods: {
    handleClose() {
      this.getImages()
    },

    getImages() {
      this.$emit('getImages', this.checkedList)
    },

    handleClick(image) {
      const key = this.getIdIndex(image.id)
      if (image.checked) {
        this.images[key].checked = !this.images[key].checked
        this.$refs['checked' + image.id][0].className = 'leo-sm-label-checked'
      } else {
        this.images[key].checked = true
        this.$refs['checked' + image.id][0].className = ''
      }
      this.checkedList = this.images.filter((img) => img.checked)
    },

    handleCustomzedClick(e) {
      this.$emit('onCustomzedClick', e)
    },

    getIdIndex(id) {
      return this.images.findIndex((img) => {
        return img.id == id
      })
    },

    handleRemoveBtnClick(id) {
      this.checkedList.splice(id, 1)
      this.getImages()
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