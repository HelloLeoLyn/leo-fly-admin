<template>
  <div class="leo-alibaba-upload-prepare">
    <QueryParams ref="queryParams"></QueryParams>
    <el-button class="filter-item" type="primary" icon="el-icon-search"
      @click="onClickSearch">查询</el-button>
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.current"
      :limit.sync="listQuery.size" @pagination="onClickSearch" />
    <el-button-group v-show="list.length>0">
      <el-button type="primary" size="default" @click="next">下一个</el-button>
    </el-button-group>
    <div v-if="product">
      <Helper :productId="product.id" :product="product"></Helper>
      <Attributes :productId="product.id" :product="product"></Attributes>
      <div>
        <el-row :gutter="20">
          <el-col :span="18" :offset="0">
            <el-image style="width: 200px;height: 200px;"
              :src="'http://localhost:8080/'+product.images[0].url" fit="fill"
              :lazy="true"></el-image>
            <p>{{product.id}}</p>
            <p>{{product.subject}}</p>
            <p>{{ product.code }}</p>
          </el-col>
          <el-col :span="6" :offset="0">
            <IsUpload :products="[product]" type="text" size="small" @onFinished="onIsUploadFinish">
            </IsUpload>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-form v-if="product" label-width="180px" :inline="false" size="normal" :key="index"
      v-show="visable">
      <el-form-item label="">
        <primaryPicture v-if="product" v-model="formValues.primaryPicture" :product-id="product.id"
          :product="product"></primaryPicture>
      </el-form-item>
      <el-form-item label="主题">
        <LeoInput v-model="formValues.title"
          :show-word-limit="schema.data['title'].fields.showCounter"
          :max-length="schema.data['title'].fields.maxLength"></LeoInput>
      </el-form-item>
      <el-form-item label="基本信息">
        <CatProp v-model="formValues.catProp" :catProp="schema.data.catProp">
        </CatProp>
      </el-form-item>
      <el-form-item label="价格">
        <priceRange :product-id="0" v-model="formValues.priceRange" />
      </el-form-item>
      <el-form-item label="重量">
        <template>
          <el-input style="width: 200px" v-model="formValues.weight" placeholder="" size="normal"
            clearable>
            <template slot="append">kg/{{ formValues.cbuUnit.unit }}</template>
          </el-input>
          {{ schema.data['weight'].fields.promote.right }}
          {{product.weight}}
        </template>
      </el-form-item>
      <el-form-item label="境外包裹重量">
        <template>
          <el-input style="width: 200px" v-model="formValues.suttleWeight" placeholder=""
            size="normal" clearable>
            <template slot="append">kg/{{ formValues.cbuUnit.unit }}</template>
          </el-input>
          {{ schema.data['suttleWeight'].fields.promote.right }}
        </template>
      </el-form-item>
      <el-form-item label="体积">
        <template>
          <el-input style="width: 200px" v-model="formValues.volume.length" placeholder="长"
            size="normal" clearable>
            <template slot="append">cm</template>
          </el-input>
          <el-input style="width: 200px" v-model="formValues.volume.width" placeholder="宽"
            size="normal" clearable>
            <template slot="append">cm</template>
          </el-input>
          <el-input style="width: 200px" v-model="formValues.volume.height" placeholder="高"
            size="normal" clearable>
            <template slot="append">cm</template>
          </el-input>
          {{product.packageSize}}
          <div v-html="schema.data['volume'].fields.promote.bottom"></div>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import QueryParams from '../leo-product/components/QueryParams.vue'
import LeoInput from '@/components/LeoInput/index.vue'
import CatProp from './components/CatProp.vue'
import priceRange from '@/views/leo-alibaba/components/priceRange.vue'
import primaryPicture from './components/primaryPicture.vue'
import Description1688 from './components/Description1688.vue'
import IsUpload from './components/IsUpload.vue'
import Helper from '@/views/leo-product/components/Helper.vue'
import Attributes from '../leo-product/components/Attributes.vue'
import {
  product_page_api,
  api_get_product_more,
  product_update_api
} from '@/api/leo-product'
import { schema, initCatProp } from './post'
import { api_goods_post } from '@/api/leo-goods'
export default {
  components: {
    Pagination,
    QueryParams,
    LeoInput,
    CatProp,
    priceRange,
    Description1688,
    primaryPicture,
    IsUpload,
    Helper,
    Attributes
  },
  data() {
    return {
      schema,
      list: [],
      total: 0,
      listQuery: {
        size: 10,
        current: 1,
        referStatus: 0
      },
      visable: true,
      product: null,
      index: 0,
      formValues: {
        batchSale: {
          enable: true,
          sellUnit: '套',
          scale: '2'
        },
        saleProp: {},
        onlineTrade: { value: 17410 },
        cbuUnit: { unit: '套' },
        quotationType: { value: 2 },
        // bPrice: {},
        priceRange: [{ pricerange_beginAmount: 2, pricerange_price: 158 }],
        skuTable: {},
        invReduce: { value: '2' },
        totalSales: 999,
        beginAmount: 2,
        standardPrice: {},
        lightBeginAmount: {},
        processPriceTpl: {},
        mixBatchPre: true,
        mixBatch: [
          {
            value: 17026,
            text: '支持混批'
          }
        ],
        upshelfTime: { value: 1, subText: '商品已经开售' },
        tradeTemplate: {},
        privacy: {},
        buyerProtection: null,
        deliveryTime: { value: '3', text: '三天发货' },
        seven_day: {},
        cbuSendAddress: {
          value: 32583873,
          text: '广东省 广州市 越秀区 广园东路西坑厚街22号'
        },
        freight: {
          freightType: 'T',
          freightId: 14729534
        },
        officialLogistics: {},
        weight: null,
        suttleWeight: null,
        volume: {
          height: 10,
          width: 12,
          length: 20
        },
        description: null,
        detailVideo: {},
        userCategory: [],
        title: '',
        catProp: {
          'p-100000729': { value: 21959, text: '否' },
          'p-287': { value: 25423961, text: '半金属' },
          'p-3567': { value: 47673, text: '刹车片' },
          'p-182282223': { value: 21958, text: '是' },
          'p-2176': 'MDTZ',
          'p-157878556': null
        },
        importProp: {},
        productDocument: {},
        primaryPicture: { imageList: [] },
        primaryVideo: {},
        industrySelectVideo: {},
        globalMessage: {},
        navStruct: {},
        supplyType: {},
        catNamer: {
          chooseCategoryUrl:
            'https: //offer.1688.com/offer/post/choose_category.htm',
          pathList: [
            { categoryId: 71, name: '汽摩及配件' },
            { categoryId: 10106, name: '制动系统' },
            { categoryId: 1032176, name: '刹车片' }
          ]
        },
        blockPrimary: {},
        blockProps: {},
        blockTradeInfo: {},
        blockExtras: {},
        blockLogistics: {},
        blockDescription: {},
        submit: {},
        plugin: {},
        assistBoard: {}
      }
    }
  },
  methods: {
    onClickSearch() {
      this.product = null
      this.list = []
      this.index = 0
      let queryParams = this.parseParams()
      queryParams = Object.assign(queryParams, this.listQuery)
      this.doSearch(queryParams)
    },
    parseParams() {
      const queryParams = this.$refs.queryParams.getParams()
      let listQuery = {}
      if (queryParams) {
        queryParams.forEach((param) => {
          if (param.key && param.value) {
            listQuery[param.key] = param.value
          }
        })
      }
      return listQuery
    },
    doSearch(queryParams) {
      product_page_api(queryParams).then((res) => {
        this.list = res.data.records
        this.total = res.data.total
        if (this.list && this.list.length > 0) {
          this.next()
        }
      })
    },
    next() {
      this.formValues.userCategory = [{ value: '152550850', text: '刹车片' }]
      this.product = this.list[this.index]
      api_get_product_more(this.product.id).then((res) => {
        this.product = res.data
        this.autoSet()
        this.index++
      })
    },
    onSubmit() {
      let goods = {
        productId: this.product.id,
        platform: '1688',
        subject: this.formValues.title,
        images: this.formValues.primaryPicture.imageList,
        json: this.formValues
      }
      api_goods_post(goods).then((res) => {
        if ((res.code = 200)) {
          this.$message.success(res.msg)
          product_update_api({
            id: this.product.id,
            referStatus: 1,
            status: 300
          })
          this.next()
        } else {
          this.$message.error(res.msg)
          product_update_api({
            id: this.product.id,
            status: 305,
            referStatus: 2,
            error: res.msg
          })
        }
      })
    },
    autoSet() {
      let catProp = initCatProp(this.formValues.catProp, this.product)
      this.$set(this.formValues, 'catProp', catProp)
    },
    onIsUploadFinish(e) {
      this.visable = !e
      this.visable = true
    }
  }
}
</script>
<style lang="scss">
.leo-alibaba-upload-prepare {
  margin-left: 20px;
}
</style>