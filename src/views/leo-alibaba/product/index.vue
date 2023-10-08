<template>
  <div>
    <el-table :data="list" style="width: 100%" ref="productsTable">
      <el-table-column label="tag">
        <template slot-scope="{ row, $index }">
          <div>
            {{ JSON.stringify(row) }}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.current"
      :limit.sync="listQuery.size"
      @pagination="onClickSearch"
    />
  </div>
</template>
<script>
import { api_product_alibaba_page } from '@/api/leo-product-alibaba'
export default {
  data () {
    return {
      list: [],
      listQuery: {
        size: 10,
        current: 1
      },
      total: 0,
      loading: false
    }
  },
  created () {
    api_product_alibaba_page(this.listQuery).then(res => {
      this.list = res.data.records
      console.log(JSON.stringify(this.list[0]))
    })
  },
  methods: {
    onClickSearch () {
      api_product_alibaba_page(this.listQuery).then(res => {
        this.list = res.data.records
      })
    }
  }
}
</script>
