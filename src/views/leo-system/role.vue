<template>
  <div class="app-container">
    <div>
      <el-input v-model="listQuery.name" placeholder="角色名称" style="width: 200px"></el-input>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-add" @click="search">
        search</el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-add" @click="add()">add
      </el-button>
    </div>

    <el-table ref="multipleTable" :key="tableKey" v-loading="listLoading" :data="list" border fit
      highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55px"> </el-table-column>
      <el-table-column label="角色名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="备注" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="200px" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="linkRoleMenu(scope.row.id)">角色权限</el-button>
          <el-button type="text" size="small" @click="edit(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.current"
      :limit.sync="listQuery.size" @pagination="search" />

    <el-dialog :visible="dialogvisible" @close="dialogvisible = false">
      <el-form v-model="sysRole">
        <el-form-item label="name" label-width="100px">
          <el-input v-model="sysRole.name"></el-input>
        </el-form-item>
        <el-form-item label="remark" label-width="100px">
          <el-input v-model="sysRole.remark"></el-input>
        </el-form-item>
      </el-form>

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-add" @click="onSubmit">提交
      </el-button>
    </el-dialog>
    <el-dialog :visible="roleDeptDialog" @close="roleDeptDialog = false">
      <div style="text-align: center">
        <el-transfer style="text-align: left; display: inline-block" v-model="value" filterable
          :render-content="renderFunc" :titles="['可选机构网点', '已选机构网点']" :button-texts="['移除', '选择']"
          :format="{
            noChecked: '${total}',
            hasChecked: '${checked}/${total}',
          }" @change="handleChange" :data="data">
        </el-transfer>
      </div>

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-add"
        @click="roleDeptSaveBatch">提交</el-button>
    </el-dialog>

    <el-dialog :visible="roleMenuDialog" @close="roleMenuDialog = false">
      <el-tree :data="roleMenus" show-checkbox node-key="id" ref="tree" default-expand-all
        :expand-on-click-node="false" :default-checked-keys="checkedRoleMenus"
        @check-change="getCheckedRoleMenusKeys">
        <span class="custom-tree-node" slot-scope="{ node }">
          <span>{{ node.data.title }}</span>
        </span>
      </el-tree>

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-add"
        @click="saveRoleMenus">提交</el-button>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import {
  api_role_post,
  api_role_put,
  api_role_delete,
  api_menu_get_by_parent,
  api_role_dept_get_by_role,
  api_role_menu_get_by_role,
  api_role_dept_post_batch,
  api_role_menu_put,
  api_dept_list,
  api_role_page
} from '@/api/leo-sys'
export default {
  directives: { waves },
  name: 'LeoSystemRole',
  components: { Pagination },
  data() {
    const generateData = () => {
      const data = []
      api_dept_list({}).then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          data.push({
            key: res.data[i].id,
            label: res.data[i].name
          })
        }
      })
      return data
    }
    return {
      dialogvisible: false,
      roleDeptDialog: false,
      roleMenuDialog: false,
      option: '',
      list: null,
      tableKey: 0,
      total: 0,
      listLoading: false,
      sysRole: { id: null, name: null, remark: null, delFlag: null },
      listQuery: {
        name: '',
        current: 1,
        size: 10,
        delFlag: 0
      },
      sysRoleDept: {
        id: null,
        roleId: null,
        deptId: null
      },
      roleId: 0,
      multipleSelection: [],
      checkedRoleMenus: [],
      data: generateData(),
      roleMenus: [],
      value: [1],
      renderFunc(h, option) {
        return (
          <span>
            {option.key} - {option.label}
          </span>
        )
      }
    }
  },

  created() {
    this.search()
    api_menu_get_by_parent(0).then((menus) => {
      this.roleMenus = menus.data
    })
  },
  methods: {
    async roleDeptSaveBatch() {
      let list = []
      await this.value.forEach((e) => {
        list.push({ roleId: this.sysRoleDept.roleId, deptId: e })
      })
      api_role_dept_post_batch(list)
    },
    async saveRoleMenus() {
      let keys = this.getCheckedRoleMenusKeys()
      let roleMenus = []
      await keys.forEach((menuId) => {
        roleMenus.push({ roleId: this.roleId, menuId: menuId })
      })
      api_role_menu_put(this.roleId, roleMenus)
      this.roleMenuDialog = false
    },
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
    },

    linkRoleDept(id) {
      this.roleDeptDialog = true
      this.sysRoleDept.roleId = id
      this.roleId = id
      this.value = []
      api_role_dept_get_by_role(id).then((res) => {
        res.data.forEach((element) => {
          this.value.push(element.deptId)
        })
      })
    },
    linkRoleMenu(id) {
      this.roleMenuDialog = true
      this.sysRoleDept.roleId = id
      this.roleId = id
      this.getRoleMenusByRoleId(id).then((res) => {
        this.$refs.tree.setCheckedKeys([])
        this.checkedRoleMenus = res
      })
    },

    async getRoleMenusByRoleId(id) {
      return new Promise(function (resolve) {
        let checkedRoleMenus = []
        api_role_menu_get_by_role(id).then((menus) => {
          menus.data.forEach((e) => {
            checkedRoleMenus.push(e.menuId)
          })
          resolve(checkedRoleMenus)
        })
      })
    },
    search() {
      api_role_page(this.listQuery).then((res) => {
        this.list = res.data.records
        this.total = res.data.total
      })
    },

    onSubmit() {
      if (this.option == 'add') {
        api_role_post(this.sysRole).then((res) => {
          this.$message.success(res.msg)
          this.search()
          this.dialogvisible = false
        })
      } else if (this.option == 'update') {
        api_role_put(this.sysRole).then((res) => {
          this.$message.success(res.msg)
          this.dialogvisible = false
          this.search()
        })
      }
    },

    add(row) {
      this.dialogvisible = true
      this.option = 'add'
      this.sysRole = {}
      if (row) {
        this.sysRole.parentId = row.id
      }
    },

    edit(row) {
      this.dialogvisible = true
      this.option = 'update'
      this.sysRole = row
    },

    del(id) {
      api_role_delete(id).then((res) => {
        this.$message.success(res.msg)
        this.search()
      })
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    getCheckedRoleMenusKeys() {
      return this.$refs.tree.getCheckedKeys()
    }
  }
}
</script>