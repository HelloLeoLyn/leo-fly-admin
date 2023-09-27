<template>
  <div style="padding: 0 20px; background-color: silver">
    <el-button
      type="primary"
      size="default"
      @click="handBltClk(apiOptions.getSchema)"
      >{{ apiOptions.getSchema.desc }}</el-button
    >
    <el-form
      :model="formValues"
      ref="formValues"
      :rules="rules"
      label-width="180px"
      :inline="false"
      size="normal"
    >
      <div
        style="background-color: white"
        :key="layoutName"
        v-for="layoutName in schema.hierarchy.structure[
          this.schema.hierarchy.root
        ]"
      >
        <el-form-item
          :key="layoutName"
          v-if="schema.hierarchy.structure[layoutName]"
          :label="schema.data[layoutName].fields.label"
        >
          <template slot="label">
            <el-button
              type="text"
              size="default"
              @click="handleObj(layoutName)"
              class="el-icon-question"
              >{{ schema.data[layoutName].fields.label }}</el-button
            >
          </template>
          <div
            v-if="schema.data[layoutName].fields.promote"
            v-html="schema.data[layoutName].fields.promote.right"
          ></div>
          <div v-if="schema.data[layoutName].id == 'blockProps'">
            <el-button size="default">使用模板</el-button>
            第一次使用模板，请点此查看详情学习
          </div>
          <div v-if="schema.data[layoutName].id == 'blockTradeInfo'">
            <el-button size="default">使用模板</el-button>
          </div>
          <br />
          <template
            v-for="layoutName2 in schema.hierarchy.structure[layoutName]"
          >
            <el-form-item
              :key="layoutName2"
              :label="schema.data[layoutName2].fields.label"
              v-if="schema.data[layoutName2]"
              :rules="
                schema.data[layoutName2].fields.required
                  ? [
                      {
                        required: true,
                        message: `请输入${schema.data[layoutName2].fields.label}`,
                        trigger: 'blur'
                      }
                    ]
                  : null
              "
            >
              <template slot="label">
                <el-button
                  type="text"
                  size="default"
                  @click="handleObj(layoutName2)"
                  class="el-icon-question"
                  >{{ schema.data[layoutName2].fields.label }}</el-button
                >
              </template>
              <div
                v-if="schema.data[layoutName2].fields.promote"
                v-html="schema.data[layoutName2].fields.promote.top"
              ></div>
              <LeoInput
                v-if="schema.data[layoutName2].id == 'title'"
                v-model="formValues.title"
                :show-word-limit="schema.data[layoutName2].fields.showCounter"
                :max-length="schema.data[layoutName2].fields.maxLength"
              ></LeoInput>
              <template v-else-if="schema.data[layoutName2].id == 'catProp'">
                <el-button type="primary" size="default" @click="autoSet"
                  >设置</el-button
                >
                <CatProp
                  v-model="formValues.catProp"
                  :catProp="schema.data.catProp"
                  v-if="init.catProp"
                ></CatProp>
              </template>
              <div
                style="color: #6b0caa"
                v-else-if="schema.data[layoutName2].type == 'cbu_specs'"
              ></div>
              <template v-else-if="schema.data[layoutName2].type == 'cburadio'">
                <el-radio
                  v-model="formValues[layoutName2].value"
                  :key="key"
                  :label="child.value"
                  v-for="(child, key) in schema.data[layoutName2].fields
                    .dataSource"
                  >{{ child.text }}
                  <el-tooltip
                    v-if="child.help"
                    :content="child.help"
                    placement="bottom"
                    effect="light"
                  >
                    <el-button class="el-icon-question" type="text"></el-button>
                  </el-tooltip>
                  <!-- <i class="el-icon-question" v-if="child.help"></i> -->
                </el-radio>
              </template>
              <template v-else-if="schema.data[layoutName2].type == 'cbu_unit'">
                <el-select
                  v-model="formValues[layoutName2].unit"
                  value-key=""
                  placeholder=""
                  clearable
                  filterable
                >
                  <el-option
                    v-for="item in schema.data[layoutName2].fields.unitOptions"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </template>
              <template
                v-else-if="schema.data[layoutName2].id == 'primaryPicture'"
              >
                <primaryPicture
                  v-model="formValues.primaryPicture"
                  :product-id="$route.params.id"
                  :product="product"
                ></primaryPicture>
              </template>
              <template
                v-else-if="schema.data[layoutName2].id == 'primaryVideo'"
              >
                <LeoVideo src="http://localhost:8080/img/0/tc.mp4"></LeoVideo>
              </template>
              <template
                v-else-if="schema.data[layoutName2].id == 'industrySelectVideo'"
              >
                <LeoVideo src=""></LeoVideo>
              </template>
              <template v-else-if="schema.data[layoutName2].id == 'priceRange'">
                <priceRange :product-id="0" v-model="formValues.priceRange" />
              </template>
              <template v-else-if="schema.data[layoutName2].id == 'totalSales'">
                <el-input
                  v-model="formValues[layoutName2]"
                  placeholder=""
                  size="normal"
                  clearable
                ></el-input>
              </template>
              <template
                v-else-if="schema.data[layoutName2].id == 'beginAmount'"
              >
                <el-input
                  v-model="formValues[layoutName2]"
                  placeholder=""
                  size="normal"
                  clearable
                ></el-input>
              </template>
              <template v-else-if="schema.data[layoutName2].id == 'mixBatch'">
                <el-checkbox
                  v-model="formValues.mixBatchPre"
                  @change="mixBatchPreChange"
                >
                  <!-- {{ item.label }} -->
                </el-checkbox>
                <!-- <el-checkbox-group v-model="formValues[layoutName2]" size="normal">
                  <el-checkbox v-for="item, key in schema.data[layoutName2].fields.dataSource"
                    :key="key" :label="item.label" :value="item">
                    {{ item.label }}
                  </el-checkbox>
                </el-checkbox-group> -->
              </template>
              <template
                v-else-if="schema.data[layoutName2].id == 'upshelfTime'"
              >
                <el-radio
                  v-model="formValues[layoutName2].value"
                  :key="key"
                  :label="child.value"
                  v-for="(child, key) in schema.data[layoutName2].fields
                    .dataSource"
                  >{{ child.text }}
                  <el-tooltip
                    v-if="child.help"
                    :content="child.help"
                    placement="bottom"
                    effect="light"
                  >
                    <el-button class="el-icon-question" type="text"></el-button>
                  </el-tooltip>
                  <!-- <i class="el-icon-question" v-if="child.help"></i> -->
                </el-radio>
              </template>
              <template
                v-else-if="schema.data[layoutName2].id == 'tradeTemplate'"
              >
                <el-checkbox-group
                  v-model="formValues[layoutName2]"
                  size="normal"
                >
                  <el-checkbox
                    v-for="(item, key) in schema.data[layoutName2].fields
                      .processTemplateList"
                    :key="key"
                    :label="item.name"
                    :value="item"
                  >
                    {{ item.name }}
                    <el-tooltip
                      v-if="item.help"
                      :content="item.help"
                      placement="bottom"
                      effect="light"
                    >
                      <el-button
                        class="el-icon-question"
                        type="text"
                      ></el-button>
                    </el-tooltip>
                  </el-checkbox>
                </el-checkbox-group>
              </template>
              <template v-else-if="schema.data[layoutName2].id == 'privacy'">
                <el-checkbox-group
                  v-model="formValues[layoutName2]"
                  size="normal"
                >
                  <el-checkbox
                    v-for="(item, key) in schema.data[layoutName2].fields
                      .dataSource"
                    :key="key"
                    :label="item.text"
                    :value="item"
                  >
                    {{ item.text }}
                  </el-checkbox>
                </el-checkbox-group>
              </template>
              <template
                v-else-if="schema.data[layoutName2].type == 'cbuselect'"
              >
                <el-select
                  v-model="formValues[layoutName2]"
                  value-key="text"
                  placeholder=""
                  clearable
                  filterable
                >
                  <el-option
                    v-for="item in schema.data[layoutName2].fields.dataSource"
                    :key="item.value"
                    :label="item.text"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="schema.data[layoutName2].id == 'seven_day'">
                <el-checkbox-group
                  v-model="formValues[layoutName2]"
                  size="normal"
                >
                  <el-checkbox
                    v-for="(item, key) in schema.data[layoutName2].fields
                      .dataSource"
                    :key="key"
                    :label="item.text"
                    :value="item"
                  >
                    {{ item.text }}
                  </el-checkbox>
                </el-checkbox-group>
                <div
                  v-if="schema.data[layoutName2].fields.promote"
                  v-html="schema.data[layoutName2].fields.promote.bottom"
                ></div>
              </template>
              <template
                v-else-if="schema.data[layoutName2].id == 'cbuSendAddress'"
              >
                <el-select
                  v-model="formValues[layoutName2]"
                  value-key="text"
                  placeholder=""
                  clearable
                >
                  <el-option
                    v-for="item in schema.data[layoutName2].fields.dataSource"
                    :key="item.value"
                    :label="item.text"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="schema.data[layoutName2].id == 'freight'">
                <el-select
                  v-model="formValues[layoutName2].freightType"
                  placeholder=""
                  clearable
                >
                  <el-option label="使用运费模板" value="T"></el-option>
                  <!-- <el-option v-for="item in schema.data[layoutName2].fields.dataSource" :key="item"
                    :label="item" :value="item">
                  </el-option> -->
                </el-select>
                <el-select
                  v-model="formValues[layoutName2].freightId"
                  placeholder=""
                  clearable
                >
                  <el-option label="广州地址" :value="14729534"></el-option>
                </el-select>
              </template>
              <template
                v-else-if="schema.data[layoutName2].id == 'userCategory'"
              >
                <el-select
                  v-model="formValues[layoutName2]"
                  multiple
                  placeholder="请选择"
                  value-key="text"
                >
                  <el-option
                    v-for="item in schema.data[layoutName2].fields.dataSource"
                    :key="item.value"
                    :label="item.text"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="schema.data[layoutName2].id == 'weight'">
                <el-input
                  style="width: 200px"
                  v-model="formValues.weight"
                  placeholder=""
                  size="normal"
                  clearable
                >
                  <template slot="append"
                    >kg/{{ formValues.cbuUnit.unit }}</template
                  >
                </el-input>
                {{ schema.data[layoutName2].fields.promote.right }}
              </template>
              <template
                v-else-if="schema.data[layoutName2].id == 'suttleWeight'"
              >
                <el-input
                  style="width: 200px"
                  v-model="formValues.suttleWeight"
                  placeholder=""
                  size="normal"
                  clearable
                >
                  <template slot="append"
                    >kg/{{ formValues.cbuUnit.unit }}</template
                  >
                </el-input>
                {{ schema.data[layoutName2].fields.promote.right }}
              </template>
              <template v-else-if="schema.data[layoutName2].id == 'volume'">
                <el-input
                  style="width: 200px"
                  v-model="formValues.volume.length"
                  placeholder="长"
                  size="normal"
                  clearable
                >
                  <template slot="append">cm</template>
                </el-input>
                <el-input
                  style="width: 200px"
                  v-model="formValues.volume.width"
                  placeholder="宽"
                  size="normal"
                  clearable
                >
                  <template slot="append">cm</template>
                </el-input>
                <el-input
                  style="width: 200px"
                  v-model="formValues.volume.height"
                  placeholder="高"
                  size="normal"
                  clearable
                >
                  <template slot="append">cm</template>
                </el-input>
                <div
                  v-html="schema.data[layoutName2].fields.promote.bottom"
                ></div>
              </template>
              <template v-if="schema.data[layoutName2].id == 'description'">
                <Description1688
                  ref="description"
                  :product="product"
                  style="height: 500px; overflow: scroll"
                  v-model="formValues.description"
                ></Description1688>
              </template>
              <div v-else style="color: #6b0caa"></div>
            </el-form-item>
          </template>
        </el-form-item>
        <template v-else>
          <el-form-item
            :key="layoutName"
            v-if="schema.data[layoutName].id == 'supplyType'"
            :label="schema.data[layoutName].fields.label"
            size="normal"
            prop="supplyType"
          >
            <el-checkbox-group v-model="formValues.supplyType">
              <el-checkbox
                v-for="(item, key) in schema.data[layoutName].fields.dataSource"
                :label="item.text"
                :key="key"
                :value="item"
                >{{ item.text
                }}<span style="color: #e6a23c">{{ item.help }}</span>
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item
            :key="layoutName"
            v-else-if="schema.data[layoutName].id == 'catNamer'"
            :label="schema.data[layoutName].fields.label"
            size="normal"
          >
            <template
              v-for="(item, index) in schema.data[layoutName].fields.value
                .pathList"
            >
              <i :key="index" class="el-icon-arrow-right">{{ item.name }}</i>
            </template>
          </el-form-item>
        </template>
      </div>
      <br />
      <br />
      <el-form-item
        style="
          position: fixed;
          bottom: 0;
          width: 100%;
          background-color: rgb(244, 250, 250);
        "
      >
        <el-button type="primary" @click="onSubmit('formValues')"
          >立即创建</el-button
        >
        <el-button type="primary" @click="save" style="margin-left: 20px"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
    <Attributes :productId="$route.params.id" :product="product"></Attributes>
    <Helper :productId="$route.params.id" :product="product"></Helper>
  </div>
</template>
<script>
import { schema, initCatProp } from '.'
//  components
import CatProp from '../components/CatProp.vue'
import cbu_supply_type from '@/views/leo-alibaba/components/cbu_supply_type'
import LeoVideo from '@/components/LeoVideo/Index.vue'
import priceRange from '@/views/leo-alibaba/components/priceRange.vue'
import primaryPicture from '@/views/leo-alibaba/components/primaryPicture'
import Attributes from '@/views/leo-product/components/Attributes.vue'
import Helper from '@/views/leo-product/components/Helper.vue'
import Description1688 from '../components/Description1688.vue'
import LeoInput from '@/components/LeoInput/index.vue'
//  api
import {
  apiOptions,
  api_alibaba_product_schema,
  api_alibaba_product_add
} from '@/api/leo-alibaba'
import { api_get_product_more } from '@/api/leo-product'
export default {
  name: 'LeoAlibabaPost',
  components: {
    CatProp,
    LeoVideo,
    cbu_supply_type,
    priceRange,
    primaryPicture,
    Attributes,
    Helper,
    Description1688,
    LeoInput
  },
  data () {
    return {
      init: {
        catProp: false
      },
      product: null,
      apiOptions,
      schema,
      catPropOptions: [],
      formValues: {
        saleProp: {},
        onlineTrade: { value: 17410 },
        cbuUnit: { unit: '套' },
        quotationType: { value: 2 },
        bPrice: {},
        priceRange: [{ pricerange_beginAmount: 2, pricerange_price: null }],
        skuTable: {},
        invReduce: { value: '2' },
        totalSales: 999,
        beginAmount: 5,
        standardPrice: {},
        lightBeginAmount: {},
        processPriceTpl: {},
        mixBatchPre: true,
        mixBatch: [
          {
            value: 17026,
            text: '支持混批'
          }
        ],
        upshelfTime: { value: 1 },
        tradeTemplate: {},
        privacy: {},
        buyerProtection: null,
        deliveryTime: { value: '3', text: '三天发货' },
        seven_day: {},
        cbuSendAddress: {
          value: 32583873,
          text: '广东省 广州市 越秀区 广园东路西坑厚街22号'
        },
        freight: {
          freightType: 'T',
          freightId: 14729534
        },
        officialLogistics: {},
        weight: null,
        suttleWeight: null,
        volume: {
          height: 10,
          width: 12,
          length: 20
        },
        description: null,
        detailVideo: {},
        userCategory: [],
        title: '',
        catProp: {
          'p-100000729': { value: 21959, text: '否' },
          'p-287': { value: 25423961, text: '半金属' },
          'p-3567': { value: 47673, text: '刹车片' },
          'p-182282223': { value: 21958, text: '是' },
          'p-2176': 'MDTZ',
          'p-157878556': null,
          name: 'a',
          age: 7
        },
        importProp: {},
        productDocument: {},
        primaryPicture: { imageList: [] },
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
  created () {
    this.formValues.userCategory = [{ value: '152550850', text: '刹车片' }]
    api_get_product_more(this.$route.params.id).then(res => {
      this.product = res.data
      this.autoSet()
      this.read()
      this.init.catProp = true
    })
  },
  methods: {
    autoSet () {
      let catProp = initCatProp(this.formValues.catProp, this.product)
      this.$set(this.formValues, 'catProp', catProp)
    },
    read () {
      const string = localStorage.getItem(
        'alibaba_post_' + this.$route.params.id
      )
      if (string && string !== 'undefined') {
        const json = JSON.parse(string)
        // Object.keys(json).forEach(key => {
        //   this.formValues[key] = json[key]
        // })
        this.formValues.title = json.title
        this.formValues.primaryPicture = json.primaryPicture
        this.formValues.catProp = json.catProp
        this.formValues.priceRange = json.priceRange
        this.formValues.weight = json.weight
      }
    },
    save () {
      localStorage.setItem(
        'alibaba_post_' + this.product.id,
        JSON.stringify(this.formValues)
      )
      this.$notify.success('保存成功！')
    },
    handBltClk (data) {
      api_alibaba_product_schema(data).then(res => {
        console.log(res)
      })
    },

    onSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = Object.assign(apiOptions.add, {
            dataBody: JSON.stringify({
              formValues: this.formValues
            })
          })
          api_alibaba_product_add(params).then(({ data }) => {
            if (data.success == true) {
              this.$message.success('successfully!')
            } else {
              this.$message.error(data.bizMsg)
            }
          })
        } else {
          return false
        }
      })
    },

    saveAsTemplate () {},
    handleObj (key) {
      console.log(
        JSON.stringify(this.schema.data[key]),
        JSON.stringify(this.formValues[key])
      )
    },
    mixBatchPreChange (e) {
      if (e) {
        this.formValues.mixBatch = [
          {
            value: 17026,
            text: '支持混批'
          }
        ]
      } else {
        this.formValues.mixBatch = []
      }
    }
  }
}
</script>
<style lang="scss">
em {
  color: #e1870a;
}
</style>
