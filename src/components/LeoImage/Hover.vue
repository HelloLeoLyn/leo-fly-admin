<template>
  <div>
    <vue-hover-mask @click="handleClick(image)" class="leo-vue-hover">
      <!-- 默认插槽 -->
      <img :src="image.src" :width="width" :height="height" />
      <label style="position: absolute" :ref="image.id" class=""
        ><i class="el-icon-check leo-icon-check"></i
      ></label>
      <!-- action插槽 -->
      <template v-slot:action>
        <!-- <el-tooltip></el-tooltip> -->
        <div v-if="image.exph">
          <span style="font-size: 12px">{{ image.expw }}X{{ image.exph }}</span>
          <br />
        </div>
        <el-button
          type="text"
          size="mini"
          v-if="removeBtn"
          @click="handleRemoveBtnClick"
          >删除
        </el-button>
        <el-button
          type="text"
          size="mini"
          v-if="bigBtn"
          @click="handleBigBtnClick"
          >大图</el-button
        >
      </template>
    </vue-hover-mask>
    <el-dialog :visible.sync="visible" width="1100">
      <el-image :src="image.large" width="100%" />
    </el-dialog>
  </div>
</template>
<script>
import VueHoverMask from 'vue-hover-mask'
import { service } from '@/api/index'
export default {
  components: {
    VueHoverMask
  },
  data () {
    return {
      service,
      visible: false,
      checkable2: true
    }
  },
  props: {
    image: {
      type: Object,
      required: true
    },
    height: {
      type: [String, Number],
      default: () => {
        return '100'
      }
    },
    width: {
      type: [String, Number],
      default: () => {
        return '100'
      }
    },
    removeBtn: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    checkable: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    bigBtn: {
      type: Boolean,
      default: () => {
        return true
      }
    }
  },
  mounted () {
    if (this.image.checked) {
      this.$refs[this.image.id].className = 'leo-sm-label'
    } else {
      this.$refs[this.image.id].className = ''
    }
  },
  methods: {
    handleClick (image) {
      if (!this.checkable && !this.checkable2) {
        return
      }
      if (image.checked) {
        image.checked = !image.checked
      } else {
        image.checked = true
      }
      if (image.checked) {
        this.$refs[image.id].className = 'leo-sm-label'
      } else {
        this.$refs[image.id].className = ''
      }
      this.$emit('click', image.checked)
    },
    handleBigBtnClick () {
      if (this.checkable) {
        this.image.checked = !this.image.checked
      }
      this.visible = true
    },
    handleRemoveBtnClick () {
      if (this.checkable) {
        this.image.checked = !this.image.checked
      }
      this.$emit('onRemove', this.image)
    }
  }
}
</script>
<style lang="scss" scoped>
@import url('//at.alicdn.com/t/font_1262845_52b6h42svd7.css');

.leo-vue-hover {
  background: #13ce66;

  img {
    background: #13ce66;
  }
}

.iconfont {
  font-size: 25px;
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
  background: #13ce66;
  text-align: center;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-box-shadow: 0 0 1pc 1px rgb(0 0 0 / 20%);
}
</style>
