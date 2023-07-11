<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-input v-model="queryForm.description" :placeholder="$t('common.description')"
          style="width: 200px;" class="filter-item" clearable />
        <el-select class="filter-item" v-model="queryForm.status" clearable
          :placeholder="$t('common.select')">
          <el-option v-for="v,k in work_status" :key="k" :label="v" :value="k" />
        </el-select>
        <el-date-picker class="filter-item" v-model="queryForm.start" value-format="yyyyMMdd"
          :format="$t('format.yyyyMMdd')" clearable />

        <el-date-picker class="filter-item" v-model="queryForm.end" value-format="yyyyMMdd"
          :format="$t('format.yyyyMMdd')" clearable />

        <!-- <el-input v-model="queryForm.referNo" placeholder="referNo" style="width: 200px;"
          class="filter-item" clearable /> -->
        <el-select v-model="queryForm.type" :placeholder="$t('table.type')" style="width: 200px;"
          clearable class="filter-item">
          <el-option v-for="v,k in works_type" :key="k" :label="v" :value="k" />
        </el-select>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search"
          @click="handleFilter">
          {{$t('common.search')}}
        </el-button>
      </el-row>
      <el-row>
        <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">
          {{$t('common.add')}}
        </el-button>
        <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary"
          icon="el-icon-download" @click="handleDownload">
          {{$t('common.export')}}
        </el-button>
      </el-row>
    </div>

    <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit style="width: 100%;"
      @sort-change="sortChange" @selection-change="checked_list"
      :row-class-name="tableRowClassName">
      <el-table-column type="selection" width="55" />
      <el-table-column :label="$t('table.id')" prop="id" />
      <el-table-column :label="$t('table.type')" prop="type" align="center"
        :formatter="row=>works_type[row.type]">
      </el-table-column>
      <el-table-column :label="$t('table.status')" prop="status" align="center"
        :formatter="row=>work_status[row.status]" />
      <el-table-column :label="$t('table.start')" prop="start" align="center" />
      <el-table-column :label="$t('table.end')" prop="end" align="center" />
      <el-table-column :label="$t('table.referNo')" prop="referNo" align="center" />
      <el-table-column :label="$t('table.description')" prop="description" align="center" />
      <el-table-column :label="$t('table.actions')" align="center" width="230"
        class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleDo(row)" plain>
            {{$t('common.next')}}
          </el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(row)" plain>
            {{$t('common.edit')}}
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger"
            @click="handleDelete(row,$index)" plain>
            {{$t('common.delete')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="queryForm.current"
      :limit.sync="queryForm.size" @pagination="doPage" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="1000">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px"
        style="width: 400px; margin-left:50px;">
        <el-form-item label="type" prop="type">
          <el-select v-model="temp.type">
            <el-option v-for="v,k in works_type" :key="k" :label="v" :value="k" />
          </el-select>
        </el-form-item>
        <el-form-item label="description" prop="description">
          <el-input type="textarea" v-model="temp.description" :rows="3" style="width:100%" />
        </el-form-item>
        <el-form-item label="start" prop="start">
          <el-date-picker v-model="temp.start" type="date" placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日" value-format="yyyyMMdd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="end" prop="end">
          <el-date-picker v-model="temp.end" type="date" placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日" value-format="yyyyMMdd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="referNo" prop="referNo">
          <el-input v-model="temp.referNo" />
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
    <el-dialog title="Work Flow" :visible.sync="workFlowDialogVisible" width="1000">
      <el-form ref="dataForm" :model="workFlow" label-position="left" label-width="120px">
        <el-form-item label="type" prop="type">
          <el-input v-model="works_type[workFlow.type]" readonly />
        </el-form-item>
        <el-form-item label="description" prop="description">
          <el-input type="textarea" v-model="workFlow.description" :rows="3" readonly />
        </el-form-item>
        <el-form-item label="start" prop="start">
          <el-date-picker v-model="workFlow.start" type="date" placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日" value-format="yyyyMMdd" readonly>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="end" prop="end">
          <el-date-picker v-model="workFlow.end" type="date" placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日" value-format="yyyyMMdd" readonly>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="referNo" prop="referNo">
          <el-input v-model="workFlow.referNo" readonly />
        </el-form-item>
        <el-form-item label="Current Status" prop="next">
          <el-input v-model="work_status[workFlow.oldStatus]" style="width:200px;" readonly />
          --Next Status
          <el-select v-model="workFlow.status">
            <el-option v-for="status in work_flow_next[workFlow.oldStatus]" :value="status"
              :key="status" :label="work_status[status]" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="workFlow.show = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="setWorkFlow()">
          Confirm
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  api_work_page,
  api_work_post,
  api_work_put,
  api_work_delete
} from '@/api/leo-work'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { works_type, work_status, work_flow_next } from '@/utils/dict'
export default {
  name: 'LeoWorkIndex',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      work_status,
      checked_list: [],
      list: null,
      total: 0,
      listLoading: true,
      queryForm: {
        start: '',
        description: '',
        end: '',
        type: '',
        refer_no: '',
        size: 10,
        current: 1
      },
      works_type,
      work_flow_next,
      temp: {
        start: '',
        description: '',
        end: '',
        type: '',
        refer_no: '',
        status: 0
      },
      workFlow: {
        start: '',
        description: '',
        end: '',
        type: '',
        refer_no: '',
        status: null
      },
      workFlowDialogVisible: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        start: [{ required: true, message: '请选择起始日期', trigger: 'blur' }],
        end: [{ required: true, message: '请选择结束日期', trigger: 'blur' }]
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
      api_work_page(this.queryForm).then((response) => {
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
      this.temp.status = 0
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
          api_work_post(this.temp).then(() => {
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
      this.resetTemp()
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDo(row) {
      Object.keys(this.workFlow).forEach((key) => {
        this.workFlow[key] = null
      })
      this.workFlow = Object.assign({}, row) // copy obj
      this.workFlowDialogVisible = true
      this.workFlow.timestamp = new Date(this.temp.timestamp)
      this.workFlow.oldStatus = this.workFlow.status
    },
    setWorkFlow() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          api_work_put(this.workFlow).then(() => {
            const index = this.list.findIndex((v) => v.id === this.workFlow.id)
            console.log(this.workFlow, index)
            // this.list.splice(index, 1, this.workFlow)
            this.$set(this.list, index, Object.assign({}, this.workFlow))
            this.workFlowDialogVisible = false
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
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          api_work_put(this.temp).then(() => {
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
      api_work_delete(row.id).then(() => {
        this.$notify({
          title: 'Success',
          message: 'Delete Successfully',
          type: 'success',
          duration: 2000
        })
        this.list.splice(index, 1)
      })
    },

    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then((excel) => {
        const tHeader = ['id', 'status', 'type']
        const filterVal = ['id', 'status', 'type']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
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
    },

    tableRowClassName({ row }) {
      if (row.status === 60) {
        return 'leo-background-warning'
      } else if (row.status === 50 || row.status === 70) {
        return 'leo-background-fail'
      } else if (row.status === 90) {
        return 'leo-background-success'
      } else {
        return 'leo-background-normal'
      }
    }
  }
}
</script>
