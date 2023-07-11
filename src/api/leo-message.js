import request from '@/utils/request'
import { service } from '@/api/index'
export function api_message_post(data) {
  return request({
    url: service + '/message',
    method: 'post',
    data
  })
}

export function api_message_put(data) {
  return request({
    url: service + '/message',
    method: 'put',
    data
  })
}

export function api_message_delete(id) {
  return request({
    url: service + '/message/' + id,
    method: 'delete'
  })
}
export function api_message_get(id) {
  return request({
    url: service + '/message/' + id,
    method: 'get'
  })
}

export function api_message_page(data) {
  return request({
    url: service + '/message/page',
    method: 'post',
    data
  })
}
