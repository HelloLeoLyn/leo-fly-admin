<template>
  <div>
    <el-button type="primary" size="default" @click="handBltClk(opt)"
      v-for=" opt, key in apiOptions" :key="key">{{
      opt.desc }}</el-button>
    <el-form :model="dataBody" ref="dataBody" :rules="rules" label-width="180px" :inline="false"
      size="normal">
      <template v-for="layoutName in  schema.hierarchy.structure[this.schema.hierarchy.root]">
        <el-form-item :key="layoutName" v-if="schema.hierarchy.structure[layoutName]"
          :label="schema.data[layoutName].fields.label">
          <div style="color: #e1870a;">{{ schema.data[layoutName] }}</div>
          <template v-for="layoutName2 in  schema.hierarchy.structure[layoutName]">
            <el-form-item :key="layoutName2" :label="schema.data[layoutName2].fields.label"
              v-if="schema.data[layoutName2]">
              <div style="color: #e10a0d;">{{ schema.data[layoutName2] }}</div>
            </el-form-item>
            <el-form-item :key="layoutName2" :label="layoutName2" v-else>
              <div style="color: #e10a0d;">{{ layoutName2 }}</div>
            </el-form-item>
          </template>
          <!-- <el-form-item :key="layoutName" :label="schema.data[layoutName].fields.label">
            <el-form v-if="schema.hierarchy.structure[layoutName]" :model="dataBody"
              :ref="layoutName" :rules="rules" label-width="80px" :inline="false" size="normal">
              <template v-for="(layoutName2, index) in schema.hierarchy.structure[layoutName]">
                <el-form-item :label="schema.data[layoutName2].fields.label" :key="index"
                  v-if="schema.data[layoutName2]"
                  :rules="schema.data[layoutName2].fields.required ? [{ required: true, message: `请输入${schema.data[layoutName].fields.label}`, trigger: 'blur' }] : null">
                  <div v-if="schema.data[layoutName2].fields.promote"
                    v-html="schema.data[layoutName2].fields.promote.top">
                  </div>
                  <template v-if="schema.data[layoutName2].fields.uiType=='cburadio'">
                    <el-radio v-model="dataBody[layoutName2].value" :key="key" :label="child.value"
                      v-for=" child,key in
                    schema.data[layoutName2].fields.dataSource">{{child.text}}</el-radio>
                  </template>
                  <template v-else-if="schema.data[layoutName2].fields.uiType=='cbu_unit'">
                    <el-select v-model="dataBody[layoutName2].unit" value-key="" placeholder=""
                      clearable filterable>
                      <el-option v-for="item in schema.data[layoutName2].fields.unitOptions"
                        :key="item" :label="item" :value="item">
                      </el-option>
                    </el-select>
                  </template>
                  <template v-else>
                    <el-form-item v-for="el,key in schema.data[layoutName2].fields.dataSource"
                      :key="key" :label="el.label">
                      <el-input v-if="el.uiType=='input'" v-model="dataBody[layoutName2][el.name]"
                        placeholder="" size="normal" clearable></el-input>
                    </el-form-item>
                  </template>
                  {{ schema.data[layoutName2] }}
                </el-form-item>
              </template>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </el-form-item> -->
        </el-form-item>
        <template v-else>
          <el-form-item :key="layoutName" v-if="schema.data[layoutName].id == 'supplyType'"
            :label="schema.data[layoutName].fields.label" size="normal" prop="supplyType">
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
                    :maxlength="schema.data[layoutName2].fields.maxLength"
                    show-word-limit></el-input>
                </el-form-item>
                <el-form-item v-else-if="schema.data[layoutName2].id == 'catProp'"
                  :key="layoutName2" :label="schema.data[layoutName2].fields.label">
                  {{ schema.data[layoutName2].fields.promote.top }}
                  <CatProp v-model="dataBody.catProp" :catProp="schema.data.catProp"></CatProp>
                </el-form-item>
                <el-form-item v-else size="normal" :label="schema.data[layoutName2].fields.label"
                  :key="layoutName2">
                  <div style="color: #18b42f;">{{ schema.data[layoutName2] }}</div>
                </el-form-item>
              </template>
            </el-form>
          </el-form-item>
          <el-form-item v-else size="normal" :label="schema.data[layoutName].fields.label"
            :key="layoutName">
            <div style="color: #18b42f;">{{ schema.data[layoutName] }}</div>
          </el-form-item>
        </template>
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
        saleProp: {},
        onlineTrade: {},
        cbuUnit: {},
        quotationType: {},
        bPrice: {},
        priceRange: {},
        skuTable: {},
        invReduce: {},
        totalSales: {},
        beginAmount: {},
        standardPrice: {},
        lightBeginAmount: {},
        processPriceTpl: {},
        mixBatch: {},
        upshelfTime: {},
        relationOffer: {},
        tradeTemplate: {},
        privacy: {},
        buyerProtection: {},
        deliveryTime: {},
        seven_day: {},
        cbuSendAddress: {},
        freight: {},
        officialLogistics: {},
        weight: {},
        suttleWeight: {},
        volume: {},
        description: {},
        detailVideo: {},
        userCategory: {},
        title: {},
        catProp: {},
        importProp: {},
        productDocument: {},
        primaryPicture: {},
        primaryVideo: {},
        industrySelectVideo: {},
        globalMessage: {},
        navStruct: {},
        supplyType: {},
        catNamer: {},
        blockPrimary: {},
        blockProps: {},
        blockTradeInfo: {},
        blockExtras: {},
        blockLogistics: {},
        blockDescription: {},
        submit: {},
        plugin: {},
        assistBoard: {}
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
    let keys = Object.keys(this.schema.hierarchy.structure)
    let dataBody = {}
    for (let i = 0; i < keys.length; i++) {
      let children = this.schema.hierarchy.structure[keys[i]]
      for (let j = 0; j < children.length; j++) {
        if (this.schema.data[children[j]]) {
          console.log(this.schema.data[children[j]])
          dataBody[this.schema.data[children[j]].id] = {}
        } else {
          console.log(children[j])
        }
      }
    }
    console.log(dataBody)
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
    },
    saveAsTemplate() {},
    handleObj(obj) {
      console.log(obj)
      let index = Object.keys(obj).findIndex((key) => key == 'fields')
      console.log(index)
    }
  }
}
</script>