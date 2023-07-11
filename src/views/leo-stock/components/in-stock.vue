<template>
  <div class="app-container">
    <leo-local-image />
    <div style="float:right">
      <el-button @click="handleAddClk">添加</el-button>
      <el-button @click="onConfirmClear">清空</el-button>
      <el-button @click="onConfirmInStock">提交</el-button>
    </div>
    <el-form inline>
      <el-form-item>
        <el-input v-model="form.customer" placeholder="供应商" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.shipping" placeholder="发货方式">
          <el-option value="C" label="自提" />
          <el-option value="D" label="快递" />
          <el-option value="O" label="其他" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.purchaseType" placeholder="交易方式">
          <el-option v-for="(v,k) in warehouse_dict.purchaseTypeMap" :value="k" :key="k"
            :label="v" />
        </el-select>
      </el-form-item>
    </el-form>
    <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row
      style="width: 100%;">
      <el-table-column label="单号" prop="orderId" align="center" width="200">
        <template slot-scope="scope">
          <el-input v-model="scope.row.orderId" size="small" />
        </template>
      </el-table-column>
      <el-table-column label="货号" prop="nno" align="center" width="200">
        <template slot-scope="scope">
          <el-input v-model="scope.row.nno" size="small" />
        </template>
      </el-table-column>
      <el-table-column label="标签" prop="codeType" align="center" width="100">
        <template slot-scope="scope">
          <el-select v-model="scope.row.codeType" size="small">
            <el-option v-for="v,k in warehouse_dict.product_type" :key="k" :label="v" :value="k" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="数量" prop="amount" align="center" width="100">
        <template slot-scope="scope">
          <el-input v-model="scope.row.amout" type="number" size="small" />
        </template>
      </el-table-column>
      <el-table-column label="进价" prop="purchasePrice" align="center" width="100">
        <template slot-scope="scope">
          <el-input v-model="scope.row.purchasePrice" size="small" />
        </template>
      </el-table-column>
      <el-table-column label="售价" prop="sellingPrice" align="center" width="100">
        <template slot-scope="scope">
          <el-input v-model="scope.row.sellingPrice" size="small" />
        </template>
      </el-table-column>
      <el-table-column label="数量单位" prop="unit" align="center" width="150">
        <template slot-scope="scope">
          <el-input v-model="scope.row.purchasePrice" size="small" />
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="remark" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.purchasePrice" size="small" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="60" fixed="right"
        class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button v-if="row.status!='deleted'" size="mini" type="danger"
            @click="handleDelete(row,$index)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style scoped>
.leo-input-not-border {
  border: 0;
}
.edit-input {
  padding-right: 100px;
}
</style>
<script>
import { warehouse_dict } from '@/utils/dict'
import LeoLocalImage from '@/components/LeoImage/local.vue'
export default {
  name: 'LeoInStock',
  components: { 'leo-local-image': LeoLocalImage },
  data() {
    return {
      list: [],
      listLoading: false,
      tableKey: 0,
      warehouse_dict,
      form: {}
    }
  },
  created() {},
  methods: {
    handleAddClk() {
      this.list.push({})
    },
    onConfirmClear() {
      this.list = [{}]
    },
    onConfirmInStock() {}
  }
}
</script>

<style>
</style>