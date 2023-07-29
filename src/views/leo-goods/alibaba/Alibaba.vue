<template>
  <div class="app-container">
    <el-form ref="elForm" :model="formData" :rules="rules" label-width="180px">
      <el-form-item label="productID" prop="productID">
        <el-input v-model="formData.productID" placeholder="" size="normal"></el-input>
      </el-form-item>
      <el-form-item label="productType" prop="productType">
        <el-select v-model="formData.productType" placeholder="请选择productType" clearable :style="{ width: '100%' }">
          <el-option v-for="(item, index) in productTypeOptions" :key="index" :label="item.label" :value="item.value"
            :disabled="item.disabled"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="categoryID" prop="categoryID">
        <Category1688 v-model="formData.categoryID" @change="setCategoryID" categoryContent="设置为产品名" />
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
        <el-select v-model="formData.bizType" placeholder="请选择bizType" clearable :style="{ width: '100%' }">
          <el-option v-for="(item, index) in bizTypeOptions" :key="index" :label="item.label" :value="item.value"
            :disabled="item.disabled"></el-option>
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
        <SaleInfo1688 v-if="goods.productId" v-model="formData.saleInfo" :productId="goods.productId" />
      </el-form-item>
      <el-form-item label="shippingInfo" prop="shippingInfo">
        <ShippingInfo1688 v-model="formData.shippingInfo" />
      </el-form-item>
      <el-form-item label="description" prop="description">
        <Description1688 :productImages="formData.image.images" :key="'description' + key.description"></Description1688>
      </el-form-item>
      <el-form-item label="image" prop="image">
        <GoodsImages v-model="formData.image" :images="goodsImages()" @upload="sendImagesToAlibaba">
        </GoodsImages>
      </el-form-item>
      <el-form-item label="attributes" prop="attributes">
        <Attribute1688 v-model="formData.attributes" :params="formData" :key="key.attributes"></Attribute1688>
      </el-form-item>
      <el-form-item style="
          position: fixed;
          bottom: 0;
          width: 100%;
          background-color: rgb(244, 250, 250);
        ">
        <el-button type="primary" @click="submitForm" size="mini">提交</el-button>
        <el-button type="primary" @click="save" size="mini" style="margin-left: 20px">保存</el-button>
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
import GoodsImages from '@/components/LeoImage/Goods.vue'
import Description1688 from '@/views/leo-alibaba/components/Description1688.vue'
import Attribute1688 from '@/views/leo-goods/alibaba/Attribute.vue'
import { api_goods_get } from '@/api/leo-goods'
import { api_photo_alibaba_uload_batch } from '@/api/leo-photo'
import { MessageBox } from 'element-ui'
import { api_alibaba_auth } from '@/api/leo-alibaba'
import { api_product_alibaba_add } from '@/api/leo-product-alibaba'
export default {
  name: 'LeoAlibabaPost',
  components: {
    Category1688,
    Group1688,
    Subject1688,
    Album,
    SaleInfo1688,
    ShippingInfo1688,
    GoodsImages,
    Description1688,
    Attribute1688
  },
  props: [],
  data() {
    return {
      imageId: 0,
      goodsId: '',
      key: {
        description: 0,
        attributes: 1000
      },
      goods: {
        productId: null,
        images: []
      },
      formData: {
        code: null,
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
        image: {},
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
        image: [{ validator: this.validateImage, trigger: 'blur' }],
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
    validateImage(rule, value, callback) {
      // 这里设置邮件地址的最小数量为2
      if (this.formData.image.images && this.formData.image.images.length > 5) {
        callback(new Error('数量不能超过5个'));
      } else if (!this.formData.image.images || this.formData.image.images.length == 0) {
        callback(new Error('请选择图片'));
      } {
        callback(); // 校验通过
      }
    },
    goodsImages() {
      return this.goods.images.map((img) => {
        return { url: img.url, status: 1, checked: 1, id: img.id }
      })
    },
    submitForm() {
      this.$refs['elForm'].validate((valid) => {
        if (!valid) return
        api_product_alibaba_add(this.formData).then((res) => {
          console.log(res)
        })
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
          this.formData.image = {}
          this.goods = res.data
          this.key.attributes++
        })
      } else {
        this.formData = goods.json
        this.formData.image = {}
        this.goods = goods
        this.key.attributes++
      }
    },
    sendImagesToAlibaba(images) {
      const params = {
        images,
        albumID: this.formData.albumID
      }
      api_photo_alibaba_uload_batch(params).then(({ data }) => {
        if (data.code == '001994') {
          api_alibaba_auth().then((res) => {
            MessageBox.confirm(
              '还未登录阿里巴巴平台，是否打开登录页面',
              '提示',
              {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }
            ).then(() => {
              window.open(res.data)
            })
          })
        }
      })
    },
    save() {
      this.goods.json = this.formData
      localStorage.setItem(
        'leo-goods/post' + this.goods.id,
        JSON.stringify(this.goods)
      )
      this.$notify.success('保存成功！')
    }
  }
}
</script>
<style></style>
