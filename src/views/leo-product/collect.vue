<template>
  <LeoWebCollectorContent @onConfirm="onConfirm" :values="values" v-if="key>0" />
</template>
<script>
import LeoWebCollectorContent from '@/components/LeoWebCollector/content/index.vue'
export default {
  components: { LeoWebCollectorContent },
  name: 'LeoProductCollect',
  data() {
    return {
      values: {},
      key: 0
    }
  },
  methods: {
    onConfirm() {}
  },
  mounted() {
    const id = decodeURIComponent(this.$route.params.id)
    this.values = JSON.parse(id)
    this.key++
  }
}
</script>