<template>
  <div>
    <el-button type="primary" size="default" @click="handBltClk(opt)" v-for=" opt,key in apiOptions"
      :key="key">{{opt.desc}}</el-button>
    {{ catProp }}
    <CatProp :catProp="schema.data.catProp" v-model="catProp" v-if="key==1"></CatProp>
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
      catProp: {},
      key: 0
    }
  },
  mounted() {
    this.schema.data.catProp.fields.dataSource.forEach((element) => {
      // this.catProp[element.name] = ''
    })
    setTimeout(() => {
      this.key = 1
    }, 2000)
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