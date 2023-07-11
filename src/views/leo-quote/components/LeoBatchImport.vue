<template>
  <div>

    <el-tabs v-model="activeName">
      <el-tab-pane name="excel" label="excel">
        <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
        <div v-if="tableData.length>0">
          <el-button type="primary" @click="handleDeleteItems()">
            删除
          </el-button>
          <el-button type="primary" @click="onConfirmData()">
            确认
          </el-button>
        </div>
        <el-table v-if="tableData.length>0" :key="key" :data="tableData" border
          highlight-current-row ref="multipleTable" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column v-for="item,key of tableHeader" :key="key" :prop="item" :label="item">
            <template slot="header" slot-scope="">
              <span>{{item}}</span>
              <span :ref="'headerKey'+key" class="cellBackGroup"></span>
              <el-button style="padding-left:5px;float:right" type="text" @click="setProps(key);"
                size="mini">
                设置</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="txt" label="txt">
        <UploadTxtComponent :on-success="handleSuccess" :before-upload="beforeUpload">
        </UploadTxtComponent>
        <el-table v-if="tableData.length>0" :key="key" :data="tableData" border
          highlight-current-row ref="multipleTable" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column v-for="item,key of tableHeader" :key="key" :prop="item" :label="item">
            <template slot="header" slot-scope="">
              <span>{{item}}</span>
              <span :ref="'headerKey'+key" class="cellBackGroup"></span>
              <el-button style="padding-left:5px;float:right" type="text" @click="setProps(key);"
                size="mini">
                设置</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="manual" label="手动添加">
        <el-button type="primary" @click="onConfirmManual()">手动添加</el-button>
      </el-tab-pane>

    </el-tabs>

    <el-dialog width="50%" title="选择对应键列" :visible.sync="innerVisible" append-to-body>
      <el-row :gutter="20" v-for="key in itemKey" :key="key"
        @dblclick.native="columnIndexChange(key)">
        <el-col :span="8">{{key}}</el-col>
        <el-col :span="8">
          <el-button @click="columnIndexChange(key)" type="warning" size="mini" plain>确认
          </el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<style>
.cellBackGroup {
  background-color: orange;
}
</style>
<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import UploadTxtComponent from '@/components/UploadTxt/index.vue'
export default {
  components: { UploadExcelComponent, UploadTxtComponent },
  data() {
    return {
      activeName: 'excel',
      innerVisible: false,
      itemKey: ['code', 'productName', 'quantity', 'unitPrice', 'remark'],
      indexKeyObj: {},
      columnIndex: -1,
      tableData: [],
      tableHeader: [],
      key: 0,
      checkedList: []
    }
  },

  methods: {
    openFile(file) {
      let reader = new FileReader()
      reader.onload = function () {
        if (reader.result) {
          // 打印文件内容
          const lines = reader.result.split('\n')
          this.tableData = lines.map((line) => {
            const cols = line.split(',')
            return { code: cols[0], quantity: cols[1] }
          })
          this.key = this.key + 1
          console.log(this.tableData)
        }
      }
      reader.readAsText(file.raw)
    },
    columnIndexChange(e) {
      this.indexKeyObj[this.columnIndex] = e
      Object.keys(this.indexKeyObj).forEach((key) => {
        if (this.indexKeyObj[key] == e) {
          this.indexKeyObj[key] = ''
        }
      })
      this.indexKeyObj[this.columnIndex] = e
      for (let key = 0; key < this.tableHeader.length; key++) {
        if (this.$refs['headerKey' + key][0].innerText == '[' + e + ']') {
          this.$refs['headerKey' + key][0].innerText = ''
        }
      }
      this.$refs['headerKey' + this.columnIndex][0].innerText = '[' + e + ']'
      this.innerVisible = false
    },
    handleDeleteItems() {
      this.checkedList.forEach((item) => {
        const index = this.tableData.findIndex((data) => {
          return data.key == item.key
        })
        this.tableData.splice(index, 1)
      })
    },
    handleSelectionChange(val) {
      this.checkedList = val
    },
    onConfirmTxt() {
      this.$emit('onConfirm', this.tableData)
    },
    onConfirmManual() {
      this.$emit('onConfirm', [])
    },
    onConfirmData() {
      this.tableHeader
      const keys = Object.keys(this.indexKeyObj)
      const tempDict = {}
      keys.forEach((key) => {
        tempDict[this.indexKeyObj[key]] = this.tableHeader[key]
      })
      if (!tempDict.code) {
        this.$message.error('亲选择oe项')
        return
      }

      const list = this.tableData
        .map((data) => {
          const item = {}
          Object.keys(tempDict).forEach((itemKey) => {
            item[itemKey] = data[tempDict[itemKey]] + ''
          })
          return item
        })
        .filter((item) => {
          return item.code && item.code.trim().length > 0
        })
      this.$emit('onConfirm', list)
    },

    setProps(key) {
      this.columnIndex = key
      this.innerVisible = true
    },
    handleSuccess({ results, header }) {
      this.key = this.key + 1
      this.tableData = results.map((item, key) => {
        item.key = key
        return item
      })
      this.tableHeader = header
      setTimeout(() => {
        header.forEach((cellName, cellIndex) => {
          const index = this.itemKey.findIndex((key) => {
            return key == cellName
          })
          if (index > -1) {
            this.$refs['headerKey' + cellIndex][0].innerText =
              '[' + cellName + ']'
            this.indexKeyObj[index] = cellName
          }
        })
      }, 1000)
    },

    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt1M) {
        return true
      }
      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    }
  }
}
</script>