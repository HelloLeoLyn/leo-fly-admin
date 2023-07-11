export function loadImage(url) {
  const img = new Image()
  img.src = url
  img.onload = () => {
  }
  return img
}

// 将url转换为base64
export function getBase64Image (img) {
  let demoCanvas = document.createElement('canvas')
  demoCanvas.width = img.width
  demoCanvas.height = img.height
  let ctx = demoCanvas.getContext('2d')
  ctx.drawImage(img, 0, 0, 1000, 1000)
  let ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
  let dataURL = demoCanvas.toDataURL('image/' + ext)
  return {
    dataURL: dataURL,
    type: 'image/' + ext
  }
}

export function dataURLtoFile (dataurl, filename) {
  let arr = dataurl.dataURL.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

// 将url转换为blob
export function convertBase64UrlToBlob (base64) {
  let urlData = base64.dataURL
  let type = base64.type
  let bytes = window.atob(urlData.split(',')[1])
  let ab = new ArrayBuffer(bytes.length)
  let ia = new Uint8Array(ab)
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }
  return new Blob([ab], { type: type })
}

export function readFileAsBytes(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function(event) {
      const arrayBuffer = event.target.result;
      const byteArray = new Uint8Array(arrayBuffer);
      resolve(byteArray);
    };
    reader.onerror = function() {
      reject(new Error('Failed to read file.'));
    };
    reader.readAsArrayBuffer(file);
  });
}


