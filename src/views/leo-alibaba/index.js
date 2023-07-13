export function image1688(images) {
  const image = {
    isWatermark: false,
    isWatermarkFrame: false,
    watermarkPosition: false,
    images
  }
  return image
}

export function saleInfo1688(unit, priceRanges) {
  let info = {
    priceAuth: false,
    supportOnlineTrade: true,
    mixWholeSale: false,
    saleType: 'normal',
    priceRanges,
    unit,
    amountOnSale: 2000,
    minOrderQuantity: 5,
    batchNumber: null,
    retailprice: null,
    tax: null,
    sellunit: null,
    quoteType: null, // 普通报价-FIXED_PRICE("0"),SKU规格报价-SKU_PRICE("1"),SKU区间报价（商品维度）-SKU_PRICE_RANGE_FOR_OFFER("2"),SKU区间报价（SKU维度）-SKU_PRICE_RANGE("3")，国际站无需关注
    consignPrice: null, // 分销基准价。代销场景均使用该价格。有SKU商品查看skuInfo中的consignPrice
    deliveryLimit: 5, // 发货时间限制（非买保发货周期），按天计算
    invReduceType: 2 // 库存扣减方式，1是下单减库存，2是付款减库存
  }
  return info
}
export function shippingInfo1688(unitWeight, packageSize) {
  let info = {
    freightTemplateID: 14729534,
    unitWeight, // product.weight
    packageSize, // product.packageSize
    volume: null, // 国际站
    handlingTime: 5, // 国际站 5
    sendGoodsAddressId: 32583873,
    sendGoodsAddressText: '广东省 广州市',
    offerSuttleWeight: null,
    offerLength: null,
    offerWidth: null,
    offerHeight: null
  }
  return info
}
