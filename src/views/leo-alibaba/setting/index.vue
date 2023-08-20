<template>
  <div>
    <el-button type="primary" size="default" @click="handBltClk(opt)"
      v-for=" opt, key in apiOptions" :key="key">{{
      opt.desc }}</el-button>
    <el-form :model="dataBody" ref="dataBody" :rules="rules" label-width="180px" :inline="false"
      size="normal">
      <template v-for="layoutName in  schema.hierarchy.structure[this.schema.hierarchy.root]">
        <el-form-item :key="layoutName" v-if="schema.data[layoutName].id == 'supplyType'"
          :label="schema.data[layoutName].fields.label" size="normal" prop="supplyType"
          :rules="[{ required: true, message: `请输入${schema.data[layoutName].fields.label}`, trigger: 'blur' }]">
          <el-checkbox-group v-model="dataBody.supplyType">
            <el-checkbox v-for="item, key in schema.data[layoutName].fields.dataSource"
              :label="item.text" :key="key" :value="item">{{
                item.text
              }}<span style="color: #E6A23C">{{ item.help }}</span>
            </el-checkbox>
          </el-checkbox-group>
          <!-- {{ schema.data[layoutName] }} -->
          <!-- <cbu_supply_type v-if="schema.data[layoutName].id == 'supplyType'" :supplyTypeOptions="schema.data[layoutName]" v-model="dataBody.supplyType"></cbu_supply_type> -->
        </el-form-item>
        <el-form-item :key="layoutName" v-else-if="schema.data[layoutName].id == 'catNamer'"
          :label="schema.data[layoutName].fields.label" size="normal">
          <template v-for="(item, index) in schema.data[layoutName].fields.value.pathList">
            <i :key="index" class="el-icon-arrow-right">{{ item.name }}</i>
          </template>
          <!-- {{ schema.data[layoutName] }} -->
        </el-form-item>
        <el-form-item :key="layoutName" v-else-if="schema.data[layoutName].id == 'blockProps'"
          :label="schema.data[layoutName].fields.label" size="normal">
          {{ schema.hierarchy.structure['blockProps'] }}
          <el-form :model="dataBody" ref="blockProps" :rules="rules" label-width="80px"
            :inline="false" size="normal">
            <template v-for="layoutName2 in  schema.hierarchy.structure['blockProps']">
              <el-form-item v-if="schema.data[layoutName2].id == 'title'" :key="layoutName2"
                :label="schema.data[layoutName2].fields.label"
                :rules="[{ required: true, message: `请输入${schema.data[layoutName2].fields.label}`, trigger: 'blur' }]">
                <!-- {{ schema.data[layoutName2] }} -->
                <el-input v-model="dataBody.title"
                  :placeholder="schema.data[layoutName2].fields.placeholder" size="normal"
                  :maxlength="schema.data[layoutName2].fields.maxLength" show-word-limit></el-input>
              </el-form-item>
              <el-form-item v-else-if="schema.data[layoutName2].id == 'catProp'" :key="layoutName2"
                :label="schema.data[layoutName2].fields.label">
                <CatProp v-model="dataBody.catProp" :catProp="schema.data.catProp"></CatProp>
              </el-form-item>
            </template>
          </el-form>
        </el-form-item>
        <el-form-item :key="layoutName" v-else :label="schema.data[layoutName].fields.label">
          {{ schema.data[layoutName] }}
        </el-form-item>
      </template>
      <!-- <el-form-item :label="schema.data.title.fields.label" prop="title">
        <el-input v-model="dataBody.title" maxlength="60" show-word-limit></el-input>
      </el-form-item> -->
      <!-- <el-form-item :label="schema.data.catProp.fields.label" :prop="catProp">
        <CatProp v-model="dataBody.catProp" :catProp="schema.data.catProp"></CatProp>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit('dataBody')">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { schema } from '.'
import { apiOptions, api_alibaba_product_schema } from '@/api/leo-alibaba'
import CatProp from '../product/Schema/CatProp.vue'
import cbu_supply_type from '@/views/leo-alibaba/components/cbu_supply_type'
// import { deepClone } from '@/utils/index.js'
export default {
  components: {
    CatProp,
    cbu_supply_type
  },
  data() {
    return {
      apiOptions,
      schema,
      catPropOptions: [],
      dataBody: {
        catProp: {},
        title: '',
        supplyType: []
      },
      rules: {
        title: [
          {
            require: true,
            min: 30,
            max: 60,
            message: '长度在 30 到 60 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted() {
    const order = this.schema.hierarchy.structure[this.schema.hierarchy.root]
    order.forEach((name) => {
      if (this.schema.data[name].fields.required) {
        console.log(this.schema.data[name])
      } else {
        console.log(this.schema.data[name])
      }
    })
    console.log(order)
  },
  methods: {
    handBltClk(opt) {
      api_alibaba_product_schema(opt).then((res) => {
        console.log(res)
      })
    },

    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>