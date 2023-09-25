<template>
  <div class="app-container">
    <div class="showArea">
      <!-- {{ product }} -->
      待上传的图片，点击选择
      <LeoImageHoverList v-if="isEditModel" :images="images" @onCustomzedClick="onAlibabaCoverClk"
        :reloadable="true" :customzedBtn="[
          { label: '设置封面图', opt: 'alibaba' },
          { label: '设置包装图', opt: 'package' },
          { label: '1688详情封面', opt: '1688detail' },
          { label: '删除', opt: 'delete' },
          { label: '编辑', opt: 'edit' }
        ]" />
      <el-row :gutter="5" v-else>
        <el-col v-for="(image) in images" :span="6" :key="image.id">
          <div style="width: 200px; height: 200px; padding: 10px; margin: 10px"
            :class="{ 'is-uploaded': image.status == 2 }" @click="image.checked = !image.checked">
            <el-image :src="image.src" width="100%" :class="{ 'prepare-upload': image.checked }" />
          </div>
        </el-col>
      </el-row>
      <div style="display: flex">
        <el-button type="primary" size="default"
          @click="isEditModel = !isEditModel">{{ isEditModel ? '编辑模式' : '上传模式' }}</el-button>
        <album1688 v-if="!isEditModel" v-model="albumID"></album1688><el-button v-if="!isEditModel"
          type="primary" size="default" @click="
            sendImagesToAlibaba(
              images.filter(img => img.checked),
              albumID
            )
          ">确认</el-button>
      </div>
    </div>
    <div class="prepareListArea">
      可插入的图片，点击选择
      <div class="images">
        <img :src="image.src" :class="{ active: image.checked, image: true }"
          v-for="(image, key) in images.filter(img => img.status == 2)" :key="key"
          style="padding: 5px" @click="handleLeoHoverImageClick(image)" />
      </div>
    </div>
    <div class="checkedArea">
      要插入的图片(0/{{ count }})可通过拖拽调整图片顺序
      <el-row :gutter="20">
        <draggable v-model="checkedList" group="article" class="dragArea">
          <el-col :span="3" :offset="0" v-for="index in count" :key="index">
            <img v-if="checkedList[index - 1]" :src="checkedList[index - 1].src" alt=""
              style="width: 100px; height: 100px" />
            <div v-else style="
                width: 100px;
                height: 100px;
                border: 1px dotted gray;
                text-align: center;
                justify-content: center;
                display: flex;
              ">
              <p>{{ index }}</p>
            </div>
          </el-col>
        </draggable>
        <el-button type="primary" size="default" @click="confirm">确认插入图片</el-button>
      </el-row>
    </div>
    <el-dialog title="" :visible.sync="dialog.show" width="80%" :modal-append-to-body="false">
      <div class="container" v-if="dialog.opt == 'alibaba'">
        <img class="bottom-image" :src="dialog.coverPartUrl" alt="底层图片" />
        <img class="top-image" :src="dialog.coverUrl" alt="顶层图片" />
      </div>
      <div class="container-1688detail" v-if="dialog.opt == '1688detail'">
        <img class="bottom-image" :src="dialog.coverUrl" alt="底层图片" />
        <img class="top-image" :src="dialog.coverPartUrl" alt="顶层图片" />
      </div>
      <div v-if="dialog.opt == 'package'">
        <ImgCutter ref="imgCutterModal" label="选择本地图片" fileType="jpeg"
          WatermarkText="vue-img-cutter" WatermarkTextFont="12px Sans-serif"
          WatermarkTextColor="#00ff00" :crossOrigin="options.crossOrigin"
          :crossOriginHeader="options.crossOriginHeader" :rate="options.rate"
          :toolBgc="options.toolBgc" :isModal="options.isModal"
          :showChooseBtn="options.showChooseBtn" :lockScroll="options.lockScroll"
          :boxWidth="options.boxWidth" :boxHeight="options.boxHeight" :cutWidth="options.cutWidth"
          :cutHeight="options.cutHeight" :sizeChange="options.sizeChange"
          :moveAble="options.moveAble" :imgMove="options.imgMove"
          :originalGraph="options.originalGraph" :WatermarkTextX="options.WatermarkTextX"
          :WatermarkTextY="options.WatermarkTextY" :smallToUpload="options.smallToUpload"
          :saveCutPosition="options.saveCutPosition" :scaleAble="options.scaleAble"
          :previewMode="options.previewMode" :quality="options.quality"
          :toolBoxOverflow="options.true" :index="options.index" @cutDown="cutDown"
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
        <div class="container">
          <img class="package-bottom-image" :src="dialog.cutImgHref" alt="底层图片" />
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
.images {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  .image {
    margin: 5px;
    border: 1px solid #bbc4cc;
    width: 100px;
    height: 100px;
  }
  .active {
    border: 3px solid #c27a0f;
  }
}
</style>
<script>
import { service } from '@/api/index'
import draggable from 'vuedraggable'
import ImageAddCoverVue from '../components/ImageAddCover.vue'
import { api_alibaba_auth } from '@/api/leo-alibaba'
import { api_photo_alibaba_uload_batch } from '@/api/leo-photo'
import { MessageBox } from 'element-ui'
import { imgBase, imgTempPath } from '@/api/local-setting'
import LeoImageHoverList from '@/components/LeoImage/HoverList.vue'
import { api_python_image_goods_post } from '@/api/leo-python'
import ImgCutter from 'vue-img-cutter'
import album1688 from '@/views/leo-alibaba/components/album1688'
import { api_image_delete } from '@/api/leo-image'
export default {
  components: {
    draggable,
    ImageAddCoverVue,
    LeoImageHoverList,
    ImgCutter,
    album1688
  },
  props: {
    product: {
      type: Object,
      default: (e) => {
        return e
      }
    },
    count: {
      type: Number,
      default: 5
    },
    imageKey: {
      type: String,
      default: 'src'
    }
  },
  data() {
    return {
      checkedList: [],
      prepareList: [],
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
      },
      images: []
    }
  },
  created() {
    this.product.images.forEach((image) => {
      let { id, path, status, name, url } = image
      let src = service + '/img/' + image.code + '/' + image.name
      // deepClone()
      this.images.push({ checked: false, src, id, path, status, name, url })
    })
  },
  methods: {
    handleLeoHoverImageClick(item) {
      if (!item.checked) {
        if (this.checkedList.length >= 5) {
          return
        } else {
          item.checked = !item.checked
          this.checkedList.push(item)
        }
      } else {
        const index = this.checkedList.findIndex((obj) => {
          return obj.id == item.id
        })
        item.checked = !item.checked
        this.checkedList.splice(index, 1)
      }
    },
    confirm() {
      this.$emit('onConfirm', this.checkedList)
    },
    sendImagesToAlibaba(images, albumID) {
      const params = {
        images,
        albumID
      }
      api_photo_alibaba_uload_batch(params).then((res) => {
        if (res.code == '001994') {
          api_alibaba_auth().then((res) => {
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
          res.data.forEach((img) => {
            let index = this.images.findIndex((old) => (old.id = img.id))
            this.$set(this.images[index], 'status', 2)
            this.$set(this.images[index], 'src', img.url)
          })
          this.$message.success('图片上传成功')
        }
      })
    },
    onPrintImg(e) {
      this.dialog.cutImgHref = e.dataURL
    },
    cutDown(e) {
      this.dialog.cutImgHref = e.dataURL
    },
    generateImages() {
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
        coverCode: this.product.code[0],
        coverSavePath,
        opt,
        productId: this.product.id,
        name,
        isRmbg,
        imageId
      }
      api_python_image_goods_post(params).then((res) => {
        this.$notify.success(res.msg)
        this.images.push({
          src: coverUrlPath,
          id: res.data.imageId,
          status: 1,
          checked: false
        })
      })
    },
    onAlibabaCoverClk(img, opt, index) {
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
          imgBase + this.product.id + '/' + this.product.id + '-cover.png'
        this.dialog.name = this.product.id + '-cover.png'
        this.dialog.coverUrlPath =
          service +
          '/img/' +
          this.product.id +
          '/' +
          this.product.id +
          '-cover.png'
        this.dialog.isRmbg = false
      } else if (opt == 'package') {
        this.dialog.show = !this.dialog.show
        this.dialog.coverUrl = 'http://localhost:8080/img/0/package-box.png'
        this.dialog.coverPath = imgBase + '0/package-box.png'
        this.dialog.coverPart = imgTempPath + 'leo-image-package.jpg'
        this.dialog.coverSavePath =
          imgBase + this.product.id + '/' + this.product.id + '-package.png'
        this.dialog.coverUrlPath =
          service +
          '/img/' +
          this.product.id +
          '/' +
          this.product.id +
          '-package.png'
        this.dialog.name = this.product.id + '-package.png'
        this.$refs.imgCutterModal.handleOpen({
          name: img.id,
          src: img.src
        })
        this.dialog.isRmbg = true
      } else if (opt == '1688detail') {
        this.dialog.show = !this.dialog.show
        this.dialog.coverUrl = 'http://localhost:8080/img/0/detail-cover.jpg'
        this.dialog.coverPath = imgBase + '0/detail-cover.jpg'
        this.dialog.coverPart = img.path
        this.dialog.coverSavePath =
          imgBase +
          this.product.id +
          '/' +
          this.product.id +
          '-detail-cover.jpg'
        this.dialog.name = this.product.id + '-detail-cover.jpg'
        this.dialog.isRmbg = false
      } else if (opt == 'edit') {
        this.$router.push({
          name: 'LeoImageCutter',
          params: {
            images: this.product.images,
            index
          }
        })
      } else if (opt == 'delete') {
        api_image_delete(img.id).then((res) => {
          this.images.splice(index, 1)
          this.$notify.success(res.msg)
        })
      }
    },
    handleImageClick(index) {
      this.$set(this.images[index], 'checked', !this.images[index].checked)
      console.log(index, this.images[index])
    }
  }
}
</script>
<style lang="scss">
.selectArea {
  border-spacing: 1px;
  border-style: dotted;
  border-color: turquoise;
}
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

.container-1688detail {
  border: 1px solid rgb(31, 175, 201);
  margin: 0 auto;
  position: relative;
  width: 800px;
  /* 容器宽度等于顶层图片的宽度 */
  height: 800px;

  /* 容器高度等于顶层图片的高度 */
  .bottom-image {
    position: absolute;
    width: 800px;
    height: 800px;
  }

  .top-image {
    position: absolute;
    top: 80px;
    left: 100px;
    width: 600px;
    height: 600px;
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
</style>
