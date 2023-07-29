import request from '@/utils/request'
import { service } from '@/api/index'

export function api_python_image_cut_post(data) {
  return request({
    url: service + '/python/image/cut',
    method: 'post',
    data
  })
}

export function api_python_image_rembg_post(data) {
  return request({
    url: service + '/python/image/rembg',
    method: 'post',
    data
  })
}

export function api_python_image_goods_post(data) {
  return request({
    url: service + '/python/image/goods',
    method: 'post',
    data
  })
}