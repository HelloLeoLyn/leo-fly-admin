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

function generateAlibabaObj(form) {
  const {
    categoryID,
    groupID,
    subject,
    attributes,
    image,
    saleInfo,
    shippingInfo,
    description
  } = form.alibaba
  let obj = {
    albumID: '335902400',
    webSite: '1688',
    language: 'CHINESE',
    productType: 'wholesale',
    periodOfValidity: 365,
    bizType: 1,
    pictureAuth: false,
    localProductId: form.productId,
    productID: form.productId,
    categoryID,
    groupID,
    subject,
    attributes,
    image,
    saleInfo,
    shippingInfo,
    description,
    code: form.code,
    models: form.models
  }
  return obj
}
export function generateGoods(webSite, form) {
  let json
  if (webSite == '1688') {
    json = generateAlibabaObj(form)
  } else if (webSite == 'aliexpress') {
    json = generateAliexpressObj(form)
  } else {
    json = generateAmazonObj(form)
  }
  const goods = {
    id: null,
    productId: form.productId,
    platform: webSite,
    subject: json.subject,
    images: form.images
      .filter(img => img.checked)
      .map(img => {
        const { url, id } = img
        return {
          url,
          id
        }
      }),
    mainImage: null,
    tag: null,
    thirdPartId: null,
    json
  }
  return goods
}
function generateAliexpressObj(form) {
  const {
    subject,
    images,
    unit,
    unitWeight,
    packingLength,
    packingWidth,
    packingHeight,
    price
  } = form.aliexpress
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

function generateAmazonObj() {
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


