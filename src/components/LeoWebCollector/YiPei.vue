<template>
  <div>
    <div>
      <el-button @click="dialogVisible = true" :type="type" :class="iconClass" :size="size">
        {{content}}
      </el-button>
    </div>
    <el-dialog title="Collecting" :visible.sync="dialogVisible" :center="false" :modal="false"
      width="68%">
      <el-form label-width="180px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="code">
              <el-select v-model="autoPart.code" @change="handleCodeChange">
                <el-option v-for="code in autoPart.codes" :label="code" :key="code" :value="code" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="url">
              <el-input v-model="autoPart.url" placeholder="url" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-button @click="getProductInfo">开始查询信息</el-button>
      </el-form>
      <ul v-if="productItems.length>0" class="infinite-list" style="overflow:auto">
        <el-row v-for="item,i in productItems" :key="i" class="leo-web-collector-product-item"
          :class="{active: isActive === i}" @click="isActive=i" @click.native="isActive=i">
          <el-col :span="3">
            <img :src="item.img" width="100%">
          </el-col>
          <el-col :span="16">
            <div v-html="item.base"></div>
          </el-col>
          <el-col :span="5" v-loading="item.loading">
            <div v-html="item.subject"></div>
            <el-button @click="execute(item)" size="mini" type="primary" icon="el-icon-document">
              采集
            </el-button>
            <el-button @click="openDetail(item.detailUrl)" size="mini" type="primary"
              icon="el-icon-document"> 详情
            </el-button>
          </el-col>
        </el-row>
      </ul>
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
import { api_spider_yipei_items, api_spider_yipei } from '@/api/leo-spider'
export default {
  name: 'LeoWebCollector',
  components: { JsonEditor, LeoProductItem },
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
      isActive: '',
      count: 0,
      pageSize: 6,
      product_status,
      dialogVisible: false,
      autoPart: {
        isShop: false,
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
        code: '',
        model: 'jsoup'
      },
      yipei: 'http://www.yiparts.com/en/search?type=number&keyword=',
      productItems: []
    }
  },
  created() {
    this.autoPart.codes = this.values.codes
    if (this.values.id) {
      this.autoPart.id = this.values.id
    }
    if (this.autoPart.codes) {
      this.autoPart.code = this.autoPart.codes[0]
    }
    this.setUrl()
  },
  methods: {
    openDetail(url) {
      window.open(url)
    },
    execute(item) {
      this.autoPart.dataType = 'new'
      this.autoPart.detailUrl = item.detailUrl
      this.autoPart.url = item.detailUrl
      this.autoPart.isThirdPart = item.isThirdPart
      this.autoPart.imageUrls = [item.img]
      api_spider_yipei(this.autoPart).then((res) => {
        this.dialogVisible = false
        this.$emit('onConfirm', res)
      })
    },

    getProductInfo() {
      this.productItems = []
      api_spider_yipei_items(this.autoPart).then((res) => {
        if (res.data) {
          this.productItems = res.data
        } else {
          this.$notify.warning('not data')
        }
      })
    },

    handleCodeChange() {
      this.setUrl()
    },
    setUrl() {
      this.autoPart.url = this.yipei + this.autoPart.code
    }
  }
}
</script>
<style scoped>
.infinite-list {
  height: 300px;
}
</style>