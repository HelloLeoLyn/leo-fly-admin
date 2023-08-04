<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-input v-model="queryForm.id" placeholder="id" style="width: 200px;"
          class="filter-item" />
        <el-input v-model="queryForm.productId" placeholder="productId" style="width: 200px;"
          class="filter-item" />
        <el-input v-model="queryForm.platform" placeholder="platform" style="width: 200px;"
          class="filter-item" />
        <el-input v-model="queryForm.subject" placeholder="subject" style="width: 200px;"
          class="filter-item" />
        <el-input v-model="queryForm.images" placeholder="images" style="width: 200px;"
          class="filter-item" />
        <el-input v-model="queryForm.mainImage" placeholder="mainImage" style="width: 200px;"
          class="filter-item" />
        <el-input v-model="queryForm.tag" placeholder="tag" style="width: 200px;"
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
      <el-table-column label="platform" prop="platform" align="center" />
      <el-table-column label="subject" prop="subject" align="center" />
      <el-table-column label="Actions" align="center" width="230"
        class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="danger" @click="handleToSend(row)">
            上传
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

  </div>
</template>

<script>
import {
  api_goods_page,
  api_goods_post,
  api_goods_delete
} from '@/api/leo-goods'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'LeoGoodsIndex',
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
        mainImage: '',
        subject: '',
        tag: '',
        platform: ''
      },
      temp: { images: '', mainImage: '', subject: '', tag: '', platform: '' },
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
      api_goods_page(this.queryForm).then((response) => {
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
          api_goods_post(this.temp).then(() => {
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
    handleToSend(row) {
      this.$router.push('/leo-goods/post?goodsId=' + row.id)
      localStorage.setItem('goods_' + row.id, JSON.stringify(row))
    },
    handleDelete(row, index) {
      api_goods_delete(row.id).then((res) => {
        if (res.code == 200) {
          this.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 2000
          })
          this.list.splice(index, 1)
        }
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
