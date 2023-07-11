<template>
  <div class="block">
    <el-form label-width="0" :rules="rules" :model="info" ref="info">
      <el-table :data="info.attrTemplate" border v-if="info.attrTemplate" :key="templateId">
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
            <template slot-scope="{row,$index}">
              <div v-if="row.required">
                <el-form-item :prop="'attrTemplate.' + $index + '.value'" :rules="rules.value">
                  <el-input v-if="row.fieldType != 'enum'" v-model="row.value" class="edit-input">
                    <el-button v-if="row.set" slot="append" @click="invoke(row)">set
                    </el-button>
                  </el-input>
                  <el-select v-else v-model="row.value" @change="handleChange(row)" :multiple="row.inputType == '2'"
                    class="edit-input">
                    <el-option v-for="item in row.attrValues" :label="item.name" :key="item.attrValueID"
                      :value="item.name" />
                  </el-select>
                </el-form-item>
              </div>
              <div v-else>
                <el-form-item v-if="row.fieldType != 'enum'" :prop="'attrTemplate.' + $index + '.value'"
                  :rules="rules.max50">
                  <el-input v-model="row.value" maxlength="50" show-word-limit>
                    <el-button v-if="row.set" slot="append" @click="invoke(row)">set
                    </el-button>
                  </el-input>
                </el-form-item>
                <el-form-item v-else>
                  <el-select @change="handleChange(row)" v-model="row.value" :multiple="row.inputType == '2'">
                    <el-option v-for="item in row.attrValues" :label="item.name" :key="item.attrValueID"
                      :value="item.name" />
                  </el-select>
                </el-form-item>
              </div>
            </template>
          </el-table-column>
          <el-table-column v-if="all" label="isCustom" prop="isCustom" />
        </el-table-column>
      </el-table>
    </el-form>
    <el-dialog :visible.sync="visible">
      <el-input v-model="suguest"></el-input>
      <el-table :data="modelSet">
        <el-table-column label="车型">
          <template slot-scope="{row}">{{ row }}</template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog :visible.sync="visibleBrand">
      <el-checkbox v-for="brand in brandSet" :key='brand.key' v-model="brand.checked" @change="handbrandChange">
        {{ brand.text }}
      </el-checkbox>
    </el-dialog>
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
    code: {
      type: Array,
      required: true
    },
    carFitment: {
      type: Array,
      required: true
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
        attrTemplate: [{ value: null }]
      },
      rules: {
        value: [{ required: true, message: '请输入value', trigger: 'blur' }],
        max50: [{ max: 50, message: '长度不能超过 50 个字符', trigger: 'blur' }]
      }
    }
  },
  created() {
    const modelSet = this.carFitment.map((m) => m.model)
    this.modelSet = Array.from(new Set(modelSet))
    this.brandSet = this.getBrandSet(this.modelSet)
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
              obj.value = this.carFitment[0].model
            } else if (obj.name == '适用汽车品牌') {
              if (this.brandSet && this.brandSet.length > 0) {
                this.brandSet.forEach((brand) => {
                  if (brand.checked) {
                    if (!obj.value) {
                      obj.value = brand.text
                    } else {
                      obj.value = obj.value + ' ' + brand.text
                    }
                  }
                })
              }
              obj.set = true
              obj.invokeName = 'brand'
            } else if (obj.name == '货号') {
              obj.value = listToString(this.code, ' ')
            } else if (obj.name == '型号') {
              obj.value = listToString(this.code, ' ')
            } else if (obj.name == '配件编号') {
              obj.value = listToString(this.code, ' ')
            } else if (obj.name == '适用车型年份') {
              const year = this.carFitment.map((m) => m.year)
              const yearSet = Array.from(new Set(year))
              obj.value = listToString(yearSet, ' ')
            } else if (obj.name == '计量单位') {
              obj.invokeName = 'unit'
            }
            return obj
          })
          resolve(list)
          this.info.attrTemplate = list
          this.$emit('getAttributes', list)
        })
      } else {
        api_alibaba_category_attribute_post(this.params).then((res) => {
          if(res.data.errorCode) {
            return
          }
          const list1 = res.data.attributes.filter((a) => a.required)
          const list2 = res.data.attributes.filter((a) => !a.required)
          const list = list1.concat(list2)
          this.info.attrTemplate = list.map((obj) => {
            obj.value = null
            if (obj.name == '适用车型') {
              obj.set = true
              obj.invokeName = 'model'
              obj.value = this.carFitment[0].model
            }
            if (obj.name == '货号') {
              obj.value = listToString(this.code, ' ')
            }
            if (obj.name == '型号') {
              obj.value = listToString(this.code, ' ')
            }
            if (obj.name == '配件编号') {
              obj.value = listToString(this.code, ' ')
            }
            return obj
          })
        })
      }
    })
  },
  methods: {
    valid() {
      return new Promise(resolve => {
        this.$refs['info'].validate((valid) => {
          resolve(valid)
        })
      })
    },
    getVal() {
      return this.info.attrTemplate.map((item) => {
        const { attributeID, attributeName, value, valueID, isCustom } = item
        return { attributeID, attributeName, value, valueID, isCustom }
      })
    },
    invoke(row) {
      if (row.invokeName == 'model') {
        this.visible = !this.visible
      } else if (row.invokeName == 'brand') {
        this.visibleBrand = !this.visibleBrand
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
    handbrandChange() {
      if (this.brandSet && this.brandSet.length > 0) {
        this.brandSet.forEach((brand) => {
          if (brand.checked) {
            if (!value) {
              value = brand.text
            } else {
              value = value + ' ' + brand.text
            }
          }
        })
        const index = this.info.attrTemplate.findIndex((item) => {
          return item.name == '适用汽车品牌'
        })
        let value
        this.info.attrTemplate[index].value = value
      }
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
    change(e) {
      this.$emit('change', e)
    },
    onTemplateComfirm() {
      const form = {
        id:
          LEO_ALIBABA_ATTRIBUTE +
          this.params.categoryID +
          '_' +
          this.params.groupID[0],
        value: JSON.stringify(this.info.attrTemplate),
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