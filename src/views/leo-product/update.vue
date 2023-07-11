<template>
  <div class="app-container leo-container">
    <div id="menu">
      <el-row :gutter="20">
        <el-col :lg="8" :md="8" :sm="12">
          <el-card
            class="box-card"
            shadow="always"
            style="width: 340px; height: 340px"
          >
            <vue-hover-mask>
              <!-- 默认插槽 -->
              <el-image
                style="width: 300px; height: 300px"
                v-if="product.mainImage"
                :src="`${service}/product/image/${product.mainImage}`"
                width="100%"
              >
              </el-image>
              <!-- action插槽 -->
              <template v-slot:action>
                <el-button
                  type="text"
                  @click="mainImageDialog = !mainImageDialog"
                  >设置主图
                </el-button>
              </template>
            </vue-hover-mask>
          </el-card>
        </el-col>
        <el-col :lg="16" :md="16" :sm="12">
          <el-form label-width="120px">
            <el-form-item label="分类">
              <!-- <el-input v-model="product.categoryId" /> -->
              <Category1688
                v-if="product.categoryId"
                :value="product.categoryId"
                categoryContent="设置为产品名"
                @change="e => (product.categoryId = e)"
              />
            </el-form-item>
            <el-form-item label="品名">
              <el-input v-model="product.name" />
            </el-form-item>
            <el-form-item label="尺寸">
              <el-input v-model="product.packageSize" />
            </el-form-item>
            <el-form-item label="重量">
              <el-input v-model="product.weight" />
            </el-form-item>
            <div v-for="(value, key) in product_more.base" :key="key">
              <el-form-item
                :label="jsonFilterKeys[key].label"
                v-if="jsonFilterKeys[key] && jsonFilterKeys[key].show"
              >
                <el-input :value="value" />
              </el-form-item>
            </div>
            <el-form-item label="主题">
              <el-input v-model="product.subject" type="textarea" :rows="3" />
            </el-form-item>
            <el-form-item label="主题2">
              <el-input
                v-model="product_more.subject"
                type="textarea"
                :rows="3"
              />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <h2>操作</h2>
      <div class="filter-container">
        <leo-product-reset
          :id="$route.params.id"
          :key="$route.params.id"
          v-waves
          class="filter-item"
          type="primary"
          content="清除"
        />
        <LeoWebCollector
          :key="imageCollectorKey"
          type="primary"
          iconClass=""
          content="采集数据"
          v-waves
          class="filter-item"
          style="margin-left: 20px"
          @onConfirm="handleLeoWebCollectorConfirm"
          :values="{
            code: '',
            id: id,
            codes: product.code,
            isBatch: false
          }"
        />
        <el-button
          @click="handleCollectClick"
          v-waves
          class="filter-item"
          type="primary"
          style="margin-left: 20px"
          >采集图片
        </el-button>
        <el-button
          @click="onConfirmProductSave"
          v-waves
          class="filter-item"
          type="primary"
          style="margin-left: 20px"
          >保存
        </el-button>
        <el-button
          v-waves
          class="filter-item"
          type="primary"
          style="margin-left: 20px"
          @click="showHistory()"
          >销售记录
        </el-button>
        <el-button
          @click="done"
          v-waves
          class="filter-item"
          type="primary"
          style="margin-left: 20px"
          >完成
        </el-button>
      </div>
      <h2>图片</h2>
      <LeoImageProduct
        :ref="$route.params.id"
        :productId="$route.params.id"
        :key="leoProductImagesKey"
        :reloadable="true"
        :renewable="true"
        @onSaveClick="handleImageSaveClick"
      />
      <h2>{{ $t('autoPart.oe') }}</h2>
      <leo-array-string
        :reset="true"
        onReset="oemReset"
        v-if="product.code"
        :span="6"
        actionType="out"
        :list="product.code"
        ref="code"
        :key="leoArrayAtringCode"
      />
      <h2>{{ $t('autoPart.refer') }}</h2>
      <leo-array-string
        v-if="product.refNo"
        :span="8"
        actionType="out"
        :list="product.refNo"
        ref="refNo"
        :key="leoArrayAtringRefNo"
      />
      <h2>{{ $t('autoPart.carfitment') }}</h2>
      <el-tabs
        v-model="modelYearName"
        type="card"
        tab-position="top"
        @tab-click="handleModelYearClick"
      >
        <el-tab-pane label="详情" name="all">
          <el-table v-if="product.model" :data="JSON.parse(product.model)">
            <el-table-column
              :label="$t('autoPart.model')"
              prop="model"
            ></el-table-column>
            <el-table-column
              :label="$t('autoPart.year')"
              prop="year"
            ></el-table-column>
            <el-table-column
              :label="$t('autoPart.engine')"
              prop="engine"
            ></el-table-column>
            <el-table-column
              :label="$t('autoPart.displacement')"
              prop="Displacement"
            ></el-table-column>
            <el-table-column
              :label="$t('autoPart.power')"
              prop="power"
            ></el-table-column>
            <el-table-column
              :label="$t('autoPart.type')"
              prop="type"
            ></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="Model&Year" name="modelYear">
          <el-button
            type="danger"
            v-for="(text, key) in selectedArray"
            :key="key"
            icon="el-icon-delete"
            @click="selectedArray.splice(key, 1)"
            >{{ text }}</el-button
          >
          <el-row v-for="(value, key) in modelYear" :key="key">
            <el-col :span="8">
              <p @mouseup="handleMouseUp">{{ key }}</p>
            </el-col>
            <el-col :span="8">
              <p>{{ value }}</p>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="1000">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
    <el-dialog :visible.sync="mainImageDialog">
      <el-row :gutter="5">
        <el-col :span="4" v-for="(image, i) in images" :key="i">
          <vue-hover-mask>
            <el-image :key="i" :src="image.url" width="100%" />
            <label style="position: absolute" :ref="image.id"
              ><i class="el-icon-check leo-icon-check leo-sm-label"></i
            ></label>
            <template v-slot:action>
              <el-button type="text" @click="handleConfirmMainImage(image)">
                <i class="el-icon-s-flag"> 确认 </i>
              </el-button>
            </template>
          </vue-hover-mask>
        </el-col>
      </el-row>
    </el-dialog>
    <side-catalog class="catalog" v-bind="catalogProps"></side-catalog>
    <LeoHistory
      :productId="history.productId"
      :show="history.show"
      :key="history.count"
      direction="btt"
    />
  </div>
</template>
<script>
import waves from '@/directive/waves' // waves directive

import SideCatalog from 'vue-side-catalog'
import LeoImage from '@/components/LeoImage/local.vue'
import LeoProductReset from './components/Reset.vue'

import LeoElCarousel from '@/components/LeoElCarousel'
import VueHoverMask from 'vue-hover-mask'
import LeoArrayString from '@/components/LeoArray/string.vue'
import 'vue-side-catalog/lib/vue-side-catalog.css'
import LeoWebCollector from '@/components/LeoWebCollector'
import LeoHistory from '@/views/leo-warehouse/components/LeoHistory.vue'
import Category1688 from '@/views/leo-alibaba/components/Category1688.vue'
import LeoImageProduct from '@/components/LeoImage/Product.vue'
import LeoAutoImage from '@/components/LeoImage/Auto.vue'
import LeoHoverImage from '@/components/LeoImage/Hover.vue'
import {
  api_get_product_more,
  api_product_image_main,
  product_update_api_all,
  product_update_api,
  api_product_image_delete
} from '@/api/leo-product'
import { product_common_keys } from '@/utils/dict'
import { service } from '@/api/index'
import { deepClone, listToString } from '@/utils/index'
import { api_image_delete } from '@/api/leo-image'

export default {
  name: 'LeoProductDetail',
  components: {
    LeoImageProduct,
    LeoElCarousel,
    VueHoverMask,
    LeoArrayString,
    SideCatalog,
    LeoImage,
    LeoProductReset,
    LeoHoverImage,
    LeoAutoImage,
    LeoWebCollector,
    LeoHistory,
    Category1688
  },
  directives: { waves },
  data () {
    return {
      modelYearName: 'all',
      modelYear: null,
      leoProductImagesKey: 0,
      history: {
        show: false,
        count: 0,
        productId: 0
      },
      mainImage: {},
      imageCollectorValue: {},
      imageCollectorKey: 0,
      jsonFilterKeys: {
        images: { label: 'images', show: false },
        code: { label: 'code', show: false },
        refNo: { label: 'refNo', show: false },
        carFitment: { label: 'carFitment', show: false },
        categoryId: { label: 'categoryId', show: false },
        model: { label: 'model', show: false },
        engine: { label: 'engine', show: false },
        categoryName: { label: 'categoryName', show: false },
        year: { label: 'year', show: false },
        material: { label: '材料', show: false },
        warranty: { label: '质保', show: true },
        color: { label: '颜色', show: true },
        length: { label: '长度', show: true }
      },
      base: 'base',
      catalogProps: {
        container: '#menu'
      },
      imgTab: 'PE',
      imageKey: 0,
      service,
      mainImageDialog: false,
      platform: '',
      product_more: {},
      product_common_keys,
      product: {
        mainImage: '',
        images: []
      },
      images: [],
      id: null,
      dialogImageUrl: '',
      dialogVisible: false,
      src: {},
      selectedArray: [],
      leoArrayAtringCode: 1000,
      leoArrayAtringRefNo: -1000
    }
  },
  mounted () {
    this.id = this.$route.params.id
    this.doGet()
  },
  methods: {
    handleModelYearClick () {
      this.extractModel()
    },

    handleMouseUp () {
      const selectedText = window.getSelection().toString()
      if (!this.selectedArray.includes(selectedText)) {
        this.selectedArray.push(selectedText)
      }
      const keys = Object.keys(this.modelYear)
      let years = []
      new Promise(resolve => {
        for (let key of keys) {
          const value = this.modelYear[key]
          if (key.indexOf(selectedText) >= 0) {
            value.forEach(year => years.push(year))
            delete this.modelYear[key]
          }
        }
        years = new Set(years)
        resolve(years)
      })
      this.modelYear[selectedText] = listToString([...years], '  ')
    },
    extractModel () {
      if (this.modelYear) {
        return
      }
      let list = JSON.parse(this.product.model)
      list = list.map(element => {
        const { model, year } = element
        return { model, year }
      })

      this.modelYear = list.reduce((result, obj) => {
        const key = obj.model
        if (!result[key]) {
          result[key] = []
        }
        if (!result[key].includes(obj.year)) {
          result[key].push(obj.year)
        }

        return result
      }, {})
    },
    handleDeleteRefNo (refNo) {
      this.product.refNo = refNo
    },
    oemReset () {},
    handleLeoWebCollectorConfirm (res) {
      if (res.code == 200) {
        this.$notify.success(res.msg)
        const { data } = res
        this.product_json = data
        this.$set(this.product, 'refNo', data.refNo)
        const code = Array.from(new Set(data.code))
        this.$set(this.product, 'code', code)
        this.$set(this.product, 'model', JSON.stringify(data.carFitment))
        this.$set(this.product, 'platform', data.platform)
        this.leoArrayAtringCode++
        this.leoArrayAtringRefNo++
      }
    },
    doGet () {
      api_get_product_more(this.id).then(res => {
        this.product = res.data
        this.src.product = deepClone(this.product)
        this.imageCollectorValue = {
          id: this.product.id,
          codes: this.product.code
        }
        this.imageCollectorKey++
        if (this.product.jsonList[0]) {
          this.product_more = this.product.jsonList[0].json
        }
        if (this.product.images) {
          this.images = this.product.images.map(image => {
            image.productId = image.code
            image.url =
              service +
              '/img/' +
              image.code +
              '/' +
              image.name +
              '?' +
              new Date().getTime()
            return image
          })
        }
      })
    },

    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },

    onRemoveImages () {
      this.$confirm('是否确定提交修改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const images = this.PSImages.filter(image => image.checked).map(
            image => {
              return image.id
            }
          )
          const form = {
            images,
            id: this.id
          }
          api_product_image_delete(form).then(res => {
            if (res.code == '000000') {
              this.doGet()
              this.$notify.success(res.msg)
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },

    handleCollectClick () {
      const json = {
        code: '',
        id: this.id,
        codes: this.product.code,
        isBatch: false
      }
      const id = encodeURIComponent(JSON.stringify(json))
      this.$router.push(`/leo-product/collect/${id}`)
    },
    onConfirmProductSave () {
      this.$confirm('是否确定提交修改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.product.images = null
          this.product.code = this.$refs.code.items.map(m => m.value)
          if (this.$refs.refNo) {
            this.product.refNo = this.$refs.refNo.items.map(m => m.value)
          }

          product_update_api_all(this.product).then(res => {
            if (res.code === '200') {
              this.$message({
                type: 'success',
                message: '成功!'
              })
            }
          })
        })
        .catch(error => {
          this.$message({
            type: 'info',
            message: error
          })
        })
    },
    handleConfirmMainImage (image) {
      const product = {
        id: this.id,
        mainImage: image.id
      }
      this.$confirm('是否确定更改主图?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          api_product_image_main(product).then(res => {
            if (res.code === '200') {
              this.product.mainImage = image.id

              this.$message({
                type: 'success',
                message: '成功!'
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },

    done () {
      const params = {
        id: this.id,
        status: 666
      }
      product_update_api(params).then(res => {
        this.$notify.success(res.msg)
      })
    },
    showHistory () {
      this.history.productId = new Number(this.id)
      this.history.show = true
      this.history.count++
    },
    handleImageSaveClick (params) {
      product_update_api(params).then(res => {
        this.$notify.success(res.msg)
      })
    },
    handleRemoveImgBtnClick (img, type) {
      if (type == 'PE') {
        const index = this.product.images.findIndex(ins => {
          return (ins.id = img.id)
        })
        this.images.splice(index, 1)
      }
      // const images = deepClone(this.product.images)
      const params = {
        id: this.id,
        images: this.product.images.map(img => img.id)
      }
      product_update_api(params).then(res => {
        if (res.code == '200')
          api_image_delete(img.id).then(res => {
            this.$notify.success(res.msg)
          })
      })
    }
  }
}
</script>
<style>
.catalog {
  position: fixed;
  top: 50px;
  right: 50px;
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
