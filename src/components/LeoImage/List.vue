<template>
  <div>
    <el-row style="background-color: #aad9ef;margin: 5px; padding: 10px; display: flex;
        flex-wrap: wrap;">
      <draggable :list="checkedList">
        <el-col v-for="image, index in checkedList" :key="index" style=" width: 200px;height: 200px;">
          <vue-hover-mask>
            <el-image :src="image.url" width="100%" class="leo-product-images-item" />
            <template v-slot:action>
              <el-button type="text" size="mini" @click="handleRemoveBtnClick(index)">
                删除
              </el-button>
            </template>
          </vue-hover-mask>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="default" @click="visible = true">修改图片</el-button>
        </el-col>
      </draggable>
    </el-row>
    <el-dialog :visible.sync="visible" width="1100" @close="handleClose">
      <el-row :gutter="5" v-if="images" :key="changeKey">
        <el-col v-for="image, index in images" :key="image.id" style="width:180px;">
          <vue-hover-mask @click="handleClick(image)">
            <el-image :src="image.url" width="100%" class="leo-product-images-item" />
            <label style="position: absolute" :ref="'checked' + image.id"
              :class="{ 'leo-sm-label-checked': image.checked }"><i class="el-icon-check leo-icon-check"></i></label>
            <template v-slot:action>
              <el-button type="text" size="mini" v-if="customzedBtn" @click="handleCustomzedClick(image)">{{
                customzedBtn.label }}
              </el-button>
            </template>
          </vue-hover-mask>
        </el-col>
        <el-col>
          <el-button v-if="resetable" @click="load" type="text">重置</el-button>
          <el-button v-if="saveable" @click="save" type="text">保存</el-button>
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
import { getImagesByProductId } from '@/api/leo-image'
import { api_get_product } from '@/api/leo-product'
import { service } from '@/api/index'
export default {
  components: {
    VueHoverMask,
    draggable
  },
  data() {
    return {
      service,
      visible: false,
      imageUrl: null,
      imageId: null,
      changeKey: 0,
      images: [],
      productImages: [],
      checkedList: []
    }
  },
  props: {
    sources: {
      type: Array,
      required: true
    },
    autoSave: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    resetable: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    saveable: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    productId: {
      type: [String, Number],
      required: true
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
    handleClose() {
      this.getImages()
    },
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
            const images = res.data.filter((image) => image.status != -1).map((image) => {
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
            this.checkedList = this.images.filter((img) => img.checked)
            this.getImages()
            this.changeKey++
          })
        }
      })
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