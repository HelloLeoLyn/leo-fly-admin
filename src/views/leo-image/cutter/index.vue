<template>
  <div>
    <LeoImgCutter v-if="images" :images="images" :index="index" />
  </div>
</template>
<script>
import LeoImgCutter from '@/components/LeoImage/Cutter/index.vue'
import RemoveBg from './components/RemoveBg.vue'
export default {
  name: 'LeoImageCutter',
  components: {
    LeoImgCutter,
    RemoveBg
  },

  mounted () {
    this.index = this.$route.params.index
    this.images = this.$route.params.images
  },
  data () {
    return {
      index: null,
      images: null
    }
  }
}
</script>
