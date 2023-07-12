<template>
  <div>
    <Category1688
      :value="productId"
      categoryContent="设置为产品名"
      @change="e => (productId = e)"
    >
    </Category1688>
  </div>
</template>
<script>
import Category1688 from '@/views/leo-alibaba/components/Category1688.vue'
export default {
  components: { Category1688 },
  data () {
    return {
      productId: ''
    }
  }
}
</script>
