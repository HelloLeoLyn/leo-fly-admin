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
              <el-button @click="openImgCutter(image.url, image.id)" type="text">编辑图片</el-button>
              <br>
            </div>
            <el-button type="text" size="mini" @click="handleRemoveBtnClick(image.id)">
              删除
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
    <el-row :gutter="20" v-show="visible">
      <el-col :span="12" :offset="0">
        <ImgCutter ref="imgCutterModal" label="选择本地图片" fileType="jpeg" WatermarkText="vue-img-cutter"
          WatermarkTextFont="12px Sans-serif" WatermarkTextColor="#00ff00" :crossOrigin="options.crossOrigin"
          :crossOriginHeader="options.crossOriginHeader" :rate="options.rate" :toolBgc="options.toolBgc"
          :isModal="options.isModal" :showChooseBtn="options.showChooseBtn" :lockScroll="options.lockScroll"
          :boxWidth="options.boxWidth" :boxHeight="options.boxHeight" :cutWidth="options.cutWidth"
          :cutHeight="options.cutHeight" :sizeChange="options.sizeChange" :moveAble="options.moveAble"
          :imgMove="options.imgMove" :originalGraph="options.originalGraph" :WatermarkTextX="options.WatermarkTextX"
          :WatermarkTextY="options.WatermarkTextY" :smallToUpload="options.smallToUpload"
          :saveCutPosition="options.saveCutPosition" :scaleAble="options.scaleAble" :previewMode="options.previewMode"
          :quality="options.quality" :toolBoxOverflow="options.true" :index="options.index" @cutDown="cutDown"
          @onPrintImg="onPrintImg">
          <template #open>
            <button>Choose image</button>
          </template>
          <template #confirm>
            <div></div>
          </template>
          <template #cancel>
            <div></div>
          </template>
        </ImgCutter>
      </el-col>
      <el-col :span="12" :offset="0">
        <div class="image-container">
          <img :src="cutImgHref" alt="">
        </div>
      </el-col>
    </el-row>

    <el-button-group style="padding: 10px 0;">
      <a class="el-button el-button--primary el-button--medium" @click="imageDownload" name='download'
        id='download'>确定</a>
    </el-button-group>
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
  background-image: url("http://localhost:8080/img/0/package-cover.png");
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
import ImgCutter from 'vue-img-cutter'

export default {
  components: {
    VueHoverMask, ImgCutter
  },
  data() {
    return {
      cutImgHref: '',
      service,
      visible: false,
      imageUrl: null,
      imageId: null,
      changeKey: 0,
      images: [],
      imageShowList: [],
      productImages: [],
      options: {
        isModal: false,
        showChooseBtn: false,
        lockScroll: true,
        label: '选择本地图片',
        boxWidth: 600,
        boxHeight: 600,
        cutWidth: 300,
        cutHeight: 300,
        tool: '',
        toolBgc: 'none',
        sizeChange: true,
        moveAble: true,
        originalGraph: true,
        crossOrigin: true,
        crossOriginHeader: '*',
        rate: '',
        WatermarkText: '',
        WatermarkTextFont: '',
        WatermarkTextColor: '',
        WatermarkTextX: 0.95,
        WatermarkTextY: 0.95,
        smallToUpload: true,
        saveCutPosition: true,
        scaleAble: true,
        imgMove: true,
        toolBoxOverflow: false,
        index: '',
        previewMode: true,
        fileType: '',
        quality: 1
      }
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
    cutDown(e) {
      this.cutImgHref = e.dataURL
    },
    onPrintImg(e) {
      this.cutImgHref = e.dataURL
    },
    openCutterImage(src, name) {
      this.$refs.imgCutterModal.handleOpen({
        name: name,
        src: src
      })
    },
    imageDownload() {
      this.visible = false
      this.$emit('newImageUrl',this.cutImgHref)
      const images = this.images.filter(img => img.checked)
      console.log(images);
      this.$emit('getImages',images)
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
            const images = res.data
              .filter((image) => image.status != -1)
              .map((image) => {
                let checkIndex = -1
                if (this.productImages && this.productImages.length > 0) {
                  checkIndex = this.productImages.findIndex((pi) => {
                    return pi == image.id
                  })
                }
                const { id, fileType, code, isMain, pixel, moduleType } = image
                return {
                  id,
                  productId: code,
                  fileType,
                  isMain,
                  pixel,
                  moduleType,
                  status: 0,
                  checked: checkIndex >= 0,
                  url:
                    service +
                    '/img/' +
                    image.code +
                    '/' +
                    image.id +
                    image.fileType +
                    '?' +
                    new Date().getTime(),
                  large:
                    service +
                    '/img/' +
                    image.code +
                    '/' +
                    +image.id +
                    image.fileType
                }
              })
            this.images = images
            this.imageShowList = this.images.filter((img) => img.status != -1)
            this.changeKey++
          })
        }
      })
    },
    openImgCutter(url, index) {
      this.visible = true
      this.openCutterImage(url, index)
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

    handleCustomzedClick(e) {
      this.$emit('onCustomzedClick', e)
    },
    getIdIndex(id) {
      return this.images.findIndex((img) => {
        return img.id == id
      })
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