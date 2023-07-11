import { toHump } from '@/utils';
export function generateHtmlTableWithObj(obj) {
  const keys = Object.keys(obj);
  return generateHtmlTableWithKeys(keys)
}

export function generateHtmlTableWithKeys(keys) {
  let html = '\n<el-table border :data="list" style="width: 100%">\n'
  keys.forEach((key) => {
    html =
      html +
      '\t<el-table-column label="' +
      key +
      '" prop="' +
      key +
      '" align="center" />\n'
  })
  html = html + '</el-table>\n'
  return html
}

export const excludeKeys = ['create_by', 'create_time', 'update_by', 'update_time']
export function generateModelObj(fields) {
  const obj = {}
  fields.forEach((field) => {
    const index = excludeKeys.findIndex((key) => key === field.COLUMN_NAME)
    if (index == -1) {
      obj[toHump(field.COLUMN_NAME)] = ''
    }
  })
  return obj
}

export const template_dict = {
  addForm: 'leo-add-form-template.java.txt',
  api: 'leo-api-template.js.txt',
  controller: 'leo-controller-template.java.txt',
  entity: 'leo-entity-template.java.txt',
  mapper: 'leo-mapper-template.java.txt',
  pom: 'leo-pom-template.xml.txt',
  queryForm: 'leo-query-form-template.java.txt',
  queryParam: 'leo-query-param-template.java.txt',
  service: 'leo-service-template.java.txt',
  serviceImpl: 'leo-service-impl-template.java.txt',
  updateForm: 'leo-update-form-template.java.txt',
  vue: 'leo-vue-index-template.vue.txt'
}

export const fileTabs = {
  currentTab: 'entity',
  keys: ['entity', 'controller', 'service', 'serviceImpl', 'mapper', 'queryForm', 'updateForm', 'addForm', 'queryParam', 'api', 'pom', 'vue'],
  'entity': { fieldKeys: [], filename: '', filepath: '', templateName: template_dict.entity, fileType: 'java', label: 'Entity', key: 'entity', childPackage: '.entity' },
  'controller': { fieldKeys: [], filename: '', filepath: '', templateName: template_dict.controller, fileType: 'java', label: 'Controller', key: 'controller', childPackage: '.controller' },
  'service': { fieldKeys: [], filename: '', filepath: '', templateName: template_dict.service, fileType: 'java', label: 'Service', key: 'service', childPackage: '.service' },
  'serviceImpl': { fieldKeys: [], filename: '', filepath: '', templateName: template_dict.serviceImpl, fileType: 'java', label: 'ServiceImpl', key: 'serviceImpl', childPackage: '.service.impl' },
  'mapper': { fieldKeys: [], filename: '', filepath: '', templateName: template_dict.mapper, fileType: 'java', label: 'Mapper', key: 'mapper', childPackage: '.mapper' },
  'queryForm': { fieldKeys: [], filename: '', filepath: '', templateName: template_dict.queryForm, fileType: 'java', label: 'QueryForm', key: 'queryForm', childPackage: '.params' },
  'updateForm': { fieldKeys: [], filename: '', filepath: '', templateName: template_dict.updateForm, fileType: 'java', label: 'UpdateForm', key: 'updateForm', childPackage: '.params' },
  'addForm': { fieldKeys: [], filename: '', filepath: '', templateName: template_dict.addForm, fileType: 'java', label: 'AddForm', key: 'addForm', childPackage: '.params' },
  'queryParam': { fieldKeys: [], filename: '', filepath: '', templateName: template_dict.queryParam, fileType: 'java', label: 'QueryParam', key: 'queryParam', childPackage: '.params' },
  api: { filename: '', filepath: '/api', fileType: 'js', templateName: template_dict.api, label: 'Api', key: 'api' },
  pom: { filename: 'pom.xml', filepath: '', fileType: 'xml', templateName: template_dict.pom, label: 'Pom', key: 'pom' },
  vue: { filename: '', filepath: '/views', fileType: 'vue', templateName: template_dict.vue, label: 'Vue', key: 'vue' },
}

export function getNameByTableName(tableName) {
  return toHump(tableName.substr(4))
}

export function getPackageByTableName(prfix, tableName) {
  return prfix + '.' + tableName.substr(4).replaceAll('_', '.')
}

export function getModuleByTableName(tableName) {
  return tableName.replaceAll('_', '-')
}