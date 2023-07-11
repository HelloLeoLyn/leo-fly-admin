<template>
  <div class="app-container">
    <el-descriptions class="margin-top" title="带边框列表" :column="3" border>
      <template slot="extra">
        <el-button type="primary" size="small">操作</el-button>
      </template>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          客户名称
        </template>
        {{ quote.customer }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          报价单号
        </template>
        {{ quote.seq }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          标题
        </template>
        {{ quote.title }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          状态
        </template>
        <el-tag size="small">{{ status_map[quote.status] }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          类型
        </template>
        <el-tag size="small">{{ type_map[quote.type] }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          备注
        </template>
        {{ quote.remark }}
      </el-descriptions-item>
    </el-descriptions>

    <div class="filter-container">
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleSyncQuote">
        同步报价
      </el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleSimilarClick">
        相似查询
      </el-button>

      <LeoExport v-waves class="filter-item" v-if="quote.load" type="primary" :list="quote.items" :columns="exportColumns"
        :newFilename="quote.seq + '报价结果'" label="导出" />
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
        @click="handleQuoteItemAdd">
        新增
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
        @click="handleQuoteItemSave">
        保存
      </el-button>
    </div>

    <el-form :model="quote" :rules="rules" ref="quote" label-width="0px">
      <el-table :data="quote.items" border ref="quoteTable" @selection-change="handleSelectionChange">
        <el-table-column width="50" type="selection">
        </el-table-column>
        <el-table-column label="操作" class-name="small-padding fixed-width" width="250">
          <template slot-scope="{row}">
            <el-button-group>
              <el-button type="primary" icon="el-icon-edit" @click="checkRefProduct(row)">类似产品
              </el-button>
              <el-button v-if="row.state == 10" type="primary" icon="el-icon-delete"
                @click="handleSelectHistory2(row, $index)">历史报价</el-button>
              <el-button type="primary" icon="el-icon-add" v-if="row.state == 0"
                @click="$router.push(`/leo-product/add/` + row.code,)">产品新增</el-button>
            </el-button-group>
          </template>
        </el-table-column>
        <el-table-column label="图片" width="100">
          <template slot-scope="{row}">
            <el-image :src="'http://127.0.0.1:8080/product/image/main/' + row.productId + '/50x50'" v-if="row.productId != 0">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="oe" prop="code" width="120" sortable>
          <template slot-scope="{row,$index}">
            <template v-if="row.edit">
              <el-form-item :prop="'items.' + $index + '.code'" :rules="rules.code">
                <el-input v-model="row.code" class="edit-input" size="small" />
              </el-form-item>
            </template>
            <span v-else>{{ row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="实际数量" prop="quantity" width="120">
          <template slot-scope="{row,$index}">
            <el-form-item :prop="'items.' + $index + '.quantity'" :rules="rules.quantity">
              <el-input v-model="row.quantity" class="edit-input" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="实际价格" width="120">
          <template slot-scope="{row,$index}">
            <el-form-item :prop="'items.' + $index + '.unitPrice'" :rules="rules.unitPrice">
              <el-input v-model="row.unitPrice" class="edit-input" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="参考数量" prop="suggestedAmount" width="120">
          <template slot-scope="{row}">
            <span>{{ row.suggestedAmount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="建议价格" width="120">
          <template slot-scope="{row}">
            <span>{{ row.suggestedPrice }}</span>
          </template>
        </el-table-column>

        <el-table-column label="库存" width="80">
          <template slot-scope="{row}">
            <span v-html="row.warehouseAmount | 0" />
          </template>
        </el-table-column>
        <el-table-column label="关联产品">
          <template slot-scope="{row}">
            <p>{{ row.remark }}</p>
          </template>
        </el-table-column>
        <el-table-column label="报价状态" width="150" :sortable="true" :sort-method="sortState">
          <template slot-scope="{row,$index}">
            <div v-if="row.state > 0">
              查询完毕
            </div>
            <div v-else v-loading="row.loading">
              <LeoIntervalLoad v-if="row.loading" @onLoad="onLoad(row, $index)" />
              无记录
            </div>
          </template>
        </el-table-column>

      </el-table>
    </el-form>

    <el-dialog :visible.sync="refProductTable.show" title="选择产品">
      <el-input v-model="current_code">
        <el-button slot="append" @click="doSearchProductByCode(current_code)">查询</el-button>
      </el-input>
      <el-table :data="refProductTable.tableData">
        <el-table-column label="image">
          <template slot-scope="{row}">
            <el-image :src="getImageByProductId(row.id, '50X50')"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="oe" prop="code">
          <template slot-scope="{row}">
            <div v-html="highLightBatch(row)" />
          </template>
        </el-table-column>
        <el-table-column label="name" prop="name" />
        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button @click="checkRefProductItem(row)">确定</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog :visible.sync="similarDialog.show" style="min-height:400px;" v-loading="similarDialog.loading">
      <el-form inline>
        <el-form-item>
          <el-checkbox v-model="similarDialog.cutLeft">去除左边</el-checkbox>
          <el-input v-if="similarDialog.cutLeft" v-model="similarDialog.cutLeftLength" style="width:180px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="similarDialog.cutRight">去除右边</el-checkbox>
          <el-input v-if="similarDialog.cutRight" v-model="similarDialog.cutRightLength" style="width:180px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="similarDialog.cutAfterSymbol">去除符号之后的数据</el-checkbox>
          <el-input v-if="similarDialog.cutAfterSymbol" v-model="similarDialog.symbol" style="width:180px;"></el-input>
        </el-form-item>
      </el-form>
      <p v-for="data, key in quote.items" :key="key">{{ formatCode(data) }}</p>
      <template slot="footer">
        <el-button @click="onsubmitSimilarCheck">查询</el-button>
      </template>
    </el-dialog>

    <LeoQuoteHistory :productId="current_productId" :quoteId="$route.params.id" :show="historyShow2" :key="historyCount2"
      @onOutRowDbclick="onSelectPrice" @onConfirmClick="onSelectPrice" :rowAction="true" direction="btt" />
  </div>
</template>
<style lang="scss">
.leo-high-light {
  background-color: aqua;
}
</style>
<script>
// import LeoYiPeiCollector from '@/components/LeoWebCollector/YiPei.vue'
import LeoQuoteHistory from '@/views/leo-quote/components/LeoQuoteHistory.vue'
import { api_quote_get, api_quote_product_sync } from '@/api/leo-quote'
import { getImageByProductId } from '@/api/leo-image'
import { product_page_api } from '@/api/leo-product'
import { codeFilter } from '@/utils/format'
import { moneyValidator } from '@/utils/validate'
import {
  api_quote_items_post,
  api_quote_items_put,
  api_quote_items_page,
  api_quote_items_delete
} from '@/api/leo-quote-items'
import { quote_dict } from '@/utils/dict'
import LeoIntervalLoad from '@/components/LeoIntervalLoad'
import LeoExport from '@/components/LeoExport'
import waves from '@/directive/waves' // waves directive
import { api_warehouse_page } from '@/api/leo-warehouse'
export default {
  components: {
    LeoIntervalLoad,
    LeoQuoteHistory,
    LeoExport
    // LeoYiPeiCollector
  },
  directives: { waves },
  data() {
    return {
      tempStr: '<span>tempStr</span>',
      historyCount2: 0,
      refProductTable: {
        show: false,
        tableData: [],
        query: {}
      },
      load_id: 0,
      id: '',
      quote: {
        load: false
      },
      exportColumns: [
        { label: 'oe', key: 'code', checked: true },
        { label: '数量', key: 'quantity', checked: true },
        { label: '价格', key: 'unitPrice', checked: true },
        { label: '参考数量', key: 'suggestedAmount', checked: true },
        { label: '建议价格', key: 'suggestedPrice', checked: true }
      ],
      current_index: -1,
      current_productId: 0,
      current_similar_code: '',
      current_code: '',
      historyShow2: false,
      status_map: quote_dict.status_map,
      type_map: quote_dict.type_map,
      rules: {
        code: [
          { required: true, message: '请输入号码', trigger: 'blur' },
          { min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur' }
        ],
        quantity: [{ required: true, message: '请输入数量', trigger: 'blur' }],
        unitPrice: [
          { required: true, message: '请输入金额', trigger: 'blur' },
          {
            validator: moneyValidator,
            trigger: 'blur',
            message: '请填写正确的[金额]'
          }
        ]
      },
      similarDialog: { show: false, loading: false },
      selection: []
    }
  },
  mounted() {
    this.id = this.$route.params.id
    this.quote.items = []
    api_quote_get(this.id).then((res) => {
      this.quote = res.data
      if (this.quote.items && this.quote.items.length > 0) {
        this.quote.items = this.quote.items.map((m) => {
          m.ok = m.state == 0 ? false : true
          this.$set(m, 'edit', false)
          this.$set(m, 'loading', false)
          return m
        })
        this.quote.load = true
      }
    })
  },
  methods: {
    yipeiConfirm(e, row) {
      row.productId = e.data.productId
      row.state = 10
      api_quote_items_put(row).then(() => {
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
      })
    },
    handleSelectionChange(val) {
      this.selection = val
    },
    codeFilter,
    highLightBatch(row) {
      if (row.code.length == 0) {
        return ''
      }
      if (row.code.length == 1) {
        return this.highLight(row.code[0], this.current_similar_code)
      } else {
        let str = this.highLight(row.code[0], this.current_similar_code)
        for (let i = 1; i < row.code.length; i++) {
          str =
            str + ',' + this.highLight(row.code[i], this.current_similar_code)
        }
        return str
      }
    },
    highLight(str, highPartStr) {
      console.log(str, highPartStr)
      const index = str.indexOf(highPartStr)
      if (index == 0) {
        str =
          '<span class="leo-high-light">' +
          str.slice(0, highPartStr.length) +
          '</span>' +
          str.slice(highPartStr.length)
        return str
      } else if (index > 0) {
        str =
          str.slice(0, index) +
          '<span class="leo-high-light">' +
          str.slice(index, highPartStr.length) +
          '</span>' +
          str.slice(index + highPartStr.length)
        return str
      } else {
        return str
      }
    },
    getImageByProductId(id, pixel) {
      return getImageByProductId(id, pixel)
    },
    handleSyncOneItem(row) {
      this.$set(row, 'loading', true)
    },
    handleSyncQuote() {
      let list = this.quote.items
      if (this.selection) {
        list = this.selection
      }
      list.forEach((item) => {
        this.$set(item, 'loading', true)
        this.$set(item, 'state', 0)
      })
    },
    handleItemDel(index) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          api_quote_items_delete(this.quote.items[index].id).then(() => {
            this.quote.items.splice(index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    sortState(a, b) {
      if (a.state - b.state > 0) {
        return 1
      } else {
        return -1
      }
    },
    onLoad(row, index) {
      console.log(row)
      const params = {
        id: this.quote.items[index].id,
        code: this.quote.items[index].code
      }
      api_quote_product_sync(params)
        .then((res) => {
          const { state, productId } = res.data
          this.$set(row, 'state', state)
          this.$set(row, 'ok', true)
          this.$set(row, 'productId', productId)
          const param = {
            productId: row.productId,
            size: 1,
            current: 1
          }
          api_warehouse_page(param)
            .then(({ data }) => {
              if (data.records[0]) {
                const history = data.records[0]
                this.$set(row, 'suggestedAmount', history.amount)
                this.$set(row, 'suggestedPrice', history.sellingPrice)
                this.$set(row, 'unitPrice', history.sellingPrice)
                api_quote_items_put(row).then(() => {
                  this.$message({
                    type: 'success',
                    message: '保存成功!'
                  })
                })
              } else {
                let aqidParams = {
                  productId
                }
                api_quote_items_page(aqidParams).then((aqidRes) => {
                  const history = aqidRes.data.records[0]
                  this.$set(row, 'suggestedAmount', history.suggestedAmount)
                  this.$set(row, 'suggestedPrice', history.suggestedPrice)
                  this.$set(row, 'unitPrice', history.unitPrice)
                })
              }
            })
            .catch((e) => {
              console.error(e)
            })
        })
        .catch((e) => {
          console.error(e)
          setTimeout(() => {
            row.loading = false
          }, 0.5 * 1000)
        })
    },
    handleQuoteItemAdd() {
      this.quote.items.splice(0, 0, {
        quoteId: this.quote.id,
        productId: 0,
        state: null,
        edit: true,
        loading: false
      })
    },
    handleQuoteItemSave() {
      this.quote.items.forEach((item, index) => {
        this.onSubmitQuoteItem('quote', item, index)
      })
    },
    handleQuoteExport() {
      const index = this.quote.items.findIndex((i) => {
        return i.edit
      })
      if (index == -1) {
        this.quote.items.splice(0, 0, {
          quoteId: this.quote.id,
          productId: 0,
          state: null,
          edit: true,
          loading: false
        })
      } else {
        this.$message.warning('有数据未保存，不能新增')
      }
    },
    handleQuoteAddProduct() {
      const index = this.quote.items.findIndex((i) => {
        return i.edit
      })
      if (index == -1) {
        this.quote.items.splice(0, 0, {
          quoteId: this.quote.id,
          productId: 0,
          state: null,
          edit: true,
          loading: false
        })
      } else {
        this.$message.warning('有数据未保存，不能新增')
      }
    },
    handleSimilarClick() {
      this.similarDialog.show = true
    },

    onSubmitQuoteItem(refName, row, index) {
      this.$refs[refName].validate((valid) => {
        if (valid) {
          if (row.id) {
            api_quote_items_put(row).then(() => {
              this.quote.items[index].ok = false
              this.$notify.success('保存成功!')
            })
          } else {
            api_quote_items_post(row).then((res) => {
              this.quote.items[index] = res.data
              this.quote.items[index].ok = false
              this.$notify.success('保存成功!')
            })
          }
        } else {
          this.$message({ type: 'error', message: '保存失败' })
          return false
        }
      })
    },
    checkRefProduct(row) {
      this.current_code = row.code
      this.current_similar_code = row.similarCode
      this.current_index = this.getInfoItemsIndexById(row.id)
      if (row.productId != 0) {
        this.doSearchProductById(row.productId)
      } else {
        this.doSearchProductByCode(row.code)
      }
    },
    doSearchProductById(id) {
      const param = {
        id: id,
        columns: ['id', 'name', 'code', 'ref_no']
      }
      product_page_api(param).then((res) => {
        this.refProductTable.show = true
        this.refProductTable.tableData = res.data.records
      })
    },
    doSearchProductByCode(code) {
      const param = {
        code: code,
        columns: ['id', 'name', 'code', 'ref_no']
      }
      product_page_api(param).then((res) => {
        this.refProductTable.show = true
        this.refProductTable.tableData = res.data.records
      })
    },
    getInfoItemsIndexById(id) {
      return this.quote.items.findIndex((i) => {
        return id == i.id
      })
    },

    handleSelectHistory2(row) {
      this.historyCount2 = this.historyCount2 + 1
      this.current_index = this.getInfoItemsIndexById(row.id)
      this.current_productId = row.productId
      this.historyShow2 = true
    },
    checkRefProductItem(row) {
      this.$confirm('此操作将更改关联产品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.quote.items[this.current_index].productId = row.id
        this.quote.items[this.current_index].remark = codeFilter(row.code)
        this.quote.items[this.current_index].state = 10
        api_quote_items_put(this.quote.items[this.current_index]).then(() => {
          this.$message({
            type: 'success',
            message: '更改成功!'
          })
        })
      })
    },
    formatCode(data) {
      let code = data.code
      if (
        this.similarDialog.cutAfterSymbol &&
        this.similarDialog.symbol &&
        this.similarDialog.symbol != ''
      ) {
        if (code.indexOf(this.similarDialog.symbol) != -1) {
          code = code.slice(0, code.indexOf(this.similarDialog.symbol))
        }
      }
      if (this.similarDialog.cutLeft && this.similarDialog.cutLeftLength) {
        code = code.slice(this.similarDialog.cutLeftLength)
      }

      if (this.similarDialog.cutRight && this.similarDialog.cutRightLength) {
        code = code.slice(0, code.length - this.similarDialog.cutRightLength)
      }

      return code
    },
    onsubmitSimilarCheck() {
      this.loading = true
      this.quote.items.forEach((data, i) => {
        const oe = this.formatCode(data)
        const params = {
          id: data.id,
          code: oe
        }
        api_quote_product_sync(params).then((res) => {
          const { state, productId } = res.data
          data.state = state
          data.ok = true
          data.productId = productId
          data.similarCode = oe
          this.quote.items.splice(i, 1, res.data)
        })
      })
      this.loading = false
    },
    onSelectPrice(data) {
      this.$set(
        this.quote.items[this.current_index],
        'unitPrice',
        data.sellingPrice
      )
      this.$set(
        this.quote.items[this.current_index],
        'suggestedAmount',
        data.amount
      )
      this.$set(
        this.quote.items[this.current_index],
        'suggestedPrice',
        data.sellingPrice
      )
    }
  }
}
</script>
