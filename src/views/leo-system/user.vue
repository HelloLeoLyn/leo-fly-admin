<template>
  <div class="app-container">
    <div>
      <el-input v-model="listQuery.name" placeholder="名称" style="width: 200px"></el-input>
      <el-button v-waves class="filter-item" type="primary" @click="search">
        查询</el-button>
      <el-button v-waves class="filter-item" type="primary" @click="handleAddClick">
        新增用户</el-button>
    </div>

    <el-table ref="multipleTable" :key="tableKey" v-loading="listLoading" :data="list" border fit
      highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55px"> </el-table-column>

      <el-table-column label="name" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="$router.push('detail/'+scope.row.id)">
            <span>{{ scope.row.name }}</span></el-button>
        </template>
      </el-table-column>
      <el-table-column label="role" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editUserRoles(scope.row)">修改权限</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="200px" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="onSubmitdeleteUser(scope.row,scope.$index)">删除
          </el-button>
          <el-button type="text" size="small" @click="edit(scope.row)">修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.current"
      :limit.sync="listQuery.size" @pagination="search" />
    <el-dialog :visible="userRoleVisible" @close="closeUserRole()">
      <div style="text-align: center">
        <el-transfer style="text-align: left; display: inline-block" v-model="checkedRoles"
          filterable :render-content="renderFunc" :titles="['可选角色', '已选角色']"
          :button-texts="['移除', '选择']" :format="{
            noChecked: '${total}',
            hasChecked: '${checked}/${total}',
          }" @change="handleChange" :data="roles">
        </el-transfer>
      </div>

      <el-button v-waves class="filter-item" type="primary" @click="saveUserRolesSubmit">提交
      </el-button>
    </el-dialog>
    <el-dialog :visible="dialogvisible" @close="dialogvisible = false">
      <el-form v-model="sysUser" label-width="120px" style="width:800px">

        <el-form-item label="name">
          <el-input v-model="sysUser.name"></el-input>
        </el-form-item>
        <el-form-item label="password">
          <el-input v-model="sysUser.password"></el-input>
        </el-form-item>
        <el-form-item label="email">
          <el-input v-model="sysUser.email"></el-input>
        </el-form-item>
        <el-form-item label="mobile">
          <el-input v-model="sysUser.mobile"></el-input>
        </el-form-item>
        <el-form-item label="platform">
          <el-input v-model="sysUser.platform"></el-input>
        </el-form-item>
        <el-button @click="onSubmitUser">提交</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import {
  api_user_page,
  api_role_list,
  api_user_role_batch_save,
  api_user_role_get_by_userid,
  api_user_post,
  api_user_delete
} from '@/api/leo-sys'
export default {
  directives: { waves },
  name: 'LeoSystemUser',
  components: { Pagination },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      value: [],
      data: [],
      checkedRoles: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1
      },
      dialogvisible: false,
      userRoleVisible: false,
      list: null,
      tableKey: 0,
      total: 0,
      listLoading: false,
      sysUser: {
        id: null,
        name: null,
        password: null,
        salt: null,
        email: null,
        mobile: null,
        status: null,
        delFlag: null,
        headerUrl: null,
        signDate: null,
        isVip: null,
        vipExpires: null,
        inviteId: null,
        deviceId: null,
        platform: null
      },
      listQuery: {
        id: '',
        name: '',
        current: 1,
        size: 20
      },
      multipleSelection: [],
      roles: [],
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
  },
  methods: {
    saveUserRolesSubmit() {
      let userRoles = []
      this.checkedRoles.forEach((roleId) => {
        userRoles.push({ userId: this.sysUser.id, roleId })
      })
      api_user_role_batch_save(userRoles, this.sysUser.id).then((res) => {
        this.$message.success(res.msg)
        this.userRoleVisible = false
      })
    },
    editUserRoles(row) {
      this.userRoleVisible = true
      this.sysUser = row
      this.getRoles()
      this.getUserRolesByUserId(row.id).then((res) => {
        this.checkedRoles = res
      })
    },
    async getUserRolesByUserId(userId) {
      return new Promise(function (resolve) {
        let checkedRoles = []
        api_user_role_get_by_userid(userId).then((menus) => {
          menus.data.forEach((e) => {
            checkedRoles.push(e.roleId)
          })
          resolve(checkedRoles)
        })
      })
    },
    getRoles() {
      this.roles = []
      api_role_list({ delFlag: 0 }).then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          console.log(res.data[i])
          this.roles.push({
            key: res.data[i].id,
            label: res.data[i].name
          })
        }
      })
    },
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
    },
    getCheckedNodes() {
      console.log(this.$refs.tree.getCheckedNodes())
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys())
    },
    setCheckedNodes() {
      this.$refs.tree.setCheckedNodes([
        {
          id: 5,
          label: '二级 2-1'
        },
        {
          id: 9,
          label: '三级 1-1-1'
        }
      ])
    },
    setCheckedKeys() {
      this.$refs.tree.setCheckedKeys([3])
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([])
    },
    edit(item) {
      this.dialogvisible = true
      this.sysUser = item
    },
    onSubmitdeleteUser(item, index) {
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          api_user_delete(item.id).then((res) => {
            if (res.code === '200') {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.list.splice(index, 1)
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    closeUserRole() {
      this.userRoleVisible = false
      //   this.$refs.mainIframe.contentWindow.reload()
    },

    search() {
      api_user_page(this.listQuery).then((res) => {
        this.list = res.data.records
        this.total = res.data.total
      })
    },
    handleAddClick() {
      this.dialogvisible = !this.dialogvisible
      Object.keys(this.sysUser).forEach((key) => {
        this.sysUser[key] = ''
      })
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    onSubmitUser() {
      api_user_post(this.sysUser).then(({ data }) => {
        this.$notify.success('添加成功')
        this.dialogvisible = false
        console.log(data)
        this.list.push(data)
      })
    }
  }
}
</script>