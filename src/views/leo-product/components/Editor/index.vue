<template>
  <div class="leo-product-editor">
    <el-button :type="type" :size="size" @click="handleClick"
      :class="{ fix: isFix }">{{ editorName }}</el-button>
    <el-dialog :title="editorName" :visible.sync="visible" width="60%">
      <div :offset="0" v-for="(item, index) in params" :key="index" class="items">
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
        </template>
      </div>
      <span slot="footer">
        <el-button @click="visible = false">Cancel</el-button>
        <el-button type="primary">OK</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import productDict from '@/dict/product'
export default {
  props: {
    editorName: {
      type: String,
      default: '产品编辑器'
    },
    product: {
      type: Object,
      default: null
    },
    size: {
      type: String,
      default: (e) => {
        return e
      }
    },
    type: {
      type: String,
      default: 'primary'
    },
    isFix: {
      type: Boolean,
      default: false
    },
    isBatch: {
      type: Boolean,
      default: false
    },
    alternativeKeys: {
      type: Array,
      default: () => {}
    }
  },
  watch: {
    product(newval) {
      this.keys = Object.keys(newval)
    }
  },
  data() {
    return {
      content: null,
      visible: false,
      keys: [],
      productDict,
      status: productDict.status,
      fields: {},
      params: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.params = [{ key: null, value: null, oldKey: null }]
      this.initFileds()
    },
    initFileds() {
      for (let index = 0; index < this.alternativeKeys.length; index++) {
        this.fields[productDict.fields[this.alternativeKeys[index]].key] =
          productDict.fields[this.alternativeKeys[index]]
      }
    },
    handleClick() {
      this.visible = !this.visible
    },
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
<style lang="scss">
.leo-product-editor {
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
