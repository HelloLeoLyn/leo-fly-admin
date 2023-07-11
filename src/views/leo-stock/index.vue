<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-input v-model="queryForm.id" placeholder="id" style="width: 200px;"
          class="filter-item" />
        <el-input v-model="queryForm.productId" placeholder="productId" style="width: 200px;"
          class="filter-item" />
        <el-input v-model="queryForm.productType" placeholder="productType" style="width: 200px;"
          class="filter-item" />
        <el-input v-model="queryForm.productName" placeholder="productName" style="width: 200px;"
          class="filter-item" />
        <el-input v-model="queryForm.remark" placeholder="remark" style="width: 200px;"
          class="filter-item" />
        <el-input v-model="queryForm.totalQuantity" placeholder="totalQuantity"
          style="width: 200px;" class="filter-item" />
        <el-input v-model="queryForm.amount" placeholder="amount" style="width: 200px;"
          class="filter-item" />
        <el-input v-model="queryForm.totalAmount" placeholder="totalAmount" style="width: 200px;"
          class="filter-item" />
        <el-input v-model="queryForm.quantity" placeholder="quantity" style="width: 200px;"
          class="filter-item" />
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search"
          @click="handleFilter">
          Search
        </el-button>
      </el-row>
      <el-row style="text-align:right;">
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
          @click="handleCreate">
          Add
        </el-button>
        <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary"
          icon="el-icon-download" @click="handleDownload">
          Export
        </el-button>
      </el-row>
    </div>

    <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row
      style="width: 100%;" @sort-change="sortChange">
      <el-table-column label="id" prop="id" align="center" />
      <el-table-column label="productId" prop="productId" align="center" />
      <el-table-column label="productType" prop="productType" align="center" />
      <el-table-column label="productName" prop="productName" align="center" />
      <el-table-column label="remark" prop="remark" align="center" />
      <el-table-column label="totalQuantity" prop="totalQuantity" align="center" />
      <el-table-column label="amount" prop="amount" align="center" />
      <el-table-column label="totalAmount" prop="totalAmount" align="center" />
      <el-table-column label="quantity" prop="quantity" align="center" />
      <el-table-column label="Actions" align="center" width="230"
        class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger"
            @click="handleDelete(row,$index)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="queryForm.current"
      :limit.sync="queryForm.size" @pagination="doPage" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px"
        style="width: 600px; margin-left:50px;">
        <el-form-item label="id" prop="id">
          <el-input v-model="temp.id" />
        </el-form-item>
        <el-form-item label="productId" prop="productId">
          <el-input v-model="temp.productId" />
        </el-form-item>
        <el-form-item label="productType" prop="productType">
          <el-input v-model="temp.productType" />
        </el-form-item>
        <el-form-item label="productName" prop="productName">
          <el-input v-model="temp.productName" />
        </el-form-item>
        <el-form-item label="remark" prop="remark">
          <el-input v-model="temp.remark" />
        </el-form-item>
        <el-form-item label="totalQuantity" prop="totalQuantity">
          <el-input v-model="temp.totalQuantity" />
        </el-form-item>
        <el-form-item label="amount" prop="amount">
          <el-input v-model="temp.amount" />
        </el-form-item>
        <el-form-item label="totalAmount" prop="totalAmount">
          <el-input v-model="temp.totalAmount" />
        </el-form-item>
        <el-form-item label="quantity" prop="quantity">
          <el-input v-model="temp.quantity" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { api_stock_page, api_stock_post, api_stock_put } from '@/api/leo-stock'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {},
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      queryForm: { remark: '', productType: '', productName: '' },
      temp: { remark: '', productType: '', productName: '' },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {},
      downloadLoading: false
    }
  },
  created() {
    this.doPage()
  },
  methods: {
    doPage() {
      this.listLoading = true
      api_stock_page(this.queryForm).then((response) => {
        this.list = response.data.records
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      })
    },
    handleFilter() {
      this.queryForm.page = 1
      this.doPage()
    },

    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.queryForm.sort = '+id'
      } else {
        this.queryForm.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      Object.keys(this.temp).forEach((key) => {
        this.temp[key] = null
      })
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          api_stock_post(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          api_stock_put(this.temp).then(() => {
            const index = this.list.findIndex((v) => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },

    handleDownload() {
      // this.downloadLoading = true
      // import('@/vendor/Export2Excel').then((excel) => {
      //   const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
      //   const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
      //   const data = this.formatJson(filterVal)
      //   excel.export_json_to_excel({
      //     header: tHeader,
      //     data,
      //     filename: 'table-list'
      //   })
      //   this.downloadLoading = false
      // })
    },
    formatJson(filterVal) {
      return this.list.map((v) =>
        filterVal.map((j) => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },
    getSortClass: function (key) {
      const sort = this.queryForm.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
