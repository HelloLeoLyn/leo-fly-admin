<template>
  <div>
    <el-form-item :label="supplyTypeOptions.fields.label" size="normal"   prop="supplyType"
      :rules="[{ required: true, message: `请输入`, trigger: 'blur' }]">
      <el-checkbox-group v-model="supplyType">
        <el-checkbox v-for="item, key in supplyTypeOptions.fields.dataSource" :label="item.text" :key="key" :value="item"
          @checked="checked">{{
            item.text
          }}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
  </div>
</template>
<script>
export default {
  name: 'cbu_supply_type',
  props: {
    value: {
      type: Array,
      default: e => {
        return e
      }
    },
    supplyTypeOptions: {
      type: Object,
      default: e => {
        return e
      }
    }
  },
  data() {
    return {
      supplyType: []
    }
  },
  watch: {
    value(newVal) {
      this.supplyType = newVal
    }
  },
  methods: {
    checked() {
      this.$emit('input', this.supplyType)
    }
  },
}
</script>