<template>
  <div>
    <input ref="txt-upload-input" class="txt-upload-input" type="file" accept=".txt"
      @change="handleClick">
    <div class="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
      Drop txt file here or
      <el-button :loading="loading" style="margin-left:16px;" size="mini" type="primary"
        @click="handleUpload">
        Browse
      </el-button>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx'

export default {
  props: {
    beforeUpload: Function, // eslint-disable-line
    onSuccess: Function // eslint-disable-line
  },
  data() {
    return {
      loading: false,
      txtData: {
        header: null,
        results: null
      }
    }
  },
  methods: {
    generateData({ header, results }) {
      this.txtData.header = header
      this.txtData.results = results
      this.onSuccess && this.onSuccess(this.txtData)
    },
    handleDrop(e) {
      e.stopPropagation()
      e.preventDefault()
      if (this.loading) return
      const files = e.dataTransfer.files
      if (files.length !== 1) {
        this.$message.error('Only support uploading one file!')
        return
      }
      const rawFile = files[0] // only use files[0]

      if (!this.isTxt(rawFile)) {
        this.$message.error('Only supports upload .txt suffix files')
        return false
      }
      this.upload(rawFile)
      e.stopPropagation()
      e.preventDefault()
    },
    handleDragover(e) {
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },
    handleUpload() {
      this.$refs['txt-upload-input'].click()
    },
    handleClick(e) {
      const files = e.target.files
      const rawFile = files[0] // only use files[0]
      if (!rawFile) return
      this.upload(rawFile)
    },
    upload(rawFile) {
      this.$refs['txt-upload-input'].value = null // fix can't select the same txt
      if (!this.beforeUpload) {
        this.readerData(rawFile)
        return
      }
      const before = this.beforeUpload(rawFile)
      if (before) {
        this.readerData(rawFile)
      }
    },
    readerData(rawFile) {
      this.loading = true
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const data = e.target.result
          const lines = data.split('\r\n')
          const header = lines[0].split(',')
          // const results = lines
          //   .filter((v, i) => i > 0)
          //   .map((line) => {
          //     return line.split(',')
          //   })
          const results = lines
            .filter((v, i) => i > 0)
            .map((line) => {
              const values = line.split(',')
              const obj = {}
              header.forEach((key, index) => {
                obj[key] = values[index]
              })
              return obj
            })
          this.generateData({ header, results })
          this.loading = false
          resolve()
        }
        // reader.readAsArrayBuffer(rawFile)
        reader.readAsText(rawFile)
      })
    },
    getHeaderRow(sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C
      const R = range.s.r
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) {
        /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    },
    isTxt(file) {
      return /\.(txt)$/.test(file.name)
    }
  }
}
</script>

<style scoped>
.txt-upload-input {
  display: none;
  z-index: -9999;
}
.drop {
  border: 2px dashed #bbb;
  width: 600px;
  height: 160px;
  line-height: 160px;
  margin: 0 auto;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
</style>
