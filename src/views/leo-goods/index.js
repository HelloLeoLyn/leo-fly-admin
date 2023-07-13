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
  const { categoryID, groupID, subject, attributes, image, saleInfo, shippingInfo, description } = base
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
    attributes,
    image,
    saleInfo,
    shippingInfo,
    description
  }
  const keys = Object.keys(obj)
  keys.forEach(key => {
    if (!base[key]) {
      console.log(key)
    }
  })
  return obj
}
export function generateGoods(webSite, json) {
  const goods = {
    id: null,
    product_id: json.productId,
    platform: webSite,
    subject: json.subject,
    images: json.image.images,
    main_image: null,
    tag: null,
    third_part_id: null,
    json
  }
  return goods
}