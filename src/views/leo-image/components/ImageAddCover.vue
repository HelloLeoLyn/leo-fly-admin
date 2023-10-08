<template>
  <div class="leo-add-cover">
    <div class="selectArea">
      <LeoImageHoverList
        v-if="isEditModel"
        :images="images"
        @onCustomzedClick="onAlibabaCoverClk"
        :reloadable="true"
        :customzedBtn="[
          { label: '设置封面图', opt: 'alibaba' },
          { label: '设置包装图', opt: 'package' },
          { label: '编辑', opt: 'cutter' },
          { label: '删除', opt: 'delete' }
        ]"
        @onPrepare="onUploadPrepare"
      />
      <el-row :gutter="5" v-else>
        <el-col :span="6" v-for="(image, index) in images" :key="image.id">
          <div
            style="width: 200px; height: 200px; padding: 10px; margin: 10px"
            :class="{ 'is-uploaded': image.status == 2 }"
          >
            <el-image
              :src="image.src"
              width="100%"
              @click="handleImageClick(index)"
              :class="{ 'prepare-upload': image.checked }"
            />
          </div>
        </el-col>
      </el-row>
    </div>

    <div style="display: flex">
      <el-button
        type="primary"
        size="default"
        @click="isEditModel = !isEditModel"
        >{{ isEditModel ? '编辑模式' : '上传模式' }}</el-button
      >
      <album1688 v-if="!isEditModel" v-model="albumID"></album1688
      ><el-button
        v-if="!isEditModel"
        type="primary"
        size="default"
        @click="
          sendImagesToAlibaba(
            images.filter(img => img.checked),
            albumID
          )
        "
        >确认</el-button
      >
    </div>
    <el-dialog
      title=""
      :visible.sync="dialog.show"
      width="80%"
      :modal-append-to-body="false"
    >
      <div class="container" v-show="dialog.opt == 'alibaba'">
        <img class="bottom-image" :src="dialog.coverPartUrl" alt="底层图片" />
        <img class="top-image" :src="dialog.coverUrl" alt="顶层图片" />
      </div>
      <div v-show="dialog.opt == 'package'">
        <ImgCutter
          ref="imgCutterModal"
          label="选择本地图片"
          fileType="jpeg"
          WatermarkText="vue-img-cutter"
          WatermarkTextFont="12px Sans-serif"
          WatermarkTextColor="#00ff00"
          :crossOrigin="options.crossOrigin"
          :crossOriginHeader="options.crossOriginHeader"
          :rate="options.rate"
          :toolBgc="options.toolBgc"
          :isModal="options.isModal"
          :showChooseBtn="options.showChooseBtn"
          :lockScroll="options.lockScroll"
          :boxWidth="options.boxWidth"
          :boxHeight="options.boxHeight"
          :cutWidth="options.cutWidth"
          :cutHeight="options.cutHeight"
          :sizeChange="options.sizeChange"
          :moveAble="options.moveAble"
          :imgMove="options.imgMove"
          :originalGraph="options.originalGraph"
          :WatermarkTextX="options.WatermarkTextX"
          :WatermarkTextY="options.WatermarkTextY"
          :smallToUpload="options.smallToUpload"
          :saveCutPosition="options.saveCutPosition"
          :scaleAble="options.scaleAble"
          :previewMode="options.previewMode"
          :quality="options.quality"
          :toolBoxOverflow="options.true"
          :index="options.index"
          @cutDown="cutDown"
          @onPrintImg="onPrintImg"
        >
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
        <div class="container">
          <img
            class="package-bottom-image"
            :src="dialog.cutImgHref"
            alt="底层图片"
          />
          <img class="top-image" :src="dialog.coverUrl" alt="顶层图片" />
        </div>
      </div>
      <span slot="footer">
        <el-button @click="dialog.show = false">Cancel</el-button>
        <el-button type="primary" @click="generateImages()">生成图片</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style lang="scss">
.leo-add-cover {
  .selectArea {
    border-spacing: 1px;
    border-style: dotted;
    border-color: turquoise;
  }

  padding: 20px;

  .is-uploaded {
    border: 2px solid rgb(15, 212, 64);
  }

  .prepare-upload {
    border: 2px solid rgb(195, 201, 31);
  }

  .container {
    border: 1px solid rgb(31, 175, 201);
    margin: 0 auto;
    position: relative;
    width: 800px;
    /* 容器宽度等于顶层图片的宽度 */
    height: 800px;

    /* 容器高度等于顶层图片的高度 */
    .bottom-image {
      position: absolute;
      top: 500px;
      /* 使底层图片的顶部位于容器的中央 */
      left: 50%;
      /* 使底层图片的左侧位于容器的中央 */
      transform: translate(-50%, -50%);
      /* 使用负边距将底层图片向左和向上移动自身宽高的一半 */
      width: 600px;
      height: 600px;
    }

    .top-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 800px;
      height: 800px;
    }
  }
  .package-bottom-image {
    position: absolute;
    top: 520px;
    /* 使底层图片的顶部位于容器的中央 */
    left: 50%;
    /* 使底层图片的左侧位于容器的中央 */
    transform: translate(-50%, -50%);
    /* 使用负边距将底层图片向左和向上移动自身宽高的一半 */
    width: auto;
    height: 300px;
  }
}
</style>
<script>
import { api_image_delete } from '@/api/leo-image'
import { api_alibaba_auth } from '@/api/leo-alibaba'
import { api_photo_alibaba_uload_batch } from '@/api/leo-photo'
import { MessageBox } from 'element-ui'
import { imgBase, imgTempPath } from '@/api/local-setting'
import LeoImageHoverList from '@/components/LeoImage/HoverList.vue'
import { api_python_image_goods_post } from '@/api/leo-python'
import { service } from '@/api/index'
import ImgCutter from 'vue-img-cutter'
import album1688 from '@/views/leo-alibaba/components/album1688'
export default {
  props: {
    images: {
      type: Array,
      // required: true
      default: e => {
        return e
      }
    },
    productId: {
      type: [String, Number],
      default: e => {
        return e
      }
    },
    defaultEditModel: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    code: {
      type: [String, Number],
      default: e => {
        return e
      }
    }
  },
  watch: {
    defaultEditModel (newVal) {
      this.isEditModel = newVal
    },
    code (newVal) {
      this.dialog.coverCode = newVal
    }
  },
  components: { LeoImageHoverList, ImgCutter, album1688 },
  data () {
    return {
      isEditModel: false,
      albumID: '',
      dialog: {
        show: false,
        coverPath: imgBase + '/0/alibaba-cover.png',
        coverUrl: 'http://localhost:8080/img/0/alibaba-cover.png',
        coverPart: '',
        coverPartUrl: null,
        coverCode: '',
        coverSavePath: '',
        cutImgHref: '',
        name: '',
        isRmbg: false
      },
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
  methods: {
    sendImagesToAlibaba (images, albumID) {
      const params = {
        images,
        albumID
      }
      api_photo_alibaba_uload_batch(params).then(res => {
        if (res.code == '001994') {
          api_alibaba_auth().then(res => {
            MessageBox.confirm(
              '还未登录阿里巴巴平台，是否打开登录页面',
              '提示',
              {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }
            ).then(() => {
              window.open(res.data)
            })
          })
        } else {
          res.data.forEach(img => {
            let index = this.images.findIndex(old => (old.id == img.id))
            this.$set(this.images[index], 'status', 2)
            this.$set(this.images[index], 'src', img.url)
          })
          this.$message.success('图片上传成功')
        }
      })
    },
    onUploadPrepare () {},
    onUploadConfirm () {},
    onPrintImg (e) {
      this.dialog.cutImgHref = e.dataURL
    },
    cutDown (e) {
      this.dialog.cutImgHref = e.dataURL
    },

    generateImages () {
      if (this.dialog.opt == 'package') {
        let link = document.createElement('a')
        link.setAttribute('href', this.dialog.cutImgHref)
        link.download = 'leo-image-package.jpg'
        link.click()
      }
      const {
        coverPath,
        coverPart,
        coverSavePath,
        coverUrlPath,
        opt,
        name,
        isRmbg,
        imageId
      } = this.dialog
      const params = {
        coverPath,
        coverPart,
        coverCode: this.code,
        coverSavePath,
        opt,
        productId: this.productId,
        name,
        isRmbg,
        imageId
      }
      api_python_image_goods_post(params).then(res => {
        this.$notify.success(res.msg)
        this.images.push({
          src: coverUrlPath,
          id: res.data.imageId,
          status: 1,
          checked: false
        })
      })
    },
    onAlibabaCoverClk (img, opt, index) {
      this.dialog.coverPartUrl = img.src
      this.dialog.opt = opt
      this.dialog.id = img.id
      this.dialog.imageName = img.imageName
      if (opt == 'alibaba') {
        this.dialog.show = !this.dialog.show
        this.dialog.coverUrl = 'http://localhost:8080/img/0/alibaba-cover.png'
        this.dialog.coverPath = imgBase + '0/alibaba-cover.png'
        this.dialog.coverPart = img.path
        this.dialog.coverSavePath =
          imgBase + this.productId + '/' + this.productId + '-cover.png'
        this.dialog.name = this.productId + '-cover.png'
        this.dialog.coverUrlPath =
          service +
          '/img/' +
          this.productId +
          '/' +
          this.productId +
          '-cover.png'
        this.dialog.isRmbg = false
      } else if (opt == 'package') {
        this.dialog.show = !this.dialog.show
        this.dialog.coverUrl = 'http://localhost:8080/img/0/package-box.png'
        this.dialog.coverPath = imgBase + '0/package-box.png'
        this.dialog.coverPart = imgTempPath + 'leo-image-package.jpg'
        this.dialog.coverSavePath =
          imgBase + this.productId + '/' + this.productId + '-package.png'
        this.dialog.coverUrlPath =
          service +
          '/img/' +
          this.productId +
          '/' +
          this.productId +
          '-package.png'
        this.dialog.name = this.productId + '-package.png'
        console.log(this.$refs.imgCutterModal)
        this.$refs.imgCutterModal.handleOpen({
          name: img.id,
          src: img.src
        })
        this.dialog.isRmbg = true
      } else if (opt == 'cutter') {
        this.$router.push({
          name: 'LeoImageCutter',
          params: {
            images: this.images,
            index
          }
        })
      } else if (opt == 'delete') {
        api_image_delete(img.id).then(res => {
          this.images.splice(index, 1)
          this.$notify.success(res.msg)
        })
      }
    },
    handleImageClick (index) {
      this.$set(this.images[index], 'checked', !this.images[index].checked)
    }
  }
}
</script>
