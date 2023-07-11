<template>
  <div class="app-container">
    <div>
      <el-input v-model="listQuery.name" placeholder="subject" style="width: 200px"></el-input>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-add" @click="search">
        search</el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-add" @click="add()">add
      </el-button>
    </div>

    <el-table ref="multipleTable" :key="tableKey" v-loading="listLoading" :data="list" border fit
      highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55px"> </el-table-column>

      <el-table-column label="id" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="name" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="200px" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row)" v-show="1 == 1">edit
          </el-button>
          <el-button type="text" size="small" @click="add()" v-show="1 == 1">add</el-button>
          <el-button type="text" size="small" @click="del(scope.row.id)" v-show="1 == 1">del
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.current"
      :limit.sync="listQuery.size" @pagination="search" />

    <el-dialog :visible="dialogvisible" @close="dialogvisible = false">
      <el-form v-model="sysDept">
        <el-form-item label="id" label-width="100px">
          <el-input v-model="sysDept.id" readonly></el-input>
        </el-form-item>
        <el-form-item label="name" label-width="100px">
          <el-input v-model="sysDept.name"></el-input>
        </el-form-item>
        <el-form-item label="parentId" label-width="100px">
          <el-input v-model="sysDept.parentId"></el-input>
        </el-form-item>
        <el-form-item label="orderNum" label-width="100px">
          <el-input v-model="sysDept.orderNum"></el-input>
        </el-form-item>
        <el-form-item label="delFlag" label-width="100px">
          <el-input v-model="sysDept.delFlag"></el-input>
        </el-form-item>
      </el-form>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-add" @click="onSubmit">提交
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import {
  api_dept_page,
  api_dept_post,
  api_dept_put,
  api_dept_delete
} from '@/api/leo-sys'

export default {
  directives: { waves },
  name: 'filterMgt',
  components: { Pagination },
  data() {
    return {
      dialogvisible: false,
      option: '',
      list: null,
      tableKey: 0,
      total: 0,
      listLoading: false,
      sysDept: {
        id: null,
        name: null,
        parentId: null,
        orderNum: null,
        delFlag: null
      },
      listQuery: {
        name: '',
        current: 1,
        size: 10,
        delFlag: 0
      },
      multipleSelection: []
    }
  },

  created() {
    this.search()
  },
  methods: {
    search() {
      api_dept_page(this.listQuery).then((res) => {
        this.list = res.data.records
        this.total = res.data.total
      })
    },

    onSubmit() {
      if (this.option == 'add') {
        api_dept_post(this.sysDept).then((res) => {
          this.$message.success(res.msg)
          this.search()
        })
      } else if (this.option == 'update') {
        api_dept_put(this.sysDept).then((res) => {
          this.$message.success(res.msg)
          this.search()
        })
      }
    },
    add() {
      this.dialogvisible = true
      this.option = 'add'
      this.sysDept = {}
    },
    edit(row) {
      this.dialogvisible = true
      this.option = 'update'
      this.sysDept = row
    },
    del(id) {
      api_dept_delete(id).then((res) => {
        this.$message.success(res.msg)
        this.search()
      })
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>