<template>
  <div>
    <div>
      <el-button @click="dialogVisible = true" :type="type" :class="iconClass" :size="size">
        {{content}}
      </el-button>
    </div>
    <el-dialog title="Collecting" :visible.sync="dialogVisible" :center="false" :modal="false"
      width="68%">
      <el-form label-width="180px" :rules="rules" :model="info" ref="info">
        <el-collapse v-model="collapseActiveNames">
          <el-collapse-item title="选项" name="1">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('component.web.collector.code.label')" prop="code">
                  <el-autocomplete class="inline-input" v-model="info.code"
                    :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect"
                    @change="handleCodeChange"></el-autocomplete>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item :label="$t('component.web.collector.platform.label')" prop="platform">
                  <el-select v-model="info.platform" @change="handlePlatformChange">
                    <el-option v-for="v,k in platforms" :key='k' :label="k" :value="k" />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item :label="$t('component.web.collector.dataType.label')" prop="dataType">
                  <el-select v-model="info.dataType" :disabled="info.platform=='bing'">
                    <el-option :label="$t('common.all')" value="all" />
                    <el-option :label="$t('common.image')" value="image" />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item :label="$t('component.web.collector.model.label')" prop="model">
                  <el-select v-model="info.model">
                    <el-option label="jsoup" value="jsoup" />
                    <el-option label="WebDriver" value="WebDriver" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('component.web.collector.isSearchModel.label')">
                  <el-switch v-model="isSearchModel" @change=" handleSeachModelChange"></el-switch>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item :label="$t('component.web.collector.isAutoPs.label')">
                  <el-switch v-model="info.isAutoPs"></el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item :label="$t('component.web.collector.url.label')" prop="url"
                  v-if="info.platform!='ebay'">
                  <el-input v-model="info.url" placeholder="url" />
                </el-form-item>
                <el-form-item :label="$t('component.web.collector.url.label')" v-else>
                  <el-input v-model="info.detailUrl" placeholder="detailUrl" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="isShop" v-if="info.platform=='alibaba'">
                  <el-switch v-if="info.platform=='alibaba'" v-model="info.isShop"
                    @change="handleIsShopChange">is shop
                  </el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="shopUrl" v-if="info.platform=='alibaba'&&info.isShop">
                  <el-input v-model="info.shopUrl" placeholder="shopUrl" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
        <el-form-item :label="$t('common.actions')">
          <el-button @click="getProductInfo">{{$t('common.query.label')}}</el-button>
        </el-form-item>

      </el-form>
      <ul v-if="productItems.length>0" class="infinite-list" v-infinite-scroll="load"
        style="overflow:auto">
        <el-row v-for="item,i in productItems" :key="i" class="leo-web-collector-product-item"
          :class="{active: isActive === i}" @click="isActive=i" @click.native="isActive=i">
          <el-col :span="4">
            <el-image :src="item.img"></el-image>
          </el-col>
          <el-col :span="16">
            <div v-if="info.platform=='yipei'" v-html="item.base"></div>
            <el-row v-else>
              <el-col v-for="image,key in item.images" :key="key" :span="4">
                <leo-hover-image :bigBtn="false" :removeBtn="false" :image="image"
                  style="width:100px;height:100px" />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4" v-loading="item.loading">
            <!-- <div v-html="item.subject"></div> -->
            <el-button v-if="info.platform=='yipei'||info.platform=='alibaba'"
              @click="execute(item)" size="mini" type="primary" icon="el-icon-document">
              采集
            </el-button>
            <el-button @click="openDetail(item.detailUrl)" size="mini" type="primary"
              icon="el-icon-document"> 详情
            </el-button>
            <el-button v-if="info.platform=='ebay'&&item.get==false" @click="moreImages(item)"
              size="mini" type="primary" icon="el-icon-document"> 更多图片
            </el-button>
          </el-col>
        </el-row>

      </ul>
      <ul v-if="images.length>0" class="infinite-list" v-infinite-scroll="load"
        style="overflow:auto">
        <li v-for="i in count" class="infinite-list-item" :key="i">
          <el-row>
            <el-col
              v-for="j in (i*pageSize,((i+1)*pageSize)>=images.length?images.length-1:(i+1)*pageSize)"
              :key="j" :span="4">
              <LeoHoverImage :image="images[j]" style="width:100px;height:100px" />
            </el-col>
          </el-row>
        </li>
      </ul>
      <div v-else>
        <el-row>
          <el-col v-for="image,key in images" :key="key" :span="4">
            <LeoHoverImage :image="image" style="width:100px;height:100px" />
          </el-col>
        </el-row>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<style lang="scss" scoped>
.leo-web-collector-product-item {
  border: #bbc4cc 1px solid;
  margin: 5px;
}
.active {
  border: #d6252b 1px solid;
}
</style>
<script>
import JsonEditor from '@/components/JsonEditor'
import LeoProductItem from '@/components/LeoProductItem/index.vue'
import { product_status } from '@/utils/dict'
import {
  api_spider_alibaba_items,
  api_spider_yipei_items,
  api_spider_ebay,
  api_spider_alibaba,
  api_spider_yipei,
  api_spider_image,
  api_spider_url_img,
  api_product_bing_img
} from '@/api/leo-spider'
import { getQueryObject } from '@/utils/index'
import LeoHoverImage from '@/components/LeoImage/Hover.vue'
export default {
  name: 'LeoWebCollector',
  components: { JsonEditor, LeoHoverImage, LeoProductItem },
  props: {
    values: {
      type: Object,
      default: () => {
        return {}
      }
    },
    type: {
      type: String,
      default: () => {
        return 'primary'
      }
    },
    iconClass: {
      type: String,
      default: () => {
        return 'el-icon-collection'
      }
    },
    content: {
      type: String,
      default: () => {
        return 'Collector'
      }
    },
    size: {
      type: String,
      default: () => {
        return 'medium'
      }
    }
  },
  data() {
    return {
      isSearchModel: true,
      urlImages: [''],
      isActive: '',
      collapseActiveNames: '1',
      count: 0,
      pageSize: 6,
      product_status,
      dialogVisible: false,
      info: {
        isShop: false,
        shopUrl: '',
        url: '',
        options: {
          'Product Name': { key: 'name', checked: true },
          Length: { key: 'length', checked: true },
          Material: { key: 'material', checked: true },
          Color: { key: 'color', checked: true },
          Model: { key: 'model', checked: true },
          Year: { key: 'year', checked: true },
          'OE NO.': { key: 'code', checked: true, outer: true },
          'Reference NO.': { key: 'refNo', checked: true, outer: true },
          'Car Fitment': { key: 'carFitment', checked: true },
          Warranty: { key: 'warranty', checked: true },
          Engine: { key: 'engine', checked: true },
          Weight: { key: 'weight', checked: true },
          code: {
            key: ['OE NO.'],
            checked: true
          },
          refNo: {
            key: ['Reference NO.'],
            checked: true
          }
        },
        detailUrl: '',
        isAutoPs: true,
        dataType: 'all',
        code: '',
        model: 'jsoup'
      },
      platforms: {
        alibaba:
          'https://www.alibaba.com/trade/search?fsb=y&IndexArea=product_en&CatId=&SearchText=',
        yipei: 'http://www.yiparts.com/en/search?type=number&keyword=',
        bing: 'https://cn.bing.com/images/search?q=0009050030&qft=+filterui:imagesize-custom_1000_1000&form=IRFLTR&first=1&tsc=ImageHoverTitle',
        ebay: 'https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313&_nkw='
      },
      images: [],
      imageIsGet: false,
      productItems: [],
      rules: {
        platform: [
          {
            required: true,
            message: this.$t('component.web.collector.platform.rulesMsg'),
            trigger: 'change'
          }
        ],
        url: [
          {
            required: true,
            trigger: 'change'
          }
        ],
        code: [
          {
            required: true,
            trigger: 'change'
          }
        ],
        dataType: [
          {
            required: true,
            message: this.$t('component.web.collector.dataType.rulesMsg'),
            trigger: 'change'
          }
        ],
        model: [
          {
            required: true,
            message: this.$t('component.web.collector.model.rulesMsg'),
            trigger: 'change'
          }
        ]
      }
    }
  },
  created() {
    this.info.code = this.values.code
    this.info.id = this.values.id
    if (this.values.platform) {
      this.info.platform = this.values.platform
    }
    if (this.values.dataType) {
      this.info.dataType = this.values.dataType
    }

    this.info.codes = this.values.codes
    if (this.info.codes) {
      this.info.code = this.info.codes[0]
      this.info.shopUrl =
        'https://wzjintong.en.alibaba.com/search/product?SearchText=' +
        this.values.codes[0]
    }
    this.setUrl()
    this.setShopUrl()
  },
  methods: {
    removePriceRow(index) {
      if (this.urlImages.length > 1) {
        this.urlImages.splice(index, 1)
      } else {
        this.urlImages = ['']
      }
    },
    addPriceRow() {
      this.urlImages.push('')
    },
    openDetail(url) {
      window.open(url)
    },
    moreImages(item) {
      item.loading = true
      api_spider_ebay({ dataType: 'image', detailUrl: item.detailUrl }).then(
        (res) => {
          if (res.data && res.data.length > 0) {
            item.images = res.data.map((img, key) =>
              this.parseEbayImage(img, key)
            )
            this.$notify.success('获取成功')
          }
          item.get = true
          item.loading = false
        }
      )
    },
    executeImageUrl() {
      if (this.urlImages.length < 1) {
        return
      }
      api_spider_url_img(this.urlImages, this.values.id).then((res) => {
        this.$notify.success(res.msg)
      })
    },
    execute(item) {
      if (this.info.dataType == 'image') {
        const imageUrls = this.images
          .filter((image) => image.checked)
          .map((image) => {
            return image.large
          })
        const form = {
          id: this.info.id,
          imageUrls,
          isAutoPs: this.info.isAutoPs
        }
        console.log(form)
        api_spider_image(form).then((res) => {
          this.dialogVisible = false
          this.$emit('onConfirm', res)
        })
      } else {
        if (this.info.platform == 'alibaba') {
          if (item.multiImage) {
            this.info.imageUrls = item.multiImage.map((i) => {
              return 'https:' + i.replace('300x300', '1000x1000')
            })
            this.info.detailUrl = 'https:' + item.detailUrl
            this.info.subject = item.subject
            this.info.isSearchItems = true
          }
          api_spider_alibaba(this.info).then((res) => {
            this.dialogVisible = false
            this.$emit('onConfirm', res)
          })
        } else if (this.info.platform == 'yipei') {
          this.info.detailUrl = item.detailUrl
          this.info.url = item.detailUrl
          this.info.isThirdPart = item.isThirdPart
          api_spider_yipei(this.info).then((res) => {
            this.dialogVisible = false
            res.data.platform = 'YP'
            this.$emit('onConfirm', res)
          })
        }
      }
    },
    getImages() {
      this.images = []
      if (this.info.platform == 'bing') {
        api_product_bing_img({ code: this.info.code }).then((res) => {
          this.images = res.data.map((element) => {
            const { mediaurl, exph, expw, id } = getQueryObject(element)
            return {
              id,
              exph,
              expw,
              url: mediaurl,
              large: mediaurl,
              checked: false
            }
          })
          this.count = 1
          this.collapseActiveNames = '0'
          this.imageIsGet = true
        })
      }
    },
    parseEbayImage(url, id) {
      const start = url.indexOf('/s-l')
      const end = url.lastIndexOf('.')
      const i300 = url.substr(0, start + 4) + '300' + url.substr(end)
      const i1000 = url.substr(0, start + 4) + '1000' + url.substr(end)
      return {
        id: id,
        exph: 300,
        expw: 300,
        url: i300,
        large: i1000,
        checked: false
      }
    },
    getProductInfo() {
      this.$refs['info'].validate((valid) => {
        if (valid) {
        } else {
          console.log('error submit!!')
          return false
        }
      })
      this.productItems = []
      this.images = []
      if (this.info.platform == 'alibaba') {
        api_spider_alibaba_items(this.info).then((res) => {
          if (res.data) {
            this.productItems = res.data
            this.collapseActiveNames = '0'
          } else {
            this.$notify.warning('not data')
          }
        })
      } else if (this.info.platform == 'yipei') {
        api_spider_yipei_items(this.info).then((res) => {
          if (res.data) {
            this.productItems = res.data
            this.collapseActiveNames = '0'
          } else {
            this.$notify.warning('not data')
          }
        })
      } else if (this.info.platform == 'ebay') {
        api_spider_ebay(this.info).then((res) => {
          if (res.data) {
            if (this.info.dataType == 'image') {
              this.images = res.data.map((url, key) => {
                return this.parseEbayImage(url, key)
              })
              this.count = 1
              this.collapseActiveNames = '0'
              this.imageIsGet = true
            } else {
              this.productItems = res.data.map((item) => {
                item.loading = false
                item.get = false
                item.images = item.images.map((url, id) =>
                  this.parseEbayImage(url, id)
                )
                return item
              })
              this.collapseActiveNames = '0'
            }
          } else {
            this.$notify.warning('not data')
          }
        })
      }
    },
    load() {
      if (this.count < Math.ceil(this.images.length / 6)) {
        this.count += 1
      }
      //
    },
    handleIsShopChange() {
      this.setShopUrl()
    },

    handlePlatformChange() {
      this.setUrl()
      this.isSearchModel = true
      if (this.info.platform == 'yipei') {
        this.info.model = 'WebDriver'
      }
      if (this.info.platform == 'bing') {
        this.info.model = 'jsoup'
        this.info.dataType = 'image'
      }
      if (this.info.platform == 'ebay') {
        this.isSearchModel = false
        this.info.dataType = 'image'
        this.info.model = 'jsoup'
      }
    },

    handleCodeChange() {
      this.setUrl()
      this.setShopUrl()
    },
    setUrl() {
      if (this.info.platform == 'bing') {
        this.info.url = this.platforms[this.info.platform].replace(
          '0009050030',
          this.info.code
        )
      } else {
        if (this.info.platform) {
          this.info.url = this.platforms[this.info.platform] + this.info.code
        }
      }
    },
    setShopUrl() {
      this.info.shopUrl =
        'https://wzjintong.en.alibaba.com/search/product?SearchText=' +
        this.info.code
    },
    handleSeachModelChange(e) {
      if (e) {
        this.info.url = this.platforms[this.info.platform] + this.info.code
        this.info.detailUrl =
          this.platforms[this.info.platform] + this.info.code
        if (this.info.platform == 'ebay') {
          this.info.dataType = 'all'
        }
      } else {
        if (this.info.platform == 'ebay') {
          this.info.dataType = 'image'
        }
        this.info.url = ''
        this.info.detailUrl = ''
      }
    },
    handleSelect(item) {
      console.log(item)
    },
    querySearch(queryString, cb) {
      let codes = this.info.codes ? this.info.codes : []
      let results = queryString
        ? codes.filter(this.createFilter(queryString))
        : codes
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    }
  }
}
</script>
<style scoped>
.infinite-list {
  height: 300px;
}
</style>