<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.code" placeholder="oe" style="width: 200px" class="filter-item"
        @keyup.enter.native="doSearch" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="doSearch">
        Search
      </el-button>
    </div>
    <el-table border :data="list" style="width: 100%" height="500" size="small">
      <el-table-column type="selection" width="55" />
      <el-table-column label="image" width="60" fixed="left">
        <template slot-scope="{row}">
          <el-image v-if="row.mainImage" :src="service+'product/image/'+row.mainImage+'/50X50'" />
        </template>
      </el-table-column>
      <el-table-column label="code" width="280">
        <template slot-scope="{row}">
          <el-tooltip class="item" effect="dark" :content="JSON.stringify(row.code)"
            placement="top-start">
            <p>{{row.code|codeFilter}}</p>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="refNo" width="180">
        <template slot-scope="{row}">
          <el-tooltip class="item" effect="dark" :content="JSON.stringify(row.refNo)"
            placement="top-start">
            <p>{{row.refNo|codeFilter}}</p>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="name">
        <template slot-scope="{row}">
          <el-button type="text" @click="$router.push(`detail/${row.id}`)">{{row.name}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="产品类型" fixed="right">
        <template slot-scope="{row}">
          <el-row :gutter="10">
            <el-col :span="6">
              <el-button plain type="primary" size="small" @click="handleQuote(row)">
                报价
              </el-button>
            </el-col>
            <el-col v-for="key in Object.keys(row.type)" :key="key" :span="6">
              <el-button type="text" size="sm" @click="pageWarehouse(row, key)">
                查看{{ product_type(key) }}记录
              </el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.current"
      :limit.sync="listQuery.size" @pagination="doSearch" />
    <el-dialog :visible.sync="quote_dialog" width="80%">
      <el-row>
        <el-col :span="6">
          <el-select class="leo-select-label-width-100" v-model="quote.refNo" placeholder="关联号">
            <el-option v-for="item,key in getQuoteRefNo()" :key="key" :value="item.id"
              :label="item.title" />
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-input v-model="quote.code" placeholder="oe号" />
        </el-col>
        <el-col :span="4">
          <el-input v-model="quote.quantity" placeholder="数量" />
        </el-col>
        <el-col :span="4">
          <el-input v-model="quote.unitPrice" placeholder="单价" />
        </el-col>
        <el-col :span="5">
          <el-input v-model="quote.remark" placeholder="备注" />
        </el-col>
      </el-row>
      <el-row>
        <el-button @click="onSubmitQuote" type="primary" style="float: right;">提交/submit
        </el-button>
      </el-row>

    </el-dialog>
    <el-drawer title="我嵌套了表格!" :visible.sync="warehouseQuery.show" direction="btt" size="60%"
      :with-header="false">
      <el-table :data="[current_row]" border="" v-show="current_row.show" :show-header="false">
        <el-table-column label="image" width="80">
          <template slot-scope="{row}">
            <el-image :src="row.mainImage" />
          </template>
        </el-table-column>
        <el-table-column label="name" prop="name" />
        <el-table-column label="类型">
          <template slot-scope="{row}">
            <span v-html="row.code[0]" />
          </template>
        </el-table-column>
        <el-table-column label="类型">
          <template slot-scope="{row}">
            <span v-html="product_type(row.key)" />
          </template>
        </el-table-column>
        <el-table-column label="packageSize" prop="packageSize" />
        <el-table-column label="weight" prop="weight" />
      </el-table>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-table border :data="outbound" style="width: 100%;" height="400">
            <!-- <el-table-column label="id" prop="id" align="center" /> -->
            <el-table-column label="类型" prop="type" align="center" :formatter="typeFormatter"
              fixed="left" />
            <el-table-column label="售价" prop="sellingPrice" align="center" fixed="left" />
            <el-table-column label="数量" prop="amount" align="center" fixed="left" />
            <el-table-column label="单位" prop="unit" align="center" />
            <el-table-column label="出库时间" prop="createTime" align="center" width="200px" />
            <el-table-column label="进价" prop="purchasePrice" align="center" />
            <el-table-column label="订单号" prop="orderId" align="center" width="200px" />
            <el-table-column label="客户" prop="customer" align="center" />
            <el-table-column label="备注" prop="remark" align="center" />
            <el-table-column label="oe" prop="nno" align="center" />
          </el-table>
        </el-col>
        <el-col :span="12">
          <el-table border :data="inbound" style="width: 100%" height="400">
            <el-table-column label="类型" prop="type" align="center" :formatter="typeFormatter"
              fixed="left" />
            <el-table-column label="进价" prop="purchasePrice" align="center" fixed="left" />
            <el-table-column label="数量" prop="amount" align="center" fixed="left" />
            <el-table-column label="单位" prop="unit" align="center" />
            <el-table-column label="出库时间" prop="createTime" align="center" width="200px" />
            <el-table-column label="售价" prop="sellingPrice" align="center" />
            <el-table-column label="订单号" prop="orderId" align="center" width="200px" />
            <el-table-column label="供应方" prop="customer" align="center" />
            <el-table-column label="备注" prop="remark" align="center" />
            <el-table-column label="结款方式" prop="purchaseType" align="center" />
            <el-table-column label="送货方式" prop="shipping" align="center" />
            <el-table-column label="nno" prop="nno" align="center" />
          </el-table>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>
<style scoped>
.leo-select-label-width-100 {
  width: 100%;
}
</style>
<script>
import { product_type } from '@/utils/dict'
import waves from '@/directive/waves' // waves directive
// import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { product_page_api } from '@/api/leo-product'
import { api_warehouse_page } from '@/api/leo-warehouse'
import jsCookie from 'js-cookie'
import { service } from '@/api/index'
export default {
  name: 'LeoProductHistory',
  components: { Pagination },
  directives: { waves },
  filters: {
    codeFilter: (e) => {
      if (e.length == 0) {
        return ''
      }
      if (e.length == 1) {
        return e[0]
      }
      let str = e[0]
      e.forEach((v) => {
        str = str + ',' + v
      })
      return str
    }
  },
  data() {
    return {
      service,
      quote: {
        code: '',
        quantity: null,
        remark: '',
        unitPrice: null,
        productId: null,
        refNo: ''
      },
      quote_dialog: false,
      list: [],
      total: 0,
      listQuery: {
        code: '', // 3411 6785 670-Q
        status: -1,
        name: null,
        size: 10,
        current: 1
      },
      warehouseQuery: {
        productId: 0,
        size: 10,
        current: 1,
        show: false
      },
      current_row: {
        show: false,
        code: []
      },
      inbound: [],
      outbound: []
    }
  },
  created() {
    this.doSearch()
  },
  methods: {
    product_type(type) {
      return product_type[type]
    },
    handleQuote(product) {
      this.quote.productId = product.id
      this.quote_dialog = true
    },
    getQuoteRefNo() {
      return [
        { id: 1, title: '报价测试11' },
        { id: 2, title: '报价测试12' }
      ]
    },
    onSubmitQuote() {
      const list = JSON.parse(jsCookie.get('quote_list'))
      if (!list || list == '') {
        list = []
      }
      list.push(this.quote)
      jsCookie.set('quote_list', JSON.stringify(list))
      this.$notify({ message: this.quote, type: 'success' })
    },
    pageWarehouse(product, key) {
      this.warehouseQuery.show = true
      this.current_row = product
      this.current_row.key = key
      this.current_row.show = true
      this.warehouseQuery.productId = product.type[key]
      api_warehouse_page(this.warehouseQuery).then((res) => {
        this.outbound = res.data.records.filter((i) => i.type === '1')
        this.inbound = res.data.records.filter((i) => i.type === '0')
      })
    },
    doSearch() {
      product_page_api(this.listQuery).then((res) => {
        this.list = res.data.records
        this.total = res.data.total
      })
    },
    typeFormatter(row) {
      if (row.type === '1') {
        return '出库'
      } else {
        return '入库'
      }
    }
  }
}
</script>
