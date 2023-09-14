<template>
  <div class="app-container">
    <el-tabs v-model="currentPane" type="card" tab-position="top" @tab-click="">
      <el-tab-pane v-for="item in panes" :key="item.key" :label="item.label" :name="item.key">
      </el-tab-pane>
      <div>
        <el-select class="filter-item" v-model="albumsType" value-key="" placeholder="" clearable filterable @change="">
          <el-option v-for="item in albumsTypes" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select class="filter-item" v-model="album" value-key="" placeholder="" clearable filterable @change="">
          <el-option v-for="item in albums" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-input class="filter-item" style="width: 200px;" v-model="kewword" placeholder="关键词" size="normal" clearable
          @change=""></el-input>
        <el-button class="filter-item" type="primary" size="default" @click="">Search</el-button>
      </div>
      <div class="showArea">
        <el-row :gutter="20">
          <el-col :span="3" :offset="0" v-for="(image, index) in images" :key="index">
            <img :src="image.src" alt="" style="width: 100px;height: 100px;"></el-col>
        </el-row>
      </div>
    </el-tabs>

  </div>
</template>
<script>
export default {
  data() {
    return {
      panes: [{ label: '云相册', key: 'cloud' }, { label: '本地图片', key: 'local' }],
      currentPane: 'cloud',
      albums: [{ label: '宝马', value: 'bmw' }],
      album: 'bmw',
      albumsTypes: [{ label: '分组', value: 'group' }, { label: '产品号', value: 'productId' }],
      albumsType: 'group',
      images: [{ src: 'text' }]
    }
  }
}
</script>