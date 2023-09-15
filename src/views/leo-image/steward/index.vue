<template>
  <div class="app-container">
    <el-tabs v-model="currentPane" type="card" tab-position="top" @tab-click="">
      <el-tab-pane v-for="item in panes" :key="item.key" :label="item.label" :name="item.key">
      </el-tab-pane>
      <div>
        <el-select class="filter-item" v-model="albumsType" value-key="" placeholder="" clearable
          filterable @change="">
          <el-option v-for="item in albumsTypes" :key="item.value" :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-show="albumsType == 'group'" class="filter-item" v-model="album" value-key=""
          placeholder="" clearable filterable @change="">
          <el-option v-for="item in albums" :key="item.value" :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input class="filter-item" style="width: 200px" v-model="keyword" placeholder="关键词"
          size="normal" clearable @change=""></el-input>
        <el-button class="filter-item" type="primary" size="default"
          @click="handleSearchClick">Search</el-button>
      </div>
      <div class="showArea">
        待上传的图片，点击选择
        <div class="images">
          <ImageAddCoverVue :images="images">
          </ImageAddCoverVue>
          <!-- <img :src="image.url" :class="{ active: image.checked, image: true }"
            v-for="(image, key) in images" :key="key" style="padding: 5px"
            @click="handleLeoHoverImageClick(image)" /> -->
        </div>
        <el-pagination v-show="albumsType == 'group'" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]" :page-size="100"
          layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
      </div>
      <div class="prepareListArea">
        可插入的图片，点击选择
        <div class="images">
          <img :src="image.url" :class="{ active: image.checked, image: true }"
            v-for="(image, key) in prepareList" :key="key" style="padding: 5px"
            @click="handleLeoHoverImageClick(image)" />
        </div>
        <el-pagination v-show="albumsType == 'group'" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]" :page-size="100"
          layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
      </div>
      <div class="checkedArea">
        要插入的图片(0/{{ count }})可通过拖拽调整图片顺序
        <el-row :gutter="20">
          <draggable v-model="checkedList" group="article" class="dragArea">
            <el-col :span="3" :offset="0" v-for="index in count" :key="index">
              <img v-if="checkedList[index - 1]" :src="checkedList[index - 1].url" alt=""
                style="width: 100px; height: 100px" />
              <div v-else style="
                  width: 100px;
                  height: 100px;
                  border: 1px dotted gray;
                  text-align: center;
                  justify-content: center;
                  display: flex;
                ">
                <p>{{ index }}</p>
              </div>
            </el-col>
          </draggable>
          <el-button type="primary" size="default" @click="confirm">confirm</el-button>
        </el-row>
      </div>
    </el-tabs>
  </div>
</template>
<style lang="scss">
.images {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  .image {
    margin: 5px;
    border: 1px solid #bbc4cc;
    width: 100px;
    height: 100px;
  }
  .active {
    border: 3px solid #c27a0f;
  }
}
</style>
<script>
import { getImagesByProductId } from '@/api/leo-image'
import { parseImage } from '@/utils/leo-image.js'
import draggable from 'vuedraggable'
import LeoHoverImage from '@/components/LeoImage/Hover.vue'
import ImageAddCoverVue from '../components/ImageAddCover.vue'
export default {
  components: { LeoHoverImage, draggable, ImageAddCoverVue },
  props: {
    productId: [Number, String],
    default: (e) => {
      return e
    },
    count: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      panes: [
        { label: '云相册', key: 'cloud' },
        { label: '本地图片', key: 'local' }
      ],
      currentPane: 'cloud',
      albums: [],
      album: '',
      albumsTypes: [
        { label: '分组', value: 'group' },
        { label: '产品号', value: 'productId' }
      ],
      albumsType: 'productId',
      images: [],
      currentPage: 1,
      keyword: '',
      checkedList: [],
      prepareList: []
    }
  },
  created() {
    if (this.productId) {
      this.getImagesByProductId(this.productId)
    }
    this.prepareList = this.images.filter((img) => {
      return img.status == 2
    })
  },

  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    getImagesByProductId(productId) {
      getImagesByProductId(productId).then((res) => {
        this.images = res.data.map((image) => parseImage(image))
      })
    },
    handleSearchClick() {
      if (this.albumsType == 'productId') {
        this.getImagesByProductId(this.keyword)
      }
    },
    handleLeoHoverImageClick(item) {
      if (!item.checked) {
        if (this.checkedList.length >= 5) {
          return
        } else {
          item.checked = !item.checked
          this.checkedList.push(item)
        }
      } else {
        const index = this.checkedList.findIndex((obj) => {
          return obj.id == item.id
        })
        item.checked = !item.checked
        this.checkedList.splice(index, 1)
      }
    },
    confirm() {
      // console.log(this.checkedList)
      this.$emit('onConfirm', this.checkedList)
    },
    handleClick(image) {
      const key = this.getIdIndex(image.id)
      if (image.checked) {
        this.images[key].checked = !this.images[key].checked
        this.$refs['checked' + image.id][0].className = 'leo-sm-label-checked'
      } else {
        this.images[key].checked = true
        this.$refs['checked' + image.id][0].className = ''
      }
      this.$emit(
        'input',
        this.images.filter((img) => img.checked).map((img) => img.id)
      )
    }
  }
}
</script>
