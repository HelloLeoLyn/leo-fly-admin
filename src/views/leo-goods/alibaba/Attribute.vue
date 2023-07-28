<template>
  <div class="block">

    <el-table :data="list" border v-if="list" :key="templateId">
      <el-table-column label="配送信息">
        <template slot="header">
          <el-button @click="onTemplateComfirm">作为默认模板提交</el-button>
          <el-button @click="all = !all"><span v-if="!all">more columns</span><span v-else> hidden
              columns</span></el-button>
        </template>
        <el-table-column v-if="all" label="attrID" prop="attrID" />
        <el-table-column label="name" prop="name" />
        <el-table-column v-if="all" label="valueID" prop="valueID" />
        <el-table-column v-if="all" label="required" prop="required"> <template slot-scope="{row}">
            <div>{{ row.required }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="all" label="isSKUAttribute" prop="isSKUAttribute"> <template slot-scope="{row}">
            <div>{{ row.isSKUAttribute }}</div>
          </template>
        </el-table-column>
        <el-table-column label="value">
          <template slot-scope="scope">
            <el-form label-width="0" :rules="valueRules" :model="scope.row" ref="nameForm">
              <div v-if="scope.row.required">
                <el-form-item prop="value" :rules="[{ required: true, message: '请输入value', trigger: 'blur' }]">
                  <el-input v-model="scope.row.value" class="edit-input">
                  </el-input>
                </el-form-item>
              </div>
              <div v-else-if="scope.row.name == '主要下游平台'">
                <el-form-item>
                  <el-input v-model="scope.row.value" class="edit-input">
                  </el-input>
                </el-form-item>
              </div>
              <div v-else>
                <el-form-item>
                  <el-input v-model="scope.row.value" maxlength="50" show-word-limit>
                  </el-input>
                </el-form-item>
              </div>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column v-if="all" label="isCustom" prop="isCustom" />
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { api_alibaba_category_attribute_post } from '@/api/leo-alibaba-category'
import { api_property_get, api_property_post } from '@/api/leo-property'
import { listToString } from '@/utils/index'
import { carBrandNormal } from '@/utils/car-brand'
const LEO_ALIBABA_ATTRIBUTE = 'LEO_ALIBABA_ATTRIBUTE_'
export default {
  props: {
    value: {
      type: Array,
      default: e => {
        return e
      }
    },
    params: {
      type: Object,
      default: () => {
        return {
          categoryID: 1032176,
          webSite: '1688',
          groupID: '152550850'
        }
      }
    }
  },
  watch: {
    value(newval) {
      this.list = newval
    }
  },
  data() {
    return {
      suguest: '',
      suguestBrand: '',
      visible: false,
      visibleBrand: false,
      all: false,
      modelSet: [],
      brandSet: [],
      templateId: 0,
      info: {
      },
      list: [{ value: null }],
      rules: {
        value: [{ required: true, message: '请输入value', trigger: 'blur' }],
        max50: [{ max: 50, message: '长度不能超过 50 个字符', trigger: 'blur' }]
      },
      valueRules: {}
    }
  },
  mounted() {
    this.initFormRules();
  },
  created() {
    if (!this.params.groupID || !this.params.categoryID) {
      return
    }
    api_property_get(
      LEO_ALIBABA_ATTRIBUTE + this.params.categoryID + '_' + this.params.groupID
    ).then((res) => {
      if (res.data) {
        const list = JSON.parse(res.data.value)
        new Promise((resolve) => {
          list.map((obj) => {
            obj.attributeID = obj.attrID
            obj.attributeName = obj.name
            obj.isCustom = false
            if (obj.name == '适用车型') {
              obj.set = true
              obj.invokeName = 'model'
              obj.value = ''
            } else if (obj.name == '适用汽车品牌') {
              obj.value = ''
              obj.set = true
              obj.invokeName = 'brand'
            } else if (obj.name == '货号') {
              obj.value = listToString(this.params.code, ' ')
            } else if (obj.name == '型号') {
              obj.value = listToString(this.params.code, ' ')
            } else if (obj.name == '配件编号') {
              obj.value = listToString(this.params.code, ' ')
            } else if (obj.name == '适用车型年份') {
              obj.value = ''
            } else if (obj.name == '计量单位') {
              obj.invokeName = 'unit'
            } else if (obj.name == '主要销售地区') {
              obj.value = '欧洲,北美,南美,东南亚,东北亚,中东,非洲,其他'
            } else if (obj.name == '主要下游平台') {
              obj.value = '速卖通,亚马逊,wish,ebay,LAZADA,独立站,其他'
            }
            return obj
          })
          resolve(list)
          this.list = list
          this.$emit('input', list)
        })
      } else {
        api_alibaba_category_attribute_post(this.params).then((res) => {
          if (res.data.errorCode) {
            return
          }
          const list1 = res.data.attributes.filter((a) => a.required)
          const list2 = res.data.attributes.filter((a) => !a.required)
          const list = list1.concat(list2)
          this.list = list.map((obj) => {
            obj.value = null
            if (obj.name == '适用车型') {
              obj.set = true
              obj.invokeName = 'model'
              obj.value = ''
            }
            if (obj.name == '货号') {
              obj.value = listToString(this.params.code, ' ')
            }
            if (obj.name == '型号') {
              obj.value = listToString(this.params.code, ' ')
            }
            if (obj.name == '配件编号') {
              obj.value = listToString(this.params.code, ' ')
            }
            return obj
          })
        })
      }
    })
  },
  methods: {
    initFormRules() {
      this.valueRules = {};
      for (let i = 0; i < this.list.length; i++) {
        if (this.list.required == true) {
          this.$set(this.valueRules, i, [{ required: true, message: `请输入value${i + 1}`, trigger: 'blur' }]);
        }
      }
    },

    handleChange(row) {
      if (row.invokeName == 'unit') {
        this.$emit('unitChange', row.value)
      }
    },
    autoBrand() {
      this.visibleBrand = !this.visibleBrand
    },
    getBrandSet(modelSet) {
      let wordSet = []
      modelSet.forEach((str) => {
        const words = str.trim().split(' ')
        words.forEach((word) => {
          wordSet.push(word.toUpperCase().replaceAll('-', '').trim())
        })
      })
      const temp = Array.from(new Set(wordSet))
      let brandSet = []
      temp.forEach((word) => {
        carBrandNormal.forEach((brand) => {
          if (word.indexOf(brand.key) >= 0) {
            brand.checked = true
            brandSet.push(brand)
            return
          }
        })
      })
      return brandSet
    },

    onTemplateComfirm() {
      const form = {
        id:
          LEO_ALIBABA_ATTRIBUTE +
          this.params.categoryID +
          '_' +
          this.params.groupID[0],
        value: JSON.stringify(this.list),
        description: 'LEO_ALIBABA_ATTRIBUTE'
      }
      api_property_post(form).then((res) => {
        this.$notify.success(res.msg)
      })
    }
  }
}
</script>
<style lang="scss">
.requiredRow {
  .el-input {
    padding-top: 20px;
  }

  td .cell {
    padding: 0 !important;
    height: 72px;
    line-height: 72px;
  }
}
</style>