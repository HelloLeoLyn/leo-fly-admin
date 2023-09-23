export const status = [
  { value: -1, label: '全部' },
  { value: 0, label: '初始' },
  { value: 100, label: '采集中' },
  { value: 200, label: '预同步' },
  { value: 300, label: '同步完成' },
  { value: 400, label: '同步失败' },
  { value: 500, label: '同步数据' },
  { value: 666, label: '采集完成' }
]
export const fields = {
  id: {
    key: 'id',
    uiType: 'input',
    checked: false,
    disable: false
  },
  categoryId: {
    key: 'categoryId',
    uiType: 'category',
    checked: false,
    disable: false
  },
  subject: {
    key: 'subject',
    uiType: 'input',
    checked: false,
    disable: false
  },
  name: {
    key: 'name',
    uiType: 'input',
    checked: false,
    disable: false
  },
  brand: {
    key: 'brand',
    uiType: 'input',
    checked: false,
    disable: false
  },
  model: {
    key: 'model',
    uiType: 'input',
    checked: false,
    disable: false
  },
  unit: {
    key: 'unit',
    uiType: 'input',
    checked: false,
    disable: false
  },
  images: {
    key: 'images',
    uiType: 'input',
    checked: false,
    disable: false
  },
  warranty: {
    key: 'warranty',
    uiType: 'input',
    checked: false,
    disable: false
  },
  weight: {
    key: 'weight',
    uiType: 'input',
    checked: false,
    disable: false
  },
  packageSize: {
    key: 'packageSize',
    uiType: 'input',
    checked: false,
    disable: false
  },
  status: {
    key: 'status',
    uiType: 'select',
    checked: false,
    disable: false
  },
  code: {
    key: 'code',
    uiType: 'input',
    checked: false,
    disable: false
  },
  codeType: {
    key: 'codeType',
    uiType: 'input',
    checked: false,
    disable: false
  },
  mainImage: {
    key: 'mainImage',
    uiType: 'input',
    checked: false,
    disable: false
  },
  error: {
    key: 'error',
    uiType: 'input',
    checked: false,
    disable: false
  },
  refNo: {
    key: 'refNo',
    uiType: 'input',
    checked: false,
    disable: false
  },
  type: {
    key: 'type',
    uiType: 'input',
    checked: false,
    disable: false
  },
  referStatus: {
    key: 'referStatus',
    uiType: 'input',
    checked: false,
    disable: false
  },
  groupId: {
    key: 'groupId',
    uiType: 'input',
    checked: false,
    disable: false
  },
  tagIds: {
    key: 'tagIds',
    uiType: 'input',
    checked: false,
    disable: false
  }
}
export function parseHtmlObj(key) {
  return { key, uiType: 'input', checked: false, disable: false }
}
export default {
  status,
  parseHtmlObj,
  fields
}
