import request from '@/utils/request'
import { host, auto_part_port } from './index'
const api_pre = 'http://' + host + ':' + auto_part_port
export function api_alibaba_access(params) {
  return request({
    url: api_pre + '/1688/access',
    method: 'get',
    params
  })
}

export function api_alibaba_auth() {
  return request({
    url: api_pre + '/1688/auth',
    method: 'get'
  })
}
