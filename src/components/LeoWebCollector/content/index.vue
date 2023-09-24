<template>
  <div>
    <el-form label-width="180px" size="mini">
      <el-row :gutter="20" style="display: flex;">
        <el-form-item label="platform">
          <el-select v-model="autoPart.platform" @change="handlePlatformChange">
            <el-option v-for="v, k in platforms" :key='k' :label="k" :value="k" />
          </el-select>
        </el-form-item>
        <el-form-item label="code">
          <el-select v-model="autoPart.code" @change="handleCodeChange">
            <el-option v-for="code in autoPart.codes" :label="code" :key="code" :value="code" />
          </el-select>
        </el-form-item>
        <el-form-item label="model">
          <el-select v-model="autoPart.model">
            <el-option label="jsoup" value="jsoup" />
            <el-option label="WebDriver" value="WebDriver" />
          </el-select>
        </el-form-item>
      </el-row>
      <el-row :gutter="20"><el-form-item label="url" style="max-width: 1400px;">
          <el-input v-model="autoPart.url" placeholder="url">
            <el-button slot="append" icon="el-icon-search"
              @click="getProductInfo"></el-button></el-input>
        </el-form-item></el-row>

    </el-form>
    <div class="leo-web-collector-content-checked">
      <ClassifiedImage :key="1" :images="checkedList" />
      <el-button-group>
        <el-button type="primary" size="default">上页</el-button>
        <el-button type="primary" size="default">下页</el-button>
      </el-button-group>
      <el-button @click="onSubmit">提交</el-button>
    </div>
    <!-- <div v-if="productItems.length > 0">
      <el-row v-for="item, i in productItems" :key="i" class="leo-web-collector-product-item"
        :class="{ active: isActive === i }" @click="isActive = i" @click.native="isActive = i">
        <el-col :span="16">
          <el-row>
            <el-col v-for="image, j in item.images" :key="j" :span="4">
              <leo-hover-image :bigBtn="false" :removeBtn="false" :image="image"
                @click="e => handleLeoHoverImageClick(e, image, i, j)" />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8" v-loading="item.loading">
          <div v-html="item.subject"></div>
          <el-button @click="openDetail(item.detailUrl)" size="mini" type="primary" icon="el-icon-document"> 详情
          </el-button>
          <el-button v-if="autoPart.platform == 'ebay' && item.get == false" @click="moreImages(item)" size="mini"
            type="primary" icon="el-icon-document"> 更多图片
          </el-button>
        </el-col>
      </el-row>
    </div> -->
    <div class="images">
      <leo-hover-image class="image" v-for="image, key in images" :key="key" :image="image"
        style="padding:5px" @click="e => handleLeoHoverImageClick(e, image, 0, key)" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.images {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  .image {
    margin: 5px;
    border: 1px solid #bbc4cc;
  }
}
.leo-web-collector-content-checked {
  margin-left: 50px;

  &-item {
    margin-bottom: 20px;
    border: 3px dashed;
  }
}

.leo-web-collector-product-item {
  border: #bbc4cc 1px solid;
  margin: 5px;
}

.active {
  border: #d6252b 1px solid;
}
</style>
<script>
import ClassifiedImage from './components/ClassifiedImage.vue'
import JsonEditor from '@/components/JsonEditor'
import LeoProductItem from '@/components/LeoProductItem/index.vue'
import { product_status } from '@/utils/dict'
import {
  api_spider_alibaba_items,
  api_spider_ebay,
  api_spider_image,
  api_product_bing_img
} from '@/api/leo-spider'
import { getQueryObject } from '@/utils/index'
import LeoHoverImage from '@/components/LeoImage/Hover.vue'
export default {
  name: 'LeoWebCollector',
  components: { JsonEditor, LeoHoverImage, LeoProductItem, ClassifiedImage },
  props: {
    values: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      group: 'mission',
      checkedList: [],
      urlImages: [''],
      isActive: '',
      collapseActiveNames: '1',
      count: 0,
      pageSize: 6,
      product_status,
      dialogVisible: false,
      autoPart: {
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
        isAutoPs: true,
        dataType: 'all',
        code: '',
        model: 'jsoup'
      },
      platforms: {
        alibaba:
          'https://www.alibaba.com/trade/search?fsb=y&IndexArea=product_en&CatId=&SearchText=',
        bing: 'https://cn.bing.com/images/search?q=0009050030',
        ebay: 'https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313&_nkw='
      },
      images: [],
      imageIsGet: false,
      productItems: []
    }
  },
  created() {
    this.autoPart.id = this.values.id
    if (this.values.platform) {
      this.autoPart.platform = this.values.platform
    }
    if (this.values.dataType) {
      this.autoPart.dataType = this.values.dataType
    }

    this.autoPart.codes = this.values.codes
    if (this.autoPart.codes) {
      this.autoPart.code = this.autoPart.codes[0]
      this.autoPart.shopUrl =
        'https://wzjintong.en.alibaba.com/search/product?SearchText=' +
        this.values.codes[0]
    }
    this.setUrl()
    this.setShopUrl()
  },
  methods: {
    onSubmit() {
      const pe = this.checkedList
        .filter((image) => image.type == 'r')
        .map((image) => image.large)
      const pp = this.checkedList
        .filter((image) => image.type == 'g')
        .map((image) => image.large)
      const pg = this.checkedList
        .filter((image) => image.type == 'b')
        .map((image) => image.large)
      this.$notify.warning('执行中')
      if (pe && pe.length > 0) {
        api_spider_image({
          id: this.autoPart.id,
          imageUrls: pe,
          isAutoPs: true,
          moduleType: 'PE'
        })
      }
      if (pp && pp.length > 0) {
        api_spider_image({
          id: this.autoPart.id,
          imageUrls: pp,
          isAutoPs: false,
          moduleType: 'PP'
        })
      }
      if (pg && pg.length > 0) {
        api_spider_image({
          id: this.autoPart.id,
          imageUrls: pg,
          isAutoPs: false,
          moduleType: 'PG'
        })
      }
    },
    handleLeoHoverImageClick(e, item, i, j) {
      const index = this.checkedList.findIndex((image) => {
        return image.id == this.autoPart.platform + '-' + i + '-' + j
      })
      if (index >= 0) {
        if (!e) {
          this.checkedList.splice(index, 1)
        }
      } else {
        if (e) {
          const image = item
          image.id = this.autoPart.platform + '-' + i + '-' + j
          this.checkedList.push(image)
        }
      }
    },
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
    parseEbayImage(url, id) {
      const start = url.indexOf('/s-l')
      const end = url.lastIndexOf('.')
      const i300 = url.substr(0, start + 4) + '200' + url.substr(end)
      const i1000 = url.substr(0, start + 4) + '1000' + url.substr(end)
      return {
        id: id,
        exph: 200,
        expw: 200,
        url: i300,
        large: i1000,
        checked: false
      }
    },
    parseAlibabaImage(url, id) {
      return {
        id: id,
        exph: 300,
        expw: 300,
        width: 100,
        height: 100,
        url: 'https:' + url,
        large: 'https:' + url.replace('300', '1000'),
        checked: false
      }
    },
    getProductInfo() {
      this.productItems = []
      this.images = []
      if (this.autoPart.platform == 'alibaba') {
        api_spider_alibaba_items(this.autoPart).then((res) => {
          if (res.data) {
            this.productItems = res.data.map((item) => {
              item.images = item.multiImage.map((url, id) =>
                this.parseAlibabaImage(url, id)
              )
              return item
            })

            this.collapseActiveNames = '0'
          } else {
            this.$notify.warning('not data')
          }
        })
      } else if (this.autoPart.platform == 'ebay') {
        api_spider_ebay(this.autoPart).then((res) => {
          if (res.data) {
            if (this.autoPart.dataType == 'image') {
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
      } else if (this.autoPart.platform == 'bing') {
        this.images = []
        api_product_bing_img({ code: this.autoPart.code }).then((res) => {
          this.images = res.data.map((element) => {
            const { mediaurl, exph, expw, id } = getQueryObject(element.url)
            // height:100px;width:100px;
            console.log(element.style)
            let b = element.style.substr(6)
            let c = b.indexOf(';')
            let d = b.substr(0, c)
            console.log(b, c, d)
            const height = 228
            const width = d
            return {
              id,
              exph,
              expw,
              style: element.style,
              src: mediaurl,
              large: mediaurl,
              height,
              width,
              checked: false
            }
          })
          this.count = 1
          this.collapseActiveNames = '0'
          this.imageIsGet = true
        })
      }
    },

    handleIsShopChange() {
      this.setShopUrl()
    },
    handlePlatformChange() {
      this.setUrl()
      if (this.autoPart.platform == 'bing') {
        this.autoPart.model = 'jsoup'
        this.autoPart.dataType = 'image'
      } else if (this.autoPart.platform == 'ebay') {
        this.autoPart.dataType = 'all'
        this.autoPart.model = 'jsoup'
      }
    },

    handleCodeChange() {
      this.setUrl()
      this.setShopUrl()
    },
    setUrl() {
      if (this.autoPart.platform == 'bing') {
        this.autoPart.url = this.platforms[this.autoPart.platform].replace(
          '0009050030',
          this.autoPart.code
        )
      } else {
        if (this.autoPart.platform) {
          this.autoPart.url =
            this.platforms[this.autoPart.platform] + this.autoPart.code
        }
      }
    },
    setShopUrl() {
      this.autoPart.shopUrl =
        'https://wzjintong.en.alibaba.com/search/product?SearchText=' +
        this.autoPart.code
    }
  }
}
</script>
<style scoped>
.infinite-list {
  height: 300px;
}
</style>