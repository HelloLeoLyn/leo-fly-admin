<template>
  <div>
    <div v-if="actionType == 'out'">
      <el-button type="primary" plain @click="items.push({ value: '', checked: false })">{{ $t('common.add') }}</el-button>
      <el-button type="primary" plain @click="checkedAll">{{ $t('component.leoArrayString.checkAll') }}</el-button>
      <el-button type="warning" plain @click="delItem">{{ $t('common.delete') }}</el-button>
      <el-button type="warning" plain v-clipboard:copy="listToString(list,' ')" >{{ $t('common.copy') }}</el-button>
    </div>
    <el-row :gutter="10">
      <el-col :span="span" v-for="item, key in items" :key="key">
        <el-input v-model="item.value">
          <el-checkbox slot="prepend" v-model="item.checked" />
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { listToString } from '@/utils/index';
import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive
export default {
  directives: {
    clipboard
  },
  props: {
    span: {
      type: Number,
      default: 24
    },

    list: {
      type: Array,
      default: () => {
        return []
      }
    },
    actionType: {
      type: String,
      default: 'out'
    }
  },
  data() {
    return {
      items: []
    }
  },
  created() {
    this.items = this.list.map((str) => {
      return { value: str, checked: false }
    })
  },
  methods: {
    listToString,
    delItem() {
      this.items = this.items.filter((item) => {
        return !item.checked
      })
      this.$emit('on-delete', this.items)
    },
    checkedAll() {
      this.items.map((v, k) => {
        this.$set(this.items[k], 'checked', true)
      })
    }
  }
}
</script>