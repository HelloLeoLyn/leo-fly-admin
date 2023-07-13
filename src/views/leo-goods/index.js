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
  const {
    categoryID,
    groupID,
    subject,
    attributes,
    image,
    saleInfo,
    shippingInfo,
    description
  } = base
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
export function generateGoods (webSite, json) {
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
export function generateAliexpressObj (form) {
  const {
    subject,
    images,
    unit,
    unitWeight,
    packingLength,
    packingWidth,
    packingHeight,
    price
  } = form
  const obj = {
    subject,
    images,
    unit,
    unitWeight,
    packingLength,
    packingWidth,
    packingHeight,
    price,
    saleType: '按最小计量单位出售',
    brand: 'MDTZ',
    placeOfOrigin: null,
    listing: null,
    handlingTime: '7',
    freightTemplateID: 'yunfei (Location: CN)',
    serviceID: '新手服务模板',
    // placeOfDelivery: null,
    stock: 99
  }
  return obj
}

export function generateAmazonObj (form) {
  const obj = {
    feed_product_type: 'vehiclebrakepad',
    item_sku: null,
    brand_name: '24MDTZ',
    external_product_id: null,
    external_product_id_type: null,
    item_name: null,
    manufacturer: null,
    part_number: null,
    item_type: null,
    fit_type: null,
    condition_type: null,
    number_of_items: null,
    main_image_url: null
  }
  return obj
}
