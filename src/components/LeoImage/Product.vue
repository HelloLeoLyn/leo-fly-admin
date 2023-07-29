<template>
  <div>
    <el-row :gutter="5" v-if="images" :key="changeKey">
      <el-col v-for="image, index in imageShowList" :key="image.id" style="width:180px;">
        <vue-hover-mask @click="handleClick(image)">
          <el-image :src="image.url" width="100%" class="leo-product-images-item" />
          <label style="position: absolute" :ref="'checked' + image.id"
            :class="{ 'leo-sm-label-checked': image.checked }"><i class="el-icon-check leo-icon-check"></i></label>
          <label style="position: absolute" :class="{ 'leo-sm-label-main': image.isMain }" :ref="image.id">
          </label>
          <template v-slot:action>
            <div v-if="image.pixel">
              <span style="font-size:12px">{{ image.pixel }}{{ image.moduleType }}</span>
              <br>
              <el-button @click="openImgCutter(imageShowList, index)" type="text">编辑图片</el-button>
              <br>
            </div>
            <el-button type="text" size="mini" @click="handleRemoveBtnClick(image.id)">
              删除
            </el-button>
            <el-button type="text" size="mini" v-if="bigBtn" @click="handleBigBtnClick(image.id)">大图
            </el-button>
            <el-button type="text" size="mini" v-if="bigBtn" @click="handleMainClick(image)">主图
            </el-button>
            <el-button type="text" size="mini" v-if="customzedBtn" @click="handleCustomzedClick(image)">{{
              customzedBtn.label }}
            </el-button>
          </template>
        </vue-hover-mask>
      </el-col>
      <el-col>
        <el-button v-if="reloadable" @click="load" type="text">刷新</el-button>
        <el-button v-if="renewable" @click="save" type="text">保存</el-button>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="visible" width="1100">
      <el-image v-if="imageUrl" :src="imageUrl" width="100%" />
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
.leo-product-images-item {
  width: 100%;
  min-width: 150px;
  min-height: 150px;
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
      imageShowList: [],
      productImages: []
    }
  },
  props: {
    autoSave: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    productId: {
      type: String,
      required: true
    },
    reloadable: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    renewable: {
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
      type: Object,
      default: () => { }
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    save() {
      const deleteImages = this.images.filter((image) => image.status == -1)
      const newImages = this.images.filter(
        (image) => image.checked && image.status != -1
      )
      const main = newImages.filter((image) => image.isMain)
      const params = {
        id: this.productId,
        images: newImages.map((image) => image.id),
        mainImage: main.length == 0 ? newImages[0].id : main[0].id,
        deleteImages,
        referStatus: '1'
      }
      this.$emit('onSaveClick', params)
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
                image.productId = image.code
                image.url = service + '/img/' + image.code + '/' + image.name + '?' + new Date().getTime()
                image.checked = checkIndex >= 0
                return image
              })
            this.images = images
            this.$emit('getImages', images)
            this.imageShowList = this.images.filter((img) => img.status != -1)
            this.changeKey++
          })
        }
      })
    },
    openImgCutter(images, index) {
      // console.log(images);
      this.$router.push({
        name: 'LeoImageCutter',
        params: {
          images,
          index
        }
      })
    },
    getImages() {
      return this.images
    },
    handleClick(image) {
      const key = this.getIdIndex(image.id)
      if (image.checked) {
        this.images[key].checked = !this.images[key].checked
        if (image.isMain) {
          this.$refs[image.id][0].className = ''
        }
        this.$refs['checked' + image.id][0].className = 'leo-sm-label-checked'
      } else {
        this.images[key].checked = true
        this.$refs['checked' + image.id][0].className = ''
      }
    },
    handleMainClick(image) {
      this.images.forEach((img, key) => {
        if (img.status == 0) {
          if (image.id == img.id) {
            this.images[key].isMain = true
            this.$refs[img.id][0].className = 'leo-sm-label-main'
            image.checked = !image.checked
          } else {
            this.images[key].isMain = false
            this.$refs[img.id][0].className = ''
          }
        }
      })
    },
    handleCustomzedClick(e) {
      this.$emit('onCustomzedClick', e)
    },
    getIdIndex(id) {
      return this.images.findIndex((img) => {
        return img.id == id
      })
    },
    handleBigBtnClick(id) {
      this.visible = true
      const key = this.getIdIndex(id)
      this.imageUrl = this.images[key].large + '?' + new Date().getTime()
      this.imageId = id
      this.images[key].checked = !this.images[key].checked
    },
    handleRemoveBtnClick(id) {
      const key = this.getIdIndex(id)
      this.images[key].status = -1
      api_image_delete(id).then(() => {
        this.imageShowList = this.images.filter((img) => img.status != -1)
        this.changeKey++
        this.$notify.success('successfully')
      })
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