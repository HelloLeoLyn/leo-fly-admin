<template>
  <div class="product-intro">
    <div class="preview-wrap">
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item,i in images" :key="i">
          <img :src="item.md" alt="轮播图" width="300" height="300" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeoElCarousel',
  data() {
    return {};
  },
  props: {
    images: {
      type: Array,
      default: (e) => {
        if (e) {
          return e;
        }
        return [];
      },
    },
  },

  methods: {
    //   将轮播图指示器渲染成图片
    indicatorToimage: function () {
      let a = document.querySelectorAll('.el-carousel__button');
      // console.log(a);
      for (let i in this.images) {
        // 添加一个img
        let img = document.createElement('img');
        img.src = this.images[i].sm;
        img.style.height = '50px';
        img.style.width = '50px';
        // 加到button里面
        a[i].appendChild(img);
      }
    },
  },
  mounted() {
    // 在完全加载后再执行函数
    this.$nextTick(() => this.indicatorToimage());
  },
};
</script>

<style lang="scss" >
/* 轮播图样式 */
.preview-wrap .el-carousel {
  width: 350px;
  height: 400px;
}
.preview-wrap .el-carousel__button {
  width: 50px;
  height: 50px;
}
.preview-wrap .el-carousel__button {
  width: 50px;
  height: 50px;
}
.preview-wrap .el-carousel__button {
  width: 50px;
  height: 50px;
  image {
    width: 50px;
    height: 50px;
  }
}
</style>
