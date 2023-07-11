import request from '@/utils/request'
import { host, auto_part_port } from './index'
const api_pre = 'http://' + host + ':' + auto_part_port
export function api_table_info(data) {
  return request({
    url: api_pre + '/table/info',
    method: 'post',
    data
  })
}

export function api_table_list(data) {
  return request({
    url: api_pre + '/table/list',
    method: 'post',
    data
  })
}