<template>
  <div>
    <el-upload class="upload" ref="upload" action="string" :file-list="fileList" :auto-upload="false"
      list-type="picture-card" :http-request="uploadFile" :on-change="handleChange" multiple="multiple">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-button type="primary" @click="onsubmit">保存</el-button>
  </div>
</template>
<script>
import { getBase64Image, dataURLtoFile } from '@/utils/image';
import axios from 'axios';
export default {
  props: {
    albumId: {
      type: Number,
      default: (e) => {
        return e
      }
    },
    fileList: {
      type: Array,
      default: () => {
      }
    }
  },
  data() {
    return {
    }
  },
  created() {
    console.log(this.albumId);
  },
  methods: {
    // 点击上传文件触发的额外事件,清空fileList
    delFile() {
      this.fileList = [];
    },
    handleChange(file, fileList) {
      this.fileList = fileList;
    },

    // 自定义上传文件
    uploadFile(file) {
      this.formData.append('file', file.file);
    },

    onsubmit() {
      let _this = this
      this.fileList.forEach(element => {
        let image = new Image()
        image.src = element.url
        // console.log(element)
        image.setAttribute('crossOrigin', 'anonymous')
        image.onload = function () {
          let base64 = getBase64Image(image)
          let newFile = dataURLtoFile(base64, element.uid)
          let formData = new FormData();
          formData.append('file', newFile);
          formData.append('albumID', _this.albumId);
          axios.post('http://localhost:8080/photo/alibaba/uploadOne', formData, {
            'Content-Type': 'multipart/form-data;charset=utf-8'
          })
            .then(res => {
              if (res.data === 'SUCCESS') {
                this.$notify({
                  title: '成功',
                  message: '提交成功',
                  type: 'success',
                  duration: 1000
                });
              }
            })
        }
      });
    }
  }
}
</script>
