<template>
  <div>
    <h1>ImageAddCover</h1>
    <ImageAddCover :images="images" :product-id="productId"> </ImageAddCover>
    <h1>HoverList</h1>
    <HoverList
      :images="images"
      :reloadable="true"
      :customzedBtn="[
        { label: '设置封面图', opt: 'alibaba' },
        { label: '设置包装图', opt: 'package' },
        { label: '1688详情封面', opt: '1688detail' }
      ]"
    />
    <h1>ImageSteward</h1>
    <ImageSteward :count="5" :product-id="productId"></ImageSteward>
    <h1>LeoImageHover</h1>
    <LeoImageHover class="image" :image="images[0]" style="padding: 5px" />
  </div>
</template>
<script>
import ImageAddCover from './ImageAddCover.vue'
import ImageSteward from './ImageSteward.vue'
import HoverList from '@/components/LeoImage/HoverList'
import Cutter from '@/components/LeoImage/Cutter/index.vue'
import LeoImageHover from '@/components/LeoImage/Hover.vue'
export default {
  components: { ImageAddCover, HoverList, ImageSteward, Cutter, LeoImageHover },
  data () {
    return {
      images: [
        {
          src: 'http://127.0.0.1:8080/product/image/40547',
          id: 40547,
          exph: null,
          large: 'http://127.0.0.1:8080/product/image/40547'
        },
        {
          src: 'http://127.0.0.1:8080/product/image/40548',
          id: 40548,
          exph: null,
          large: 'http://127.0.0.1:8080/product/image/40548'
        }
      ],
      productId: 8
    }
  }
}
</script>
