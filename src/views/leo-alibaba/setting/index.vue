<template>
  <div>
    <el-button type="primary" size="default" @click="handBltClk(opt)" v-for=" opt,key in apiOptions"
      :key="key">{{opt.desc}}</el-button>
    <CatProp :catProp="schema.data.catProp" v-model="data.catProp"></CatProp>
  </div>
</template>
<script>
import { schema } from '.'
import { apiOptions, api_alibaba_product_schema } from '@/api/leo-alibaba'
import CatProp from '../product/Schema/CatProp.vue'
export default {
  components: {
    CatProp
  },
  data() {
    return {
      apiOptions,
      schema,
      data: {
        catProp: null
      }
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