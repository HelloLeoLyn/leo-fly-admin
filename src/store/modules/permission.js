import { constantRoutes } from '@/router'
import { api_menu_get_by_user } from '@/api/leo-sys'
import Layout from '@/layout'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}


function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    // if (route.hidden) { return }
    if (route.component === 'layout/Layout') {
      route.component = Layout
    } else {
      const component = route.component
      route.component = resolve => require(['@/views' + component], resolve)
    }
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}
const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      api_menu_get_by_user(4).then(asyncRoutes => {
        const accessedRoutes = filterAsyncRoutes(asyncRoutes.data, roles)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
