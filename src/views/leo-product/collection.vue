<template>
  <div>
    <el-button v-if="collectionBtn" type="primary" size="medium" class="center-btn"
      @click="collectionBtn = !collectionBtn">
      开始采集/Data collection
    </el-button>
    <el-form v-else ref="form" :model="form" label-width="120px">
      <el-form-item label="类目">
        <el-select v-model="form.category">类目</el-select>
        <el-button>语音</el-button>
      </el-form-item>
      <el-form-item label="基础信息图片">
        <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false" :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="form.baseImg" :src="form.baseImg" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="oem">
        <el-input />
      </el-form-item>
      <el-form-item label="产品尺寸">
        <el-row>
          <el-col span="8">
            <el-input />
          </el-col>
          <el-col span="8">
            <el-input />
          </el-col>
          <el-col span="8">
            <el-input />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="重量">
        <el-input />
      </el-form-item>
      <el-form-item label="质保">
        <el-input />
      </el-form-item>
      <el-form-item label="产品图">
        <el-upload action="#" list-type="picture-card" :auto-upload="false">
          <i slot="default" class="el-icon-plus" />
          <div slot="file" slot-scope="{ file }">
            <img :src="file.url" alt="" class="el-upload-list__item-thumbnail">
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                <i class="el-icon-zoom-in" />
              </span>
              <span v-if="!disabled" class="el-upload-list__item-delete"
                @click="handleDownload(file)">
                <i class="el-icon-download" />
              </span>
              <span v-if="!disabled" class="el-upload-list__item-delete"
                @click="handleRemove(file)">
                <i class="el-icon-delete" />
              </span>
            </span>
          </div>
        </el-upload>
      </el-form-item>
      <el-button type="primary" size="medium" class="center-btn">
        语音录入参数
      </el-button>
      <el-button type="primary" size="medium" class="center-btn"
        @click="collectionBtn = !collectionBtn">
        保存/save
      </el-button>
    </el-form>
    <leo-float-menu />
  </div>
</template>
<script>
export default {
  data() {
    return {
      collectionBtn: true,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      form: {
        baseImg: ''
      }
    }
  },
  methods: {
    handleAvatarSuccess() {},
    beforeAvatarUpload() {},
    handleRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    }
  }
}
</script>
<style>
.center-btn {
  text-align: center;
}
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
