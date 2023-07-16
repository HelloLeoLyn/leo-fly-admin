<template>
  <div>
    <el-form :model="params" :rules="rules" ref="params" label-width="180px" inline>
      <el-switch v-model="setting"></el-switch>
      <div v-if="setting">
        <el-row>
          提示：freightTemplateID:14729534//运费模板ID，0表示运费说明，1表示卖家承担运费，其他值表示使用运费模版。此参数可调用运费模板相关API获取
        </el-row>
        <el-row>
          <el-col :span="12" v-for="value, key in params" :key="key">
            <el-form-item :label="key" :prop="key" :rules="rules[key]">
              <el-input v-model="params[key]" v-if="key == 'unitWeight'" @change="change">
                <template slot="append">KG</template>
              </el-input>
              <el-input v-model="params[key]" v-else-if="key == 'packageSize'" @change="change">
                <template slot="append">cm^3</template>
              </el-input>
              <el-input v-model="params[key]" v-else @change="change">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>
<style lang="scss">
.tableBox {
  width: 400px;

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
export default {
  props: {
    value: {
      type: Object,
      default: (e) => {
        return e
      }
    }
  },
  watch: {
    value(newVal) {
      // 当父组件的值变化时，更新子组件的选中项
      this.params = newVal
    }
  },
  data() {
    return {
      params: {
        // freightTemplateID: 14729534,
        // unitWeight: null, // product.weight
        // packageSize: null, // product.packageSize
        // volume: null, // 国际站
        // handlingTime: 5, // 国际站 5
        // sendGoodsAddressId: 32583873,
        // sendGoodsAddressText: '广东省 广州市',
        // offerSuttleWeight: null,
        // offerLength: null,
        // offerWidth: null,
        // offerHeight: null
      },
      subject: '',
      setting: true,
      rules: {
        freightTemplateID: [
          { required: true, message: '请选择运费模板', trigger: 'blur' }
        ],
        unitWeight: [
          { required: true, message: '请输入单位重量', trigger: 'blur' }
        ],
        handlingTime: [
          { required: true, message: '请输入备货日期', trigger: 'blur' }
        ],
        sendGoodsAddressId: [
          { required: true, message: '请选择发货地址模板', trigger: 'blur' }
        ],
        sendGoodsAddressText: [
          { required: true, message: '请输入发货地址', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    change() {
      this.$emit('input', this.params)
    },
    getVal() {
      return this.params
    },
    valid() {
      return new Promise((resolve) => {
        this.$refs['params'].validate((valid) => {
          resolve(valid)
        })
      })
    }
  }
}
</script>