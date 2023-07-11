<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-input v-model="listQuery.code" placeholder="oe号/产品号/备注" style="width:400px;"></el-input>
        <el-radio style="pidding-left:20px;" v-model="listQuery.ps" :label="false" border>原图
        </el-radio>

        <el-radio v-model="listQuery.ps" :label="true" border>修图</el-radio>
        <el-button @click="doSearch">查询</el-button>
      </el-row>
    </div>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.current"
      :limit.sync="listQuery.size" @pagination="doSearch" />
    <el-row>
      <el-button @click="checkAll">全选</el-button>
      <el-button @click="reverseCheck">反选</el-button>
      <el-button @click="standard">标准ps</el-button>
      <el-button @click="whiteBG">一键白底</el-button>
      <el-button @click="wartermark">一键水印</el-button>
      <el-button @click="resize">一键裁剪</el-button>
    </el-row>
    <div>
      <el-row :gutter="5">
        <el-col v-for="image in images" :key="image.id" :lg="3" :md='4' :sm="6">
          <vue-hover-mask @click="handleClick(image)">
            <!-- 默认插槽 -->
            <el-image v-if="image.srcType=='1'"
              :src="service+'img/'+image.code+'/'+image.id+image.fileType" width="100%" />
            <el-image v-else :src="image.path" width="100%" />
            <label style="position: absolute" :ref="image.id" class=""><i
                class="el-icon-check leo-icon-check"></i></label>
            <!-- action插槽 -->
            <template v-slot:action>
              <p>{{image.code}}/{{image.id}}</p>
              <p>{{image.remark}}</p>
              <!-- <i class="iconfont icon-bianji-copy">编辑</i>
              <el-button type="text">abc</el-button> -->
            </template>
          </vue-hover-mask>
        </el-col>
      </el-row>
    </div>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.current"
      :limit.sync="listQuery.size" @pagination="doSearch" />
  </div>
</template>
<script>
import VueHoverMask from 'vue-hover-mask'
import Pagination from '@/components/Pagination'
import waves from '@/directive/waves' // waves directive
import { service } from '@/api/index'
import { api_page_image } from '@/api/leo-image'
export default {
  name: 'LeoImageAutoPs',
  components: { Pagination, VueHoverMask },
  directives: { waves },
  data() {
    return {
      service,
      listQuery: {
        current: 1,
        size: 24,
        code: '',
        ps: false
      },
      total: 0,
      images: []
    }
  },
  mounted() {
    this.doSearch()
  },
  methods: {
    doSearch() {
      if (this.listQuery.ps) {
        this.listQuery.psTypes = [111]
      } else {
        this.listQuery.psTypes = null
      }
      this.listQuery.srcType = '1'
      api_page_image(this.listQuery).then((res) => {
        this.images = res.data.records
        this.total = res.data.total
      })
    },
    handleClick(image) {
      console.log(this.$refs[image.id][0])
      if (image.checked) {
        image.checked = !image.checked
      } else {
        image.checked = true
      }
      if (image.checked) {
        this.$refs[image.id][0].className = 'leo-sm-label'
      } else {
        this.$refs[image.id][0].className = ''
      }
    },
    handleHover() {
      console.log('hover')
    },
    checkAll() {
      this.images.forEach((image) => {
        image.checked = true
        this.$refs[image.id][0].className = 'leo-sm-label'
      })
    },
    reverseCheck() {
      this.images.forEach((image) => {
        if (image.checked) {
          image.checked = false
          this.$refs[image.id][0].className = ''
        } else {
          image.checked = true
          this.$refs[image.id][0].className = 'leo-sm-label'
        }
      })
    },
    standard() {},
    whiteBG() {},
    wartermark() {},
    resize() {}
  }
}
</script>
<style>
@import url('//at.alicdn.com/t/font_1262845_52b6h42svd7.css');
.iconfont {
  font-size: 25px;
}
.leo-icon-check {
  font-size: 12px;
  margin-top: 11px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
.leo-sm-label {
  font-weight: 700;
  right: -15px;
  top: -6px;
  width: 40px;
  height: 24px;
  background: #13ce66;
  text-align: center;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-box-shadow: 0 0 1pc 1px rgb(0 0 0 / 20%);
}
</style>