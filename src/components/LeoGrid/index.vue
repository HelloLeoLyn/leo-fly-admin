<template>
  <div class="leo-grid">
    <pagination v-show="total>0" :total="total" :page.sync="current" :limit.sync="size"
      @pagination="getList" />
    <el-row :gutter="gutter" v-if="images.length>0">
      <el-col :span="span" v-for="item,key in images" :key="key">
        <vue-hover-mask v-if="hover" @click="handleCheckedClick(item)">
          <el-image v-if="item.url" :src="item.url" width="100%" />
          <label style="position: absolute" :ref="item.id"
            :class="item.checked?'leo-sm-label':''"><i
              class="el-icon-check leo-icon-check"></i></label>
          <template v-slot:action>
            <el-button type="text" @click="handleClick(item)">设置
            </el-button>
          </template>
        </vue-hover-mask>
        <el-image v-else :src="item.url" width="100%"></el-image>
      </el-col>
    </el-row>
    <pagination v-show="total>0" :total="total" :page.sync="current" :limit.sync="size"
      @pagination="getList" />
  </div>
</template>
<style>
.leo-grid {
}
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
}
</style>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import VueHoverMask from 'vue-hover-mask'

export default {
  components: { Pagination, VueHoverMask },
  props: {
    gutter: {
      type: [String, Number],
      default: 5
    },
    span: {
      type: [String, Number],
      default: null
    },

    hover: {
      type: Boolean,
      default: true
    },
    list: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      total: 0,
      current: 1,
      size: 1,
      images: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleClick(item) {
      this.$emit('onBtnClick', item)
    },
    handleCheckedClick(image) {
      if (image.checked) {
        image.checked = !image.checked
      } else {
        image.checked = true
      }
    },
    getList() {
      const start = (this.current - 1) * this.size
      const end = start + this.size
      this.images = this.list.slice(start, end)
      this.total = this.list.length
    }
  }
}
</script>

