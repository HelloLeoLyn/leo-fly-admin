<template>
  <div class="leo-product-editor">
    <el-button :type="type" :size="size" @click="visible=!visible"
      :class="{ fix: isFix }">{{ btnName }}</el-button>
    <el-dialog :title="title" :visible.sync="visible" width="60%" :append-to-body="true"
      :modal-append-to-body="false">
      <el-input v-model="queryParams.subjectKey" placeholder="subjectKey" size="normal"
        clearable></el-input>
      <el-button type="primary" size="default" @click="handleGetList">查询</el-button>

      <el-table :data="data" border stripe>
        <el-table-column v-for="col in columns" :prop="col.key" :key="col.key" :label="col.label"
          :width="col.width">
        </el-table-column>
      </el-table>
      <span slot="footer">
        <el-button @click="visible = false">Cancel</el-button>
        <el-button type="primary">OK</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { api_product_alibaba_List } from '@/api/leo-product-alibaba'
export default {
  props: {
    btnName: {
      type: String,
      default: '是否上传'
    },
    title: {
      type: String,
      default: '1688产品校验'
    },
    product: {
      type: Object,
      default: (e) => {
        return e
      }
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
      columns: [
        { key: 'productID', label: 'productID' },
        { key: 'subject', label: 'subject' }
      ],
      queryParams: {
        subjectKey: null
      },
      data: []
    }
  },
  created() {},
  methods: {
    handleGetList() {
      api_product_alibaba_List(this.queryParams).then(({ data }) => {
        this.data = data.result.pageResult.resultList
      })
    }
  }
}
</script>
