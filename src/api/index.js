import Cookies from 'js-cookie'
export const host = '127.0.0.1'
export const port = '8080'
export const auto_part_port = '8080'
export const service = `http://${host}:${auto_part_port}`
export const imgBase = 'G:/image/'
export const imgTempPath = 'C:/Users/leo/Downloads/'
export const javaProjectPath = 'E:/workspace/java/leo-fly'
export const vueProjectPath = 'E:/workspace/vue/vue-element-admin'
export const alibabaURLPrefix = 'https://cbu01.alicdn.com/'
export function getHost() {
  Cookies.set('sys-env-dev-host', '127.0.0.1')
  return Cookies.get('sys-env-dev-host')
}
