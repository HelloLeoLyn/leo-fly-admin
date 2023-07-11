<template>
  <div style="padding:20px;">
    <h2>获取图片</h2>
    <el-select v-model="photo.albumID" clearable filterable>
      <el-option v-for="item in albumInfos" :key="item.albumID" :label="item.name"
        :value="item.albumID">
      </el-option>
    </el-select>
    <el-button type="primary" size="default" @click="onGetAblumPhoto">获取图片</el-button>
    <el-row :gutter="20">
      <el-col :span="6" :offset="0" v-for="(img, index) in photo.images" :key="index">
        <img :src="alibabaURLPrefix+img.url" style="width:300px;height:300px;">
      </el-col>
    </el-row>
    <h2>上传图片</h2>
    <el-form :model="photo" ref="form" label-width="80px" :inline="false" size="normal">
      <el-form-item label="albumID">
        <el-select v-model="photo.albumID" clearable filterable>
          <el-option v-for="item in albumInfos" :key="item.albumID" :label="item.name"
            :value="item.albumID">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="name">
        <el-input v-model="photo.name" placeholder="" size="normal" clearable></el-input>
      </el-form-item>
      <el-form-item label="description">
        <el-input v-model="photo.description" placeholder="" size="normal" clearable></el-input>
      </el-form-item>
      <el-form-item label="drawTxt">
        <el-checkbox v-model="photo.drawTxt" placeholder="" size="normal" clearable></el-checkbox>
      </el-form-item>
      <el-form-item label="imageBytes">
        <div v-html="photo.imageBytes">
        </div>
        <el-upload class="upload" ref="upload" action="string" :file-list="fileList"
          :auto-upload="false" :http-request="uploadFile" :on-change="handleChange"
          multiple="multiple">
          <el-button slot="trigger" size="small" type="primary" @click="delFile">选取文件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="webSite">
        <el-input v-model="photo.webSite" placeholder="" size="normal" clearable></el-input>
      </el-form-item>

      <el-button type="primary" @click="onsubmit">上传</el-button>
    </el-form>
  </div>
</template>
<script>
import axios from 'axios'
import { api_photo_alibaba_album } from '@/api/leo-photo'
import { alibabaURLPrefix } from '@/api/index'
export default {
  data() {
    return {
      alibabaURLPrefix,
      photoApi: {
        add: {
          namespace: 'com.alibaba.product',
          name: 'alibaba.photobank.photo.add',
          version: 1
        },
        getList: {
          namespace: 'com.alibaba.product',
          name: 'alibaba.photobank.photo.getList',
          version: 1
        },
        delete: {
          namespace: 'com.alibaba.product',
          name: 'alibaba.photobank.photo.delete',
          version: 1
        }
      },
      photo: {
        oceanApiId: null,
        webSite: '1688',
        albumID: '',
        pageNo: 1,
        pageSize: 8,
        images: [],
        name: '',
        description: '',
        authority: 1,
        drawTxt: false,
        imageBytes: null,
        file: null
      },

      fileList: []
    }
  },
  mounted() {
    this.onGetAblum()
  },
  methods: {
    // 点击上传文件触发的额外事件,清空fileList
    delFile() {
      this.fileList = []
    },
    handleChange(file, fileList) {
      this.fileList = fileList
      // console.log(this.fileList, "sb");
    },
    // 自定义上传文件
    uploadFile(file) {
      this.formData.append('file', file.file)
    },
    onsubmit() {
      // 保存按钮
      let formData = new FormData()
      formData.append('file', this.fileList[0].raw) // 拿到存在fileList的文件存放到formData中
      // 下面数据是我自己设置的数据,可自行添加数据到formData(使用键值对方式存储)
      formData.append('albumID', this.photo.albumID)
      axios
        .post('http://localhost:8080/photo/alibaba/uploadOne', formData, {
          'Content-Type': 'multipart/form-data;charset=utf-8'
        })
        .then((res) => {
          if (res.data === 'SUCCESS') {
            this.$notify({
              title: '成功',
              message: '提交成功',
              type: 'success',
              duration: 1000
            })
          }
        })
    },
    onGetAblum() {
      const albumStr = localStorage.getItem('album')
      if (albumStr) {
        this.albumInfos = JSON.parse(albumStr)
      } else {
        this.album.oceanApiId = {
          namespace: 'com.alibaba.product',
          name: 'alibaba.photobank.album.getList',
          version: 1
        }
        api_photo_alibaba_album(this.album).then((res) => {
          this.albumInfos = res.data.albumInfos
          localStorage.setItem('album', JSON.stringify(this.albumInfos))
        })
      }
    },
    onGetAblumPhoto() {
      this.photo.oceanApiId = this.photoApi.getList
      const { oceanApiId, albumID, pageNo, pageSize, webSite } = this.photo
      api_photo_alibaba_album({
        oceanApiId,
        albumID,
        pageNo,
        pageSize,
        webSite
      }).then((res) => {
        this.photo.images = res.data.photoInfos
        console.log(res)
      })
    }
  }
}
</script>