<template>
  <div>
    <el-button
      @click="handleDownloadClick"
      type="primary"
      class="el-icon-download"
    >
      {{ label }}
    </el-button>
    <el-dialog title="Export" :visible.sync="dialogVisible">
      <FilenameOption v-model="filename" />
      <AutoWidthOption v-model="autoWidth" />
      <BookTypeOption v-model="bookType" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          :loading="downloadLoading"
          style="margin: 0 0 20px 20px"
          type="primary"
          icon="el-icon-document"
          @click="onConfrimDownload"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { parseTime } from '@/utils'
import FilenameOption from './FilenameOption'
import AutoWidthOption from './AutoWidthOption'
import BookTypeOption from './BookTypeOption'
export default {
  name: 'LeoExport',
  components: { FilenameOption, AutoWidthOption, BookTypeOption },
  data () {
    return {
      listLoading: true,
      downloadLoading: false,
      dialogVisible: false,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx'
    }
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    newFilename: {
      type: String,
      default: () => null
    },
    label: {
      type: String,
      default: () => 'export'
    }
  },
  mounted () {
    console.log(this.newFilename)
    if (this.newFilename) {
      this.filename = this.newFilename
    }
  },
  methods: {
    handleDownloadClick () {
      this.dialogVisible = true
      this.$emit('onDown', true)
    },
    onConfrimDownload () {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = this.columns.map(col => col.label)
        const filterVal = this.columns.map(col => col.key)
        const list = this.list
        const data = this.formatJson(filterVal, list)
        console.log(tHeader, data)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson (filterVal, jsonData) {
      const data = jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
      return data
    }
  }
}
</script>
