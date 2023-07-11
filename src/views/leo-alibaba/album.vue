<template>
  <div style="padding:20px;">
    <h2>新建相册</h2>
    <el-form :model="album" ref="form" label-width="80px" :inline="false" size="normal">
      <el-form-item label="name">
        <el-input v-model="album.name" placeholder="" size="normal" clearable></el-input>
      </el-form-item>
      <el-form-item label="description">
        <el-input v-model="album.description" placeholder="" size="normal" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleCreateAlibabaAlbum">立即创建</el-button>
      </el-form-item>
    </el-form>
    <h2>已有相册</h2>
    <el-button type="primary" size="default" @click="onGetAblum">获取相册</el-button>
    <el-row :gutter="20">
      <el-col :span="6" :offset="0" v-for="(item, index) in albumInfos" :key="index">
        <el-card shadow="always" :body-style="{ padding: '20px',height:'200px' }">
          <div slot="header">
            <span>{{ item.name }}</span>
          </div>
          <!-- card body -->
          {{ item }}
        </el-card>
      </el-col>
    </el-row>
    <h2>删除相册</h2>
    <el-select v-model="album.albumID" clearable filterable>
      <el-option v-for="item in albumInfos" :key="item.albumID" :label="item.name"
        :value="item.albumID">
      </el-option>
    </el-select>
    <el-button type="primary" size="default" @click="onDeleteAlbum">删除相册</el-button>
  </div>
</template>
<script>
import { api_photo_alibaba_album } from '@/api/leo-photo'
import { alibabaURLPrefix } from '@/api/index'
export default {
  data() {
    return {
      alibabaURLPrefix,
      albumInfos: [],
      albumApi: {
        add: {
          namespace: 'com.alibaba.product',
          name: 'alibaba.photobank.album.add',
          version: 1
        },
        getList: {
          namespace: 'com.alibaba.product',
          name: 'alibaba.photobank.album.getList',
          version: 1
        },
        delete: {
          namespace: 'com.alibaba.product',
          name: 'alibaba.photobank.album.delete',
          version: 1
        }
      },
      album: {
        oceanApiId: {
          namespace: 'com.alibaba.product',
          name: 'alibaba.photobank.album.getList',
          version: 1
        },
        webSite: '1688',
        albumID: '',
        pageNo: 1,
        pageSize: 8,
        name: '奔驰刹车片2023',
        description: '',
        authority: 1
      }
    }
  },
  mounted() {
    this.onGetAblum()
  },
  methods: {
    handleCreateAlibabaAlbum() {
      this.album.oceanApiId = this.albumApi.add
      api_photo_alibaba_album(this.album).then((res) => {
        this.$message.success(res.msg)
        console.log(res)
      })
    },
    onGetAblum() {
      const albumStr = localStorage.getItem('album')
      if (albumStr) {
        this.albumInfos = JSON.parse(albumStr)
      } else {
        this.album.oceanApiId = this.albumApi.getList
        api_photo_alibaba_album(this.album).then((res) => {
          this.albumInfos = res.data.albumInfos
          localStorage.setItem('album', JSON.stringify(this.albumInfos))
        })
      }
    },
    onDeleteAlbum() {
      this.album.oceanApiId = this.albumApi.delete
      api_photo_alibaba_album(this.photo).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>