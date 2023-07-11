export const product_type = {
  '0': '通用',
  '1': 'A',
  '2': 'AA',
  '3': 'AAA',
  'H': '禾田',
  'Q': 'Q',
  'J': 'J',
  'L': 'L',
}
export const warehouse_dict = {
  type_map: { '0': '入库', '1': '出库' },
  purchaseTypeMap: { 'C': '现金', 'R': '电子汇款', 'G': '挂账', 'O': '其他' },
  shippingMap: { 'C': '客户自提', 'D': '快递', 'O': '其他' },
  product_type,
}

export const quote_flow_next = {
  0: [0, 5, 10, 20, 99],
  5: [10, 20, 99],
  10: [20, 99],
  20: [99],
}
export const quote_dict = {
  next_flow: quote_flow_next,
  status_map: { 0: '初始', 5: '无数据', 10: '待执行', 20: '执行中', 99: '完成' },
  type_map: { 'N': '普通报价', 'T': '任务报价' },
}

export const product_status = [
  { status: -1, label: '全部' },
  { status: 0, label: '初始' },
  { status: 100, label: '采集中' },
  { status: 200, label: '预同步' },
  { status: 300, label: '同步完成' },
  { status: 400, label: '同步失败' },
  { status: 500, label: '同步数据' },
  { status: 666, label: '采集完成' },
]
export const product_common_keys = ['name', 'packageSize', 'unit', 'warranty', 'weight', 'subject']

export const product_alibaba_dict = {
  'guide drive': 'guide drive',
  'replacement period': 'replacement period',
  'product feature': 'product feature',
  'for use in': 'for use in',
  'auto parts': 'auto parts',
  'reference codes': 'reference codes',
  installation: 'installation',
  system: 'system',
  'other parts': 'other parts',
  seal: 'seal',
  '100% quality tested': '00% quality tested',
  materal: 'materal',
  'guide-drive': 'guide-drive',
  'types of auto parts': '',
  'qty/set': 'qty/set',
  'warranty:': 'warranty',
  'quality:': 'quality',
  item: 'mediaitems',
  parts: 'mediaitems',
  'meterial: ': 'meterial',
  dimension: 'size',
  media: 'media',
  temperature: 'temperature',
  mediaitems: 'mediaitems',
  code: 'code',
  main_image: 'mainImage',
  mainImage: 'mainImage',
  warranty: 'warranty',
  type: 'type',
  detailHref: 'detailHref',
  detail_href: 'detailHref',
  carFitment: 'carFitment',
  car_fitment: 'carFitment',
  'car fitment': 'carFitment',
  fitment: 'carFitment',
  'fitment type': 'carFitment',
  material: 'material',
  'material:': 'material',
  'spring material': 'material',
  'raw material': 'material',
  'v ribbed belt material': 'material',
  'texture of material': 'material',
  'oil seal material': 'material',
  'piston rod material': 'material',
  subject: 'subject',
  engine: 'engine',
  'engine type': 'engine',
  'engine code': 'engine',
  'engine code:': 'engine',
  'engine brand': 'engine',
  'engine capacity': 'engine',
  price: 'price',
  'price:': 'price',
  'price term': 'price',
  unit: 'unit',
  year: 'year',
  'application years': 'year',
  'year:': 'year',
  'car year': 'year',
  years: 'year',
  length: 'length',
  'length [mm]:': 'length',
  wavelength: 'length',
  'cargo tank length': 'length',
  'extended length': 'length',
  'length [mm]': 'length',
  'thread length': 'length',
  'front total length': 'length',
  'rear total length': 'length',
  length1: 'length',
  length2: 'length',
  'fitting position': 'position',
  'brake pads position': 'position',
  'position:': 'position',
  'fitting position2': 'position',
  'fitting position1': 'position',
  'width [mm]:': 'width',
  width: 'width',
  no: 'no',
  'hongou no.': 'no',
  'fmsi no': 'no',
  noise: 'no',
  'standard or nonstandard': 'no',
  'technology/craftwork': 'no',
  'reference no.:': 'no',
  'jd no.': 'no',
  'dust/noise': 'no',
  'tr w no.': 'no',
  'ferod o no.': 'no',
  'dj no.': 'no',
  'dorman no.': 'no',
  'factory no': 'no',
  'other no.': 'no',
  'factory no.': 'no',
  'product no.': 'no',
  'reference no': 'no',
  'fenva no.:': 'no',
  'ytqc no.': 'no',
  'fenva no.': 'no',
  'item no.': 'no',
  'dimensions (l x w x h) (mm)': 'size',
  'height [mm]:': 'height',
  height: 'height',
  category_path: 'categoryPath',
  categoryPath: 'categoryPath',
  categoryId: 'categoryId',
  category_id: 'categoryId',
  refernumbers: 'number',
  'parts number': 'number',
  'kiparts number': 'number',
  'car numbers': 'number',
  'part number': 'number',
  'item number': 'number',
  'product number': 'number',
  'factory number': 'number',
  'number of groove': 'number',
  'forward shift number': 'number',
  'reverse shift number': 'number',
  'tire number': 'number',
  'number of tires': 'number',
  'interchange part number': 'number',
  'fat-number': 'number',
  number: 'number',
  'manufacturer part number': 'number',
  'superseded part number': 'number',
  'frey number': 'number',
  'interchange number': 'number',
  'rim hole number': 'number',
  'interchange part numbers': 'number',
  'interchange part number1': 'number',
  'interchange part number2': 'number',
  cerfitication: 'others',
  'brake pads certificate': 'others',
  'quality certification': 'others',
  'cert.': 'others',
  'fit for': 'fitment',
  fit: 'fitment',
  fitting: 'fitment',
  'fit car': 'fitment',
  oem: 'oem',
  'oe no.': 'oem',
  oe: 'oem',
  'oem/odm': 'oem',
  'oem no': 'oem',
  'oe no': 'oem',
  'oem no.': 'oem',
  'oem part number': 'oem',
  'oem service': 'oem',
  'oe no 1:': 'oem',
  'oe no.:': 'oem',
  'oe number': 'oem',
  'oem number': 'oem',
  'oem:': 'oem',
  'alternate oe': 'oem',
  'other oe number': 'oem',
  'oem no:': 'oem',
  'oem&odm': 'oem',
  'oem num': 'oem',
  'oem 2': 'oem',
  'oem 1': 'oem',
  'oem odm service': 'oem',
  '1oe': 'oem',
  '2oe no.:': 'oem',
  'oem order': 'oem',
  'oem no.2': 'oem',
  'oem no.1': 'oem',
  'oe no1:': 'oem',
  'product oem': 'oem',
  category_name: 'categoryName',
  categoryName: 'categoryName',
  name: 'name',
  'item name': 'name',
  'product group name': 'name',
  'part name': 'name',
  'item  name': 'name',
  'auto parts name': 'name',
  'product name:': 'name',
  package_size: 'packageSize',
  size: 'packageSize',
  'thread size': 'packageSize',
  'single package size:u00a0': 'packageSize',
  'bore size': 'packageSize',
  'connector size': 'packageSize',
  'thread size:': 'packageSize',
  'disc size': 'packageSize',
  'shell size': 'packageSize',
  'size:': 'packageSize',
  'package size per batch:u00a0': 'packageSize',
  'spot size': 'packageSize',
  'yag bar size': 'packageSize',
  'box size(cm)': 'packageSize',
  'cargo box size': 'packageSize',
  'carton size(cm)': 'packageSize',
  'packing size': 'packageSize',
  'single package size: ': 'packageSize',
  'package size per batch: ': 'packageSize',
  'product size': 'packageSize',
  'cone size [mm]': 'packageSize',
  'battery size': 'packageSize',
  'packing size:': 'packageSize',
  'hex size': 'packageSize',
  packing: 'package',
  'packaging details': 'package',
  package: 'package',
  'package type': 'package',
  packaging: 'package',
  'bulk packaging': 'package',
  'brake pads packing': 'package',
  'package / case': 'package',
  'packing details': 'package',
  'package type:': 'package',
  'packaging type': 'package',
  'packing style': 'package',
  'packing:': 'package',
  'quantity per package': 'package',
  'package includes': 'package',
  'how to package': 'package',
  color: 'color',
  carmodels: 'model',
  model: 'model',
  'car model': 'model',
  'model number': 'model',
  'model no.': 'model',
  'engine model': 'model',
  'color:': 'color',
  'car models': 'model',
  'colors are available in': 'color',
  'truck model': 'model',
  'model:': 'model',
  'car model:': 'model',
  'models number': 'model',
  'color temperature': 'color',
  colored: 'color',
  'model numbers': 'model',
  'model no': 'model',
  'color/finish': 'color',
  'for car model': 'model',
  'color number': 'color',
  'color & page': 'color',
  'appliance car model': 'model',
  models: 'model',
  weight: 'weight',
  'single gross weight:': 'weight',
  'weight [kg]:': 'weight',
  'gross weight per batch:': 'weight',
  'net weight': 'weight',
  'weight(kg)': 'weight',
  'gross vehicle weight': 'weight',
}


export const works_type = {
  '0': '编程',
  '11': '1688新品',
  '12': '1688刷单',
  '13': '1688报价',
  '14': '1688发货',
  '21': '亚马逊新品',
  '22': '亚马逊刷单',
  '23': '亚马逊报价',
  '24': '亚马逊发货',
  '30': '汽配资料同步',
  '40': '国际站报价',
  '90': '采集数据',
  '99': '其他'
}
export const work_flow_next = {
  0: [0, 10, 20, 70],
  10: [10, 20, 30, 70],
  20: [20, 30, 70],
  30: [30, 40, 50, 70],
  40: [40, 50, 70, 90],
  50: [50, 70, 90],
  60: [60, 70, 90],
  70: [70, 90],
}
export const work_status = { 0: '初始', 10: '待执行', 20: '执行中', 30: '提交审核', 40: '审核通过', 50: '审核不通过', 60: '超时', 70: '取消', 90: '完成' }
export const work_dict = {
  type: works_type,
  status: work_status,
  work_flow_next
}
export const category_dict = {
  type: {
    '0': '刹车片',
    '99': '其他'
  }
}