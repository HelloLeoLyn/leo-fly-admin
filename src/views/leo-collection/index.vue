<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-input v-model="queryForm.id" placeholder="id" style="width: 200px;"
          class="filter-item" />
        <el-input v-model="queryForm.categoryId" placeholder="categoryId" style="width: 200px;"
          class="filter-item" />
        <el-input v-model="queryForm.name" placeholder="name" style="width: 200px;"
          class="filter-item" />
        <el-input v-model="queryForm.weight" placeholder="weight" style="width: 200px;"
          class="filter-item" />
        <el-input v-model="queryForm.width" placeholder="width" style="width: 200px;"
          class="filter-item" />
        <el-input v-model="queryForm.height" placeholder="height" style="width: 200px;"
          class="filter-item" />
        <el-input v-model="queryForm.length" placeholder="length" style="width: 200px;"
          class="filter-item" />
        <el-input v-model="queryForm.unitQuantity" placeholder="unitQuantity" style="width: 200px;"
          class="filter-item" />
        <el-input v-model="queryForm.unit" placeholder="unit" style="width: 200px;"
          class="filter-item" />
        <el-input v-model="queryForm.color" placeholder="color" style="width: 200px;"
          class="filter-item" />
        <el-input v-model="queryForm.brandCode" placeholder="brandCode" style="width: 200px;"
          class="filter-item" />
        <el-input v-model="queryForm.images" placeholder="images" style="width: 200px;"
          class="filter-item" />
        <el-input v-model="queryForm.keyword" placeholder="keyword" style="width: 200px;"
          class="filter-item" />
        <el-input v-model="queryForm.refers" placeholder="refers" style="width: 200px;"
          class="filter-item" />
        <el-input v-model="queryForm.purchasePrices" placeholder="purchasePrices"
          style="width: 200px;" class="filter-item" />
        <el-input v-model="queryForm.salePrices" placeholder="salePrices" style="width: 200px;"
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
      <el-table-column label="categoryId" prop="categoryId" align="center" />
      <el-table-column label="name" prop="name" align="center" />
      <el-table-column label="weight" prop="weight" align="center" />
      <el-table-column label="width" prop="width" align="center" />
      <el-table-column label="height" prop="height" align="center" />
      <el-table-column label="length" prop="length" align="center" />
      <el-table-column label="unitQuantity" prop="unitQuantity" align="center" />
      <el-table-column label="unit" prop="unit" align="center" />
      <el-table-column label="color" prop="color" align="center" />
      <el-table-column label="brandCode" prop="brandCode" align="center" />
      <el-table-column label="images" prop="images" align="center" />
      <el-table-column label="keyword" prop="keyword" align="center" />
      <el-table-column label="refers" prop="refers" align="center" />
      <el-table-column label="purchasePrices" prop="purchasePrices" align="center" />
      <el-table-column label="salePrices" prop="salePrices" align="center" />
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
        <el-form-item label="categoryId" prop="categoryId">
          <el-select v-model="temp.categoryId" />
        </el-form-item>
        <el-form-item label="name" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="weight" prop="weight">
          <el-input v-model="temp.weight" />
        </el-form-item>
        <el-form-item label="width" prop="width">
          <el-input v-model="temp.width" />
        </el-form-item>
        <el-form-item label="height" prop="height">
          <el-input v-model="temp.height" />
        </el-form-item>
        <el-form-item label="length" prop="length">
          <el-input v-model="temp.length" />
        </el-form-item>
        <el-form-item label="unitQuantity" prop="unitQuantity">
          <el-input v-model="temp.unitQuantity" />
        </el-form-item>
        <el-form-item label="unit" prop="unit">
          <el-select v-model="temp.unit" />
        </el-form-item>
        <el-form-item label="color" prop="color">
          <el-checkbox v-model="temp.color" />
        </el-form-item>
        <el-form-item label="brandCode" prop="brandCode">
          <el-input v-model="temp.brandCode" />
        </el-form-item>
        <el-form-item label="images" prop="images">
          <el-input v-model="temp.images" />
        </el-form-item>
        <el-form-item label="keyword" prop="keyword">
          <el-input v-model="temp.keyword" />
        </el-form-item>
        <el-form-item label="refers" prop="refers">
          <el-input v-model="temp.refers" />
        </el-form-item>
        <el-form-item label="purchasePrices" prop="purchasePrices">
          <el-input v-model="temp.purchasePrices" />
        </el-form-item>
        <el-form-item label="salePrices" prop="salePrices">
          <el-input v-model="temp.salePrices" />
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
  api_collection_page,
  api_collection_post,
  api_collection_put
} from '@/api/leo-collection'
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
      queryForm: {
        images: '',
        color: '',
        salePrices: '',
        unit: '',
        refers: '',
        name: '',
        purchasePrices: '',
        keyword: '',
        brandCode: ''
      },
      temp: {
        images: '',
        color: '',
        salePrices: '',
        unit: '',
        refers: '',
        name: '',
        purchasePrices: '',
        keyword: '',
        brandCode: ''
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
      api_collection_page(this.queryForm).then((response) => {
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
          api_collection_post(this.temp).then(() => {
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
          api_collection_put(this.temp).then(() => {
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
