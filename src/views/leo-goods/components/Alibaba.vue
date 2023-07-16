<template>
  <div class="app-container">
    <el-form ref="elForm" :model="formData" :rules="rules" label-width="180px">
      <el-form-item label="productType" prop="productType">
        <el-input v-model="formData.productID" placeholder="" size="normal"></el-input>
      </el-form-item>
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
      <el-form-item label="groupID" prop="groupID">
        <Group1688 v-model="formData.groupID" :categoryID="formData.categoryID" />
      </el-form-item>
      <el-form-item label="subject" prop="subject">
        <el-input v-model="formData.subject"></el-input>
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
        <Album v-model="formData.albumID"></Album>
      </el-form-item>
      <el-form-item label="saleInfo" prop="saleInfo">
        <SaleInfo1688 v-if="goods.productId" v-model="formData.saleInfo"
          :productId="goods.productId" />
      </el-form-item>
      <el-form-item label="shippingInfo" prop="shippingInfo">
        <ShippingInfo1688 v-model="formData.shippingInfo" />
      </el-form-item>
      <el-form-item label="description" prop="description">
        <Description1688 :productImages="formData.image.images"
          :key="'description' + key.description"></Description1688>
      </el-form-item>
      <el-form-item label="image" prop="image">
        <Images v-model="formData.image.images" />
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Category1688 from '@/views/leo-alibaba/components/Category1688.vue'
import Group1688 from '@/views/leo-alibaba/components/Group1688.vue'
import Subject1688 from '@/views/leo-alibaba/components/Subject1688.vue'
import Album from '@/components/LeoAlibaba/Album.vue'
import SaleInfo1688 from '@/views/leo-alibaba/components/SaleInfo1688.vue'
import ShippingInfo1688 from '@/views/leo-alibaba/components/ShippingInfo1688.vue'
import Images from '@/components/LeoImage/List.vue'
import Description1688 from '@/views/leo-alibaba/components/Description1688.vue'
import { api_goods_get } from '@/api/leo-goods'

export default {
  name: 'LeoAlibabaPost',
  components: {
    Category1688,
    Group1688,
    Subject1688,
    Album,
    SaleInfo1688,
    ShippingInfo1688,
    Images,
    Description1688
  },
  props: [],
  data() {
    return {
      goodsId: '',
      key: {
        description: 0
      },
      goods: {
        productId: null
      },
      formData: {
        albumID: null,
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
        saleInfo: null,
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
            message: '请选择GroupID',
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
        language: [
          {
            required: true,
            message: '请输入language',
            trigger: 'blur'
          }
        ],
        webSite: [
          {
            required: true,
            message: 'webSite不能为空',
            trigger: 'change'
          }
        ]
      },
      albumOptions: null,
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
    const albumStr = localStorage.getItem('album')
    this.albumOptions = JSON.parse(albumStr)
    this.goodsId = this.$route.query.goodsId
    this.doGet()
  },
  methods: {
    submitForm() {
      this.$refs['elForm'].validate((valid) => {
        if (!valid) return
      })
    },
    setCategoryID(e) {
      this.formData.categoryID = e
      this.getAttributesTemplate()
    },
    doGet() {
      const goodsStr = localStorage.getItem('goods_' + this.goodsId)
      let goods = JSON.parse(goodsStr)
      if (!goods) {
        api_goods_get(this.$route.query.goodsId).then((res) => {
          this.formData = res.data.json
          this.goods = res.data
        })
      } else {
        this.formData = goods.json
        this.goods = goods
      }
    }
  }
}
</script>
<style></style>
