<template>
  <div>
    <el-button @click="rotate('reset')">reset</el-button>
    <el-button @click="rotate('left')" icon="el-icon-refresh-left" />
    <el-button @click="rotate('right')" icon="el-icon-refresh-right" />
    <el-upload action="http://localhost:8080/file/upload" :show-file-list="false"
      class="avatar-uploader" :on-success="handleAvatarSuccess" :before-upload="beforeUpload">
      <img ref="image" v-if="imageUrl" :src="imageUrl" class="avatar leo-rotate3d">
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
  max-width: 1000px;
  max-height: 800px;
  display: block;
}
</style>
<script>
export default {
  data() {
    return {
      result: null,
      table: null,
      file: null,
      imageUrl: '',
      i: 0
    }
  },
  methods: {
    uploadImg(e) {
      let file = e.target.files[0]
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = async () => {
        const base64Str = reader.result
        console.log(base64Str, 'base64Str')
      }
    },
    rotate(e) {
      if (e == 'reset') {
        this.i = 0
      } else if (e == 'left') {
        this.i = this.i - 90
      } else if (e == 'right') {
        this.i = this.i + 90
      }
      this.$refs['image'].style = 'transform:rotate(' + this.i + 'deg)'
    },
    handleAvatarSuccess(res, file) {
      console.log(res, file)
      this.result = JSON.parse(res.data)
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeUpload(file) {
      const _URL = window.URL || window.webkitURL
      const img = new Image()
      img.src = _URL.createObjectURL(file)
      img.onload = () => {
        const nWidth = img.naturalWidth
        const nHeight = img.naturalHeight
        console.log(nWidth, nHeight)
        this.imageUrl = img.src
      }
      return false
    }
  }
}
</script>

<style>
</style>