<template>
  <div class="app-container">
    <el-form ref="elForm" :model="formData" :rules="rules" label-width="180px">
      <el-form-item label="productType" prop="productType">
        <el-select v-model="formData.productType" placeholder="请选择productType" clearable
          :style="{ width: '100%' }">
          <el-option v-for="(item, index) in productTypeOptions" :key="index" :label="item.label"
            :value="item.value" :disabled="item.disabled"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="categoryID" prop="categoryID">
        <Category1688 v-model="formData.categoryID" @change="setCategoryID"
          categoryContent="设置为产品名" />
      </el-form-item>

    </el-form>
  </div>
</template>
<script>
import Category1688 from '@/views/leo-alibaba/components/Category1688.vue'
import { api_goods_get } from '@/api/leo-goods'

const albumOptions = [
  { label: '宝马刹车片', value: '335902400' },
  { label: '奔驰刹车片', value: '335746283' }
]
export default {
  name: 'LeoAlibabaPost',
  components: {
    Category1688
  },
  props: [],
  data() {
    return {
      goodsId: '',
      albumOptions,
      key: {
        description: 0
      },
      formData: {
        albumID: albumOptions[0].value,
        id: undefined,
        productType: 'wholesale',
        categoryID: null,
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
  mounted() {
    this.goodsId = this.$route.query.goodsId
    console.log(this.goodsId)
    this.doGet()
  },
  methods: {
    setCategoryID(e) {
      this.formData.categoryID = e
      this.getAttributesTemplate()
    },
    doGet() {
      const goodsStr = localStorage.getItem('goods_' + this.goodsId)
      let goods = JSON.parse(goodsStr)
      if (!goods) {
        api_goods_get(this.$route.query.goodsId).then((res) => {
          goods = res.data
        })
      }
      this.formData = goods.json
    }
  }
}
</script>
<style></style>
