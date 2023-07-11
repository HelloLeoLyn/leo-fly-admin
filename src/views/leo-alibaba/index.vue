<template>
  <div class="app-container leo-auto-part-index">
    <div class="filter-container">
      <el-input style="width: 200px;" v-waves v-model="listQuery.subject" class="filter-item">
      </el-input>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="doSearch">
        Search
      </el-button>
    </div>
    <el-table v-loading="loading" border :data="list" style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column label="image" width="80">
        <template slot-scope="{row}">
          <el-image :src="'http://localhost:8080/img/' + row.localProductId + '/cover.jpg'" />
        </template>
      </el-table-column>
      <el-table-column label="productID" prop="productID" sortable>
      </el-table-column>
      <el-table-column label="localProductId" prop="localProductId" sortable>
      </el-table-column>
      <el-table-column label="subject" prop="subject">
      </el-table-column>
      <el-table-column label="productCargoNumber" prop="productCargoNumber">
      </el-table-column>
      <el-table-column label="status" prop="status">
      </el-table-column>
      <el-table-column label="price">
        <template slot-scope="{row}">
          <span v-for="price, key in row.saleInfo.priceRanges" :key="key">
            {{ price.startQuantity }}:{{ price.price }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="actions" fixed="right" width="280">
        <template slot-scope="{row,$index}">
          <el-row>
            <el-col :span="6">
              <el-button v-if="row.localProductId == 0" size="small" type="text" plain
                @click="handleReferClick(row, $index)">
                关联
              </el-button>
            </el-col>
            <el-col :span="6">
              <el-button size="small" type="text" plain @click="sendToAlibaba(row, $index)">
                上传
              </el-button>
            </el-col>
            <el-col :span="6">
              <el-button size="small" type="text" plain @click="sendPhotoToAlibaba(row, $index)">
                上传图片
              </el-button>
            </el-col>
            <el-col :span="6">
              <el-button @click="sendToAliexpress(row)" size="small" type="text"
                plai>
                上传速卖通
              </el-button>
            </el-col>
            <el-col :span="6">
              <el-button size="small" type="text" plain @click="handleDeleteAlibaba(row, $index)">
                删除
              </el-button>
            </el-col>
            <el-col :span="6">
              <el-button size="small" type="text" plain @click="handleUpdateAlibaba(row, $index)">
                修改
              </el-button>
            </el-col>
            <el-col :span="6">
              <el-button size="small" type="text" plain @click="handleRepostAlibaba(row, $index)">
                重发
              </el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size"
      @pagination="doSearch" />
    <el-dialog :visible.sync="refer.visible">
      <el-input v-model="refer.code">
        <el-button slot="append" @click="referSearch()">search</el-button>
      </el-input>
      <el-table :data="refer.data" border>
        <el-button slot="empty" @click="addToLocal">添加至本地</el-button>
        <el-table-column label="subject" prop="subject">

        </el-table-column>
        <el-table-column label="确认">
          <template slot-scope="{row}">
            <el-button @click="referWithLocal(row)">确认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="上传图片" :visible.sync="imagesDialog.show" width="30%" @close="">
      <LeoImageUpload :album-id="337943446" @on-confirm="onUploadImagesConfirm" :file-list="imagesDialog.fileList">
      </LeoImageUpload>
      <span slot="footer">
        <el-button @click="magesDialog.show = false">取消</el-button>
        <el-button type="primary" @click="">确定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<style lang="scss">
.leo-row-center {
  .el-col {
    text-align: center;
  }
}

.leo-auto-part-index {
  .el-transfer-panel {
    width: 250px;
  }

  .leo-transfer-label-btn {
    text-align: right;
  }

  .el-checkbox:last-of-type {
    margin-right: 10px;
  }

  .el-transfer-panel__body.is-with-footer {
    padding-bottom: 40px;
    margin-bottom: 40px;
  }
}
</style>
<script>
import LeoImageUpload from '@/components/LeoImage/Upload.vue'
import waves from '@/directive/waves' // waves directive
import LeoAlibabaGetForm1688 from '@/components/LeoAlibaba/getFrom1688.vue'
import Pagination from '@/components/Pagination'
import { listToString } from '@/utils/index'
import { product_page_api } from '@/api/leo-product'
import {
  api_product_alibaba_add,
  api_product_alibaba_page,
  api_productAlibaba_referLocal,
  api_product_alibaba_delete,
  api_productAlibaba_repost,
} from '@/api/leo-product-alibaba'
import { api_alibaba_auth } from '@/api/leo-alibaba'
export default {
  name: 'LeoAlibabaIndex',
  components: {
    Pagination,
    LeoAlibabaGetForm1688,
    LeoImageUpload
  },
  directives: { waves },
  filters: {
    codeFilter: (e) => listToString(e, ' ')
  },
  data() {
    return {
      imagesDialog: {
        show: false,
        fileList: []
      },
      currentProduct: {},
      refer: {
        code: '',
        data: [],
        visible: false
      },
      total: 0,
      listQuery: {
        size: 10,
        current: 1
      },
      list: [],
      loading: false,
      transfer: {
        data: [],
        value: []
      },
      index: -1
    }
  },
  created() {
    this.doSearch()
  },
  methods: {
    onUploadImagesConfirm() {
    },
    sendToAliexpress(row) {
      this.$router.push({path:'/leo-goods/aliexpress-prepare/' + row.localProductId,query:{subject:row.subject}})
    },
    handleReferClick(row, index) {
      this.refer.visible = true
      this.currentProduct = row
      this.index = index
    },
    handleDeleteAlibaba(row, index) {
      this.$confirm('是否删除数据？请确认！').then(() => {
        api_product_alibaba_delete(row.productID).then((res) => {
          this.$notify.success(res.msg)
          this.list.splice(index, 1)
        })
      })
    },
    handleRepostAlibaba(row, index) {
      this.$confirm('是否删除数据？请确认！').then(() => {
        api_productAlibaba_repost(row.productID).then((res) => {
          this.$notify.success(res.msg)
          this.list.splice(index, 1)
        })
      })
    },
    handleUpdateAlibaba(row, index) {
      console.log(row,index);
      // this.$confirm('是否删除数据？请确认！').then(() => {
      //   api_productAlibaba_edit(row.productID).then((res) => {
      //     this.$notify.success(res.msg)
      //     this.list.splice(index, 1)
      //   })
      // })
    },
    addToLocal() {
      const product = {
        name: this.currentProduct.categoryName,
        subject: this.currentProduct.subject,
        code: this.splitCode(this.currentProduct.productCargoNumber),
        categoryId: this.currentProduct.categoryID,
        groupId: this.currentProduct.groupID,
        urlImages: this.currentProduct.image.images.map(
          (image) => 'https://cbu01.alicdn.com/' + image
        ),
        weight: this.currentProduct.saleInfo.unitWeight,
        packageSize: this.currentProduct.saleInfo.packageSize,
        imageType: 'group',
        productID: this.currentProduct.productID,
        optType: 'add'
      }
      api_productAlibaba_referLocal(product).then((res) => {
        this.$notify.success(res.msg)
        this.list.splice(this.index, 1)
        this.index = -1
        this.refer.data = []
      })
    },
    splitCode(code) {
      console.log(code)
      const codes = code.replace(',', ' ').split(' ')
      return codes
    },
    referSearch() {
      this.refer.code = this.refer.code.trim()
      const params = {
        code: this.refer.code
      }
      product_page_api(params).then((res) => {
        if (res.data && res.data.records) {
          this.refer.data = res.data.records
        }
      })
    },
    referWithLocal(row) {
      const params = {
        productID: this.currentProduct.productID,
        localProductId: row.id,
        optType: 'refer'
      }
      api_productAlibaba_referLocal(params).then((res) => {
        this.$notify.success(res.msg)
        this.list.splice(this.index, 1)
        this.index = -1
        this.refer.data = []
      })
    },

    doSearch() {
      api_product_alibaba_page(this.listQuery).then((res) => {
        this.list = res.data.records
        this.total = res.data.total
      })
    },
    sendPhotoToAlibaba(row) {
      this.imagesDialog.show = !this.imagesDialog.show
      row.image.images.forEach(image => {
        this.imagesDialog.fileList.push({ url: image })
      })
    },
    sendToAlibaba(row) {
      console.log(row);
      api_product_alibaba_add(row)
        .then((res) => {
          if (res.code == '200') this.$notify.success(res.msg)
        })
        .catch((error) => {
          if (error.code == '001994') {
            api_alibaba_auth().then((res) => {
              this.$confirm('还未登录阿里巴巴平台，是否打开登录页面', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                window.open(res.data)
              })
            })
          } else {
            this.$notify.error(error.msg)
          }
        })
    }
  }
}
</script>
