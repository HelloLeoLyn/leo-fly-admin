
import request from '@/utils/request'
import { service } from './index'
export function api_video_alibaba_delete(data) {
  return request({
    url: service + '/video/alibaba',
    method: 'delete',
    data
  })
}

export function api_video_alibaba_upload(data) {
  return request({
    url: service + '/video/alibaba/upload',
    method: 'post',
    headers: {
      'Content-Type': 'mutipart/form-data'
    },
    data
  })
}