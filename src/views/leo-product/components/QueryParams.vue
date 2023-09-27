<template>
  <div class="leo-product-query-params">
    <el-row :gutter="20">
      <el-col :span="12" :offset="0" v-for="(item, index) in params" :key="index" class="items">
        <el-select v-model="item.key" @change="val=>handleKeyChange(val,index)" class="item-child">
          <el-option v-for="field in fields" :key="field.key" :label="field.key" :value="field.key"
            :disabled="field.disabled" />
        </el-select>
        <template v-if="item.key">
          <el-input v-if="fields[item.key].uiType == 'input'" class="input item-child"
            v-model="item.value" :placeholder="item.key" size="normal" clearable
            @change="handleValueChange(index)">
            <el-button slot="append" icon="el-icon-delete" @click="deleteParam(index)"></el-button>
          </el-input>
          <el-select v-else-if="fields[item.key].uiType == 'select'" v-model="item.value"
            class="item-child" :placeholder="item.key" clearable filterable
            @change="handleValueChange(index)">
            <el-option v-for="item in productDict[item.key]" :key="item.value" :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <Category1688 v-else-if="fields[item.key].uiType == 'category'" v-model="item.value"
            class="item-child">
          </Category1688>
        </template></el-col>
    </el-row>
    <!-- <el-button type="primary" size="default" @click="saveCache()">保存条件</el-button> -->
  </div>
</template>
<style lang="scss">
.leo-product-query-params {
  .input {
    width: 300px;
    // height: 36px;// 无效
  }
  .items {
    display: flex;
    border-style: dotted;
    border-color: brown;
    border-width: 1px;
    max-width: 600px;
    height: 50px;
    vertical-align: middle;
    .item-child {
      margin: 5px 0;
    }
    margin: 10px;
  }
}
</style>
<script>
import Category1688 from '@/views/leo-alibaba/components/Category1688.vue'
import productDict from '@/dict/product'
export default {
  components: { Category1688 },
  props: {
    defaultParams: {
      type: Array,
      default: () => {
        return ['code', 'name', 'categoryId']
      }
    }
  },
  data() {
    return {
      productDict,
      status: productDict.status,
      fields: productDict.fields,
      params: []
    }
  },
  created() {
    for (let index = 0; index < this.defaultParams.length + 1; index++) {
      if (index == this.defaultParams.length) {
        this.params.push({ key: null, value: null, oldKey: null })
      } else {
        const key = this.defaultParams[index]
        this.params.push({ key: key, value: null, oldKey: key })
        this.fields[key].disabled = true
        this.fields[key].checked = true
      }
    }
  },
  methods: {
    handleValueChange(index) {
      if (this.params.length - 1 == index) {
        this.params.push({ key: null, value: null, oldKey: null })
      }
    },
    handleKeyChange(name, index) {
      this.fields[name].disabled = true
      this.fields[name].checked = true
      const oldKey = this.params[index].oldKey
      if (oldKey) {
        this.fields[oldKey].disabled = false
        this.fields[oldKey].checked = false
        this.params[index].oldKey = name
      } else {
        this.params[index].oldKey = name
      }
    },
    getParams() {
      return this.params
    },
    deleteParam(index) {
      const oldKey = this.params[index].oldKey
      if (oldKey) {
        this.fields[oldKey].disabled = false
        this.fields[oldKey].checked = false
      }
      this.params.splice(index, 1)
    }
  }
}
</script>
