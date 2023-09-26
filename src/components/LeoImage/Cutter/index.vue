<template>
  <div v-loading="loading">
    <div style="display: flex">
      <ImgCutter :key="imageCutterKey" ref="imgCutterModal" label="选择本地图片" fileType="jpeg"
        WatermarkText="vue-img-cutter" WatermarkTextFont="12px Sans-serif"
        WatermarkTextColor="#00ff00" :crossOrigin="options.crossOrigin"
        :crossOriginHeader="options.crossOriginHeader" :rate="options.rate"
        :toolBgc="options.toolBgc" :isModal="options.isModal" :showChooseBtn="options.showChooseBtn"
        :lockScroll="options.lockScroll" :boxWidth="options.boxWidth" :boxHeight="options.boxHeight"
        :cutWidth="options.cutWidth" :cutHeight="options.cutHeight" :sizeChange="options.sizeChange"
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
      <el-form size="mini">
        <el-row v-if="settingKeys">
          <el-col :span="11" :offset="1" v-for="key in settingKeys" :key="key">
            <el-form-item :label="setting[key].label" v-if="setting[key].options">
              <el-select v-model="setting[key].value" v-if="setting[key].htmlType == 'select'"
                @change="handleSelectChange(key)">
                <el-option v-for="option in setting[key].options" :key="option.key"
                  :label="option.label" :value="option.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="setting[key].label" v-else>
              <el-input v-model="setting[key].value"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-switch v-model="autoReset" active-text="自动重置参数" inactive-text="不自动重置参数"></el-switch>
          </el-col>
        </el-row>
        <el-button-group style="padding: 10px 0">
          <el-button type="primary" :disabled="imagesIndex == 0" @click="readFile">读取图片</el-button>
          <el-button type="primary" :disabled="imagesIndex == 0" @click="prefix">上一个</el-button>
          <el-button type="primary" :disabled="imagesIndex == images.length - 1" @click="next">下一个
          </el-button>
          <a class="el-button el-button--primary el-button--medium" @click="imageDownload"
            name="download" id="download">确定</a>
          <a class="el-button el-button--primary el-button--medium" @click="formReset(imagesIndex)"
            id="download">重置</a>
          <el-button type="primary" @click="rembg">一键抠图(rembg)</el-button>
          <el-button type="primary" @click="removeBg">一键抠图(removeBg)</el-button>
        </el-button-group>
        <el-upload action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
          :http-request="() => {}" :on-change="onChange">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form>
    </div>

    <el-row>
      <img :src="newImage" width="1000" />
    </el-row>
  </div>
</template>
<style scoped>
form {
  margin: 10px 20px;
}
</style>
<script>
import ImgCutter from 'vue-img-cutter'
import Options from './components/options.vue'
import {
  api_python_image_cut_post,
  api_python_image_rembg_post
} from '@/api/leo-python'
import { downloadIamge } from '@/utils/index'
import { service } from '@/api/index'
import { api_image_put } from '@/api/leo-image'
import { deepClone } from '@/utils/index'
import { getBase64Image, dataURLtoFile } from '@/utils/image'
import { imgBase } from '@/api/local-setting'
import axios from 'axios'
import { tempChongZuPath } from '@/api/local-setting'
export default {
  components: {
    ImgCutter,
    Options
  },
  props: {
    images: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    optionsDialog: {
      type: Boolean,
      default: () => {
        return true
      }
    }
  },

  data() {
    return {
      newImage: '',
      loading: false,
      autoReset: true,
      imageCutterKey: 0,
      imagesIndex: 0,
      otimer: null,
      visible: false,
      cutImgHref: null,
      settingKeys: null,
      settingInit: {},
      setting: {
        type: {
          key: 'type',
          value: 'product',
          label: '图片类型',
          id: 0
        },
        imageId: {
          key: 'imageId',
          value: null,
          label: '图片id',
          id: 1
        },
        productId: {
          key: 'productId',
          value: null,
          label: '商品id',
          id: 2
        },
        saveType: {
          key: 'saveType',
          value: 'db',
          label: '保存方式',
          id: 3
        },
        moduleType: {
          key: 'moduleType',
          value: 'PE',
          label: '图片类型2',
          htmlType: 'select',
          options: [
            {
              key: 'pe',
              value: 'PE',
              label: '电商'
            },
            {
              key: 'ps',
              value: 'PS',
              label: '原图'
            },
            {
              key: 'pp',
              value: 'PP',
              label: '打包图'
            },
            {
              key: 'pg',
              value: 'PG',
              label: '原装'
            }
          ],
          id: 4
        },
        fillWhiteBG: {
          key: 'fillWhiteBG',
          value: false,
          label: '是否填充白底',
          options: [
            {
              key: 'yes',
              value: true,
              label: '是'
            },
            {
              key: 'no',
              value: false,
              label: '否'
            }
          ],
          htmlType: 'select',
          id: 5
        },
        leftLogo: {
          key: 'leftLogo',
          value: false,
          label: '是否添加左上方logo',
          options: [
            {
              key: 'yes',
              value: true,
              label: '是'
            },
            {
              key: 'no',
              value: false,
              label: '否'
            }
          ],
          htmlType: 'select',
          id: 6
        },
        bgWater: {
          key: 'bgWater',
          value: false,
          label: '是否背景水印',
          options: [
            {
              key: 'yes',
              value: true,
              label: '是'
            },
            {
              key: 'no',
              value: false,
              label: '否'
            }
          ],
          htmlType: 'select',
          id: 7
        },
        generateType: {
          key: 'generateType',
          value: 'new',
          label: '保存方式',
          options: [
            {
              key: 'overwrite',
              value: 'overwrite',
              label: '覆盖'
            },
            {
              key: 'new',
              value: 'new',
              label: '新增'
            }
          ],
          htmlType: 'select',
          id: 8
        },
        size1000: {
          key: 'size1000',
          value: true,
          label: '生成1000*1000像素图片',
          options: [
            {
              key: 'yes',
              value: true,
              label: '是'
            },
            {
              key: 'no',
              value: false,
              label: '否'
            }
          ],
          htmlType: 'select',
          id: 9
        },
        size300: {
          key: 'size300',
          value: true,
          label: '生成300*300像素图片',
          options: [
            {
              key: 'yes',
              value: true,
              label: '是'
            },
            {
              key: 'no',
              value: false,
              label: '否'
            }
          ],
          htmlType: 'select',
          id: 10
        },
        size50: {
          key: 'size50',
          value: true,
          label: '生成50*50像素图片',
          options: [
            {
              key: 'yes',
              value: true,
              label: '是'
            },
            {
              key: 'no',
              value: false,
              label: '否'
            }
          ],
          htmlType: 'select',
          id: 11
        },
        optionType: {
          key: 'optionType',
          value: 'cutting',
          label: '截图类型',
          options: [
            {
              key: 'cutting',
              value: 'cutting',
              label: '裁剪'
            },
            {
              key: 'resize',
              value: 'resize',
              label: '缩放'
            },
            {
              key: 'moduleType',
              value: 'moduleType',
              label: 'moduleType'
            }
          ],
          htmlType: 'select',
          id: 12
        },
        path: {
          key: 'path',
          value: tempChongZuPath,
          label: '路径',
          id: 13
        }
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
  created() {},
  mounted() {
    this.settingKeys = Object.keys(this.setting).sort((a, b) => {
      return this.setting[a].id - this.setting[b].id
    })
    this.settingKeys.forEach((key) => {
      this.settingInit[key] = this.setting[key].value
    })
    this.imagesIndex = this.index
    this.openCutterImageByIndex(this.imagesIndex)
    this.setting['imageId'].value = this.images[this.imagesIndex].id
    this.setting['productId'].value = this.images[this.imagesIndex].productId
  },
  methods: {
    readFile() {
      this.openCutterImageByIndex(this.imagesIndex)
      let image = this.images[this.imagesIndex]
      this.$refs.imgCutterModal.handleOpen({
        name: image.name,
        src: image.src
      })
    },
    rembg() {
      let name = new Date().getTime() + '.jpg'
      let outPath =
        imgBase + this.images[this.imagesIndex].productId + '/' + name
      this.loading = true
      api_python_image_rembg_post({
        inputPath: this.images[this.imagesIndex].url,
        outPath: outPath,
        fileType: 'http'
      })
        .then(() => {
          this.loading = false
          this.newImage =
            'http://127.0.0.1:8080/img/' +
            this.images[this.imagesIndex].productId +
            '/' +
            name
          let tmp = deepClone(this.images[0])
          tmp.large = this.newImage
          tmp.url = this.newImage
          tmp.id = -1
          this.images.push(tmp)
          this.goto(this.images.length - 1)
        })
        .catch((error) => {
          this.loading = false
          return console.error('Request failed:', error)
        })
    },
    removeBg() {
      let image = new Image()
      // 给img加上随机值一部分情况下能解决跨域
      // image.src = img + '?time=' + new Date().valueOf();
      image.src = this.images[this.imagesIndex].url
      // 允许跨域操作
      image.setAttribute('crossOrigin', 'anonymous')
      image.onload = function () {
        let base64 = getBase64Image(image)
        let newFile = dataURLtoFile(base64, 'abc.jpg')
        const FormData = require('form-data')
        const formData = new FormData()
        formData.append('size', 'auto')
        formData.append('image_file', newFile)
        axios({
          method: 'post',
          url: 'https://api.remove.bg/v1.0/removebg',
          data: formData,
          responseType: 'arraybuffer',
          headers: {
            'X-Api-Key': 'w54AkJkm1zp36wZW16zXPjnv'
          },
          encoding: null
        })
          .then((response) => {
            if (response.status != 200)
              return console.error(
                'Error:',
                response.status,
                response.statusText
              )
            // this.newImageUrl = 'data:image/jpeg;base64,' + this.ArrayBufferToBase64(response.data)
            this.images[this.imagesIndex].url =
              'data:image/jpeg;base64,' +
              this.ArrayBufferToBase64(response.data)
          })
          .catch((error) => {
            return console.error('Request failed:', error)
          })
      }
    },
    onChange(file) {
      let imageUrl = URL.createObjectURL(file.raw)
      let tmp = deepClone(this.images[0])
      tmp.large = imageUrl
      tmp.url = imageUrl
      tmp.id = -1
      this.images.push(tmp)
      this.goto(this.images.length - 1)
    },
    openCutterImageByIndex(index) {
      this.openCutterImage(this.images[index].src, this.images[index].id)
    },
    openCutterImage(src, name) {
      this.$refs.imgCutterModal.handleOpen({
        name: name,
        src: src
      })
    },
    goto(index) {
      this.imagesIndex = index
      this.openCutterImageByIndex(index)
      this.formReset(index)
    },
    prefix() {
      if (this.imagesIndex > 0) {
        this.imagesIndex--
        this.openCutterImageByIndex(this.imagesIndex)
        this.formReset(this.imagesIndex)
      }
    },

    next() {
      if (this.imagesIndex < this.images.length - 1) {
        this.imagesIndex++
        this.openCutterImageByIndex(this.imagesIndex)
        this.formReset(this.imagesIndex)
      }
    },
    formReset(index) {
      if (this.autoReset) {
        this.settingKeys.forEach((key) => {
          if (key != 'imageId' && key != 'productId') {
            this.setting[key].value = this.settingInit[key]
          }
        })
      }
      this.setting['imageId'].value = this.images[index].id
      this.setting['productId'].value = this.images[index].productId
    },
    onPrintImg(e) {
      this.cutImgHref = e.dataURL
    },
    handleSelectChange(key) {
      if (key == 'generateType' && this.images[this.imagesIndex].id == -1) {
        this.setting[key].value = 'new'
      }
    },
    cutDown(e) {
      this.cutImgHref = e.dataURL
    },
    updateModuleType() {
      const entity = {
        id: this.setting.imageId.value,
        moduleType: this.setting.moduleType.value
      }
      api_image_put(entity).then((res) => {
        this.$notify.success(res.msg)
      })
    },
    imageDownload() {
      if (this.setting.optionType.value == 'resize') {
        downloadIamge(
          service + '/product/image/' + this.setting['imageId'].value,
          'leo-image-chongzu.jpg'
        )
      } else {
        let e = document.getElementById('download')
        e.download = 'leo-image-chongzu.jpg' // 设置图片名称
        e.href = this.cutImgHref
        console.log(e.href)
      }
      this.otimer = setInterval(() => {
        clearInterval(this.otimer)
        const params = {}
        Object.keys(this.setting).forEach((key) => {
          params[key] = this.setting[key].value
        })
        api_python_image_cut_post(params).then((res) => {
          this.$notify.success(res.msg)
        })
      }, 1000)
    }
  }
}
</script>
