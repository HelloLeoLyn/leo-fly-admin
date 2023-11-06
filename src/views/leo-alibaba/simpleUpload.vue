<template>
  <div style="padding: 0 20px;">
    <el-form v-if="product" :model="formValues" ref="formValues" :rules="rules" label-width="180px"
      :inline="false" size="normal">
      <el-form-item label="primaryPicture" size="normal">
        <primaryPicture v-model="formValues.primaryPicture" :product="product"></primaryPicture>
      </el-form-item>
      <el-form-item label="title" size="normal">
        <el-input v-model="formValues.title" placeholder="" size="normal" clearable
          @change="counter(formValues.title, schema.data['title'].fields.maxLength)"
          @keyup.native="counter(formValues.title, schema.data['title'].fields.maxLength)">
          <template slot="append">
            <div>{{ currentLgt }}/{{ schema.data['title'].fields.maxLength }}</div>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="catProp" size="normal">
        <CatProp v-model="formValues.catProp" :catProp="schema.data.catProp">
        </CatProp>
      </el-form-item>
      <el-form-item label="onlineTrade" size="normal">
        <el-radio v-model="formValues['onlineTrade'].value" :key="key" :label="child.value" v-for="(child, key) in schema.data['onlineTrade'].fields
                    .dataSource">{{ child.text }}
          <el-tooltip v-if="child.help" :content="child.help" placement="bottom" effect="light">
            <el-button class="el-icon-question" type="text"></el-button>
          </el-tooltip>
          <!-- <i class="el-icon-question" v-if="child.help"></i> -->
        </el-radio>
      </el-form-item>
      <el-form-item label="cbuUnit" size="normal">
        <el-select v-model="formValues['cbuUnit'].unit" value-key="" placeholder="" clearable
          filterable>
          <el-option v-for="item in schema.data['cbuUnit'].fields.unitOptions" :key="item"
            :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="quotationType" size="normal">
        <el-radio v-model="formValues['quotationType'].value" :key="key" :label="child.value" v-for="(child, key) in schema.data['quotationType'].fields
                    .dataSource">{{ child.text }}
          <el-tooltip v-if="child.help" :content="child.help" placement="bottom" effect="light">
            <el-button class="el-icon-question" type="text"></el-button>
          </el-tooltip>
          <!-- <i class="el-icon-question" v-if="child.help"></i> -->
        </el-radio>
      </el-form-item>
      <el-form-item label="priceRange" size="normal">
        <priceRange :product-id="0" v-model="formValues.priceRange" />
      </el-form-item>
      <el-form-item label="invReduce" size="normal">
        <el-radio v-model="formValues['invReduce'].value" :key="key" :label="child.value" v-for="(child, key) in schema.data['invReduce'].fields
                    .dataSource">{{ child.text }}
          <el-tooltip v-if="child.help" :content="child.help" placement="bottom" effect="light">
            <el-button class="el-icon-question" type="text"></el-button>
          </el-tooltip>
        </el-radio>
      </el-form-item>
      <el-form-item label="totalSales" size="normal">
        <el-input v-model="formValues['totalSales']" placeholder="" size="normal"
          clearable></el-input>
      </el-form-item>
      <el-form-item label="beginAmount" size="normal">
        <el-input v-model="formValues['beginAmount']" placeholder="" size="normal"
          clearable></el-input>
      </el-form-item>
      <el-form-item label="upshelfTime" size="normal">
        <el-radio v-model="formValues['upshelfTime'].value" :key="key" :label="child.value" v-for="(child, key) in schema.data['upshelfTime'].fields
                    .dataSource">{{ child.text }}
          <el-tooltip v-if="child.help" :content="child.help" placement="bottom" effect="light">
            <el-button class="el-icon-question" type="text"></el-button>
          </el-tooltip>
        </el-radio>
      </el-form-item>
      <el-form-item label="cbuSendAddress" size="normal">
        <el-select v-model="formValues['cbuSendAddress']" value-key="text" placeholder="" clearable>
          <el-option v-for="item in schema.data['cbuSendAddress'].fields.dataSource"
            :key="item.value" :label="item.text" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="freight" size="normal">
        <el-select v-model="formValues['freight'].freightType" placeholder="" clearable>
          <el-option label="使用运费模板" value="T"></el-option>
          <!-- <el-option v-for="item in schema.data[layoutName2].fields.dataSource" :key="item"
                    :label="item" :value="item">
                  </el-option> -->
        </el-select>
        <el-select v-model="formValues['freight'].freightId" placeholder="" clearable>
          <el-option label="广州地址" :value="14729534"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="weight" size="normal">
        <el-input style="width: 200px" v-model="formValues.weight" placeholder="" size="normal"
          clearable>
          <template slot="append">kg/{{ formValues.cbuUnit.unit }}</template>
        </el-input>
        {{ schema.data['weight'].fields.promote.right }}
      </el-form-item>
      <el-form-item label="suttleWeight" size="normal">
        <el-input style="width: 200px" v-model="formValues.suttleWeight" placeholder=""
          size="normal" clearable>
          <template slot="append">kg/{{ formValues.cbuUnit.unit }}</template>
        </el-input>
        {{ schema.data['suttleWeight'].fields.promote.right }}
      </el-form-item>
      <el-form-item label="volume" size="normal">
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
        <div v-html="schema.data['volume'].fields.promote.bottom"></div>
      </el-form-item>
      <el-form-item label="description" size="normal">
        <Description1688 ref="description" :product="product"
          style="height: 500px; overflow: scroll" v-model="formValues.description">
        </Description1688>
      </el-form-item>
      <el-form-item label="userCategory" size="normal">
        <el-select v-model="formValues['userCategory']" multiple placeholder="请选择" value-key="text">
          <el-option v-for="item in schema.data['userCategory'].fields.dataSource" :key="item.value"
            :label="item.text" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="
          position: fixed;
          bottom: 0;
          width: 100%;
          background-color: rgb(244, 250, 250);
        ">
        <el-button type="primary" @click="onSubmit('formValues')">立即创建</el-button>
        <el-button type="primary" @click="next" style="margin-left: 20px">下一个</el-button>
      </el-form-item>
    </el-form>
    <Attributes :productId="$route.params.id" :product="product"></Attributes>
    <Helper :productId="$route.params.id" :product="product"></Helper>
  </div>
</template>
<script>
import { schema, initCatProp } from './product'
//  components
import CatProp from './components/CatProp.vue'
import cbu_supply_type from '@/views/leo-alibaba/components/cbu_supply_type'
import LeoVideo from '@/components/LeoVideo/Index.vue'
import priceRange from '@/views/leo-alibaba/components/priceRange.vue'
import primaryPicture from '@/views/leo-alibaba/components/primaryPicture'
import Attributes from '@/views/leo-product/components/Attributes.vue'
import Helper from '@/views/leo-product/components/Helper.vue'
import Description1688 from './components/Description1688.vue'
import LeoInput from '@/components/LeoInput/index.vue'
//  api
import {
  apiOptions,
  api_alibaba_product_schema,
  api_alibaba_product_add
} from '@/api/leo-alibaba'
import { api_get_product_more } from '@/api/leo-product'
import { api_goods_post, api_goods_page } from '@/api/leo-goods'
export default {
  name: 'LeoAlibabaPost',
  components: {
    CatProp,
    LeoVideo,
    cbu_supply_type,
    priceRange,
    primaryPicture,
    Attributes,
    Helper,
    Description1688,
    LeoInput
  },
  data() {
    return {
      currentLgt: 0,
      list: [],
      columns: [],
      init: {
        catProp: false
      },
      product: null,
      apiOptions,
      schema,
      catPropOptions: [],
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
      },
      rules: {
        title: [
          {
            require: true,
            min: 30,
            max: 60,
            message: '长度在 30 到 60 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getProduct(productId) {
      api_get_product_more(productId).then((res) => {
        this.product = res.data
      })
    },
    autoSet() {
      let catProp = initCatProp(this.formValues.catProp, this.product)
      this.$set(this.formValues, 'catProp', catProp)
    },
    read() {
      const string = localStorage.getItem(
        'alibaba_post_' + this.$route.params.id
      )
      if (string && string !== 'undefined') {
        const json = JSON.parse(string)
        this.formValues.title = json.title
        this.formValues.primaryPicture = json.primaryPicture
        this.formValues.catProp = json.catProp
        this.formValues.priceRange = json.priceRange
        this.formValues.weight = json.weight
      }
    },
    next() {
      let temp = this.list.pop()
      // console.log(temp)
      this.formValues = temp.json
      this.formValues.primaryPicture = { imageList: [] }
      this.getProduct(temp.productId)
    },
    handBltClk(data) {
      api_alibaba_product_schema(data).then((res) => {
        console.log(res)
      })
    },

    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = Object.assign(apiOptions.add, {
            dataBody: JSON.stringify({
              formValues: this.formValues
            })
          })
          api_alibaba_product_add(params).then(({ data }) => {
            if (data.success == true) {
              this.$message.success('successfully!')
            } else {
              let goods = {
                productId: this.product.id,
                platform: '1688',
                subject: this.formValues.title,
                images: this.formValues.primaryPicture.imageList,
                json: this.formValues
              }
              api_goods_post(goods).then((res) => {
                if (res.code != 200) {
                  this.$message.error(res.msg)
                } else {
                  this.$message.error(data.bizMsg)
                }
              })
            }
          })
        } else {
          return false
        }
      })
    },

    saveAsTemplate() {},
    handleObj(key) {
      console.log(
        JSON.stringify(this.schema.data[key]),
        JSON.stringify(this.formValues[key])
      )
    },
    mixBatchPreChange(e) {
      if (e) {
        this.formValues.mixBatch = [
          {
            value: 17026,
            text: '支持混批'
          }
        ]
      } else {
        this.formValues.mixBatch = []
      }
    },
    getData() {
      api_goods_page({}).then((res) => {
        this.list = res.data.records
        if (this.list && this.list.length > 0) {
          this.formValues = this.list[0].json
          // console.log(this.formValues)
          // this.$set(this.formValues, 'title', 'ddddd')
          this.getProduct(this.list[0].productId)
        }
      })
    },
    counter(value) {
      // 中文、中文标点、全角字符按1长度，英文、英文符号、数字按0.5长度计算
      let cnReg = /([\u4e00-\u9fa5]|[\u3000-\u303F]|[\uFF00-\uFF60])/
      let length = 0
      let strArr = value.split('')
      strArr.map((str) => {
        if (cnReg.test(str)) {
          // 中文
          length += 2
        } else {
          // 英文
          length++
        }
      })
      this.currentLgt = length
    }
  }
}
</script>
<style lang="scss">
em {
  color: #e1870a;
}
</style>
