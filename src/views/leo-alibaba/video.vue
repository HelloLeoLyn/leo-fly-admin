<template>
  <div style="padding: 20px">
    <h2>上传视频</h2>
    <el-upload
      :limit="1"
      action="http://localhost:8080/video/alibaba/upload"
      :http-request="httpRequest"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
    <el-dialog title="视频中心" :visible.sync="visible" width="30%" @close="">
      <div>
        视频名称
        <el-input
          v-model="video.fileName"
          placeholder=""
          size="normal"
          clearable
        ></el-input>
      </div>
      <div>
        视频
        <el-input
          v-model="video.description"
          placeholder=""
          size="normal"
          clearable
        ></el-input>
      </div>
      <span slot="footer">
        <el-button @click="visible = false">Cancel</el-button>
        <el-button type="primary" @click="upload">OK</el-button>
      </span>
    </el-dialog>

    <h2>获取视频</h2>
    <el-button type="primary" size="default" @click="onGetVideo"
      >获取视频</el-button
    >
    <el-row :gutter="20">
      <el-col
        :span="6"
        :offset="0"
        v-for="(item, index) in videoInfos"
        :key="index"
      >
        <el-card
          shadow="always"
          :body-style="{ padding: '20px', height: '200px' }"
        >
          <div slot="header">
            <span>{{ item.name }}</span>
          </div>
          {{ item }}
          <el-button type="primary" size="default" @click="onDeleteVideo"
            >删除视频</el-button
          >
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {
  api_video_alibaba_delete,
  api_video_alibaba_upload
} from '@/api/leo-alibaba-video'
export default {
  data () {
    return {
      visible: false,
      videoInfos: [],
      file: null,
      videoCenterApi: {
        list: {
          namespace: 'com.alibaba.multimedia',
          name: 'albaba.video.videocenter.list',
          version: 1
        },
        upload: {
          namespace: 'com.alibaba.multimedia',
          name: 'albaba.video.videocenter.upload',
          version: 1
        },
        delete: {
          namespace: 'com.alibaba.multimedia',
          name: 'albaba.video.videocenter.delete',
          version: 1
        },
        attach: {
          namespace: 'com.alibaba.multimedia',
          name: 'albaba.video.videocenter.attach',
          version: 1
        },
        detach: {
          namespace: 'com.alibaba.multimedia',
          name: 'albaba.video.videocenter.detach',
          version: 1
        }
      },
      video: {
        description: null,
        fileName: null
      },
      formData: null
    }
  },
  mounted () {
    const videoStr = localStorage.getItem('video')
    this.videoInfos = JSON.parse(videoStr)
  },
  methods: {
    handleCreateAlibabaVideo () {},
    onGetVideo () {},
    onDeleteVideo () {
      this.video.oceanApiId = this.videoApi.delete
      api_video_alibaba_delete(this.photo).then(res => {
        console.log(res)
      })
    },
    httpRequest (e) {
      // let file = URL.createObjectURL(e.file)
      this.visible = true
      this.video.fileName = e.file.name
      let formData = new FormData()
      formData.append('file', e.file)

      this.formData = formData
    },
    upload () {
      this.formData.append('fileName', this.video.fileName)
      this.formData.append('description', this.video.description)
      api_video_alibaba_upload(this.formData).then(res => {})
    }
  }
}
</script>
