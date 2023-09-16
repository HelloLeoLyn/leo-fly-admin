<template>
  <div>
    <el-select v-model="album.albumID" clearable filterable @change="change">
      <el-option
        v-for="item in albumInfos"
        :key="item.albumID"
        :label="item.name"
        :value="item.albumID"
      >
      </el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: [Number, String],
      default: e => {
        return e
      }
    }
  },
  watch: {
    value (newValue) {
      this.album.albumID = newValue
    }
  },
  data () {
    return {
      albumInfos: [],
      albalbumApi: {
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
  mounted () {
    const albumStr = localStorage.getItem('album')
    this.albumInfos = JSON.parse(albumStr)
  },
  methods: {
    change (e) {
      this.$emit('input', e)
    }
  }
}
</script>
