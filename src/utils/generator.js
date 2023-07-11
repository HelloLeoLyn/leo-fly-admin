export function tableColumns(obj) {
  let html = ''
  Object.keys(obj).forEach(key => {
    html = html + '<el-table-column label="' + key + '" prop="' + key + '" align="center" />'
  })
  return html
}
