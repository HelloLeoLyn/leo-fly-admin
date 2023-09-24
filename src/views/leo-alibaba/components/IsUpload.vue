<template>
  <div class="leo-product-editor">
    <el-button :type="type" :size="size" @click="visible = !visible"
      :class="{ fix: isFix }">{{ btnName }}</el-button>
    <el-dialog :title="title" :visible.sync="visible" width="60%" :append-to-body="true"
      :modal-append-to-body="false">
      <el-input v-model="queryParams.subjectKey" placeholder="subjectKey" size="normal"
        clearable></el-input>
      <el-select v-model="queryParams.statusList" placeholder="statusList" clearable multiple>
        <el-option label="published" value="published"> </el-option>
      </el-select>
      <el-button type="primary" size="default" @click="handleGetList">查询</el-button>

      <el-table :data="data" border stripe default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column v-for="col in columns" :prop="col.key" :key="col.key" :label="col.label"
          :width="col.width">
        </el-table-column>
        <el-table-column><template slot-scope="{ row }">
            <el-button type="primary" size="default" @click="upload(row)">上传</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer">
        <el-button @click="visible = false">Cancel</el-button>
        <el-button type="primary">OK</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  api_product_alibaba_List,
  api_product_alibaba_save
} from '@/api/leo-product-alibaba'
import { listToString } from '@/utils'
export default {
  props: {
    btnName: {
      type: String,
      default: '是否上传'
    },
    title: {
      type: String,
      default: '1688产品校验'
    },
    products: {
      type: Array,
      default: (e) => {
        return e
      }
    },
    size: {
      type: String,
      default: (e) => {
        return e
      }
    },
    type: {
      type: String,
      default: 'primary'
    },
    isFix: {
      type: Boolean,
      default: false
    },
    isBatch: {
      type: Boolean,
      default: false
    },
    alternativeKeys: {
      type: Array,
      default: () => {}
    }
  },
  watch: {
    products(newVal) {
      if (!this.isBatch) {
        if (newVal[0].code[0].length > 0) {
          this.queryParams.subjectKey = newVal[0].code[0]
        }
      }
      this.data = newVal.map(({ id, subject, code, status, referStatus }) => {
        return {
          id,
          subject,
          code: listToString(code, ' '),
          status,
          referStatus
        }
      })
    }
  },
  data() {
    return {
      content: null,
      visible: false,
      columns: [
        { key: 'id', label: 'id' },
        { key: 'code', label: 'code' },
        { key: 'subject', label: 'subject' },
        { key: 'status', label: 'status' },
        { key: 'referStatus', label: 'referStatus' },
        { key: 'productID', label: 'productID' },
        { key: 'productSubject', label: 'productSubject' },
        { key: 'productImage', label: 'productImage' }
      ],
      queryParams: {
        subjectKey: null,
        pageNo: 1,
        pageSize: 20,
        statusList: ['published']
      },
      data: []
    }
  },
  created() {},
  methods: {
    handleGetList() {
      if (!this.isBatch) {
        api_product_alibaba_List(this.queryParams).then(({ data }) => {
          if (data.resultList && data.resultList.length > 0) {
            if (data.resultList.length == 1) {
              let product = data.resultList[0]
              product.localProductId = this.products[0].id
              product.description = null
              this.saveAlibabaProduct(product)
            } else {
              console.log(data.resultList.length)
            }
          } else {
            this.$set(this.data, 0, -1)
            this.$message.warning('未上传')
          }
          let product = {
            id: this.products[0].id,
            referStatus: data.resultList.length
          }
          this.updateReferStatus(product)
          this.$emit('onFinished', null)
        })
      } else {
        this.products.forEach(({ id, code, referStatus }, index) => {
          if (referStatus == 0) {
            const queryParams = {
              subjectKey: code[0],
              pageNo: 1,
              pageSize: 20,
              statusList: ['published']
            }
            api_product_alibaba_List(queryParams)
              .then(({ data }) => {
                if (data.resultList && data.resultList.length > 0) {
                  if (data.resultList.length == 1) {
                    console.log(data.esultList.length)
                  } else {
                    console.log(data.resultList.length)
                  }
                  let product = {
                    id,
                    referStatus: data.resultList.length
                  }
                  this.updateReferStatus(product)
                }
              })
              .finally(() => {
                if (index == this.products.length - 1) {
                  this.$emit('onFinished', null)
                }
              })
          }
        })
      }
    },
    updateReferStatus(product) {
      this.$emit('onSubmitUpdateReferStatus', product)
    },
    saveAlibabaProduct(product) {
      api_product_alibaba_save(product).then((res) => {
        console.log(res)
      })
    },
    upload(row) {
      this.$router.push('/leo-alibaba/post/' + row.id)
    },
    temp() {
      return {
        productID: 639021229801,
        productType: 'wholesale',
        categoryID: 1032176,
        attributes: [
          {
            attributeID: 100000729,
            attributeName: '加工定制',
            valueID: null,
            value: '是',
            isCustom: false
          },
          {
            attributeID: 287,
            attributeName: '材质',
            valueID: null,
            value: '半金属',
            isCustom: false
          },
          {
            attributeID: 2553,
            attributeName: '适用车型',
            valueID: null,
            value: '奔驰  W164 X164  W251 ML320 ML350 GL450 R300 R350 R5',
            isCustom: false
          },
          {
            attributeID: 2176,
            attributeName: '品牌',
            valueID: null,
            value: 'MDTZ',
            isCustom: false
          },
          {
            attributeID: 346,
            attributeName: '产地',
            valueID: null,
            value: '中国',
            isCustom: false
          },
          {
            attributeID: 9573,
            attributeName: '配件编号',
            valueID: null,
            value: '004 420 5220',
            isCustom: false
          },
          {
            attributeID: 1398,
            attributeName: '货号',
            valueID: null,
            value: 'D1122',
            isCustom: false
          },
          {
            attributeID: 151466146,
            attributeName: '适用汽车品牌',
            valueID: null,
            value: '奔驰',
            isCustom: false
          },
          {
            attributeID: 182318189,
            attributeName: '主要下游平台',
            valueID: null,
            value: 'ebay',
            isCustom: false
          },
          {
            attributeID: 182318189,
            attributeName: '主要下游平台',
            valueID: null,
            value: '亚马逊',
            isCustom: false
          },
          {
            attributeID: 182318189,
            attributeName: '主要下游平台',
            valueID: null,
            value: 'wish',
            isCustom: false
          },
          {
            attributeID: 182318189,
            attributeName: '主要下游平台',
            valueID: null,
            value: '速卖通',
            isCustom: false
          },
          {
            attributeID: 182318189,
            attributeName: '主要下游平台',
            valueID: null,
            value: '独立站',
            isCustom: false
          },
          {
            attributeID: 182318189,
            attributeName: '主要下游平台',
            valueID: null,
            value: 'LAZADA',
            isCustom: false
          },
          {
            attributeID: 193290002,
            attributeName: '主要销售地区',
            valueID: null,
            value: '非洲',
            isCustom: false
          },
          {
            attributeID: 193290002,
            attributeName: '主要销售地区',
            valueID: null,
            value: '欧洲',
            isCustom: false
          },
          {
            attributeID: 193290002,
            attributeName: '主要销售地区',
            valueID: null,
            value: '南美',
            isCustom: false
          },
          {
            attributeID: 193290002,
            attributeName: '主要销售地区',
            valueID: null,
            value: '东南亚',
            isCustom: false
          },
          {
            attributeID: 193290002,
            attributeName: '主要销售地区',
            valueID: null,
            value: '北美',
            isCustom: false
          },
          {
            attributeID: 193290002,
            attributeName: '主要销售地区',
            valueID: null,
            value: '东北亚',
            isCustom: false
          },
          {
            attributeID: 193290002,
            attributeName: '主要销售地区',
            valueID: null,
            value: '中东',
            isCustom: false
          },
          {
            attributeID: 193290003,
            attributeName: '有可授权的自有品牌',
            valueID: null,
            value: '是',
            isCustom: false
          },
          {
            attributeID: 182282223,
            attributeName: '是否跨境出口专供货源',
            valueID: null,
            value: '是',
            isCustom: false
          },
          {
            attributeID: 3567,
            attributeName: '种类',
            valueID: null,
            value: '刹车片',
            isCustom: false
          }
        ],
        groupID: [152550850],
        status: 'published',
        subject: '后刹车片 0044205220适用于奔驰  W164 X164  W251  GL450 R300',
        description:
          '<div id="offer-template-0"></div><div> </div>\r\n<div> </div>\r\n<p>后刹车片   国际号：D1122  OE号 004 420 5220   车型：奔驰  W164 X164  W251 ML320 ML350 GL450 R300 R350 R500尺寸：长15CM 宽10CM 高7CM  重1.2KG </p>\r\n<p>有相关产品需求 产品信息确认的 直接旺旺联系<br/>阿里旺旺 12小时在线<br/>高服务 高质量 高诚信<br/>本店可定制陶瓷刹车片<br/>详细产品信息请在线咨询或来电厂家直接供应。</p>\r\n<p><img src="https://cbu01.alicdn.com/img/ibank/O1CN017nv22D1Uhwd2347MF_!!2210530712550-0-cib.jpg" alt="WechatIMG849" width="790" height="790"/></p>\r\n<p><br/><img src="https://cbu01.alicdn.com/img/ibank/O1CN01iHEPtI1Uhwd5jqkuf_!!2210530712550-0-cib.jpg" alt="WechatIMG850" width="790" height="790"/><br/><br/><img src="https://cbu01.alicdn.com/img/ibank/O1CN018F0znc1Uhwd8HnBuP_!!2210530712550-0-cib.jpg" alt="WechatIMG852" width="790" height="790"/><br/><br/><img src="https://cbu01.alicdn.com/img/ibank/O1CN019g6nnp1UhwdCUlk4o_!!2210530712550-0-cib.jpg" alt="WechatIMG853" width="790" height="790"/><br/><br/><img src="https://cbu01.alicdn.com/img/ibank/O1CN01LEkbrs1Uhwd3MOiiB_!!2210530712550-0-cib.jpg" alt="WechatIMG854" width="790" height="790"/><br/><br/></p>',
        language: 'CHINESE',
        periodOfValidity: 3650,
        bizType: 1,
        pictureAuth: false,
        image: {
          images: [
            'img/ibank/O1CN017nv22D1Uhwd2347MF_!!2210530712550-0-cib.jpg',
            'img/ibank/O1CN01iHEPtI1Uhwd5jqkuf_!!2210530712550-0-cib.jpg',
            'img/ibank/O1CN018F0znc1Uhwd8HnBuP_!!2210530712550-0-cib.jpg',
            'img/ibank/O1CN019g6nnp1UhwdCUlk4o_!!2210530712550-0-cib.jpg',
            'img/ibank/O1CN01LEkbrs1Uhwd3MOiiB_!!2210530712550-0-cib.jpg'
          ]
        },
        skuInfos: null,
        saleInfo: {
          supportOnlineTrade: true,
          mixWholeSale: true,
          saleType: 'normal',
          priceAuth: false,
          priceRanges: [
            {
              startQuantity: 2,
              price: 122.0
            },
            {
              startQuantity: 500,
              price: 40.0
            }
          ],
          amountOnSale: 1995.0,
          unit: '套',
          minOrderQuantity: 2,
          batchNumber: null,
          retailprice: null,
          tax: null,
          sellunit: null,
          quoteType: 0,
          consignPrice: 122.0,
          deliveryLimit: null,
          invReduceType: 1
        },
        shippingInfo: {
          unitWeight: 1.2,
          volume: null,
          handlingTime: null,
          freightTemplateID: 14729534,
          suttleWeight: null,
          sendGoodsAddressText: '广东省 广州市',
          width: null,
          height: null,
          length: null,
          packageSize: null,
          sendGoodsAddressId: 32583873,
          offerSuttleWeight: null,
          offerWidth: null,
          offerHeight: null,
          offerLength: null,
          freightTemplate: null,
          channelPriceFreePostage: null,
          channelPriceExcludeAreaCodes: null
        },
        qualityLevel: 6,
        categoryName: '刹车片',
        mainVedio:
          'https://cloud.video.taobao.com/play/u/2210530712550/p/1/e/6/t/1/299711608358.mp4',
        productCargoNumber: 'D1122',
        referencePrice: '40.0~122.0'
      }
    }
  }
}
</script>
