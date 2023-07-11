import request from '@/utils/request'
import { service } from '@/api/index'
export function createFile(data) {
  return request({
    url: service + '/file/create',
    method: 'post',
    data
  })
}
export function exists(data) {
  return request({
    url: service + '/file/exists',
    method: 'post',
    data
  })
}
export function get(data) {
  return request({
    url: service + '/file/get',
    method: 'get',
    params: data
  })
}
export function generate(data) {
  return request({
    url: service + '/file/generate',
    method: 'post',
    data
  })
}
