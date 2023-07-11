<template>
  <div>
    <el-table :data="list" border="">
      <el-table-column label="操作">
        <template slot-scope="{row,$index}">
          <el-button @click="handleAddRow(row)">+</el-button>
          <el-button @click="handleRemoveRow($index)">-</el-button>
        </template>
      </el-table-column>
      <el-table-column label="采购数量">
        <template slot-scope="{row,$index}">
          <el-input v-model="row.quantity" @change="quantityChange(row,$index)"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="采购单价">
        <template slot-scope="{row,$index}">
          <el-input v-model="row.unitPrice" @change="quantityChange(row,$index)"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="预览（可根据采购的不同数量设置不同价格）">
        <template slot-scope="{row}">
          <span>{{row.content}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          content: '',
          unitPrice: '',
          quantity: ''
        }
      ]
    }
  },
  methods: {
    quantityChange() {
      // this.list[$index].content =
      this.vaild()
    },
    handleAddRow() {
      if (this.list.length >= 5) {
        return
      }
      const temp = {
        content: '',
        unitPrice: '',
        quantity: ''
      }
      this.list.push(temp)
    },
    handleRemoveRow(index) {
      if (this.list.length <= 1) {
        return
      }
      this.list.splice(index, 1)
    },
    vaild() {
      if (this.list.length > 1) {
        this.list.forEach((o, i) => {
          if (i >= 1) {
            return
          } else {
            if (this.list[i + 1].quantity <= this.list[i].quantity) {
              this.$message.error('数量设置有误')
              return
            }
            if (this.list[i + 1].unitPrice > this.list[i].unitPrice) {
              this.$message.error('价格设置有误')
              return
            }
          }
        })
      }
    }
  }
}
</script>