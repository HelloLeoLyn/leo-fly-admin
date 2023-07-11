import request from '@/utils/request'
import { service } from '@/api/index'
export function api_spider_alibaba_items(data) {
  return request({
    url: service + '/spider/alibaba/items',
    method: 'post',
    data
  })
}
export function api_spider_alibaba_image_items(data) {
  return request({
    url: service + '/spider/alibaba/image/items',
    method: 'post',
    data
  })
}

export function api_spider_ebay(data) {
  return request({
    url: service + '/spider/ebay',
    method: 'post',
    data
  })
}
export function api_spider_alibaba(data) {
  return request({
    url: service + '/spider/alibaba',
    method: 'post',
    data
  })
}
export function api_spider_yipei(data) {
  return request({
    url: service + '/spider/yipei',
    method: 'post',
    data
  })
}
export function api_spider_yipei_items(data) {
  return request({
    url: service + '/spider/yipei/items',
    method: 'post',
    data
  })
}
export function api_spider_image(data) {
  return request({
    url: service + '/spider/image',
    method: 'post',
    data
  })
}

export function api_spider_batch(data) {
  return request({
    url: service + '/spider/batch',
    method: 'post',
    data
  })
}


export function api_product_bing_img(params) {
  return request({
    url: service + '/spider/bing/jsoup',
    method: 'get',
    params
  })
}

export function api_spider_url_img(images, productId) {
  return request({
    url: service + '/spider/url/images/' + productId,
    method: 'post',
    data: images
  })
}
