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
      <el-table-column label="remark" prop="remark" align="center" />
      <el-table-column v-if="more" label="createTime" prop="createTime" align="center"
        width="180" />
      <el-table-column v-if="more" label="createBy" prop="createBy" align="center" width="150" />
      <el-table-column v-if="more" label="updateTime" prop="updateTime" align="center" />
      <el-table-column v-if="more" label="updateBy" prop="updateBy" align="center" />
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="queryForm.current"
      :limit.sync="queryForm.size" @pagination="doPage" />
  </div>
</template>

<script>
import { api_warehouse_page } from '@/api/leo-warehouse'
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
