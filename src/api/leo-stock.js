import request from '@/utils/request'
import { service } from '@/api/index'
export function api_stock_post(data) {
  return request({
    url: service + '/stock',
    method: 'post',
    data
  })
}

export function api_stock_put(data) {
  return request({
    url: service + '/stock',
    method: 'put',
    data
  })
}

export function api_stock_delete(id) {
  return request({
    url: service + '/stock/' + id,
    method: 'delete'
  })
}

export function api_stock_get(id) {
  return request({
    url: service + '/stock/' + id,
    method: 'get'
  })
}

export function api_stock_page(data) {
  return request({
    url: service + '/stock/page',
    method: 'post',
    data
  })
}

