<template>
  <div class="leo-prepare-send">
    <el-form :model="form" ref="form" :rules="rules" label-width="220px" size="normal">
      <el-form-item label="subject" class="input-normal">
        <el-input v-model="product.subject" readonly></el-input>
        {{ product.code }}
      </el-form-item>
      <el-form-item label="code" class="input-normal">
        <LeoArray v-model="product.code"></LeoArray>
      </el-form-item>
      <el-form-item label="alibaba.subject" prop="alibaba.subject" class="input-normal">
        <el-input v-model="form.alibaba.subject" maxlength="60" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="aliexpress.subject" prop="aliexpress.subject" class="input-normal">
        <el-input v-model="form.aliexpress.subject" maxlength="128" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="amazon.subject" prop="amazon.subject" class="input-normal">
        <el-input v-model="form.amazon.subject" maxlength="128" show-word-limit></el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="6" :offset="0">
          <el-form-item label="length" prop="length">
            <el-input v-model="form.length"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="width" prop="width">
            <el-input v-model="form.width"></el-input> </el-form-item></el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="height" prop="height">
            <el-input v-model="form.height"></el-input> </el-form-item></el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="thickness" prop="thickness">
            <el-input v-model="form.thickness"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="" size="normal">
        <div v-html="product.json"></div>
      </el-form-item>
      <el-form-item label="packageSize" prop="packageSize" class="input-middle">
        <el-input v-model="form.packageSize"></el-input>
      </el-form-item>
      <el-form-item label="weight" prop="weight" class="input-middle">
        <el-input v-model="form.weight"></el-input>
        21cm*12cm*9.5cm 16cm*11cm*8cm
      </el-form-item>
      <el-form-item label="carBrand" prop="carBrand" class="input-middle">
        <el-input v-model="form.carBrand"></el-input>
      </el-form-item>
      <el-form-item label="alibaba.albumID" prop="alibaba.albumID" class="input-middle">
        <album v-model="form.alibaba.albumID" @change="e => form.alibaba.albumID = e"></album>
      </el-form-item>
      <el-form-item label="images" prop="images">
        <Images :product-id="product.id" @onCustomzedClick="onAlibabaCoverClk" :reloadable="true"
          v-model="form.images"
          :customzedBtn="[{ label: '设置封面图', opt: 'alibaba' }, { label: '设置包装图', opt: 'package' },  { label: '1688详情封面', opt: '1688detail' }]" />
        <el-dialog title="" :visible.sync="dialog.show" width="80%">
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
              :boxWidth="options.boxWidth" :boxHeight="options.boxHeight"
              :cutWidth="options.cutWidth" :cutHeight="options.cutHeight"
              :sizeChange="options.sizeChange" :moveAble="options.moveAble"
              :imgMove="options.imgMove" :originalGraph="options.originalGraph"
              :WatermarkTextX="options.WatermarkTextX" :WatermarkTextY="options.WatermarkTextY"
              :smallToUpload="options.smallToUpload" :saveCutPosition="options.saveCutPosition"
              :scaleAble="options.scaleAble" :previewMode="options.previewMode"
              :quality="options.quality" :toolBoxOverflow="options.true" :index="options.index"
              @cutDown="cutDown" @onPrintImg="onPrintImg">
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
      </el-form-item>
      <el-tabs v-model="platform" type="border-card" tab-position="top">
        <el-tab-pane label="alibaba" name="alibaba">
          <el-form-item label="alibaba.material" prop="alibaba.material" class="input-middle">
            <el-input v-model="form.alibaba.material"></el-input>
          </el-form-item>
          <el-form-item label="alibaba.brand" prop="alibaba.brand" class="input-middle">
            <el-input v-model="form.alibaba.brand"></el-input>
          </el-form-item>
          <el-form-item label="alibaba.categoryID" prop="alibaba.categoryID">
            <Category1688 v-model="form.alibaba.categoryID" @change="category1688Chnage" />
          </el-form-item>
          <el-form-item label="groupID" prop="groupID">
            <Group1688 v-model="form.alibaba.groupID" :categoryID="form.alibaba.categoryID" />
          </el-form-item>
          <el-form-item label="alibaba.prices">
            <SaleInfo1688 :productId="$route.query.productId" :value="form.alibaba.saleInfo"
              ref="saleInfo" />
          </el-form-item>
          <el-form-item label="alibaba.stock" prop="alibaba.stock" class="input-middle">
            <el-input v-model="form.alibaba.stock"></el-input>
          </el-form-item>
          <el-form-item label="alibaba.unit" prop="alibaba.unit" class="input-middle">
            <el-select v-model="form.alibaba.unit">
              <el-option label="套" value="套"> </el-option>
            </el-select>
          </el-form-item>
        </el-tab-pane>
        <!-- <el-tab-pane label="aliexpress" name="aliexpress">
          <el-form-item label="aliexpress.material" prop="aliexpress.material" class="input-middle">
            <el-input v-model="form.aliexpress.material"></el-input>
          </el-form-item>
          <el-form-item label="aliexpress.brand" prop="aliexpress.brand" class="input-middle">
            <el-input v-model="form.aliexpress.brand"></el-input>
          </el-form-item>
          <el-form-item label="aliexpress.oem" prop="aliexpress.oem" class="input-middle">
            <el-input v-model="form.aliexpress.oem"></el-input>
          </el-form-item>
          <el-form-item label="aliexpress.manufacturerPartId" prop="aliexpress.manufacturerPartId"
            class="input-middle">
            <el-input v-model="form.aliexpress.manufacturerPartId"></el-input>
          </el-form-item>
          <el-form-item label="aliexpress.unit" prop="aliexpress.unit" class="input-middle">
            <el-select v-model="form.aliexpress.unit">
              <el-option label="套" value="套"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="aliexpress.price" prop="aliexpress.price" class="input-middle">
            <el-input v-model="form.aliexpress.price"></el-input>
          </el-form-item>
          <el-form-item label="aliexpress.stock" prop="aliexpress.stock" class="input-middle">
            <el-input v-model="form.aliexpress.stock"></el-input>
          </el-form-item>
          <el-form-item label="aliexpress.packingSizeUrl" class="input-middle">
            <el-select v-model="form.aliexpress.packingSizeUrl" placeholder="" clearable>
              <el-option label="大包装"
                value="https://ae01.alicdn.com/kf/S29350e49854c4fa2a579d48203881418P.png">
              </el-option>
              <el-option label="小包装"
                value="https://ae01.alicdn.com/kf/Se74b334a2a66473ebe5505e8e9d32b04m.png">
              </el-option>
            </el-select>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="amazon" name="amazon">
          <el-form-item label="amazon.material" prop="amazon.material" class="input-middle">
            <el-input v-model="form.amazon.material"></el-input>
          </el-form-item>
          <el-form-item label="amazon.brand" prop="amazon.brand" class="input-middle">
            <el-input v-model="form.amazon.brand"></el-input>
          </el-form-item>
          <el-form-item label="amazon.unit" prop="amazon.unit" class="input-middle">
            <el-select v-model="form.aliexpress.unit">
              <el-option label="Sets" value="Sets"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="amazon.stock" prop="amazon.stock" class="input-middle">
            <el-input v-model="form.amazon.stock"></el-input>
          </el-form-item>
          <el-form-item label="amazon.price" prop="amazon.price" class="input-middle">
            <el-input v-model="form.amazon.price"></el-input>
          </el-form-item>
        </el-tab-pane> -->
      </el-tabs>
      <el-form-item style="
          position: fixed;
          bottom: 0;
          width: 100%;
          background-color: rgb(244, 250, 250);
        ">
        <el-button type="primary" @click="onSubmit" size="mini">立即创建</el-button>
        <el-button type="primary" @click="save" style="margin-left: 20px" size="mini">保存</el-button>
      </el-form-item>
    </el-form>
    <Attributes :productId="product.id" :product="product"></Attributes>
  </div>
</template>
<style lang="scss">
.leo-prepare-send {
  padding: 20px;

  .input-normal {
    .el-form-item__content {
      max-width: 1200px;
      min-width: 800px;
    }
  }

  .input-middle {
    .el-form-item__content {
      width: 400px;
    }

    input {
      width: 100%;
    }
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
}
</style>
<script>
import clip from '@/utils/clipboard'
import { api_get_product_more } from '@/api/leo-product'
import Images from './components/Images.vue'
import CssImage from '@/components/LeoImage/Css.vue'
import Models from './components/Models'
import Attributes from '../leo-product/components/Attributes.vue'
import SaleInfo1688 from '../leo-alibaba/components/SaleInfo1688.vue'
import Category1688 from '../leo-alibaba/components/Category1688.vue'
import Group1688 from '../leo-alibaba/components/Group1688.vue'
import LeoArray from '@/components/LeoArray/index.vue'
import ImgCutter from 'vue-img-cutter'
import { categoryToGroup } from '@/utils/category'
import {
  isIndexKey,
  imageValidator,
  getShippingInfo,
  generateGoods
} from './goods.js'
import { api_goods_batch_post } from '@/api/leo-goods'
import { api_python_image_goods_post } from '@/api/leo-python'
import { imgBase, imgTempPath } from '@/api/local-setting'
import { listToString } from '@/utils'
import Album from '@/components/LeoAlibaba/Album.vue'
export default {
  components: {
    Images,
    Models,
    Attributes,
    SaleInfo1688,
    Category1688,
    Group1688,
    CssImage,
    ImgCutter,
    Album,
    LeoArray
  },
  data() {
    return {
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
      platform: 'alibaba',
      product: {
        id: '16065'
      },
      form: {
        code: null,
        productId: null,
        length: '',
        width: '',
        height: '',
        weight: '',
        thickness: '',
        packageSize: '',
        carBrand: '',
        models: [],
        alibaba: {
          albumID: null,
          categoryID: null,
          saleInfo: {},
          material: '半金属',
          subject: '',
          brand: 'MDTZ',
          unit: '套',
          prices: [
            { quality: '5', price: null },
            { quality: '5', price: null }
          ],
          stock: '2000'
        },
        amazon: {
          material: 'Ceramics/Semimetal',
          subject: '',
          brand: '24MDTZ',
          unit: 'Sets',
          price: null,
          stock: '99',
          listing: ''
        },
        aliexpress: {
          material: 'Semimetal',
          subject: '',
          brand: 'MDTZ',
          oem: '',
          manufacturerPartId: '',
          unit: 'Sets',
          price: null,
          stock: '99',
          packingBoxUrl: '',
          packingSizeUrl:
            'https://ae01.alicdn.com/kf/Se74b334a2a66473ebe5505e8e9d32b04m.png'
        }
      },
      rules: {
        packageSize: [{ required: true, message: '请输入', trigger: 'blur' }],
        weight: [{ required: true, message: '请输入', trigger: 'blur' }],
        images: [
          {
            validator: (a, b, c) => imageValidator(a, b, c, this.form.images),
            message: '前选择图片',
            trigger: 'blur'
          }
        ],
        alibaba: {
          subject: [
            { required: true, message: '请输入', trigger: 'blur' },
            {
              require: true,
              min: 30,
              max: 60,
              message: '长度在 30 到 60 个字符',
              trigger: 'blur'
            }
          ],
          attributes: [{ required: true, message: '请输入', trigger: 'blur' }],
          image: [{ required: true, message: '请输入', trigger: 'blur' }],
          shippingInfo: [
            { required: true, message: '请输入', trigger: 'blur' }
          ],
          saleInfo: [{ required: true, message: '请输入', trigger: 'blur' }],
          material: [{ required: true, message: '请输入', trigger: 'blur' }],
          brand: [{ required: true, message: '请输入', trigger: 'blur' }],
          manufacturerPartId: [
            { required: true, message: '请输入', trigger: 'blur' }
          ],
          oem: [{ required: true, message: '请输入', trigger: 'blur' }],
          unit: [{ required: true, message: '请输入', trigger: 'blur' }],
          stock: [{ required: true, message: '请输入', trigger: 'blur' }],
          price: [{ required: true, message: '请输入', trigger: 'blur' }],
          albumID: [{ required: true, message: '请输入', trigger: 'blur' }],
          categoryID: [{ required: true, message: '请输入', trigger: 'blur' }]
        },
        amazon: {
          subject: [
            { required: true, message: '请输入', trigger: 'blur' },
            {
              require: true,
              min: 60,
              max: 128,
              message: '长度在 60 到 128 个字符',
              trigger: 'blur'
            }
          ],
          material: [{ required: true, message: '请输入', trigger: 'blur' }],
          brand: [{ required: true, message: '请输入', trigger: 'blur' }],
          unit: [{ required: true, message: '请输入', trigger: 'blur' }],
          stock: [{ required: true, message: '请输入', trigger: 'blur' }],
          price: [{ required: true, message: '请输入', trigger: 'blur' }],
          listing: [{ required: true, message: '请输入', trigger: 'blur' }]
        },
        aliexpress: {
          subject: [
            { required: true, message: '请输入', trigger: 'blur' },
            {
              require: true,
              min: 60,
              max: 128,
              message: '长度在 60 到 128 个字符',
              trigger: 'blur'
            }
          ],

          material: [{ required: true, message: '请输入', trigger: 'blur' }],
          brand: [{ required: true, message: '请输入', trigger: 'blur' }],
          manufacturerPartId: [
            { required: true, message: '请输入', trigger: 'blur' }
          ],
          oem: [{ required: true, message: '请输入', trigger: 'blur' }],
          unit: [{ required: true, message: '请输入', trigger: 'blur' }],
          stock: [{ required: true, message: '请输入', trigger: 'blur' }],
          price: [{ required: true, message: '请输入', trigger: 'blur' }]
        }
      }
    }
  },
  created() {
    if (this.$route.query.productId) {
      this.product.id = this.$route.query.productId
    }
    let str = localStorage.getItem('Goods_' + this.product.id)
    if (str) {
      this.form = JSON.parse(str)
      this.form.code = this.product.code
    }
    this.form.productId = this.$route.query.productId
    api_get_product_more(this.product.id).then((res) => {
      this.product = res.data
      this.form.packageSize = this.product.packageSize
      this.form.weight = this.product.weight
      this.form.subject = this.product.subject
      this.form.models = JSON.parse(this.product.model)
      this.form.code = this.product.code
      this.dialog.coverCode = this.product.code[0]
      this.form.alibaba.categoryID = this.product.categoryId

      // aliexpress
      this.form.aliexpress.oem = listToString(this.product.code, ',')
      if (this.product.jsonList && this.product.jsonList.length > 0) {
        let size = this.product.jsonList[0].json.base
        const keys = Object.keys(size)
        for (let index = 0; index < keys.length; index++) {
          if (isIndexKey(keys[index], 'Width')) {
            this.form.width = size[keys[index]]
          } else if (isIndexKey(keys[index], 'Height')) {
            this.form.height = size[keys[index]]
          } else if (isIndexKey(keys[index], 'Thickness')) {
            this.form.thickness = size[keys[index]]
          } else if (isIndexKey(keys[index], 'Length')) {
            this.form.length = size[keys[index]]
          }
        }
        this.product.json = JSON.stringify(this.product.jsonList[0].json.base)
      }
    })
  },
  methods: {
    category1688Chnage() {
      this.form.alibaba.groupID = categoryToGroup[this.form.alibaba.categoryID]
    },
    handleCopy(text, event) {
      clip(text, event)
    },
    onPrintImg(e) {
      this.dialog.cutImgHref = e.dataURL
    },
    cutDown(e) {
      this.dialog.cutImgHref = e.dataURL
    },
    onAlibabaCoverClk(img, opt) {
      this.dialog.show = !this.dialog.show
      this.dialog.coverPartUrl = img.url
      this.dialog.opt = opt
      this.dialog.id = img.id
      this.dialog.imageName = img.imageName
      if (opt == 'alibaba') {
        this.dialog.coverUrl = 'http://localhost:8080/img/0/alibaba-cover.png'
        this.dialog.coverPath = imgBase + '0/alibaba-cover.png'
        this.dialog.coverPart = img.path
        this.dialog.coverSavePath =
          imgBase + this.product.id + '/' + this.product.id + '-cover.png'
        this.dialog.name = this.product.id + '-cover.png'
        this.dialog.isRmbg = false
      } else if (opt == 'package') {
        this.dialog.coverUrl = 'http://localhost:8080/img/0/package-box.png'
        this.dialog.coverPath = imgBase + '0/package-box.png'
        this.dialog.coverPart = imgTempPath + 'leo-image-package.jpg'
        this.dialog.coverSavePath =
          imgBase + this.product.id + '/' + this.product.id + '-package.png'
        this.dialog.name = this.product.id + '-package.png'
        this.$refs.imgCutterModal.handleOpen({
          name: img.id,
          src: img.url
        })
        this.dialog.isRmbg = true
      } else if (opt == '1688detail') {
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
      }
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
        coverCode,
        coverSavePath,
        opt,
        name,
        isRmbg,
        imageId
      } = this.dialog
      const params = {
        coverPath,
        coverPart,
        coverCode,
        coverSavePath,
        opt,
        productId: this.product.id,
        name,
        isRmbg,
        imageId
      }
      api_python_image_goods_post(params).then((res) => {
        this.$notify.success(res.msg)
      })
    },

    onSubmit() {
      this.$refs['saleInfo'].valid().then((saleInfoValid) => {
        if (!saleInfoValid) return
        this.$refs['form'].validate((valid) => {
          if (!valid) return
          this.form.alibaba.saleInfo = this.$refs['saleInfo'].getVal()
          this.form.alibaba.shippingInfo = getShippingInfo({
            unitWeight: this.form.weight,
            packageSize: this.form.packageSize
          })
          let goods = generateGoods('1688', this.form)
          const list = []
          list.push(goods)

          // goods = generateGoods('aliexpress', this.form)
          // list.push(goods)

          // goods = generateGoods('amazon', this.form)
          // list.push(goods)

          api_goods_batch_post(list).then((res) => {
            this.$message.success(res.msg)
          })
        })
      })
    },
    save() {
      this.form.alibaba.saleInfo = this.$refs['saleInfo'].getVal()
      localStorage.setItem(
        'Goods_' + this.product.id,
        JSON.stringify(this.form)
      )
      this.$notify.success('保存成功！')
    }
  }
}
</script>
