export function isIndexKey(source, target) {
  return source.indexOf(target) >= 0
}
export const imageValidator = (rule, value, callback, images) => {
  if (!images || images.length < 1) {
    return callback(new Error(rule.message))
  }
  callback()
}
export function getShippingInfo(data) {
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
export function generateAlibabaObj(base) {
  let obj = {
    albumID: '335902400',
    webSite: '1688',
    language: 'CHINESE',
    productType: 'productType',
    localProductId: base.productId
  }
  return obj.Object.assign(base)
}