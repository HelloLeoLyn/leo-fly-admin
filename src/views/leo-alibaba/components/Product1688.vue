<template>
  <div>
    <el-row>
      <el-col :span="8">
        <el-input value="152550850">
          <el-button slot="append" @click="get">search</el-button>
        </el-input>
      </el-col>
      <el-col :span="8">
        <el-input v-model="key">
          <el-button slot="append" @click="filter">filter</el-button>
        </el-input>
      </el-col>
      <el-col :span="8">
        <el-button @click="showContent"><span v-if="show">hidden</span><span v-else>show</span>
        </el-button>
      </el-col>
    </el-row>
    <el-row v-show="show">{{this.content}}</el-row>
  </div>
</template>
<script>
import { api_product_alibaba_get } from '@/api/leo-product-alibaba'
export default {
  data() {
    return {
      id: '639309756146',
      product: null,
      key: null,
      content: null,
      show: false
    }
  },
  created() {},
  methods: {
    get() {
      api_product_alibaba_get(this.id).then((res) => {
        this.product = res.data.productInfo
        this.show = true
        this.filter()
      })
    },
    filter() {
      if (this.key) {
        this.content = this.product[this.key]
      } else {
        this.content = this.product
      }
    },
    showContent() {
      this.show = !this.show
    }
  }
}
</script>