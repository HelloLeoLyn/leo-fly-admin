import { service } from '@/api/index'
export function toHoverImages(src, type) {
  if (type == 'water') {
    return water(src)
  } else {
    return naturl(src)
  }
}

function water(src) {
  const result = src
    .map((image) => {
      return {
        checked: false,
        id: image.id,
        url: service +

          '/img/' +
          image.code +
          '/' +
          image.id +
          '_300X300' +
          image.fileType,
        large:

          service + '/img/' +
          image.code +
          '/' +
          image.id +
          '_1000X1000' +
          image.fileType
      }
    })
  return result
}
function naturl(src) {
  const result = src
    .map((image) => {
      return {
        checked: false,
        id: image.id,
        url:
          service +
          '/img/' +
          image.code +
          '/' +
          image.id +
          image.fileType,
        large:
          service +
          '/img/' +
          image.code +
          '/' +
          image.id +
          image.fileType
      }
    })
  return result
}
export function parseImage(image) {
  image.url = service +
    '/img/' +
    image.code +
    '/' +
    image.name
  return image
}
