<template>
  <div>
    <el-button type="primary" size="default" @click="handBltClk(opt)" v-for=" opt,key in apiOptions"
      :key="key">{{opt.desc}}</el-button>
  </div>
</template>
<script>
import { apiOptions, api_alibaba_product_schema } from '@/api/leo-alibaba'
export default {
  data() {
    return {
      apiOptions
    }
  },
  methods: {
    handBltClk(opt) {
      api_alibaba_product_schema(opt).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>