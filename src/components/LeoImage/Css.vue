<template>
  <div class="background" :style="backgroundImageUrl ? 'background-image: url(' + backgroundImageUrl + ');' : ''">
    <img :src="url" alt="Your Image" :style="imgStyle">
  </div>
</template>
<style lang="scss">
.overlay-image {
  position: absolute;
  // top: 200px;
  /* 图片距离背景顶部的距离 */
  // left: 300px;
  /* 图片距离背景左侧的距离 */
  width: 200px;
  /* 图片的宽度 */
  height: 200px;
  /* 图片的高度 */
}

.background {
  // background-image: url('http://localhost:8080/img/8/40547.jpg');
  background-size: cover;
  position: relative;
}
</style>
<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    },
    backgroundImageUrl: {
      type: String,
      required: true
    },
    imgStyle: {
      type: String,
      required: true
    },
  }
}
</script>