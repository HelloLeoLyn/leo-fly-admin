<template>
  <div>
    <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
      :http-request="() => { }" :on-change="onChange">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <div class="leo-removebg">
      <el-button type="primary" size="default" @click="next">next</el-button>
      <el-button type="primary" size="default" @click="prefix">prefix </el-button>
      <el-button type="primary" size="default" @click="prefix">确认 </el-button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  props: {
    images: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      data: null,
      apiKey: 'w54AkJkm1zp36wZW16zXPjnv',
      dialogImageUrl: '',
      newImageUrl: '',
      dialogVisible: false,
      file: null,
      imageUrl: '',
    };
  },
  created() {
    this.imageUrl = this.images[0].url
  },
  methods: {
    onChange(file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    onSuccess(a, b, c) {
      console.log(a, b, c);
    },
    handleBeforeUpload(file) {
      this.file = file
    },
    ArrayBufferToBase64(buffer) {
      let binary = ''
      let bytes = new Uint8Array(buffer)
      let len = bytes.byteLength
      for (let index = 0; index < len; index++) {
        binary += String.fromCharCode(bytes[index])
      }
      return window.btoa(binary)
    },
    execute() {
      const FormData = require('form-data');
      const formData = new FormData();
      formData.append('size', 'auto');
      formData.append('image_file', this.file);
      axios({
        method: 'post',
        url: 'https://api.remove.bg/v1.0/removebg',
        data: formData,
        responseType: 'arraybuffer',
        headers: {
          'X-Api-Key': this.apiKey,
        },
        encoding: null
      })
        .then((response) => {
          if (response.status != 200)
            return console.error('Error:', response.status, response.statusText);
          console.log(response);
          this.newImageUrl = 'data:image/jpeg;base64,' + this.ArrayBufferToBase64(response.data)
        })
        .catch((error) => {
          return console.error('Request failed:', error);
        });
    }
  },
}
</script>