export function isIndexKey (source, target) {
  return source.indexOf(target) >= 0
}
export const imageValidator = (rule, value, callback, images) => {
  if (!images || images.length < 1) {
    return callback(new Error(rule.message))
  }
  callback()
}
export function getShippingInfo (data) {
  let params = {
    freightTemplateID: 14729534,
    unitWeight: data.unitWeight, // product.weight
    packageSize: data.unitWeight, // product.packageSize
    sendGoodsAddressId: 32583873,
    sendGoodsAddressText: '广东省 广州市',
    offerSuttleWeight: null,
    offerLength: null,
    offerWidth: null,
    offerHeight: null
  }
  return params
}
export function generateAlibabaObj (base) {
  const { categoryID, groupID, subject, } = base
  let obj = {
    albumID: '335902400',
    webSite: '1688',
    language: 'CHINESE',
    productType: 'wholesale',
    periodOfValidity: 365,
    bizType: 1,
    pictureAuth: false,
    localProductId: base.productId,
    productID: base.productId,
    categoryID,
    groupID,
    subject,
    attributes: [
      {
        attributeID: 287,
        valueID: null,
        isCustom: false,
        attributeName: '材质',
        value: '半金属'
      },
      {
        attributeID: 2553,
        valueID: null,
        isCustom: false,
        attributeName: '适用车型',
        value: 'BMW 3 (G20, G80, G28) 316 d'
      },
      {
        attributeID: 3567,
        valueID: null,
        isCustom: false,
        attributeName: '种类',
        value: '刹车片'
      },
      {
        attributeID: 100000729,
        valueID: null,
        isCustom: false,
        attributeName: '加工定制',
        value: '否'
      },
      {
        attributeID: 346,
        valueID: null,
        isCustom: false,
        attributeName: '产地',
        value: '中国'
      },
      {
        attributeID: 361,
        valueID: null,
        isCustom: false,
        attributeName: '产品规格',
        value: '标准'
      },
      {
        attributeID: 404,
        valueID: null,
        isCustom: false,
        attributeName: '颜色',
        value: ''
      },
      {
        attributeID: 1150,
        valueID: null,
        isCustom: false,
        attributeName: '供货总量',
        value: '2000'
      },
      {
        attributeID: 1398,
        valueID: null,
        isCustom: false,
        attributeName: '货号',
        value: '34116889585 34116888460 34106888459 34106883510'
      },
      {
        attributeID: 1459,
        valueID: null,
        isCustom: false,
        attributeName: '计量单位',
        value: '套'
      },
      {
        attributeID: 2176,
        valueID: null,
        isCustom: false,
        attributeName: '品牌',
        value: 'MDTZ'
      },
      {
        attributeID: 3151,
        valueID: null,
        isCustom: false,
        attributeName: '型号',
        value: '34116889585 34116888460 34106888459 34106883510'
      },
      {
        attributeID: 3939,
        valueID: null,
        isCustom: false,
        attributeName: '最小起订量',
        value: '5'
      },
      {
        attributeID: 4341,
        valueID: null,
        isCustom: false,
        attributeName: '价格区间',
        value: ''
      },
      {
        attributeID: 6720,
        valueID: null,
        isCustom: false,
        attributeName: '衬片硬度',
        value: ''
      },
      {
        attributeID: 9573,
        valueID: null,
        isCustom: false,
        attributeName: '配件编号',
        value: '34106888459 34106883510 34116874431 34116874432'
      },
      {
        attributeID: 100019033,
        valueID: null,
        isCustom: false,
        attributeName: '供货方式',
        value: '仅现货'
      },
      {
        attributeID: 101428437,
        valueID: null,
        isCustom: false,
        attributeName: '单品货号',
        value: ''
      },
      {
        attributeID: 102415932,
        valueID: null,
        isCustom: false,
        attributeName: '统一单位换算',
        value: ''
      },
      {
        attributeID: 125790829,
        valueID: null,
        isCustom: false,
        attributeName: '3C证书编号',
        value: ''
      },
      {
        attributeID: 151466146,
        valueID: null,
        isCustom: false,
        attributeName: '适用汽车品牌',
        value: '宝马 宝马'
      },
      {
        attributeID: 157878556,
        valueID: null,
        isCustom: false,
        attributeName: '适用车型年份',
        value: ''
      },
      {
        attributeID: 180024170,
        valueID: null,
        isCustom: false,
        attributeName: '适用车型变速箱类型',
        value: ''
      },
      {
        attributeID: 182282223,
        valueID: null,
        isCustom: false,
        attributeName: '是否跨境出口专供货源',
        value: '是'
      },
      {
        attributeID: 182318189,
        valueID: null,
        isCustom: false,
        attributeName: '主要下游平台',
        value: '速卖通 亚马逊 wish ebay LAZADA 独立站 其他'
      },
      {
        attributeID: 193290002,
        valueID: null,
        isCustom: false,
        attributeName: '主要销售地区',
        value: '欧洲 北美 南美 东南亚 东北亚 中东 非洲 其他'
      },
      {
        attributeID: 193290003,
        valueID: null,
        isCustom: false,
        attributeName: '有可授权的自有品牌',
        value: '否'
      }
    ],
    image: {
      images: [
        'https://cbu01.alicdn.com/img/ibank/O1CN01P9yBI01UhwovWkLYG_!!2210530712550-0-cib.jpg',
        'https://cbu01.alicdn.com/img/ibank/O1CN01tyQEBf1UhworqAf2D_!!2210530712550-0-cib.jpg',
        'https://cbu01.alicdn.com/img/ibank/O1CN01u1UNAh1UhwowzY6rX_!!2210530712550-0-cib.jpg'
      ],
      isWatermark: null,
      isWatermarkFrame: null,
      watermarkPosition: '',
      idList: ['40766', '40768', '40769']
    },
    saleInfo: {
      supportOnlineTrade: true,
      mixWholeSale: false,
      saleType: 'normal',
      priceAuth: false,
      priceRanges: [
        {
          startQuantity: 5,
          price: 145.0
        }
      ],
      amountOnSale: 2000.0,
      unit: '套',
      minOrderQuantity: 5,
      batchNumber: null,
      retailprice: null,
      tax: '',
      sellunit: '',
      quoteType: null,
      consignPrice: null
    },
    shippingInfo: {
      freightTemplateID: 14729534,
      unitWeight: null,
      packageSize: '',
      volume: null,
      handlingTime: 5,
      sendGoodsAddressId: 32583873,
      sendGoodsAddressText: '广东省 广州市'
    },
    description:
      '<div style="width: 790.0px;">\n  <img src="https://cbu01.alicdn.com/img/ibank/O1CN01lWgKbO1Uhwoo8VFNK_!!2210530712550-0-cib.jpg?__r__=1687242151475"\n    alt="" width="790" />\n<img src="https://cbu01.alicdn.com/img/ibank/O1CN01zcnudb1UhwoxmzCO6_!!2210530712550-0-cib.jpg" alt="" width="790" />\n<img src="https://cbu01.alicdn.com/img/ibank/O1CN01tyQEBf1UhworqAf2D_!!2210530712550-0-cib.jpg" alt="" width="790" />\n<img src="https://cbu01.alicdn.com/img/ibank/O1CN01u1UNAh1UhwowzY6rX_!!2210530712550-0-cib.jpg" alt="" width="790" />\n  <img src="https://cbu01.alicdn.com/img/ibank/O1CN01YJx6ZQ1UhwooAiL5R_!!2210530712550-0-cib.jpg?__r__=1687242151475"\n    alt="" width="790" />\n  <img src="https://cbu01.alicdn.com/img/ibank/O1CN01dXWOIU1UhwopkOD5i_!!2210530712550-0-cib.jpg?__r__=1687242151475"\n    alt="" width="790" />\n  <img src="https://cbu01.alicdn.com/img/ibank/O1CN01txkFmc1UhwolQrtxf_!!2210530712550-0-cib.jpg?__r__=1687242151475"\n    alt="" width="790" />\n  <img src="https://cbu01.alicdn.com/img/ibank/O1CN01Hj9YUA1UhwooAiGwu_!!2210530712550-0-cib.jpg?__r__=1687242151475"\n    alt="" width="790" />\n  <img src="https://cbu01.alicdn.com/img/ibank/O1CN01DuqqSt1UhwolQtF7l_!!2210530712550-0-cib.jpg?__r__=1687242151475"\n    alt="" width="790" />\n  <img src="https://cbu01.alicdn.com/img/ibank/O1CN01TXwNmy1Uhwos1BVLP_!!2210530712550-0-cib.jpg?__r__=1687242151475"\n    alt="" width="790" />\n  <img src="https://cbu01.alicdn.com/img/ibank/O1CN01o4GHyI1UhwooAhbNb_!!2210530712550-0-cib.jpg?__r__=1687242151475"\n    alt="" width="790" />\n  <img src="https://cbu01.alicdn.com/img/ibank/O1CN0122gdbE1Uhwom77tBM_!!2210530712550-0-cib.jpg?__r__=1687242151475"\n    alt="" width="790" />\n</div>'
  }
  const keys = Object.keys(obj)
  keys.forEach(key => {
    if (!base[key]) {
      console.log(key)
    }
  })
  return obj
}
