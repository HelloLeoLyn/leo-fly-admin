<template>
  <div>
    <el-row :gutter="5" v-if="images">
      <el-col :span="6" v-for="(image, index) in images" :key="image.id">
        <div style="width: 200px; height: 200px; padding: 10px; margin: 10px">
          <vue-hover-mask style="width: 180px; height: 180px; background-color: gray">
            <el-image :src="image.src" width="100%" />
            <template v-slot:action>
              <el-row v-for="(btn, key) in customzedBtn" :key="key">
                <el-button type="text" size="mini"
                  @click="handleCustomzedClick(image, btn.opt, index)">{{ btn.label }}
                </el-button>
              </el-row>
              <el-row>
                <el-button type="text" size="mini" v-if="bigBtn"
                  @click="handleBigBtnClick(image.src, index)">大图</el-button>
              </el-row>
            </template>
          </vue-hover-mask>
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="visible" width="1100">
      <el-image :src="imageUrl" width="100%" />
    </el-dialog>
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
      visible: false,
      imageUrl: null
    }
  },
  props: {
    images: {
      type: Array,
      default: () => {
        return []
      }
    },
    bigBtn: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    customzedBtn: {
      type: Array,
      default: () => {}
    }
  },
  methods: {
    handleCustomzedClick(image, opt, index) {
      const key = this.getIdIndex(image.id)
      this.images[key].checked = !this.images[key].checked
      this.$emit('onCustomzedClick', image, opt, index)
    },
    getIdIndex(id) {
      return this.images.findIndex((img) => {
        return img.id == id
      })
    },
    handleBigBtnClick(src) {
      if (this.checkable) {
        this.image.checked = !this.image.checked
      }
      this.visible = true
      this.imageUrl = src
    },
    click(l) {
      console.log(l)
    }
  }
}
</script>
