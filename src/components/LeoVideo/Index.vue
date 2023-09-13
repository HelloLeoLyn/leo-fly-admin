<template>
  <div>
    <div class="avatar-uploader">
      <vue-hover-mask v-if="src">
        <video :src="src" class="avatar"></video>
        <template v-slot:action>
          <el-button type="primary" size="mini" @click="play">
            播放
          </el-button>
          <el-upload :limit="1" action="null">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </template>
      </vue-hover-mask>
      <el-upload v-else :limit="1" action="null">
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <el-dialog title="视频播放" :visible.sync="visible" @close="close">
      <video src="http://localhost:8080/video/0/tc.mp4" autoplay ref="myVideo" controls
        oncontextmenu="return false" controlslist="nodownload" width="900" height="600"></video>
      <span slot="footer">
        <el-button @click=" visible = false">Cancel</el-button>
        <el-button type="primary" @click="click">OK</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style>
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
  height: 178px;
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
      visible: false
    }
  },
  props: {
    src: {
      type: String,
      default: () => {}
    },
    customzedBtn: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {},
  watch: {
    src(newValue) {
      console.log('watch images')
      if (newValue) {
        console.log(newValue)
      }
    }
  },

  methods: {
    handleCustomzedClick(e) {
      this.$emit('onCustomzedClick', e)
    },
    play() {
      this.visible = true
    },
    click() {},
    close() {}
  }
}
</script>
