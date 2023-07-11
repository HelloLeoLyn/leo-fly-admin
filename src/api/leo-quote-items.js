import request from '@/utils/request'
import { service } from '@/api/index'
export function api_quote_items_post(data) {
  return request({
    url: service + '/quote/items',
    method: 'post',
    data
  })
}
export function api_quote_items_batch_post(data) {
  return request({
    url: service + '/quote/items/batch',
    method: 'post',
    data
  })
}

export function api_quote_items_put(data) {
  return request({
    url: service + '/quote/items',
    method: 'put',
    data
  })
}

export function api_quote_items_delete(id) {
  return request({
    url: service + '/quote/items/' + id,
    method: 'delete'
  })
}

export function api_quote_items_get(id) {
  return request({
    url: service + '/quote/items/' + id,
    method: 'get'
  })
}

export function api_quote_items_page(data) {
  return request({
    url: service + '/quote/items/page',
    method: 'post',
    data
  })
}
