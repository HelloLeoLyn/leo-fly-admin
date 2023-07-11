<template>
  <div class="app-container leo-auto-part-index">
    <div class="filter-container">
      <el-input v-model="listQuery.code" placeholder="oe" style="width: 200px;" class="filter-item"
        @keyup.enter.native="doSearch" />
      <el-input v-model="listQuery.name" style="width: 200px;" class="filter-item"
        placeholder="name" @keyup.enter.native="doSearch" />
      <el-input v-model="listQuery.subject" style="width: 200px;" class="filter-item"
        placeholder="subject" @keyup.enter.native="doSearch" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="doSearch">
        Search
      </el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="doValid">
        Valid
      </el-button>

    </div>
    <el-table v-loading="loading" border :data="list" style="width: 100%">
      <el-table-column prop="id" label="id" width="80" />
      <el-table-column label="actions" width="300">
        <template slot-scope="scope">
          <el-button @click="sendTo1688(scope.row.id)" size="small" type="text" plai>
            上传1688
          </el-button>

          <el-button size="small" type="text" plain
            @click="$router.push(`/leo-product/update/${scope.row.id}`)">修改</el-button>

          <el-button size="small" type="text" plain @click="setError('图片校验不通过',scope.row.id)">
            error
          </el-button>

          <el-button size="small" type="text" plain @click="reset(scope.$index)">
            reset
          </el-button>
          <el-button @click="handleCollectClick(scope.row)" size="small" type="text" plain>采集图片
          </el-button>
        </template>
      </el-table-column>

      <el-table-column label="image" width="800">
        <template slot-scope="{row,$index}">
          <LeoProductImages :ref="$index" :product="row" :key="refListKey[$index]"
            :reloadable="true" :renewable="true" @onSaveClick="params=>save(row,$index,params)" />
        </template>
      </el-table-column>
      <el-table-column prop="subject" label="subject" />
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.current"
      :limit.sync="listQuery.size" @pagination="doSearch" />
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import LeoHistory from '@/views/leo-warehouse/components/LeoHistory.vue'
import LeoHoverImage from '@/components/LeoImage/Hover.vue'
import LeoProductImages from '@/components/LeoImage/Product.vue'
import VueBarcode from 'vue-barcode'
import {
  product_page_api,
  product_valid_api,
  product_update_api
} from '@/api/leo-product'
import { service } from '@/api/index'
import Pagination from '@/components/Pagination'
import { product_alibaba_dict } from '@/utils/dict'
import { listToString } from '@/utils/index'
import { api_image_add, api_image_batch_put } from '@/api/leo-image'

export default {
  name: 'LeoImageCompare',
  components: {
    Pagination,
    LeoHistory,
    LeoHoverImage,
    LeoProductImages,
    VueBarcode
  },
  directives: { waves },
  filters: {
    codeFilter: (e) => listToString(e, ' ')
  },
  data() {
    return {
      history: {
        show: false,
        count: 0,
        productId: 0
      },
      service,
      value: [],
      total: 0,
      refListKey: [],
      listQuery: {
        key: 0,
        // referStatus: '0',
        status: -1,
        name: '',
        size: 10,
        current: 1,
        code: ''
      },
      list: [],
      loading: false,
      dict: product_alibaba_dict
    }
  },
  created() {
    for (let index = 0; index < this.listQuery.size; index++) {
      this.refListKey[index] = 0
    }
    this.doSearch()
  },
  methods: {
    parseReferStatus(referStatus, rightIndex) {
      let start = referStatus.length - rightIndex - 1
      return referStatus.substr(start, start + 1)
    },
    values(row) {
      if (!row.mainImage) {
        return {
          code: row.code[0],
          id: row.id,
          codes: row.code,
          isBatch: false,
          platform: 'alibaba',
          dataType: 'image'
        }
      } else {
        return {
          code: row.code[0],
          id: row.id,
          codes: row.code,
          isBatch: false
        }
      }
    },
    doSearch() {
      product_page_api(this.listQuery).then((res) => {
        this.list = res.data.records
        this.src = res.data.records
        this.total = res.data.total
        for (let index = 0; index < this.listQuery.size; index++) {
          this.refListKey[index]++
        }
      })
    },
    copyImage(image) {
      const entity = {
        path: 'G:/warning/e-shop/image/' + image.productId,
        name: '',
        code: image.productId,
        fileType: image.fileType,
        type: '000000',
        moduleType: 'PS',
        srcType: '1',
        status: 1
      }
      api_image_add(entity).then(() => {
        this.$notify.success('添加成功')
      })
    },
    onRemove(e, index, images) {
      const i = images.findIndex((img) => {
        return img == e.id
      })
      console.log(i)
      images.splice(i, 1)
    },

    doValid() {
      product_valid_api(this.listQuery).then((res) => {
        if (res.code === '200') {
          this.$message.success(res.msg)
        }
      })
    },
    setError(message, id) {
      const p = {
        error: message,
        status: 444,
        id
      }
      product_update_api(p).then(() => {
        this.$notify.success('设置成功')
      })
    },
    reset(id) {
      const target = this.src[id]
      this.$set(this.list, id, target)
    },
    sendTo1688(id) {
      this.$router.push(`/leo-alibaba/post/${id}`)
    },
    leoHoverImage(url, key) {
      return {
        id: key,
        url: url,
        large: url,
        checked: false
      }
    },
    leoHoverImage2(urlList) {
      return urlList.map((url, key) => {
        return {
          id: key,
          url: service + '/product/image/' + url,
          large: service + '/product/image/' + url,
          checked: true,
          isMain: false,
          status: 0
        }
      })
    },

    finish(product, index) {
      const params = {
        id: product.id,
        referStatus: '1'
      }
      product_update_api(params).then((res) => {
        if ((res.code = '200')) {
          this.list.splice(index, 1)
          this.refListKey[index]++
        }
      })
    },
    save(product, index, params) {
      const { id, images, mainImage, referStatus } = params
      const entity = {
        id,
        images,
        mainImage,
        referStatus
      }
      product_update_api(entity).then((res) => {
        if ((res.code = '200')) {
          const imageList = images.map((id) => {
            if (id == mainImage) {
              return { id, moduleType: 'PE', isMain: true }
            } else {
              return { id, moduleType: 'PE', isMain: false }
            }
          })
          api_image_batch_put(imageList).then(() => {
            this.$notify.success(res.msg)
            // this.list.splice(index, 1)
            this.refListKey[index]++
          })
        }
      })
    },
    handleCollectClick(product) {
      const json = {
        code: '',
        id: product.id,
        codes: product.code,
        isBatch: false
      }
      const id = encodeURIComponent(JSON.stringify(json))
      this.$router.push(`/leo-product/collect/${id}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.leo-table-action {
  text-align: center;
}
</style>