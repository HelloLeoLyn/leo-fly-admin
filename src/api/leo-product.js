import request from '@/utils/request'
import { host, auto_part_port } from './index'
const api_pre = 'http://' + host + ':' + auto_part_port
export function product_page_api(data) {
  return request({
    url: api_pre + '/product/page',
    method: 'post',
    data
  })
}
export function product_save(data) {
  return request({
    url: api_pre + '/product',
    method: 'post',
    data
  })
}
export function api_product_save_more(data) {
  return request({
    url: api_pre + '/product/more',
    method: 'post',
    data
  })
}
export function product_list_api(data) {
  return request({
    url: api_pre + '/product/list',
    method: 'post',
    data
  })
}

export function product_update_api(data) {
  return request({
    url: api_pre + '/product',
    method: 'put',
    data
  })
}
export function product_update_batch_api(data) {
  return request({
    url: api_pre + '/product/batch',
    method: 'put',
    data
  })
}
export function product_update_api_all(data) {
  return request({
    url: api_pre + '/product/all',
    method: 'put',
    data
  })
}

export function product_update_all_api(data) {
  return request({
    url: api_pre + '/product/all',
    method: 'put',
    data
  })
}

export function product_update_status_api(params) {
  return request({
    url: api_pre + '/product/status',
    method: 'put',
    params
  })
}

export function product_delete_api(id) {
  return request({
    url: api_pre + '/product/' + id,
    method: 'delete'
  })
}


export function product_valid_api(data) {
  return request({
    url: api_pre + '/product/valid',
    method: 'put',
    data
  })
}

export function api_get_product(id) {
  return request({
    url: api_pre + `/product/${id}`,
    method: 'get'
  })
}

export function api_get_product_more(id) {
  return request({
    url: api_pre + `/product/more/${id}`,
    method: 'get'
  })
}


export function api_product_attributes_get(code) {
  return request({
    url: api_pre + `/product/attributes/value/${code}`,
    method: 'get'
  })
}
export function api_product_merge(data) {
  return request({
    url: api_pre + '/product/merge',
    method: 'put',
    data
  })
}
export function api_product_merge_pre() {
  return request({
    url: api_pre + '/product/merge/pre',
    method: 'get'
  })
}

export function api_product_json_get(id) {
  return request({
    url: api_pre + '/product/json/' + id,
    method: 'get'
  })
}


export function api_product_json_post(data) {
  return request({
    url: api_pre + '/product/json/',
    method: 'post',
    data
  })
}
export function api_product_collector(data) {
  return request({
    url: api_pre + '/product/collector',
    method: 'post',
    data
  })
}

export function api_product_image_main(data) {
  return request({
    url: api_pre + '/product/image/main',
    method: 'put',
    data
  })
}
export function api_product_reset(data) {
  return request({
    url: api_pre + '/product/reset',
    method: 'delete',
    data
  })
}

export function api_product_image_collector(data) {
  return request({
    url: api_pre + '/product/image/collector',
    method: 'put',
    data
  })
}

export function api_product_image_delete(data) {
  return request({
    url: api_pre + '/product/image',
    method: 'delete',
    data
  })
}

export function api_product_attributes(data) {
  return request({
    url: api_pre + '/product/attributes',
    method: 'put',
    data
  })
}
