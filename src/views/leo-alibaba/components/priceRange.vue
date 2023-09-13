<template>
  <div>
    <el-table :data="value" border class="tableBox">
      <el-table-column label="pricerange_beginAmount">
        <template slot-scope="{row,$index}">
          <el-form-item label-width="0" :rules="rules.pricerange_beginAmount">
            <el-input v-model="row.pricerange_beginAmount" type="number" class="edit-input">
            </el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="pricerange_price">
        <template slot-scope="{row,$index}">
          <el-form-item label-width="0" :rules="rules.pricerange_price">
            <el-input v-model="row.pricerange_price" class="edit-input" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="{$index}">
          <el-button @click="addPriceRow" type="text"><i class="el-icon-plus" />
          </el-button>
          <el-button @click="removePriceRow($index)" type="text"><i class="el-icon-minus" />
          </el-button>
          <el-button @click="showHistory()" size="small" type="text">销售记录 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <LeoHistory :productId="productId" v-model="history"></LeoHistory>
  </div>
</template>
<style lang="scss">
.tableBox {
  width: 450px;

  th {
    padding: 0 !important;
    height: 48px;
    line-height: 48px;
  }

  .el-input {
    padding-top: 20px;
  }

  td .cell {
    padding: 0 !important;
    height: 72px;
    line-height: 72px;
  }
}
</style>
<script>
// import { moneyValidator, countValidator } from '@/utils/validate'
import LeoHistory from '@/views/leo-warehouse/components/LeoHistory.vue'
export default {
  components: { LeoHistory },
  props: {
    productId: {
      type: [String, Number],
      required: true
    },
    value: {
      type: Array,
      default: () => {
        return
      }
    }
  },
  data() {
    return {
      history: {
        show: false,
        productId: this.productId
      },
      rules: {
      },
    }
  },

  methods: {
    showHistory() {
      this.history.show = !this.history.show
    },
    addPriceRow() {
    },
    removePriceRow() {
    },
  }
}
</script>