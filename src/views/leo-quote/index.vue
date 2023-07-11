<template>
  <div class="app-container leo-quote">
    <div class="filter-container">
      <el-row>
        <el-input v-model="queryForm.title" placeholder="标题" style="width: 200px;"
          class="filter-item" />
        <el-input v-model="queryForm.customer" placeholder="客户" style="width: 200px;"
          class="filter-item" />
        <el-input v-model="queryForm.operator" placeholder="操作人" style="width: 200px;"
          class="filter-item" />
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search"
          @click="handleFilter">
          查询
        </el-button>
      </el-row>
      <el-row style="text-align:right;">
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
          @click="handleCreate();">
          新增
        </el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
          @click="handleBatchCreate();">
          批量新增
        </el-button>
      </el-row>
    </div>

    <el-dialog title="批量导入" :visible.sync="batchImportDialog.show" width="80%">
      <leo-batch-import :key="batchImportDialog.key" @onConfirm="onbatchImportConfim" />
    </el-dialog>

    <!-- 用户选择 -->
    <el-dialog title="用户选择" :visible.sync="usersDialogVisible">
      <el-input style="width:400px" v-model="usersDialog.name"></el-input>
      <el-button @click="doUserPage">查询</el-button>
      <el-table :data="usersDialog.tableData">
        <el-table-column label="客户名称" prop="name" />
        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button @click="onConfirmUser(row)">确认</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="usersDialog.total>0" :total="usersDialog.total"
        :page.sync="usersDialog.form.current" :limit.sync="usersDialog.form.size"
        @pagination="doUserPage" />
    </el-dialog>

    <!-- 报价新增或修改 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible"
      @close="workTaskDialogShow=false">
      <el-form ref="dataForm" :model="temp" :rules="dataFormRules" label-position="left"
        label-width="120px" style="width: 600px; margin-left:50px;">
        <el-form-item label="报价单号" prop="seq">
          <el-input v-model="temp.seq" />
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item v-if="temp.addModel=='single'" label="oe" prop="code">
          <el-input v-model="temp.code" />
        </el-form-item>
        <el-form-item v-if="temp.addModel=='single'" label="数量" prop="quantity">
          <el-input v-model="temp.quantity" type="number" />
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="temp.type">
            <el-option label="普通报价" value="N" />
            <el-option label="任务报价" value="T" />
          </el-select>
        </el-form-item>
        <el-form-item label="客户" prop="customer">
          <el-input v-model="temp.customer">
            <template slot="append">
              <el-tooltip class="item" effect="dark" content="点击可查询系统客户" placement="top-start">
                <el-button @click="usersDialogVisible=true" class="el-icon-question" />
              </el-tooltip>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="temp.type=='T'" label="报价人" prop="operator">
          <el-select @change="checkOperator" v-model="temp.operatorObj">
            <el-option v-for="item,key in quoter" :key="key" :label="item.name"
              :value="JSON.stringify(item)" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="temp.remark" :row="5" />
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button v-show="temp.addModel" @click="dialogFormVisible = false">
          Cancel/取消
        </el-button>
        <el-button v-if="temp.type=='N'" type="primary" @click="updateData()">
          Confirm/确认
        </el-button>
        <el-button v-else-if="temp.type=='T'" type="primary" @click="quoteTaskNext">
          next/下一步
        </el-button>
      </div>
    </el-dialog>

    <leo-new-task workType="40" :key="workTaskDialogKey" :workTaskDialog="workTaskDialogShow"
      :worKTypeReadonly="true" :confirmBtnTxt="confirmBtnTxt" :referNo="temp.seq"
      @childCloseDialog="workTaskDialogShow=false" @onWorkDialogConfirm="onWorkDialogConfirm" />

    <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row
      style="width: 100%;" @sort-change="sortChange">
      <el-table-column label="id" prop="id" align="center" />
      <el-table-column label="标题" prop="title" align="center" />
      <el-table-column label="客户" prop="customer" align="center" />
      <el-table-column label="报价人" prop="operator" align="center" />
      <el-table-column label="状态" prop="status" align="center">
        <template slot-scope="{row}">
          <el-button type="text" @click="$router.push(`do-quote/${row.id}`)">
            {{quote_dict.status_map[row.status]}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="报价类型" prop="type" align="center"
        :formatter="(row)=>quote_dict.type_map[row.type]" />
      <el-table-column label="备注" prop="remark" align="center" />
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button v-if="row.status<99" size="mini" type="danger"
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
<style lang="scss" >
.leo-quote {
  .leo-table-cell {
    &-oe {
      background-color: aqua;
    }
    &-remark {
      background-color: rgb(217, 255, 0);
    }
    &-quatity {
      background-color: rgb(234, 125, 195);
    }
  }
}
</style>
<script>
import { quote_dict } from '@/utils/dict'
import {
  api_quote_page,
  api_quote_put,
  api_quote_seq_get,
  api_quote_delete
} from '@/api/leo-quote'
import { api_user_by_menuId, api_user_page } from '@/api/leo-sys'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import LeoNewTask from '@/views/leo-work/components/LeoNewTask.vue'
import LeoBatchImport from '@/views/leo-quote/components/LeoBatchImport.vue'
export default {
  name: 'LeoQuoteIndex',
  components: { Pagination, UploadExcelComponent, LeoNewTask, LeoBatchImport },
  directives: { waves },
  filters: {},
  data() {
    return {
      taskWorkData: {},
      workTaskDialogShow: false,
      workTaskDialogKey: 20000,
      quote_dict,
      quoter: [],
      confirmBtnTxt: '下一步',
      batchImportDialog: {
        show: false,
        tableData: [],
        tableHeader: [],
        key: 10001,
        oeIndex: -1,
        remarkIndex: -1,
        quatityIndex: -1
      },
      usersDialog: {
        total: 0,
        form: { size: 10, current: 1, name: '' },
        tableData: []
      },
      usersDialogVisible: false,
      tableKey: 50000,
      list: null,
      total: 0,
      listLoading: true,
      queryForm: {
        size: 10,
        current: 1,
        status: { val: 0, model: 'gt' },
        operator: '',
        remark: '',
        title: '',
        type: '',
        customer: ''
      },
      temp: {
        operator: '',
        operatorId: '',
        operatorObj: '',
        remark: '',
        title: '',
        status: '',
        type: '',
        customer: '',
        addModel: 'single',
        code: '',
        quantity: 0
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      downloadLoading: false,
      dataFormRules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { max: 255, trigger: 'blur' }
        ],
        quantity: [{ required: true, message: '请输入数量', trigger: 'blur' }],
        code: [
          { required: true, message: '请输入号码', trigger: 'blur' },
          { min: 4, max: 13, trigger: 'blur' }
        ],
        type: [{ required: true, message: '请输入报价类型', trigger: 'blur' }],
        customer: [{ required: true, message: '请输入客户', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.doPage()
    this.doUserPage()
    api_user_by_menuId('28').then((res) => {
      this.quoter = res.data
    })
  },
  methods: {
    onConfirmUser(row) {
      this.temp.customer = row.name
      this.usersDialogVisible = false
      this.$refs['dataForm'].clearValidate()
    },
    onbatchImportConfim(data) {
      this.resetTemp()
      this.batchImportDialog.show = false
      this.batchImportDialog.key = this.batchImportDialog.key + 1
      this.dialogStatus = '批量导入'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      api_quote_seq_get().then((res) => {
        this.temp = res.data
        this.temp.items = data
        this.temp.addModel = 'batch'
        this.temp.status = quote_dict.next_flow[res.data.status][1]
      })
    },

    checkOperator(e) {
      const oper = JSON.parse(e)
      this.temp.operator = oper.name
      this.temp.operatorId = oper.id
    },
    quoteTaskNext() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.workTaskDialogShow = true
          this.workTaskDialogKey = this.workTaskDialogKey + 1
          this.confirmBtnTxt = 'confirm'
        } else {
          return false
        }
      })
    },

    onWorkDialogConfirm(work) {
      this.temp.work = work
      if (this.temp.addModel == 'Batch') {
        this.batchImportDialog.show = true
        this.workTaskDialogShow = false
      } else {
        const items = [
          {
            quoteId: this.temp.id,
            code: this.temp.code,
            quantity: this.temp.quantity
          }
        ]
        this.temp.items = items
        api_quote_put(this.temp).then(() => {
          this.doPage()
          this.dialogFormVisible = false
          this.$notify({
            title: 'Success',
            message: 'Update Successfully',
            type: 'success',
            duration: 2000
          })
        })
      }
    },

    doUserPage() {
      api_user_page(this.usersDialog.form).then((res) => {
        this.usersDialog.total = res.data.total
        this.usersDialog.tableData = res.data.records
      })
    },

    doPage() {
      this.listLoading = true
      api_quote_page(this.queryForm).then((response) => {
        this.list = response.data.records
        this.total = response.data.total
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

    handleBatchCreate() {
      this.batchImportDialog.show = true
      this.batchImportDialog.key = this.batchImportDialog.key + 1
    },

    handleCreate() {
      this.resetTemp()
      this.workTaskDialogShow = false
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      api_quote_seq_get().then((res) => {
        this.temp = res.data
        this.temp.addModel = 'single'
        this.temp.status = quote_dict.next_flow[res.data.status][1]
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
          if (this.temp.addModel == 'single') {
            const items = [
              {
                quoteId: this.temp.id,
                code: this.temp.code,
                quantity: this.temp.quantity
              }
            ]
            this.temp.items = items
          } else {
            this.temp.items.forEach((item) => (item.quoteId = this.temp.id))
          }
          api_quote_put(this.temp).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
            this.doPage()
          })
        }
      })
    },
    handleDelete(row, index) {
      api_quote_delete(row.id).then(() => {
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
