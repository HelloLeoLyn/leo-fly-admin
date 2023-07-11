<template>
  <div>
    <el-button @click="category1688AddVisible=!category1688AddVisible">编辑分组</el-button>

    <el-dialog :visible.sync="category1688AddVisible" :before-close="handleClose">
      <el-button @click="addFirstLevelGroup()">添加分组</el-button>
      <el-button @click="save">保存</el-button>
      <el-table :data="data" border row-key="id" default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column label="id" prop="id" />
        <el-table-column label="parentID" prop="parentID" />
        <el-table-column label="groupName" prop="groupName" />
        <el-table-column label="添加子分组">
          <template slot-scope="scope">
            <el-button v-if="scope.row.parentID==0" @click="addChildren(scope.row)">add</el-button>
            <el-button @click="delChildren(scope.row)">del</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>
<style lang="scss">
.tree {
  .el-tree-node__content {
    height: 36px;
  }
}
</style>
<script>
let id = 1000
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      category1688AddVisible: false
    }
  },
  methods: {
    save() {},
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done()
        })
        .catch(() => {})
    },
    addFirstLevelGroup() {
      const newChild = { id: 'temp' + id++, groupName: 'testtest', parentID: 0 }
      this.data.push(newChild)
    },
    addChildren(row) {
      const newChild = {
        id: 'temp' + id++,
        groupName: 'testtest',
        parentID: row.id
      }
      if (row.children) {
        row.children.push(newChild)
      } else {
        this.$set(row, 'children', [newChild])
      }
    },
    delChildren(row) {
      this.data.forEach((item, key) => {
        if (item.id == row.id) {
          this.data.splice(key, 1)
        } else {
          if (item.children) {
            item.children.forEach((item2, key2) => {
              if (row.id == item2.id) {
                this.data[key].children.splice(key2, 1)
              }
            })
          }
        }
      })
    }
  }
}
</script>