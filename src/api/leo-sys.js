import request from '@/utils/request'
import { service } from '@/api/index'

export function api_user_page(data) {
  return request({
    url: service + '/sys/user/page',
    method: 'post',
    data
  })
}

export function api_user_post(data) {
  return request({
    url: service + '/sys/user',
    method: 'post',
    data
  })
}
export function api_user_put(data) {
  return request({
    url: service + '/sys/user',
    method: 'put',
    data
  })
}
export function api_user_delete(id) {
  return request({
    url: service + '/sys/user/' + id,
    method: 'delete'

  })
}

export function api_user_by_menuId(menuId) {
  return request({
    url: service + '/sys/user/menuId/' + menuId,
    method: 'get'

  })
}
export function api_role_list(data) {
  return request({
    url: service + '/sys/role/list',
    method: 'post',
    data
  })
}

export function api_role_page(data) {
  return request({
    url: service + '/sys/role/page',
    method: 'post',
    data
  })
}
export function api_user_role_batch_save(data, userId) {
  return request({
    url: service + '/sys/user/role/batch/' + userId,
    method: 'post',
    data
  })
}

export function api_user_role_get_by_userid(userId) {
  return request({
    url: service + '/sys/user/role/userId/' + userId,
    method: 'get',
  })
}

export function api_role_post(data) {
  return request({
    url: service + '/sys/role',
    method: 'post',
    data

  })
}
export function api_role_put(data) {
  return request({
    url: service + '/sys/role',
    mmethod: 'put',
    data
  })
}

export function api_role_delete(id) {
  return request({
    url: service + '/sys/role/' + id,
    mmethod: 'delete'
  })
}

export function api_role_dept_post_batch(data) {
  return request({
    url: service + '/sys/role/dept/batch',
    method: 'post',
    data
  })
}

export function api_role_menu_put(roleId, data) {
  return request({
    url: service + '/sys/role/menu/' + roleId,
    method: 'put',
    data
  })
}
export function api_role_menu_post(data) {
  return request({
    url: service + '/sys/role/menu',
    method: 'post',
    data
  })
}
export function api_dept_list(data) {
  return request({
    url: service + '/sys/dept/list',
    method: 'post',
    data
  })
}

export function api_dept_page(data) {
  return request({
    url: service + '/sys/dept/page',
    method: 'post',
    data
  })
}

export function api_dept_post(data) {
  return request({
    url: service + '/sys/dept',
    method: 'post',
    data
  })
}

export function api_dept_put(data) {
  return request({
    url: service + '/sys/dept',
    method: 'put',
    data
  })
}

export function api_dept_delete(id) {
  return request({
    url: service + '/sys/dept/' + id,
    method: 'delete'
  })
}

export function api_menu_delete(id) {
  return request({
    url: service + '/sys/menu/' + id,
    method: 'delete'
  })
}


export function api_menu_put(data) {
  return request({
    url: service + '/sys/menu/',
    method: 'put',
    data
  })
}

export function api_menu_post(data) {
  return request({
    url: service + '/sys/menu/',
    method: 'post',
    data
  })
}

export function api_role_menu_get_by_role(roleId) {
  return request({
    url: service + '/sys/role/menu/roleId/' + roleId,
    method: 'get'
  })
}
export function api_role_dept_get_by_role(roleId) {
  return request({
    url: service + '/sys/role/dept/' + roleId,
    method: 'get'
  })
}
export function api_menu_get_by_parent(parentId) {
  return request({
    url: service + '/sys/menu/parentId/' + parentId,
    method: 'get'
  })
}

export function api_menu_get_by_user(userId) {
  return request({
    url: service + '/sys/menu/userId/' + userId,
    method: 'get'
  })
}

export function api_user_login(data) {
  return request({
    url: service + '/login',
    method: 'post',
    data
  })
}

export function api_user_logout(data) {
  return request({
    url: service + '/logout',
    method: 'post',
    data
  })
}

export function api_user_info(params) {
  return request({
    url: service + '/sys/info',
    method: 'get',
    params
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
