import request from '@/utils/request'
import { service } from './index'
export function api_page_image(data) {
  return request({
    url: service + '/image/page',
    method: 'post',
    data
  })
}
export function api_image_add(data) {
  return request({
    url: service + '/image',
    method: 'post',
    data
  })
}
export function getImagesByProductId(productId) {
  return request({
    url: service + '/image/code/' + productId,
    method: 'get',
  })
}


export function getImageByProductId(productId, pixel) {
  return service + '/product/image/main/' + productId + '/' + pixel
}


export function api_image_local() {
  return request({
    url: service + '/image/local',
    method: 'get'
  })
}
export function api_image__fail(data) {
  return request({
    url: service + '/image/fail',
    method: 'post',
    data
  })
}

export function api_image_delete(id) {
  return request({
    url: service + '/image/' + id,
    method: 'delete',
  })
}
export function api_image_put(data) {
  return request({
    url: service + '/image',
    method: 'put',
    data
  })
}
export function api_image_batch_put(data) {
  return request({
    url: service + '/image/batch',
    method: 'put',
    data
  })
}
