<template>
  <div>
    <div>
      <el-button @click="dialogVisible = true" :type="type" :class="iconClass" :size="size">
        PS
      </el-button>
    </div>
    <el-dialog title="Reset" :visible.sync="dialogVisible" :center="false" :modal="false">
      <el-row>
        <el-col :span="12">
          <el-form inline>
            <el-form-item label="白底">
              <el-checkbox v-model="obj.white" @change="optionsChange"></el-checkbox>
            </el-form-item>
            <el-form-item label="左上小logo">
              <el-checkbox v-model="obj.miniLogo" @change="optionsChange"></el-checkbox>
            </el-form-item>
            <el-form-item label="正中logo">
              <el-checkbox v-model="obj.centerLogo" @change="optionsChange"></el-checkbox>
            </el-form-item>
            <el-form-item label="1000x1000">
              <el-checkbox v-model="obj.large"></el-checkbox>
            </el-form-item>
            <el-form-item label="300x300">
              <el-checkbox v-model="obj.middle"></el-checkbox>
            </el-form-item>
            <el-form-item label="50x50">
              <el-checkbox v-model="obj.mini"></el-checkbox>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-image :src="image" style="width:200px;height:200px;float:right;" />
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button style="margin:0 0 20px 20px;" type="primary" icon="el-icon-document"
          @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { service } from '@/api/index'
export default {
  name: 'PSImage',
  props: {
    type: {
      type: String,
      default: () => {
        return 'primary'
      }
    },
    iconClass: {
      type: String,
      default: () => {
        return 'el-icon-refresh'
      }
    },
    content: {
      type: String,
      default: () => {
        return 'Collector'
      }
    },
    size: {
      type: String,
      default: () => {
        return 'medium'
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      service,
      image: service + '/img/TEMP/autops/111.JPEG',
      obj: {
        white: false,
        miniLogo: false,
        centerLogo: false,
        large: false,
        middle: false,
        mini: false
      }
    }
  },

  methods: {
    confirm() {
      this.$emit('confirm', this.obj)
    },
    optionsChange() {
      // {"code":"000000","desc":"第一位白底,第二位miniLogo，第三位centerLogo，第四位像素1000x1000，第五位像素300x300，第6位像素50x50"}
      if (this.obj.white) {
        if (this.obj.miniLogo) {
          if (this.obj.centerLogo) {
            this.image = service + '/img/TEMP/autops/111.JPEG'
          } else {
            this.image = service + '/img/TEMP/autops/110.JPEG'
          }
        } else {
          if (this.obj.centerLogo) {
            this.image = service + '/img/TEMP/autops/101.JPEG'
          } else {
            this.image = service + '/img/TEMP/autops/100.JPEG'
          }
        }
      } else {
        if (this.obj.miniLogo) {
          if (this.obj.centerLogo) {
            this.image = service + '/img/TEMP/autops/011.JPEG'
          } else {
            this.image = service + '/img/TEMP/autops/010.JPEG'
          }
        } else {
          if (this.obj.centerLogo) {
            this.image = service + '/img/TEMP/autops/001.JPEG'
          } else {
            this.image = service + '/img/TEMP/autops/000.JPEG'
          }
        }
      }
    }
  }
}
</script>