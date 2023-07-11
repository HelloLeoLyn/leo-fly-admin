import request from '@/utils/request'
import { service } from '@/api/index'
export function api_tag_post(data) {
  return request({
    url: service + '/tag',
    method: 'post',
    data
  })
}

export function api_tag_put(data) {
  return request({
    url: service + '/tag',
    method: 'put',
    data
  })
}

export function api_tag_delete(id) {
  return request({
    url: service + '/tag/' + id,
    method: 'delete'
  })
}

export function api_tag_get(id) {
  return request({
    url: service + '/tag/' + id,
    method: 'get'
  })
}

export function api_tag_page(data) {
  return request({
    url: service+'/tag/page',
    method: 'post',
    data
  })
}

