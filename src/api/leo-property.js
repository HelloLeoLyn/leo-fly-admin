import request from '@/utils/request'
import { service } from '@/api/index'
export function api_property_post(data) {
  return request({
    url: service + '/property',
    method: 'post',
    data
  })
}

export function api_property_save(data) {
  return request({
    url: service + '/property/save',
    method: 'post',
    data
  })
}

export function api_property_put(data) {
  return request({
    url: service + '/property',
    method: 'put',
    data
  })
}

export function api_property_delete(id) {
  return request({
    url: service + '/property/' + id,
    method: 'delete'
  })
}

export function api_property_get(id) {
  return request({
    url: service + '/property/' + id,
    method: 'get'
  })
}
export function api_property_class_get(className) {
  return request({
    url: service + '/property/classz?className=' + className,
    method: 'get',
  })
}
export function api_property_page(data) {
  return request({
    url: service + '/property/page',
    method: 'post',
    data
  })
}

