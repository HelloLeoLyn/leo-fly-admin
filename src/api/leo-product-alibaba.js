import request from '@/utils/request'
import { host, auto_part_port } from './index'
const api_pre = 'http://' + host + ':' + auto_part_port
export function api_product_alibaba_add(data) {
  return request({
    url: api_pre + '/product/alibaba/add',
    method: 'post',
    data
  })
}
export function api_product_alibaba_get(id) {
  return request({
    url: api_pre + '/product/alibaba/' + id,
    method: 'get',
  })
}
export function api_product_alibaba_batch(data) {
  return request({
    url: api_pre + '/product/alibaba/batch',
    method: 'post',
    data
  })
}
export function api_productAlibaba_importFrom1688() {
  return request({
    url: api_pre + '/productAlibaba/importFrom1688',
    method: 'post'
  })
}
export function api_productAlibaba_referLocal(data) {
  return request({
    url: api_pre + '/productAlibaba/referLocal',
    method: 'post',
    data
  })
}
export function api_product_alibaba_delete(id) {
  return request({
    url: api_pre + '/product/alibaba/remove/' + id,
    method: 'delete',
  })
}
export function api_productAlibaba_repost(data) {
  return request({
    url: api_pre + '/productAlibaba/1/',
    method: 'put',
    data
  })
}
export function api_product_alibaba_save(data) {
  return request({
    url: api_pre + '/product/alibaba/save',
    method: 'post',
    data
  })
}
export function api_productAlibaba_edit(data) {
  return request({
    url: api_pre + '/productAlibaba',
    method: 'put',
    data
  })
}
export function api_product_alibaba_page(data) {
  return request({
    url: api_pre + '/product/alibaba/page',
    method: 'post',
    data
  })
}
export function api_product_alibaba_List(data) {
  return request({
    url: api_pre + '/product/alibaba/list',
    method: 'post',
    data
  })
}

export function api_product_alibaba_attributes(data) {
  return request({
    url: api_pre + '/product/alibaba/attributes',
    method: 'post',
    data
  })
}

export function api_product_alibaba_attributes_productId(productId) {
  return request({
    url: api_pre + '/product/alibaba/attributes/productId/' + productId,
    method: 'get'
  })
}

export function api_product_alibaba_attributes_parentId(parentId) {
  return request({
    url: api_pre + '/product/alibaba/attributes/parentId/' + parentId,
    method: 'get'
  })
}
