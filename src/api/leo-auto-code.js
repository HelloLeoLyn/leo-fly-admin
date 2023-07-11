import request from '@/utils/request'
import { service } from './index'
export function api_auto_code_generate(data) {
  return request({
    url: service + '/auto/code/generate',
    method: 'post',
    data
  })
}
export function api_auto_code_template(params) {
  return request({
    url: service + '/auto/code/template',
    method: 'get',
    params
  })
}
