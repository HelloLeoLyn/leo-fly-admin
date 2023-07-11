import request from '@/utils/request'
import { service } from '@/api/index'
export function api_collection_post(data) {
  return request({
    url: service + '/collection',
    method: 'post',
    data
  })
}

export function api_collection_put(data) {
  return request({
    url: service + '/collection',
    method: 'put',
    data
  })
}

export function api_collection_delete(id) {
  return request({
    url: service + '/collection/' + id,
    method: 'delete'
  })
}

export function api_collection_get(id) {
  return request({
    url: service + '/collection/' + id,
    method: 'get'
  })
}

export function api_collection_page(data) {
  return request({
    url: service + '/collection/page',
    method: 'post',
    data
  })
}

