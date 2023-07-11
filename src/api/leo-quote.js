import request from '@/utils/request'
import { service } from '@/api/index'
export function api_quote_post(data) {
  return request({
    url: service + '/quote',
    method: 'post',
    data
  })
}


export function api_quote_put(data) {
  return request({
    url: service + '/quote',
    method: 'put',
    data
  })
}


export function api_quote_delete(id) {
  return request({
    url: service + '/quote/' + id,
    method: 'delete'
  })
}


export function api_quote_get(id) {
  return request({
    url: service + '/quote/' + id,
    method: 'get'
  })
}

export function api_quote_page(data) {
  return request({
    url: service + '/quote/page',
    method: 'post',
    data
  })
}

export function api_quote_seq_get() {
  return request({
    url: service + '/quote/seq',
    method: 'get'
  })
}

export function api_quote_product_sync(params) {
  return request({
    url: service + '/quote/product/sync',
    method: 'put',
    params
  })
}

export function api_quote_group_post(data) {
  return request({
    url: service + '/quote/group',
    method: 'post',
    data
  })
}
