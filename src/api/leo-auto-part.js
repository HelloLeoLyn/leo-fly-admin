import request from '@/utils/request'
import { service } from './index'


export function syncYiPei(data) {
  return request({
    url: `${service}/spider/yipei`,
    method: 'post',
    data
  })
}

export function htmlParse(data) {
  return request({
    url: `${service}/spider/parse`,
    method: 'post',
    data
  })
}

