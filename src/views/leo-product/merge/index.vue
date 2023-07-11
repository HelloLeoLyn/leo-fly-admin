<template>
  <div class="app-container leo-auto-part-index">
    <div class="filter-container">
      <el-input v-model="listQuery.code" placeholder="oe" style="width: 200px;" class="filter-item"
        @keyup.enter.native="doSearch" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="doSearch">
        查询
      </el-button>
      <el-button v-waves class="filter-item" type="primary" @click="merge">
        合并
      </el-button>
      <el-button v-waves class="filter-item" type="primary" @click="next">
        下一个
      </el-button>
    </div>
    <el-table v-loading="loading" border :data="list">
      <el-table-column prop="id" width="80">
      </el-table-column>
      <el-table-column label="code" width="180">
        <template slot-scope="{row}">
          <el-input readonly :value="row.code | codeFilter" size="small">
          </el-input>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="name" />
      <el-table-column prop="status" label="status" width="80" />
      <el-table-column label="image" width="80">
        <template slot-scope="{row}">
          <el-image v-if="row.mainImage" :src="service + '/product/image/' + row.mainImage + '/50X50'" />
        </template>
      </el-table-column>

      <el-table-column label="actions" fixed="right" width="220">
        <template slot-scope="scope">
          <el-row class="leo-row-center">
            <el-col :span="6">
              <el-button type="text" plain @click="showHistory(scope.row)">销售记录
              </el-button>
            </el-col>
            <el-col :span="6">
              <el-button type="text" plain @click="update(scope.row.id)">修改</el-button>
            </el-col>
            <el-col :span="6">
              <el-button type="text" plain @click="onConfrimDelete(scope.row, scope.$index)">删除
              </el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <LeoProductMergeMain v-if="list && list.length > 1" :list="list" ref="main" key="mainKey"></LeoProductMergeMain>
    <leo-history :productId="history.productId" :show="history.show" :key="history.count" />
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

  .el-dialog__body {
    text-align: center;
  }
}
</style>
<script>
import LeoProductMergeMain from './components/Merge.vue'
import waves from '@/directive/waves' // waves directive
import LeoHistory from '@/views/leo-warehouse/components/LeoHistory.vue'
import {
  product_page_api,
  api_product_merge,
  api_product_merge_pre,
  product_delete_api,
} from '@/api/leo-product'
import { service } from '@/api/index'
import Pagination from '@/components/Pagination'
import { listToString } from '@/utils/index'
export default {
  name: 'LeoProductMerge',
  components: { Pagination, LeoHistory, LeoProductMergeMain },
  directives: { waves },
  filters: {
    codeFilter: (e) => listToString(e, ' ')
  },
  data() {
    return {
      mainKey:0,
      history: {
        show: false,
        count: 0,
        productId: 0
      },
      service,
      value: [],
      listQuery: {
        status: -1,
        size: 20,
        current: 1,
        code: '',
        attributeName: 'oe'
      },
      list: null,
      repeatList: [],
      loading: false
    }
  },
  created() {
    this.loop()
  },
  methods: {
    onConfrimDelete(row, index) {
      this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          product_delete_api(row.id).then((res) => {
            this.list.splice(index, 1)
            this.total = this.total - 1
            if (this.total < this.listQuery.size || this.list.length <= 1) {
              this.doSearch()
            }
            this.$notify.success(res.msg)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    loop() {
      api_product_merge_pre().then((res) => {
        this.repeatList = res.data
        this.listQuery.code = this.repeatList[0]
        this.doSearch()
      })
    },
    doSearch() {
      if (!this.listQuery.code || this.listQuery.code == '') {
        this.list = []
        return
      }
      product_page_api(this.listQuery).then((res) => {
        if (res.data.records.length < 2) {
          this.next()
        } else {
          this.mainKey++
          this.list = res.data.records
          this.list.forEach((a, b) => {
            this.$set(this.list[b], 'checkid', false)
            this.$set(this.list[b], 'checkjson', false)
          })
        }
      })
    },

    merge() {
      const { code,
        images,
        refNo,
        model,
        weight,
        packageSize } = this.$refs.main.info
      const params = {
        productId: this.list[0].id,
        code,
        images,
        refNo,
        model,
        weight,
        packageSize,
        productIdList: this.list.map((m) => m.id)
      }
      api_product_merge(params).then(() => {
        this.next()
      })
    },

    next() {
      this.repeatList.splice(0, 1)
      this.listQuery.code = this.repeatList[0]
      this.doSearch()
    },
    showHistory(row) {
      this.history.productId = row.id
      this.history.show = true
      this.history.count++
    },
    update(id) {
      this.$router.push(`update/${id}`)
    },
  }
}
</script>
