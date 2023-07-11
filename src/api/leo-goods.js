import request from '@/utils/request'
import { service } from '@/api/index'
export function api_goods_post(data) {
  return request({
    url: service + '/goods',
    method: 'post',
    data
  })
}

export function api_goods_put(data) {
  return request({
    url: service + '/goods',
    method: 'put',
    data
  })
}

export function api_goods_delete(id) {
  return request({
    url: service + '/goods/' + id,
    method: 'delete'
  })
}

export function api_goods_get(id) {
  return request({
    url: service + '/goods/' + id,
    method: 'get'
  })
}

export function api_goods_page(data) {
  return request({
    url: service+'/goods/page',
    method: 'post',
    data
  })
}

export function api_goods_templates(data) {
  return request({
    url: service+'/goods/templates',
    method: 'post',
    data
  })
}