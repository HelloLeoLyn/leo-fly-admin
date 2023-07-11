import request from '@/utils/request'
import { service } from './index'
export function api_page_image(data) {
  return request({
    url: service + '/image/page',
    method: 'post',
    data
  })
}

export function api_photo_alibaba_album(data) {
  return request({
    url: 'http://localhost:8080/photo/alibaba/album',
    method: 'post',
    data
  })
}

export function api_photo_alibaba_photo(data) {
  return request({
    url: 'http://localhost:8080/photo/alibaba/photo',
    method: 'post',
    data
  })
}