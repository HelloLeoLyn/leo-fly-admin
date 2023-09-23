<template>
  <div class="leo-product-query-params">
    <div v-for="(item, index) in params" :key="index">
      <el-select
        v-model="item.key"
        class="filter-item"
        @change="handleKeyChange"
      >
        <el-option
          v-for="field in fields"
          :key="field.key"
          :label="field.key"
          :value="field.key"
          :disabled="field.disabled"
        />
      </el-select>
      <!-- {{ fields[item.key] }} -->
      <template v-if="item.key">
        <el-input
          v-if="fields[item.key].uiType == 'input'"
          class="input filter-item"
          v-model="item.value"
          :placeholder="item.key"
          size="normal"
          clearable
          @change="handleValueChange"
        ></el-input>
        <el-select
          class="filter-item"
          v-else-if="fields[item.key].uiType == 'select'"
          v-model="item.value"
          :placeholder="item.key"
          clearable
          filterable
          @change="handleValueChange"
        >
          <el-option
            v-for="item in productDict[item.key]"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </template>
    </div>
  </div>
</template>
<style lang="scss">
.leo-product-query-params {
  .input {
    width: 200px;
  }
}
</style>
<script>
import productDict from '@/dict/product'
export default {
  data () {
    return {
      productDict,
      status: productDict.status,
      fields: productDict.fields,
      params: [{ key: null, value: null }]
    }
  },
  created () {},
  methods: {
    handleValueChange () {
      this.params.push({ key: null, value: null })
    },
    handleKeyChange (name) {
      this.fields[name].disabled = true 
      this.fields[name].checked = true 
    }
  }
}
</script>
