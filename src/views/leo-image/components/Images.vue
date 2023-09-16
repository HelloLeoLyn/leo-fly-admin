<template>
  <div>
    <el-row :gutter="5" v-if="images" :key="changeKey">
      <el-col :span="6" v-for="(image, index) in images" :key="image.id">
        <div
          :class="{ 'leo-image-uploaded-1688': images[index].status == 2 }"
          style="width: 200px; height: 200px; padding: 10px; margin: 10px"
          @click="handleClick(index)"
        >
          <vue-hover-mask
            :class="{ uploadPrepare: images[index].checked }"
            style="width: 180px; height: 180px; background-color: gray"
          >
            <el-image :src="image.url" width="100%" />
            <template v-slot:action>
              <el-row v-for="(btn, key) in customzedBtn" :key="key">
                <el-button
                  type="text"
                  size="mini"
                  @click="handleCustomzedClick(image, btn.opt)"
                  >{{ btn.label }}
                </el-button>
              </el-row>
              <el-row>
                <el-button
                  type="text"
                  size="mini"
                  @click="handleRemoveBtnClick(image.id)"
                >
                  删除
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  v-if="bigBtn"
                  @click="handleBigBtnClick(image.url)"
                  >大图</el-button
                >
              </el-row>
            </template>
          </vue-hover-mask>
        </div>
      </el-col>
      <el-col :span="4" style="padding-top: 130px">
        <el-button @click="prepareUpload">上传</el-button>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="visible" width="1100">
      <el-image :src="imageUrl" width="100%" />
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
.uploadPrepare {
  background-color: #e4dd16;
  border: 5px solid #e4dd16;
}
.leo-image-uploaded-1688 {
  background-color: #16e458;
}
.image-container {
  position: relative;
  width: 500px;
  /* 根据需要设置容器的宽度 */
  height: 500px;
  /* 根据需要设置容器的高度 */
  background-image: url('http://localhost:8080/img/0/package-cover.png');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  border: 1px solid;

  // align-items: center;
  img {
    position: absolute;
    top: 250px;
    height: 200px;
  }
}
</style>
<script>
import VueHoverMask from 'vue-hover-mask'
export default {
  components: {
    VueHoverMask
  },
  data () {
    return {
      visible: false,
      imageUrl: null,
      imageId: null,
      changeKey: 0,
      productImages: []
    }
  },
  props: {
    reloadable: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    images: {
      type: Array,
      default: () => {
        return []
      }
    },
    bigBtn: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    customzedBtn: {
      type: Array,
      default: () => {}
    }
  },
  methods: {
    prepareUpload () {
      const list = this.images.filter(img => {
        return img.checked
      })
      this.$emit('onPrepare', list)
    },
    handleClick (index) {
      // this.images[index].checked = !this.images[index].checked
      this.$set(this.images[index], 'checked', !this.images[index].checked)
    },

    handleCustomzedClick (image, opt) {
      const key = this.getIdIndex(image.id)
      this.images[key].checked = !this.images[key].checked
      this.$emit('onCustomzedClick', image, opt)
    },
    getIdIndex (id) {
      return this.images.findIndex(img => {
        return img.id == id
      })
    },
    handleBigBtnClick (url) {
      if (this.checkable) {
        this.image.checked = !this.image.checked
      }
      this.visible = true
      this.imageUrl = url
    },
    handleRemoveBtnClick (id) {
      const key = this.getIdIndex(id)
      this.images[key].status = -1
    }
  }
}
</script>
<style lang="scss" scoped>
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
