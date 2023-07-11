export function codeFilter(e) {
  if (e.length == 0) {
    return ''
  }
  if (e.length == 1) {
    return e[0]
  }
  let str = e[0]
  e.forEach((v) => {
    str = str + ',' + v
  })
  return str
}
export function codeFormatter(e) {
  if (e.length == 0) {
    return ''
  }
  if (e.length == 1) {
    return e[0]
  }
  let str = e[0]
  e.forEach((v) => {
    str = str + ',' + v
  })
  return str
}