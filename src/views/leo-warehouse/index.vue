<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-select v-model="queryForm.type" placeholder="类型" style="width: 200px;"
          class="filter-item">
          <el-option v-for="(v,k) in warehouse_dict.type_map" :value="k" :key="k" :label="v" />
        </el-select>
        <el-input v-model="queryForm.orderId" placeholder="单号" style="width: 200px;"
          class="filter-item" />
        <el-input v-model="queryForm.nno" placeholder="货号" style="width: 200px;"
          class="filter-item" />
        <!-- <el-select v-model="queryForm.purchaseType" placeholder="交易类型" style="width: 200px;"
          class="filter-item">
          <el-option v-for="(v,k) in warehouse_dict.purchaseTypeMap" :value="k" :key="k"
            :label="v" />
        </el-select> -->
        <el-input v-model="queryForm.customer" placeholder="客户" style="width: 200px;"
          class="filter-item" />
        <el-input v-model="queryForm.shipping" placeholder="送货方式" style="width: 200px;"
          class="filter-item" />
        <el-input v-if="more" v-model="queryForm.remark" placeholder="备注" style="width: 200px;"
          class="filter-item" />
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search"
          @click="handleFilter">
          Search
        </el-button>
      </el-row>
      <el-row style="text-align:right;">
        <el-checkbox v-model="more" class="filter-item" style="margin-left:15px;">
          more
        </el-checkbox>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
          @click="handleCreate('in')">
          入库
        </el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
          @click="handleCreate('out')">
          出库
        </el-button>
        <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary"
          icon="el-icon-download" @click="handleDownload">
          Export
        </el-button>
      </el-row>
    </div>

    <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row
      style="width: 100%;" @sort-change="sortChange">
      <el-table-column v-if="more" label="id" prop="id" align="center" width="100" />
      <el-table-column label="类型" prop="type" align="center"
        :formatter="row=>warehouse_dict.type_map[row.type]" width="100" />
      <el-table-column label="进价" prop="purchasePrice" align="center" width="100" />
      <el-table-column label="售价" prop="sellingPrice" align="center" width="100" />
      <el-table-column label="数量" prop="amount" align="center" width="100" />
      <el-table-column v-if="more" label="productId" prop="productId" align="center" width="100" />
      <el-table-column label="单号" prop="orderId" align="center" width="200" />
      <el-table-column label="货号" prop="nno" align="center" width="200" />
      <el-table-column label="purchaseType" prop="purchaseType" align="center" width="120">
        <template slot-scope="{row}">
          <span>{{warehouse_dict.purchaseTypeMap[row.purchaseType]?warehouse_dict.purchaseTypeMap[row.purchaseType]:row.purchaseType}}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户" prop="customer" align="center" width="100" />
      <el-table-column label="发货方式" prop="shipping" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{warehouse_dict.shippingMap[row.shipping]?warehouse_dict.shippingMap[row.shipping]:row.shipping}}</span>
        </template>
      </el-table-column>
      <el-table-column label="单位" prop="unit" align="center" width="60" />
      <el-table-column v-if="more" label="cType" prop="codeType" align="center" width="100" />
      <el-table-column v-if="more" label="remark" prop="remark" align="center" width="150" />
      <el-table-column v-if="more" label="createTime" prop="createTime" align="center"
        width="180" />
      <el-table-column v-if="more" label="createBy" prop="createBy" align="center" width="150" />
      <!-- <el-table-column v-if="more" label="updateTime" prop="updateTime" align="center" />
      <el-table-column v-if="more" label="updateBy" prop="updateBy" align="center" /> -->
      <el-table-column label="Actions" align="center" width="230" fixed="right"
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
        <el-form-item label="type" prop="type">
          <el-switch v-model="temp.type" />
        </el-form-item>
        <el-form-item label="purchasePrice" prop="purchasePrice">
          <el-input v-model="temp.purchasePrice" />
        </el-form-item>
        <el-form-item label="sellingPrice" prop="sellingPrice">
          <el-input v-model="temp.sellingPrice" />
        </el-form-item>
        <el-form-item label="amount" prop="amount">
          <el-input v-model="temp.amount" />
        </el-form-item>
        <el-form-item label="productId" prop="productId">
          <el-input v-model="temp.productId" />
        </el-form-item>
        <el-form-item label="orderId" prop="orderId">
          <el-input v-model="temp.orderId" />
        </el-form-item>
        <el-form-item label="nno" prop="nno">
          <el-input v-model="temp.nno" />
        </el-form-item>
        <el-form-item label="purchaseType" prop="purchaseType">
          <el-input v-model="temp.purchaseType" />
        </el-form-item>
        <el-form-item label="customer" prop="customer">
          <el-input v-model="temp.customer" />
        </el-form-item>
        <el-form-item label="shipping" prop="shipping">
          <el-input v-model="temp.shipping" />
        </el-form-item>
        <el-form-item label="unit" prop="unit">
          <el-input v-model="temp.unit" />
        </el-form-item>
        <el-form-item label="remark" prop="remark">
          <el-input v-model="temp.remark" />
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
import {
  api_warehouse_page,
  api_warehouse_post,
  api_warehouse_put
} from '@/api/leo-warehouse'
import { api_product_attributes_get } from '@/api/leo-product'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { warehouse_dict } from '@/utils/dict'
export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {},
  data() {
    return {
      more: false,
      warehouse_dict,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      queryForm: {
        orderId: '',
        remark: '',
        type: '',
        nno: '',
        purchaseType: '',
        unit: '',
        shipping: '',
        customer: '',
        productIdList: []
      },
      temp: {
        orderId: '',
        remark: '',
        type: '',
        nno: '',
        purchaseType: '',
        unit: '',
        shipping: '',
        customer: ''
      },
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
      if (this.queryForm.nno && this.queryForm.nno != '') {
        api_product_attributes_get(this.queryForm.nno).then((res) => {
          if (res.data.length > 0) {
            const productIdList = res.data.map((m) => {
              return m.productId
            })
            this.queryForm.productIdList = productIdList
            this.queryForm.nno = ''
            api_warehouse_page(this.queryForm).then((response) => {
              this.list = response.data.records
              this.total = response.data.total
              setTimeout(() => {
                this.listLoading = false
              }, 0.5 * 1000)
            })
          } else {
            api_warehouse_page(this.queryForm).then((response) => {
              this.list = response.data.records
              this.total = response.data.total
              setTimeout(() => {
                this.listLoading = false
              }, 0.5 * 1000)
            })
          }
        })
      } else {
        api_warehouse_page(this.queryForm).then((response) => {
          this.list = response.data.records
          this.total = response.data.total
          setTimeout(() => {
            this.listLoading = false
          }, 0.5 * 1000)
        })
      }
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
          api_warehouse_post(this.temp).then(() => {
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
          api_warehouse_put(this.temp).then(() => {
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
