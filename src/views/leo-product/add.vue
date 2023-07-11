<template>
  <div class="app-container leo-container ">
    <div id="menu">
      <h2>{{$t('common.operations')}}</h2>
      <div class="filter-container">
        <LeoWebCollector v-if="$route.params.code" type="primary" iconClass=""
          :content="$t('product.leoWebCollectorContent')" v-waves class="filter-item"
          style="margin-left:20px;" @onConfirm="collection" :values="{
          code: $route.params.code,
          id: product.id,
          codes: product.code,
          isBatch: false,
        }" />

        <el-button @click="onConfirmProductSave" v-waves class="filter-item" type="primary"
          style="margin-left:20px;">{{$t('common.save.label')}}
        </el-button>
      </div>
      <el-row :gutter="20">
        <el-col :lg="8" :md="8" :sm="12">
          <el-card class="box-card" shadow="always" style="width:340px;height:340px;">
            <vue-hover-mask>
              <!-- 默认插槽 -->
              <el-image style="width:300px;height:300px;" v-if="product.mainImage"
                :src="product.mainImage" width="100%">
              </el-image>
              <!-- action插槽 -->
              <template v-slot:action>
                <el-button type="text"
                  @click="mainImageDialog=!mainImageDialog;">{{$t('product.setMainImage')}}
                </el-button>
              </template>
            </vue-hover-mask>
          </el-card>
        </el-col>
        <el-col :lg="16" :md="16" :sm="12">
          <el-form label-width="120px" :model="product" ref="product" :rules="rules">
            <el-form-item :label="$t('product.category')" prop="categoryId">
              <Category1688 :value="product.categoryId"
                :categoryContent="$t('product.category1688Conntent')"
                @change="handleCategoryIdChange" />
            </el-form-item>

            <el-form-item :label="$t('product.name')" prop="name">
              <el-input v-model="product.name" />
            </el-form-item>
            <el-form-item :label="$t('product.packageSize')">
              <el-input v-model="product.packageSize" />
            </el-form-item>
            <el-form-item :label="$t('product.weight')">
              <el-input v-model="product.weight" />
            </el-form-item>

            <el-form-item :label="$t('product.subject')" prop="subject">
              <el-input v-model="product.subject" type="textarea" :rows="3" />
            </el-form-item>

            <el-form-item :label="$t('common.note')">
              <el-input :value="JSON.stringify(product.base)" type="textarea" :rows="3" />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <h2>{{$t('autoPart.oe')}}</h2>
      <leo-array-string :reset="true" onReset="oemReset" v-if="product.code" :span="6"
        actionType="out" :list="product.code" ref="code" />
      <h2>{{$t('autoPart.refer')}}
      </h2>
      <leo-array-string v-if="product.refNo" :span="8" actionType="out" :list="product.refNo"
        ref="refNo" />
      <h2>{{$t('autoPart.carfitment')}}
      </h2>
      <el-table :data="product.carFitment">
        <el-table-column :label="$t('autoPart.model')" prop="model"></el-table-column>
        <el-table-column :label="$t('autoPart.year')" prop="year"></el-table-column>
        <el-table-column :label="$t('autoPart.engine')" prop="engine"></el-table-column>
        <el-table-column :label="$t('autoPart.displacement')" prop="Displacement"></el-table-column>
        <el-table-column :label="$t('autoPart.power')" prop="power"></el-table-column>
        <el-table-column :label="$t('autoPart.type')" prop="type"></el-table-column>
      </el-table>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="1000">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <side-catalog class="catalog" v-bind="catalogProps"></side-catalog>

  </div>
</template>
<script>
import waves from '@/directive/waves' // waves directive

import SideCatalog from 'vue-side-catalog'
import LeoImage from '@/components/LeoImage/local.vue'
import LeoAutoImage from '@/components/LeoImage/Auto.vue'
import VueHoverMask from 'vue-hover-mask'
import LeoArrayString from '@/components/LeoArray/string.vue'
import 'vue-side-catalog/lib/vue-side-catalog.css'
import LeoWebCollector from '@/components/LeoWebCollector'
import Category1688 from '@/views/leo-alibaba/components/Category1688.vue'
import {
  api_product_image_main,
  product_save,
  api_product_save_more
} from '@/api/leo-product'
import { product_common_keys } from '@/utils/dict'
export default {
  name: 'LeoProductAdd',
  components: {
    VueHoverMask,
    LeoArrayString,
    SideCatalog,
    LeoImage,
    LeoAutoImage,
    LeoWebCollector,
    Category1688
  },
  directives: { waves },
  data() {
    return {
      isChanged: false,
      history: {
        show: false,
        count: 0,
        productId: 0
      },
      mainImage: {},
      imageCollectorValue: {},
      imageCollectorKey: 0,
      catalogProps: {
        container: '#menu'
      },
      mainImageDialog: false,
      product_common_keys,
      product: {
        mainImage: '',
        images: []
      },
      product_json: {},
      dialogImageUrl: '',
      dialogVisible: false,
      rules: {
        code: [
          {
            required: true,
            message: this.$t('product.code.require'),
            trigger: 'change'
          }
        ],
        packageSize: [
          {
            required: true,
            trigger: 'change'
          }
        ],
        subject: [
          {
            required: true,
            trigger: 'change'
          }
        ],
        name: [
          {
            required: true,
            trigger: 'change'
          }
        ],
        categoryId: [
          {
            required: true,
            trigger: 'change'
          }
        ]
      }
    }
  },
  mounted() {},
  methods: {
    handleCategoryIdChange(e) {
      this.$set(this.product, 'categoryId', e)
    },
    collection(res) {
      if (res.code == 200) {
        const { data } = res
        this.isChanged = true
        this.product_json = data
        this.$set(this.product, 'refNo', data.refNo)
        const code = Array.from(new Set(data.code))
        this.$set(this.product, 'code', code)
        this.$set(this.product, 'carFitment', data.carFitment)
        this.$set(this.product, 'model', JSON.stringify(data.carFitment))
        this.$set(this.product, 'name', data.subject)
        this.$set(this.product, 'subject', data.subject)
        this.$set(this.product, 'mainImage', data.main_image)
        this.$set(this.product, 'platform', data.platform)
        this.$set(this.product, 'base', data.base)
      }
    },

    oemReset() {},

    onConfirmProductSave() {
      this.$refs['product'].validate((valid) => {
        if (valid) {
          this.$confirm(
            this.$t('common.save.confrim'),
            this.$t('common.note'),
            {
              type: 'warning'
            }
          )
            .then(() => {
              if (!this.product.code) {
                this.$message.warning(this.$t('product.code.require'))
                return
              }

              product_save(this.product).then((res) => {
                if (res.code == 200) {
                  this.saveProductMore(res.data)
                }
              })
            })
            .catch((error) => {
              this.$message({
                type: 'info',
                message: error
              })
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    saveProductMore(productId) {
      const list = []
      this.product.code.forEach((val) => {
        const item = {
          attributeName: 'oe',
          value: val
        }
        list.push(item)
      })
      const productJson = {
        json: this.product_json,
        platform: this.product.platform
      }
      this.product.refNo.forEach((val) => {
        const item = {
          attributeName: 'refNo',
          value: val
        }
        list.push(item)
      })
      const more = {
        id: productId,
        productJson,
        list
      }
      api_product_save_more(more).then((res) => {
        if (res.code == 200) {
          this.$notify.success(this.$t('common.save.yes'))
          this.isChanged = false
        } else {
          this.$notify.error(res.msg)
        }
      })
    },
    handleConfirmMainImage(image) {
      const product = {
        id: this.product.id,
        mainImage: image.id
      }
      this.$confirm('是否确定更改主图?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          api_product_image_main(product).then((res) => {
            if (res.code === '200') {
              this.product.mainImage = image.id

              this.$message({
                type: 'success',
                message: '成功!'
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    }
  }
}
</script>
<style>
.catalog {
  position: fixed;
  top: 50px;
  right: 50px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>