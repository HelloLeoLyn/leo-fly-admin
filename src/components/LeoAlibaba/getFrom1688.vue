<template>
  <div>
    <el-button :type="btn.type" :size="btn.size" @click="btnClick">{{btn.content}}</el-button>
    <el-dialog :visible.sync="visible">
      <el-button @click="daying">daying</el-button>
    </el-dialog>
  </div>
</template>
<script>
import { api_product_alibaba_get } from '@/api/leo-product-alibaba'
import { toAttributes } from '@/utils/index'
export default {
  props: {
    btn: {
      type: Object,
      default: () => {
        return {
          type: 'primary',
          size: 'medium',
          content: '获取1688商品信息'
        }
      }
    },
    goodId: {
      type: Number,
      required: true
    },
    isDialog: {
      type: Boolean,
      required: false,
      default: () => {
        return true
      }
    }
  },
  data() {
    return {
      result: null,
      visible: false,
      attributes: null
    }
  },
  methods: {
    inputData() {
      return JSON.stringify(this.result)
    },
    daying() {
      console.log(1111)
      const a = toAttributes(this.result)
      console.log(a)
    },

    btnClick() {
      if (this.isDialog) {
        this.visible = !this.visible
      }
      this.getProductInfo()
    },
    getProductInfo() {
      api_product_alibaba_get(this.goodId).then((res) => {
        this.$notify.success(res.msg)
        this.result = res.data.productInfo
        this.$emit('btnClick', this.result)
      })
    }
  }
}
</script>