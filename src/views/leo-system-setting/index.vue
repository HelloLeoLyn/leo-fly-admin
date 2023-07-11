<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-input v-model="queryForm.key" placeholder="key" style="width: 200px;"
          class="filter-item" />
        <el-input v-model="queryForm.value" placeholder="value" style="width: 200px;"
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
      </el-row>
    </div>

    <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row
      style="width: 100%;" @sort-change="sortChange">
      <el-table-column label="key" prop="key" align="center" />
      <el-table-column label="value" prop="value" align="center" />
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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="60%">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left"
        label-width="120px">
        <el-form-item label="key" prop="key">
          <el-input v-model="tempKey" />
        </el-form-item>
        <el-form-item label="Value Type" prop="dataType">
          <el-select v-model="temp.dataType" @change="handleValueTypeChage()">
            <el-option value="String" label="String" />
            <el-option value="Array" label="Array" />
            <el-option value="Object" label="Object" />
          </el-select>
        </el-form-item>
        <el-table v-if="temp.dataType==='Array'" :data="temp.value">
          <el-table-column width="55">
            <template slot-scope="{$index}">
              {{$index}}
            </template>
          </el-table-column>
          <el-table-column label="row">
            <template slot-scope="{$index}">
              <el-input v-if="typeof temp.value[$index] == 'string'" v-model="temp.value[$index]" />
              <el-row v-else>
                <el-col :span="4" v-for="key in Object.keys(temp.value[$index])" :key="key">
                  <el-input placeholder="key" :ref="$index+'k'+key"
                    v-model="temp.value[$index][key].key" size="mini" />
                  <el-input placeholder="value" v-model="temp.value[$index][key].value"
                    size="mini" />
                  <el-button @click="addAttr($index)" size="mini" type="text">add</el-button>
                  <el-button @click="delAttr($index,key)" size="mini" type="text">del</el-button>
                  <el-button @click="clearAttr($index,key)" size="mini" type="text">clear
                  </el-button>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column label="action" fixed="right" align="center"
            class-name="small-padding fixed-width" width="120">
            <template slot-scope="{$index}">
              <el-row>
                <el-button size="mini" type="text" @click="addRow()">addRow</el-button>
              </el-row>
              <el-row>
                <el-button size="mini" type="text" @click="delRow($index)">delRow</el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
        <el-form-item v-else-if="temp.dataType==='Object'">
          <el-row v-for="attr,key in valueObject" :key="key">
            <el-col :span="8">
              <el-input size="mini" v-model="attr.key" style="width:%50;" placeholder="key"
                :ref="key+'obj'" />
            </el-col>
            <el-col :span="8">
              <el-input size="mini" v-model="attr.value" style="width:%50;" placeholder="value" />
            </el-col>
            <el-col :span="4">
              <el-button type="text" size="mini" @click="addObjAttr(key)">add attr</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item v-else label="value" prop="value">
          <el-input type="textarea" v-model="temp.value" :row="3" />
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
  api_system_setting_page,
  api_system_setting_post,
  api_system_setting_put
} from '@/api/leo-system-setting'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'LeoSystemSetting',
  components: { Pagination },
  directives: { waves },
  filters: {},
  data() {
    return {
      rowTemp: [{ key: '', value: '' }],
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      queryForm: { value: '', key: '' },
      temp: { value: '', key: '', dataType: '' },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {},
      downloadLoading: false,
      valueArray: [],
      valueObject: []
    }
  },
  created() {
    this.doPage()
  },
  computed: {
    tempKey: {
      get: function () {
        return this.temp.key
      },
      set: function (val) {
        this.temp.key = val.toUpperCase()
      }
    }
  },
  methods: {
    addAttr(rowIndex) {
      const attr_list = this.temp.value[rowIndex]
      const index = attr_list.findIndex((attr) => {
        return attr.key == ''
      })
      if (index == -1) {
        this.temp.value[rowIndex].push({ key: '', value: '' })
      } else {
        this.$message.error('key is null')
        this.$refs[rowIndex + 'k' + index][0].focus()
      }
    },
    delAttr(rowIndex, key) {
      if (this.temp.value[rowIndex].length == 1) {
        this.clearAttr(rowIndex, key)
      } else {
        this.temp.value[rowIndex].splice(key, 1)
      }
    },
    clearAttr(rowIndex, key) {
      const attr = this.temp.value[rowIndex][key]
      attr.key = ''
      attr.value = ''
    },
    addRow() {
      if (this.rowTemp === '') {
        this.temp.value.push('')
      } else {
        this.temp.value.push(Object.assign(this.rowTemp))
      }
    },
    delRow(index) {
      this.temp.value.splice(index, 1)
    },
    addObjAttr() {
      const index = this.valueObject.findIndex((attr) => {
        return attr.key == ''
      })
      if (index == -1) {
        this.valueObject.push({ key: '', value: '' })
      } else {
        this.$message.error('key is null')
        this.$refs[index + 'obj'][0].focus()
      }
    },
    handleValueTypeChage() {
      this.valueArray = [[{ key: '', value: '' }]]
    },
    doPage() {
      this.listLoading = true
      api_system_setting_page(this.queryForm).then((response) => {
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
      this.temp.dataType = 'Array'
      this.temp.value = [[{ key: '', value: '' }]]
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.value = JSON.stringify(this.temp.value)
          api_system_setting_post(this.temp).then(() => {
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
      if (this.temp.dataType == 'Array') {
        this.temp.value = JSON.parse(this.temp.value)
        if (typeof this.temp.value[0] == 'string') {
          this.rowTemp = ''
        } else {
          this.rowTemp = [{ key: '', value: '' }]
        }
      }
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
          const { value, key, dataType } = this.temp
          const data = {
            value: JSON.stringify(value),
            key,
            dataType
          }
          api_system_setting_put(data).then(() => {
            this.temp.value = JSON.stringify(this.temp.value)
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
    }
  }
}
</script>
