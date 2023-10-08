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
    url: api_pre + '/product/new/alibaba/schema',
    method: 'post',
    data
  })
}
export function api_alibaba_product_add(data) {
  return request({
    url: api_pre + '/product/new/alibaba/add',
    method: 'post',
    data
  })
}
export const apiOptions = {
  getSchema: {
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
  },
  add: {
    oceanApiId: {
      namespace: 'com.alibaba.product',
      name: 'alibaba.new.product.add',
      version: 1
    },
    desc: '新版商品发布',
    catId: '1032176',
    scene: 'cbu',
    offerId: '',
    bizParam: null,
  }
}

