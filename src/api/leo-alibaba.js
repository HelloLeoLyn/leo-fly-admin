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

export function api_alibaba_product_schema(data) {
  return request({
    url: api_pre + '/product/alibaba/schema',
    method: 'post',
    data
  })
}
export const apiOptions = [{
  oceanApiId: {
    namespace: 'com.alibaba.product',
    name: 'alibaba.new.product.getSchema',
    version: 1
  },
  desc: '获取商品发布规则和详情',
  catId: '1032176',
  scene: 'cbu',
  offerId: '',
  bizParam: null
}]

