<template>
  <div class="app-container">
    <el-form ref="elForm" :model="formData" :rules="rules" label-width="180px">
      <el-form-item label="code" prop="code">
        <el-input v-model="formData.code" placeholder="" size="normal" clearable></el-input>
      </el-form-item>
      <el-form-item label="productType" prop="productType">
        <el-select v-model="formData.productType" placeholder="请选择productType" clearable
          :style="{ width: '100%' }">
          <el-option v-for="(item, index) in productTypeOptions" :key="index" :label="item.label"
            :value="item.value" :disabled="item.disabled"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="categoryID" prop="categoryID">
        <Category1688 v-model="product.categoryId" @change="setCategoryID"
          categoryContent="设置为产品名" />
      </el-form-item>
      <el-form-item label="groupID" prop="groupID">
        <Group1688 @change="setGroupID" :value="product.groupId" :categoryID="formData.categoryID"
          v-if="formData.categoryID" />
      </el-form-item>
      <el-form-item label="attributes" prop="attributes">
        <Attribute1688 ref="attributes" :code="product.code" :carFitment="JSON.parse(product.model)"
          v-if="flag && attributeKey > 19999" :key="attributeKey" @getAttributes="getAttributes"
          :params="{
            categoryID: formData.categoryID,
            webSite: '1688',
            groupID: formData.groupID
          }" />
      </el-form-item>
      <el-form-item label="subject" prop="subject">
        <Subject1688 @change="e => handleSubjectChange(e)" :carFitment="JSON.parse(product.model)"
          v-if="flag" :product="product" :key="subjectKey" />
      </el-form-item>

      <el-form-item label="language" prop="language">
        <el-input v-model="formData.language" placeholder="请输入language" readonly clearable
          :style="{ width: '100%' }"></el-input>
      </el-form-item>
      <el-form-item label="periodOfValidity" prop="periodOfValidity">
        <el-input v-model="formData.periodOfValidity" placeholder="请输入periodOfValidity" clearable
          :style="{ width: '100%' }"></el-input>
      </el-form-item>
      <el-form-item label="bizType" prop="bizType">
        <el-select v-model="formData.bizType" placeholder="请选择bizType" clearable
          :style="{ width: '100%' }">
          <el-option v-for="(item, index) in bizTypeOptions" :key="index" :label="item.label"
            :value="item.value" :disabled="item.disabled"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="pictureAuth" prop="pictureAuth">
        <template slot="label">
          <el-tooltip content="是否图片私密信息" placement="bottom" effect="light">
            <i class="el-icon-warning-outline" />
          </el-tooltip>
          pictureAuth
        </template>
        <el-radio-group v-model="formData.pictureAuth" size="medium">
          <el-radio v-for="(item, index) in pictureAuthOptions" :key="index" :label="item.value"
            :disabled="item.disabled">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="albumID" prop="albumID">
        <el-select v-model="formData.albumID" clearable>
          <el-option v-for="item in albumOptions" :key="item.value" :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

      </el-form-item>
      <el-form-item label="image" prop="image">
        <Image1688 v-if="$route.params.id" :ref="$route.params.id" :product-id="$route.params.id"
          :sources="[]" @getImages="getImages" />
      </el-form-item>
      <el-form-item label="saleInfo" prop="saleInfo">
        <SaleInfo1688 v-if="flag" :id="product.id" @showHistory="showHistory"
          :values="formData.saleInfo" ref="saleInfo" />
      </el-form-item>
      <el-form-item label="shippingInfo" prop="shippingInfo">
        <ShippingInfo1688 ref="shippingInfo"
          :values="{ 'unitWeight': product.weight, 'packageSize': product.packageSize }"
          v-if="flag" />
      </el-form-item>
      <el-form-item label="webSite" prop="webSite">
        <el-radio-group v-model="formData.webSite" size="medium">
          <el-radio v-for="(item, index) in webSiteOptions" :key="index" :label="item.value"
            :disabled="item.disabled">{{
            item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="sevenDaysRefunds" prop="sevenDaysRefunds">
        <el-radio-group v-model="formData.sevenDaysRefunds" size="medium">
          <el-radio v-for="(item, index) in sevenDaysRefundsOptions" :key="index"
            :label="item.value" :disabled="item.disabled">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="description" prop="description">
        <Description1688 :productImages="formData.image.images"
          :key="'description' + key.description"></Description1688>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <leo-history :productId="history.productId" :show="history.show" :key="history.count" />

  </div>
</template>
<script>
import LeoHistory from '@/views/leo-warehouse/components/LeoHistory.vue'
import Product1688 from '@/views/leo-alibaba/components/Product1688.vue'
import Category1688 from '@/views/leo-alibaba/components/Category1688.vue'
import Group1688 from '@/views/leo-alibaba/components/Group1688.vue'
import Attribute1688 from '@/views/leo-alibaba/components/Attribute1688.vue'
import Subject1688 from '@/views/leo-alibaba/components/Subject1688.vue'
import Image1688 from '@/components/LeoImage/List.vue'
import SaleInfo1688 from '@/views/leo-alibaba/components/SaleInfo1688.vue'
import ShippingInfo1688 from '@/views/leo-alibaba/components/ShippingInfo1688.vue'
import Description1688 from './components/Description1688.vue'
import { api_get_product_more } from '@/api/leo-product'
import { api_product_alibaba_save } from '@/api/leo-product-alibaba'
import { listToString } from '@/utils'
const imageValidator = (rule, value, callback, images) => {
  if (!images || images.length < 1) {
    return callback(new Error(rule.message))
  }
  callback()
}
const validatorAttributes = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入账户信息'))
  } else {
    callback()
  }
}
const albumOptions = [
  { label: '宝马刹车片', value: '335902400' },
  { label: '奔驰刹车片', value: '335746283' }
]
export default {
  name: 'LeoAlibabaPost',
  components: {
    Product1688,
    Category1688,
    Group1688,
    Attribute1688,
    Subject1688,
    Image1688,
    SaleInfo1688,
    ShippingInfo1688,
    Description1688,
    LeoHistory
  },
  props: [],
  data() {
    return {
      albumOptions,
      key: {
        description: 0
      },
      sources: [],
      history: {
        productId: -1,
        show: false,
        count: 0
      },
      subjectKey: 9999,
      attributeKey: 19999,
      product: {},
      flag: false,
      formData: {
        albumID: albumOptions[0].value,
        id: undefined,
        productType: 'wholesale',
        categoryID: null,
        groupID: null,
        attributes: [],
        subject: undefined,
        description: undefined,
        language: 'CHINESE',
        periodOfValidity: 365,
        bizType: 1,
        pictureAuth: false,
        image: { iamges: null, idList: [] },
        skuInfos: undefined,
        saleInfo: {
          unit: '套'
        },
        shippingInfo: undefined,
        extendInfos: undefined,
        processing: undefined,
        webSite: 1688,
        productLineId: 123,
        sevenDaysRefunds: false,
        privateChannelInfo: undefined,
        reserveInfo: undefined
      },
      rules: {
        unit: [{ required: true, message: '请输入数量单位', trigger: 'blur' }],
        productType: [
          {
            required: true,
            message: '请选择productType',
            trigger: 'change'
          }
        ],
        categoryID: [
          {
            required: true,
            message: '请选择categoryID',
            trigger: 'change'
          }
        ],
        groupID: [
          {
            required: true,
            message: '请选择groupID',
            trigger: 'change'
          }
        ],
        attributes: [
          {
            required: true,
            message: '请输入attributes',
            validator: validatorAttributes,
            trigger: 'blur'
          }
        ],
        subject: [
          {
            required: true,
            message: '请输入subject',
            trigger: 'blur'
          }
        ],
        description: [],
        language: [
          {
            required: true,
            message: '请输入language',
            trigger: 'blur'
          }
        ],
        periodOfValidity: [],
        bizType: [],
        pictureAuth: [],
        image: [
          {
            validator: (a, b, c) =>
              imageValidator(a, b, c, this.formData.image.images),
            message: '前选择图片',
            trigger: 'blur'
          }
        ],
        skuInfos: [],
        saleInfo: [],
        shippingInfo: [],
        extendInfos: [],
        processing: [],
        webSite: [
          {
            required: true,
            message: 'webSite不能为空',
            trigger: 'change'
          }
        ],
        productLineId: [],
        sevenDaysRefunds: [],
        privateChannelInfo: [],
        reserveInfo: []
      },
      productTypeOptions: [
        {
          label: 'wholesale',
          value: 'wholesale'
        },
        {
          label: 'sourcing',
          value: 'sourcing'
        }
      ],
      bizTypeOptions: [
        {
          label: '商品',
          value: 1
        },
        {
          label: '加工',
          value: 2
        },
        {
          label: '代理',
          value: 3
        },
        {
          label: '合作',
          value: 4
        },
        {
          label: '商务服务',
          value: 5
        }
      ],
      pictureAuthOptions: [
        {
          label: true,
          value: true
        },
        {
          label: false,
          value: false
        }
      ],
      webSiteOptions: [
        {
          label: '1688',
          value: 1688
        },
        {
          label: 'alibaba',
          value: 'alibaba'
        }
      ],
      sevenDaysRefundsOptions: [
        {
          label: true,
          value: true
        },
        {
          label: false,
          value: false
        }
      ]
    }
  },
  computed: {},
  watch: {},

  mounted() {
    this.formData.id = this.$route.params.id
    this.doGet()
  },
  created() {
    this.formData.id = this.$route.params.id
    this.doGet()
  },
  methods: {
    getImages(e) {
      this.formData.image.images = e.map((i) => i.large)
      this.formData.image.idList = e.map((i) => i.id)
      this.$refs['elForm'].validate((valid) => {
        if (!valid) return
      })
      this.key.description++
    },

    setCategoryID(e) {
      this.formData.categoryID = e
      this.getAttributesTemplate()
    },
    setGroupID(e) {
      this.formData.groupID = e
      this.getAttributesTemplate()
    },
    getAttributesTemplate() {
      if (!this.formData.groupID || !this.formData.categoryID) {
        return
      }
      this.attributeKey++
    },
    getAttributes(attrs) {
      const index = attrs.findIndex((item) => {
        if (item.name == '计量单位') {
          return true
        }
      })
      this.formData.saleInfo.unit = attrs[index].value
    },
    showHistory() {
      this.history.productId = this.product.id
      this.history.show = true
      this.history.count++
    },
    setProductName(data) {
      this.product.name = data.label
      this.subjectKey++
    },
    doGet() {
      api_get_product_more(this.$route.params.id).then((res) => {
        this.product = res.data
        this.flag = true
        this.formData.code = this.product.code ? this.product.code[0] : ''
      })
    },
    submitForm() {
      this.$refs['saleInfo'].valid().then((bool) => {
        if (!bool) return
        this.$refs['attributes'].valid().then((bool2) => {
          if (!bool2) return
          this.$refs['elForm'].validate((valid) => {
            if (!valid) return
            this.to1688Attributes(this.$refs['attributes'].getVal())
            this.formData.saleInfo = this.$refs['saleInfo'].getVal()
            this.formData.shippingInfo = this.$refs['shippingInfo'].getVal()
            this.formData.productID = this.product.id
            this.formData.localProductId = this.product.id
            this.formData.webSite = '1688'
            this.formData.productLineId = null
            this.formData.sevenDaysRefunds = false
            console.log(this.formData)
            api_product_alibaba_save(this.formData).then((res) => {
              this.$message.success(res.msg)
            })
          })
        })
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
    to1688Attributes(list) {
      this.formData.attributes = list.map((element) => {
        if (element.value) {
          if (typeof element.value == 'object') {
            if (Array.isArray(element.value)) {
              element.value = listToString(element.value, ',')
            } else {
              element.value = JSON.stringify(element.value)
            }
          } else {
            element.value = element.value + ''
          }
        }
        return element
      })
    },
    handleSubjectChange(e) {
      this.formData.subject = e
      this.$refs['elForm'].validate((valid) => {
        if (!valid) return
      })
    }
  }
}
</script>
<style></style>
