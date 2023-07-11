<template>
  <div>
    <el-form :model="params" :rules="rules" ref="params" label-width="0px">
      <el-switch v-model="setting"></el-switch>
      <div v-if="setting">
        <el-row>
          <el-checkbox v-model="params.supportOnlineTrade">supportOnlineTrade</el-checkbox>
          <el-checkbox v-model="params.mixWholeSale">mixWholeSale</el-checkbox>
          <el-checkbox v-model="params.priceAuth">priceAuth</el-checkbox>
        </el-row>
        <el-table :data="params.priceRanges" border class="tableBox">
          <el-table-column label="startQuantity">
            <template slot-scope="{row,$index}">
              <el-form-item label-width="0" :prop="'priceRanges.' + $index + '.startQuantity'"
                :rules="rules.startQuantity">
                <el-input v-model="row.startQuantity" type="number" class="edit-input">
                </el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="price">
            <template slot-scope="{row,$index}">
              <el-form-item label-width="0" :prop="'priceRanges.' + $index + '.price'" :rules="rules.price">
                <el-input v-model="row.price" class="edit-input" />
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
        <el-form-item label="amountOnSale" prop="amountOnSale" :rules="rules.amountOnSale" label-width="100">
          <el-input v-model="params.amountOnSale" style="width:200px" />
        </el-form-item>
        <el-form-item label="minOrderQuantity" prop="minOrderQuantity" :rules="rules.minOrderQuantity" label-width="100">
          <el-input v-model="params.minOrderQuantity" style="width:200px" />
        </el-form-item>
        <el-form-item label="unit" prop="unit" :rules="rules.unit" label-width="100">
          <el-select v-model="params.unit" clearable @change="">
            <el-option label="套" value="套"></el-option>
            <el-option label="件" value="件"></el-option>
            <el-option label="个" value="个"></el-option>
            <el-option label="副" value="副"></el-option>
            <el-option label="吨" value="吨"></el-option>
          </el-select>
        </el-form-item>

      </div>
    </el-form>
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
import { moneyValidator, countValidator } from '@/utils/validate'
const moneyCompare = (rule, value, callback, params) => {
  const index = rule.field.split('.')[1]
  if (index == '0') {
    callback()
  } else {
    const num = new Number(params[index - 1].price)
    const num2 = new Number(params[index].price)
    if (num <= num2) {
      return callback(new Error(rule.message))
    }
    callback()
  }
}
export default {
  props: {
    id: {
      type: [String, Number],
      required: true
    },
    values: {
      type: Object,
      default: () => {
        return
      }
    }
  },
  data() {
    return {
      subject: '',
      setting: true,
      rules: {
        amountOnSale: [
          { required: true, message: '请输入库存数量', trigger: 'blur' }
        ],
        unit: [{ required: true, message: '请输入数量单位', trigger: 'blur' }],
        startQuantity: [
          { required: true, message: '请输入数量', trigger: 'blur' },
          {
            min: 1,
            max: 8,
            message: '长度在 1 到 8 个数字',
            trigger: 'blur'
          },
          {
            validator: (a, b, c) =>
              countValidator(a, b, c, this.params.priceRanges),
            message: '数量不能比前一项低',
            trigger: 'blur'
          }
        ],
        price: [
          { required: true, message: '请输入金额', trigger: 'blur' },
          {
            validator: (a, b, c) =>
              moneyCompare(a, b, c, this.params.priceRanges),
            trigger: 'blur',
            message: '金额不能比上一项高'
          },
          {
            validator: moneyValidator,
            trigger: 'blur',
            message: '请填写正确的[金额]'
          }
        ]
      },
      params: {
        priceAuth: false,
        supportOnlineTrade: true,
        mixWholeSale: false,
        saleType: 'normal',
        priceRanges: [{ startQuantity: '5', price: null }],
        unit: '件',
        amountOnSale: 2000,
        minOrderQuantity: 5,
        batchNumber: null,
        retailprice: null,
        tax: null,
        sellunit: null,
        quoteType: null, // 普通报价-FIXED_PRICE("0"),SKU规格报价-SKU_PRICE("1"),SKU区间报价（商品维度）-SKU_PRICE_RANGE_FOR_OFFER("2"),SKU区间报价（SKU维度）-SKU_PRICE_RANGE("3")，国际站无需关注
        consignPrice: null, // 分销基准价。代销场景均使用该价格。有SKU商品查看skuInfo中的consignPrice
        deliveryLimit: 5, // 发货时间限制（非买保发货周期），按天计算
        invReduceType: 2 // 库存扣减方式，1是下单减库存，2是付款减库存
      }
    }
  },
  created() {
    this.params = Object.assign(this.params, this.values)
  },
  methods: {
    showHistory(e) {
      this.$emit('showHistory', e)
    },
    addPriceRow() {
      if (this.params.priceRanges.length > 2) {
        return
      }
      this.params.priceRanges.push({ startQuantity: null, price: null })
    },
    removePriceRow(index) {
      this.params.priceRanges.splice(index, 1)
    },
    change(e) {
      this.$emit('change', e)
    },
    getVal() {
      return this.params
    },
    valid() {
      return new Promise(resolve => {
        this.$refs['params'].validate((valid) => {
          resolve(valid)
        })
      })
    },
  }
}
</script>