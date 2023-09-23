<template>
  <div class="leo-product-editor">
    <el-button
      :type="type"
      :size="size"
      @click="visible = !visible"
      :class="{ fix: isFix }"
      >{{ btnName }}</el-button
    >
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="60%"
      :append-to-body="true"
      :modal-append-to-body="false"
    >
      <el-input
        v-model="queryParams.subjectKey"
        placeholder="subjectKey"
        size="normal"
        clearable
      ></el-input>
      <el-select
        v-model="queryParams.statusList"
        placeholder="statusList"
        clearable
        multiple
      >
        <el-option label="published" value="published"> </el-option>
      </el-select>
      <el-button type="primary" size="default" @click="handleGetList"
        >查询</el-button
      >

      <el-table :data="data" border stripe>
        <el-table-column
          v-for="col in columns"
          :prop="col.key"
          :key="col.key"
          :label="col.label"
          :width="col.width"
        >
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
import { listToString } from '@/utils'
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
    products: {
      type: Array,
      default: e => {
        return e
      }
    },
    size: {
      type: String,
      default: e => {
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
    products (newVal) {
      this.data = newVal.map(product => {
        return {
          productID: product.id,
          subject: product.subject,
          code: listToString(product.code, ' '),
          status: product.status,
          referStatus: product.referStatus
        }
      })
    }
  },
  data () {
    return {
      content: null,
      visible: false,
      columns: [
        { key: 'productID', label: 'productID' },
        { key: 'subject', label: 'subject' },
        { key: 'code', label: 'code' },
        { key: 'status', label: 'status' }
      ],
      queryParams: {
        subjectKey: null,
        pageNo: 1,
        pageSize: 20,
        statusList: ['published']
      },
      data: []
    }
  },
  created () {},
  methods: {
    handleGetList () {
      if (!this.isBatch) {
        api_product_alibaba_List(this.queryParams).then(({ data }) => {
          this.data = data.resultList
          let product = {
            id: this.products[0].id,
            referStatus: 1
          }
          this.updateReferStatus(product)
          this.$emit('onFinished', null)
        })
      } else {
        this.products.forEach(({ id, code, referStatus }, index) => {
          if (referStatus == 0) {
            const queryParams = {
              subjectKey: code[0],
              pageNo: 1,
              pageSize: 20,
              statusList: ['published']
            }
            api_product_alibaba_List(queryParams)
              .then(({ data }) => {
                if (data.resultList && data.resultList.length == 1) {
                  let product = {
                    id,
                    referStatus: 1
                  }
                  this.updateReferStatus(product)
                }
              })
              .finally(() => {
                if (index == this.products.length - 1) {
                  this.$emit('onFinished', null)
                }
              })
          }
        })
      }
    },
    updateReferStatus (product) {
      this.$emit('onSubmitUpdateReferStatus', product)
    }
  }
}
</script>
