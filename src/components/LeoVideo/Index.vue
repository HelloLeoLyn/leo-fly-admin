<template>
  <div>
    <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false">
      <video v-if="src" :src="src" class="avatar"></video>
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<script>
import draggable from 'vuedraggable'
import VueHoverMask from 'vue-hover-mask'
export default {
  components: {
    VueHoverMask,
    draggable
  },
  data() {
    return {
    }
  },
  props: {
    src: {
      type: String,
      default: () => { }
    },
    customzedBtn: {
      type: Object,
      default: () => { }
    }
  },
  mounted() {
  },
  watch: {
    src(newValue) {
      console.log('watch images')
      if (newValue) {
        console.log(newValue)
      }
    },
  },

  methods: {
    handleCustomzedClick(e) {
      this.$emit('onCustomzedClick', e)
    },
  }
}
</script>
