<template>
  <div>
    <el-form :model="form" ref="form" :rules="rules" label-width="80px" :inline="false" size="normal">
      <el-form-item label="code">
        <el-input v-model="form.code" readonly></el-input>
      </el-form-item>
      <el-form-item label="subject" prop="subject">
        <Subject @change="e => form.subject = e" :carFitment="JSON.parse(product.model)" :product="product"
          :key="key.subject" />
      </el-form-item>
      <el-form-item label="images" prop="images">
        <Images :ref="$route.params.id" :product-id="$route.params.id" :sources="[]" @getImages="getImages" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
import Subject from '@/views/leo-goods/aliexpress/components/Subject'
import Images from '@/components/LeoImage/List.vue'
import { api_get_product_more } from '@/api/leo-product'
import { api_goods_post } from '@/api/leo-goods'
export default {
  components: { Images, Subject },
  data() {
    return {
      key: {
        productImage: 0,
        subject: 1000,
      },
      form: {
        subject: '',
        code: '',
        platform:'aliexpress',
        productId:null,
        thirdPartId:'',
        images:''
      },
      rules: {
        subject: [{ required: true, message: '请输入', trigger: 'blur' }, { require: true, min: 60, max: 128, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
        images:[{required: true, message:'请输入', trigger: 'blur'}]
      },
      product: null
    }
  },
  created() {
    this.form.productId = this.$route.params.id
    api_get_product_more(this.$route.params.id).then((res) => {
      this.product = res.data
      this.form.code = this.product.code ? this.product.code[0] : ''
    })
  },
  methods: {
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (!valid) return
        api_goods_post(this.form).then((res) => {
          this.$message.success(res.msg)
        })
      })
    },
    getImages(e) {
      this.form.Images = JSON.stringify(e)
    },
  }
}
</script>