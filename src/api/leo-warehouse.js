import request from '@/utils/request'
import { service } from '@/api/index'
export function api_warehouse_post(data) {
  return request({
    url: service + '/warehouse',
    method: 'post',
    data
  })
}

export function api_warehouse_put(data) {
  return request({
    url: service + '/warehouse',
    method: 'put',
    data
  })
}

export function api_warehouse_delete(id) {
  return request({
    url: service + '/warehouse/' + id,
    method: 'delete'
  })
}

export function api_warehouse_get(id) {
  return request({
    url: service + '/warehouse/' + id,
    method: 'get'
  })
}

export function api_warehouse_page(data) {
  return request({
    url: service + '/warehouse/page',
    method: 'post',
    data
  })
}

