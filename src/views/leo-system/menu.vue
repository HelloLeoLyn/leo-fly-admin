<template>
  <div class="custom-tree-container">
    <div>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-add" @click="search">
        search</el-button>
    </div>
    <div class="block">
      <el-table :data="data" style="width: 100%; margin-bottom: 20px" row-key="id" ref="singleTable"
        border :default-expand-all="false"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="name" label="name" sortable width="255"> </el-table-column>
        <el-table-column label="icon" width="80px">
          <template slot-scope="scope">
            <svg-icon :icon-class="scope.row.icon == null ? 'none' : scope.row.icon" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="title" sortable> </el-table-column>
        <el-table-column prop="hidden" label="hidden">
          <template slot-scope="{row}">
            <span>{{row.hidden}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="path" label="path" sortable> </el-table-column>
        <el-table-column label="component"><template slot-scope="scope">
            {{ scope.row.component }}
          </template>
        </el-table-column>
        <el-table-column align="right" width="280">
          <template slot="header">
            <el-button size="mini" @click="handleAdd()" type="primary">add</el-button>
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleAdd(scope.row)" type="primary">添加子菜单</el-button>
            <el-button size="mini" @click="handleEdit(scope.row)" type="warning">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :visible="dialogvisible" @close="dialogvisible = false">
      <el-form v-model="sysMenu">
        <el-form-item label="parentId" label-width="100px">
          <el-input v-model="sysMenu.parentId" readonly></el-input>
        </el-form-item>
        <el-form-item label="path" label-width="100px">
          <el-input v-model="sysMenu.path" @change="pathChange"
            placeholder="父节点前缀/leo-, eg:/leo-user，子节点直接写路径eg:edit">
            <template slot="prepend" v-if="sysMenu.parentId==0&&optionType=='add'">/leo-</template>
          </el-input>
        </el-form-item>
        <el-form-item label="name" label-width="100px">
          <el-input v-model="sysMenu.name" placeholder="首字母大写">
          </el-input>
        </el-form-item>
        <el-form-item label="title" label-width="100px">
          <el-input v-model="sysMenu.title" placeholder="中文名"></el-input>
        </el-form-item>
        <el-form-item label="hidden" label-width="100px">
          <el-select v-model="sysMenu.hidden" placeholder="hidden">
            <el-option label="否" :value="false"></el-option>
            <el-option label="是" :value="true"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="icon" label-width="100px">
          <el-input v-model="sysMenu.icon" style="width: 190px" />
          <svg-icon :icon-class="sysMenu.icon == null ? 'none' : sysMenu.icon" />
          <el-input v-model="keyword" @focus="
              iconsVisible = true
              handleFocus
            " style="width: 220px" placeholder="点击查找图标">
          </el-input>
          <div class="icons-container" v-show="iconsVisible">
            <div class="grid">
              <div v-for="item of iconsFliter(icons, keyword)" :key="item" @click="
                  sysMenu.icon = item;
                  iconsVisible = false;
                ">
                <el-tooltip placement="top">
                  <div slot="content">
                    {{ generateIconCode(item) }}
                  </div>
                  <div class="icon-item">
                    <svg-icon :icon-class="item" class-name="disabled" />
                    <span>{{ item }}</span>
                  </div>
                </el-tooltip>
              </div>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="component" label-width="100px">
          <el-input v-model="sysMenu.component" placeholder="父节点Layout 子节点资源路径 eg:leo-XXXX/XXX">
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="saveOrUpdate">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
import clipboard from '@/utils/clipboard'
import svgIcons from '@/views/icons/svg-icons'
import {
  api_menu_post,
  api_menu_put,
  api_menu_delete,
  api_menu_get_by_parent
} from '@/api/leo-sys'
let id = 1000
import waves from '@/directive/waves' // waves directive
export default {
  directives: { waves },
  name: 'LeoSystemMenu',
  data() {
    return {
      fileType: 'vue',
      iconsVisible: false,
      icons: svgIcons,
      data: [],
      dialogvisible: false,
      optionType: 'add',
      optionId: null,
      keyword: null,
      sysMenu: {
        id: null,
        name: null,
        parentId: null,
        path: null,
        perms: null,
        type: null,
        icon: null,
        component: null,
        componentLocation: null,
        componentExists: null,
        title: null,
        delFlag: 0,
        parentName: null,
        hidden: false
      }
    }
  },
  mounted() {
    this.dragSort()
  },
  created() {
    this.load()
  },
  methods: {
    search() {
      this.load()
    },
    handleDelete(id) {
      api_menu_delete(id).then(() => {
        this.$message.success('success')
        this.load()
      })
    },

    handleFocus() {
      this.iconsVisible = true
    },
    pathChange() {
      if (this.sysMenu.parentId == 0) {
        this.sysMenu.name =
          'Leo' +
          this.sysMenu.path.slice(0, 1).toUpperCase() +
          this.sysMenu.path.slice(1)
      } else {
        this.sysMenu.name =
          this.sysMenu.parentName +
          this.sysMenu.path.slice(0, 1).toUpperCase() +
          this.sysMenu.path.slice(1)
        this.sysMenu.component =
          this.sysMenu.parentPath + '/' + this.sysMenu.path
      }
    },
    iconsFliter(icons, keyword) {
      if (keyword == null || keyword.trim() == '') {
        return icons
      }
      return icons.filter((item) => {
        return item.indexOf(keyword) >= 0
      })
    },

    generateIconCode(symbol) {
      return `<svg-icon icon-class="${symbol}" />`
    },

    handleClipboard(text, event) {
      clipboard(text, event)
    },

    // 表格拖动排序
    dragSort() {
      const el = this.$refs.singleTable.$el.querySelectorAll(
        '.el-table__body-wrapper > table > tbody'
      )[0]
      this.sortable = Sortable.create(el, {
        onEnd: (e) => {
          // onEnd是结束拖拽时触发，onUpdate是列表内元素顺序更新的时候触发，更多请看文末配置项
          // e.oldIndex为拖动一行原来的位置，e.newIndex为拖动后新的位置
          const targetRow = this.tableData.splice(e.oldIndex, 1)[0]
          this.data.splice(e.newIndex, 0, targetRow)
        }
      })
    },
    load() {
      api_menu_get_by_parent(0).then((menus) => {
        this.data = menus.data
      })
    },
    append(data) {
      const newChild = { id: id++, label: 'testtest', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },
    handleAdd(parent) {
      this.add(parent)
    },
    handleEdit(row) {
      this.optionType = 'update'
      this.dialogvisible = true
      for (let k in this.sysMenu) {
        this.sysMenu[k] = null
      }
      if (row) {
        this.sysMenu = row
        let parent = this.getMenuById(this.sysMenu.parentId)
        this.sysMenu.parentName = parent.name
      }
    },
    add(parent) {
      this.dialogvisible = true
      for (let k in this.sysMenu) {
        this.sysMenu[k] = null
      }
      if (parent) {
        this.sysMenu.parentId = parent.id
        if (parent.type == 0) {
          this.sysMenu.type = 1
        } else if (parent.type == 1) {
          this.sysMenu.type = 2
        } else {
          this.sysMenu.type = 0
        }
        this.sysMenu.parentName = parent.name
        this.sysMenu.parentPath = parent.path
      } else {
        this.sysMenu.parentId = 0
        this.sysMenu.type = 0
        this.sysMenu.component = 'layout/Layout'
      }
    },
    saveOrUpdate() {
      if (this.optionType == 'update') {
        api_menu_put(this.sysMenu).then((res) => {
          this.$message.success(res.msg)
          this.dialogvisible = false
          this.load()
        })
      } else {
        if (this.sysMenu.parentId == 0) {
          this.sysMenu.path = '/leo-' + this.sysMenu.path
        }

        api_menu_post(this.sysMenu).then((res) => {
          this.$message.success(res.msg)
          this.dialogvisible = false
          this.load()
        })
      }
    },

    getFileDirectory(path, name) {
      return path.replace(name, '')
    },

    getMenuById(id) {
      let index = this.data.findIndex((item) => {
        return item.id == id
      })
      return this.data[index]
    }
  }
}
</script>
<style>
.custom-tree-container {
  width: 90%;
  padding: 50px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>

<style lang="scss" scoped>
.icons-container {
  height: 350px;
  margin: 10px 20px 0;
  // overflow: hidden;
  overflow: auto;
  .grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .icon-item {
    margin: 20px;
    height: 85px;
    text-align: center;
    width: 100px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
  }

  span {
    display: block;
    font-size: 16px;
    margin-top: 10px;
  }

  .disabled {
    pointer-events: none;
  }
}
</style>
