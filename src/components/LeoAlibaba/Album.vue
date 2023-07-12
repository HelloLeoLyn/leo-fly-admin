<template>
  <div>
    <el-button type="primary" size="default" @click="onGetAblum">获取相册</el-button>
    <el-select v-model="newVal" clearable filterable @change="e => $emit('change', e)">
      <el-option v-for="item in albumInfos" :key="item.albumID" :label="item.name" :value="item.albumID">
      </el-option>
    </el-select>
  </div>
</template>
<script>
import { api_photo_alibaba_album } from '@/api/leo-photo'
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [String, Number],
      default: (e) => {
        return e
      }
    }
  },
  data() {
    return {
      newVal: '',
      albumInfos: [],
      album: {
        oceanApiId: {
          namespace: 'com.alibaba.product',
          name: 'alibaba.photobank.album.getList',
          version: 1
        },
        webSite: '1688',
        authority: 1
      }
    }
  },
  mounted() {
    this.newVal = this.value
    this.onGetAblum()
  },
  methods: {
    onGetAblum() {
      const albumStr = localStorage.getItem('album')
      if (albumStr) {
        this.albumInfos = JSON.parse(albumStr)
      } else {
        api_photo_alibaba_album(this.album).then((res) => {
          this.albumInfos = res.data.albumInfos
          localStorage.setItem('album', JSON.stringify(this.albumInfos))
        })
      }
    }
  }
}
</script>