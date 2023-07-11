<template>
  <div>
    <el-radio v-model="radio1" label="r" border style="background: #f56c6c;">电商</el-radio>
    <el-radio v-model="radio1" label="g" border style="background: #67c23a;">包装</el-radio>
    <el-radio v-model="radio1" label="b" border style="background: #409eff;">原厂</el-radio>
    <el-row :gutter="20">
      <el-col v-for="image,key in images" :key="key" :span="3">
        <vue-hover-mask @click="handleClick(image)">
          <!-- 默认插槽 -->
          <el-image :src="image.url" width="100%" style="height:150px" />
          <label style="position: absolute" :ref="image.id" class=""><i
              class="el-icon-check leo-icon-check"></i></label>
        </vue-hover-mask>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import VueHoverMask from 'vue-hover-mask'
export default {
  components: {
    VueHoverMask
  },
  data() {
    return {
      radio1: '',
      classList: {
        r: 'leo-sm-label leo-sm-label-r',
        g: 'leo-sm-label leo-sm-label-g',
        b: 'leo-sm-label leo-sm-label-b'
      }
    }
  },
  props: {
    images: {
      type: Array,
      required: true
    },
    checkable: {
      type: Boolean,
      default: () => {
        return true
      }
    }
  },
  mounted() {},
  methods: {
    handleClick(image) {
      if (!this.checkable) {
        return
      }
      if (image.type) {
        if (image.type == this.radio1) {
          this.$refs[image.id][0].className = ''
          image.type = null
        } else {
          this.$refs[image.id][0].className = this.classList[this.radio1]
          image.type = this.radio1
        }
      } else {
        this.$refs[image.id][0].className = this.classList[this.radio1]
        image.type = this.radio1
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import url('//at.alicdn.com/t/font_1262845_52b6h42svd7.css');
.iconfont {
  font-size: 25px;
}
.height {
  height: unset;
}
.leo-icon-check {
  font-size: 12px;
  margin-top: 11px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
.leo-sm-label {
  font-weight: 700;
  right: -15px;
  top: -6px;
  width: 40px;
  height: 24px;
  &-b {
    background: #409eff;
  }
  &-g {
    background: #67c23a;
  }
  &-r {
    background: #f56c6c;
  }
  text-align: center;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-box-shadow: 0 0 1pc 1px rgb(0 0 0 / 20%);
}
</style>