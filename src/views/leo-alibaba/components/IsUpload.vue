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
      <el-table
        :data="data"
        border
        stripe
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column
          v-for="col in columns"
          :prop="col.key"
          :key="col.key"
          :label="col.label"
          :width="col.width"
        >
        </el-table-column>
        <el-table-column
          ><template slot-scope="{ row }">
            <el-image :src="row.productImage" width="150"></el-image>
          </template>
        </el-table-column>
        <el-table-column
          ><template slot-scope="{ row }">
            <el-button type="primary" size="default" @click="upload(row)"
              >上传</el-button
            >
          </template>
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
import {
  api_product_alibaba_List,
  api_product_alibaba_save
} from '@/api/leo-product-alibaba'
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
      if (!this.isBatch) {
        if (newVal[0].code[0].length > 0) {
          this.queryParams.subjectKey = newVal[0].code[0]
        }
      }
      this.data = newVal.map(({ id, subject, code, status, referStatus }) => {
        return {
          id,
          subject,
          code: listToString(code, ' '),
          status,
          referStatus
        }
      })
    }
  },
  data () {
    return {
      content: null,
      visible: false,
      columns: [
        { key: 'id', label: 'id' },
        { key: 'code', label: 'code' },
        { key: 'subject', label: 'subject' },
        { key: 'status', label: 'status' },
        { key: 'referStatus', label: 'referStatus' },
        { key: 'productID', label: 'productID' },
        { key: 'productSubject', label: 'productSubject' }
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
    afterSucess (index, alibaba) {
      this.data[index].referStatus = 1
      this.data[index].productID = alibaba.productID
      this.data[index].productSubject = alibaba.subject
      this.data[index].productImage =
        'https://cbu01.alicdn.com/' + alibaba.image.images[0]
    },
    handleGetList () {
      if (!this.isBatch) {
        api_product_alibaba_List(this.queryParams).then(({ data }) => {
          if (data.resultList && data.resultList.length > 0) {
            if (data.resultList.length == 1) {
              let product = data.resultList[0]
              product.localProductId = this.products[0].id
              product.description = null
              this.saveAlibabaProduct(product)
              this.afterSucess(0, data.resultList[0])
            } else {
              console.log(data.resultList.length)
            }
            this.$message.warning('已上传')
          } else {
            this.$message.warning('未上传')
          }
          let product = {
            id: this.products[0].id,
            referStatus: data.resultList.length
          }
          this.updateReferStatus(product)
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
                if (data.resultList && data.resultList.length > 0) {
                  if (data.resultList.length == 1) {
                    console.log(data.esultList.length)
                  } else {
                    console.log(data.resultList.length)
                  }
                  let product = {
                    id,
                    referStatus: data.resultList.length
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
    },
    saveAlibabaProduct (product) {
      api_product_alibaba_save(product).then(res => {
        console.log(res)
      })
    },
    upload (row) {
      this.$router.push('/leo-alibaba/post/' + row.id)
    }
  }
}
</script>
