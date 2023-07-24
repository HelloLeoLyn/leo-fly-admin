<template>
  <div>
    <el-row :gutter="5" v-if="images" :key="changeKey">
      <el-col :span="4" v-for="image in images" :key="image.id" style="width: 180px">
        <vue-hover-mask @click="handleClick(image)">
          <el-image :src="image.url" width="100%" class="leo-product-images-item" />
          <label style="position: absolute" :ref="'checked' + image.id"
            :class="{ 'leo-sm-label-checked': image.checked }"><i
              class="el-icon-check leo-icon-check"></i></label>
          <template v-slot:action>
            <el-row v-for="btn, key in customzedBtn" :key="key">
              <el-button type="text" size="mini"
                @click="handleCustomzedClick(image, btn.opt)">{{ btn.label }}
              </el-button>
            </el-row>
            <el-row>
              <el-button type="text" size="mini" @click="handleRemoveBtnClick(image.id)"> 删除
              </el-button>
              <el-button type="text" size="mini" v-if="bigBtn"
                @click="handleBigBtnClick(image.url)">大图</el-button>
            </el-row>
          </template>
        </vue-hover-mask>
      </el-col>
      <el-col :span="4" style="padding-top: 130px">
        <el-button v-if="reloadable" @click="load">刷新</el-button>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="visible" width="1100">
      <el-image :src="imageUrl" width="100%" />
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
.leo-product-images-item {
  width: 100%;
  min-width: 150px;
  min-height: 150px;
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
import { getImagesByProductId, api_image_delete } from '@/api/leo-image'
import { api_get_product } from '@/api/leo-product'
import { service } from '@/api/index'
export default {
  components: {
    VueHoverMask
  },
  data() {
    return {
      service,
      visible: false,
      imageUrl: null,
      imageId: null,
      changeKey: 0,
      images: [],
      productImages: []
    }
  },
  props: {
    productId: {
      type: [String, Number],
      required: true
    },
    reloadable: {
      type: Boolean,
      default: () => {
        return false
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
  mounted() {
    this.load()
  },
  methods: {
    onConfirm() {
      this.visible = false
      this.$emit('getImages', this.images)
    },

    load() {
      getImagesByProductId(this.productId).then((res) => {
        if (res.data && res.data.length > 0) {
          api_get_product(this.productId).then((newProduct) => {
            this.productImages = newProduct.data.images
            const images = res.data
              .filter((image) => image.status != -1)
              .map((image) => {
                let checkIndex = -1
                if (this.productImages && this.productImages.length > 0) {
                  checkIndex = this.productImages.findIndex((pi) => {
                    return pi == image.id
                  })
                }
                if (
                  image.name.indexOf('cover') >= 0 ||
                  image.name.indexOf('package') >= 0 ||
                  image.name.indexOf('detail') >= 0
                ) {
                  image.imageName = image.name
                  image.imageId = image.id
                }
                image.productId = image.code
                image.url =
                  service +
                  '/img/' +
                  image.code +
                  '/' +
                  image.name +
                  '?' +
                  new Date().getTime()
                image.checked = checkIndex >= 0
                return image
              })
            this.images = images
            this.changeKey++
            this.$emit('getImages', this.images)
          })
        }
      })
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
    },

    handleCustomzedClick(image, opt) {
      const key = this.getIdIndex(image.id)
      this.images[key].checked = !this.images[key].checked
      this.$emit('onCustomzedClick', image, opt)
    },
    getIdIndex(id) {
      return this.images.findIndex((img) => {
        return img.id == id
      })
    },
    handleBigBtnClick(url) {
      if (this.checkable) {
        this.image.checked = !this.image.checked
      }
      this.visible = true
      this.imageUrl = url
    },
    handleRemoveBtnClick(id) {
      const key = this.getIdIndex(id)
      this.images[key].status = -1
      api_image_delete(id).then(() => {
        this.images = this.images.filter((img) => img.status != -1)
        this.changeKey++
        this.$notify.success('successfully')
      })
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
