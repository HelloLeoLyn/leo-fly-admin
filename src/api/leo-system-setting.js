import request from '@/utils/request'
import { service } from '@/api/index'
export function api_system_setting_post(data) {
  return request({
    url: service + '/system/setting',
    method: 'post',
    data
  })
}


export function api_system_setting_put(data) {
  return request({
    url: service + '/system/setting',
    method: 'put',
    data
  })
}


export function api_system_setting_delete(id) {
  return request({
    url: service + '/system/setting/' + id,
    method: 'delete'
  })
}
export function api_system_setting_get(id) {
  return request({
    url: service + '/system/setting/' + id,
    method: 'get'
  })
}

export function api_system_setting_page(data) {
  return request({
    url: service + '/system/setting/page',
    method: 'post',
    data
  })
}
