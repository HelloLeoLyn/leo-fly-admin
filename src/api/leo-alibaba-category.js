import request from '@/utils/request'
import { host, auto_part_port } from './index'
const api_pre = 'http://' + host + ':' + auto_part_port
export function api_alibaba_category_search(keyWord) {
  return request({
    url: api_pre + '/category/1688/search?keyWord=' + keyWord,
    method: 'get'
  })
}
export function api_alibaba_category_get(id) {
  return request({
    url: api_pre + '/category/1688/' + id,
    method: 'get'
  })
}
export function api_alibaba_category_attribute_post(data) {
  return request({
    url: api_pre + '/category/1688/attribute',
    method: 'post',
    data
  })
}

