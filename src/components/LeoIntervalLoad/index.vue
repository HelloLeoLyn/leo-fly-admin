<template>
  <div></div>
</template>
<script>
export default {
  props: {
    ok: {
      type: Boolean,
      require: true
    },
    text: {}
  },
  data() {
    return { loading: true, count: 0, msg: 'loading' }
  },
  created() {
    let timer = setInterval(() => {
      if (this.ok) {
        clearInterval(timer)
        this.loading = false
      }
      if (this.count < 1) {
        this.count++
        this.$emit('onLoad')
      } else {
        clearInterval(timer)
        this.loading = false
        this.msg = '没有记录'
      }
    }, 3000)
  }
}
</script>
