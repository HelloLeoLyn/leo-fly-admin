<template>
  <div style="padding: 0 20px; background-color: silver">
    <el-button type="primary" size="default" @click="handBltClk(opt)"
      v-for="(opt, key) in apiOptions" :key="key">{{ opt.desc }}</el-button>
    <el-form :model="dataBody" ref="dataBody" :rules="rules" label-width="180px" :inline="false"
      size="normal">
      <div style="background-color: white" :key="layoutName" v-for="layoutName in schema.hierarchy.structure[
          this.schema.hierarchy.root
        ]">
        <el-form-item :key="layoutName" v-if="schema.hierarchy.structure[layoutName]"
          :label="schema.data[layoutName].fields.label">
          <template slot="label">
            <el-button type="text" size="default" @click="handleObj(layoutName)"
              class="el-icon-question">{{ schema.data[layoutName].fields.label }}</el-button>
          </template>
          <div v-if="schema.data[layoutName].fields.promote"
            v-html="schema.data[layoutName].fields.promote.right"></div>
          <div v-if="schema.data[layoutName].id == 'blockProps'">
            <el-button size="default">使用模板</el-button>
            第一次使用模板，请点此查看详情学习
          </div>
          <div v-if="schema.data[layoutName].id == 'blockTradeInfo'">
            <el-button size="default">使用模板</el-button>
          </div>
          <br />
          <template v-for="layoutName2 in schema.hierarchy.structure[layoutName]">
            <el-form-item :key="layoutName2" :label="schema.data[layoutName2].fields.label"
              v-if="schema.data[layoutName2]" :rules="
                schema.data[layoutName2].fields.required
                  ? [
                      {
                        required: true,
                        message: `请输入${schema.data[layoutName2].fields.label}`,
                        trigger: 'blur'
                      }
                    ]
                  : null
              ">
              <template slot="label">
                <el-button type="text" size="default" @click="handleObj(layoutName2)"
                  class="el-icon-question">{{ schema.data[layoutName2].fields.label }}</el-button>
              </template>
              <div v-if="schema.data[layoutName2].fields.promote"
                v-html="schema.data[layoutName2].fields.promote.top"></div>
              <el-input v-if="schema.data[layoutName2].id == 'title'" v-model="dataBody.title"
                :maxlength="schema.data[layoutName2].fields.maxLength" size="normal" clearable
                :placeholder="schema.data[layoutName2].fields.placeholder"
                :show-word-limit="schema.data[layoutName2].fields.showCounter"></el-input>
              <CatProp v-else-if="schema.data[layoutName2].type == 'cbu_cat_prop'"
                v-model="dataBody.catProp" :catProp="schema.data.catProp"></CatProp>
              <div style="color: #6b0caa" v-else-if="schema.data[layoutName2].type == 'cbu_specs'">
              </div>
              <template v-else-if="schema.data[layoutName2].type == 'cburadio'">
                <el-radio v-model="dataBody[layoutName2].value" :key="key" :label="child.value"
                  v-for="(child, key) in schema.data[layoutName2].fields
                    .dataSource">{{ child.text }}
                  <el-tooltip v-if="child.help" :content="child.help" placement="bottom"
                    effect="light">
                    <el-button class="el-icon-question" type="text"></el-button>
                  </el-tooltip>
                  <!-- <i class="el-icon-question" v-if="child.help"></i> -->
                </el-radio>
              </template>
              <template v-else-if="schema.data[layoutName2].type == 'cbu_unit'">
                <el-select v-model="dataBody[layoutName2].unit" value-key="" placeholder=""
                  clearable filterable>
                  <el-option v-for="item in schema.data[layoutName2].fields.unitOptions" :key="item"
                    :label="item" :value="item">
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="schema.data[layoutName2].id == 'primaryPicture'">
                <primaryPicture v-model="dataBody.primaryPicture"></primaryPicture>
              </template>
              <template v-else-if="schema.data[layoutName2].id == 'primaryVideo'">
                <LeoVideo src="http://localhost:8080/img/0/tc.mp4"></LeoVideo>
              </template>
              <template v-else-if="schema.data[layoutName2].id == 'industrySelectVideo'">
                <LeoVideo src=""></LeoVideo>
              </template>
              <template v-else-if="schema.data[layoutName2].id == 'priceRange'">
                <priceRange :product-id="0" v-model="dataBody.priceRange" />
              </template>
              <template v-else-if="schema.data[layoutName2].id == 'totalSales'">
                <el-input v-model="dataBody[layoutName2]" placeholder="" size="normal"
                  clearable></el-input>
              </template>
              <template v-else-if="schema.data[layoutName2].id == 'beginAmount'">
                <el-input v-model="dataBody[layoutName2]" placeholder="" size="normal"
                  clearable></el-input>
              </template>
              <template v-else-if="schema.data[layoutName2].id == 'mixBatch'">
                <el-checkbox v-model="dataBody.mixBatchPre" @change="mixBatchPreChange">
                  <!-- {{ item.label }} -->
                </el-checkbox>
                <!-- <el-checkbox-group v-model="dataBody[layoutName2]" size="normal">
                  <el-checkbox v-for="item, key in schema.data[layoutName2].fields.dataSource"
                    :key="key" :label="item.label" :value="item">
                    {{ item.label }}
                  </el-checkbox>
                </el-checkbox-group> -->
              </template>
              <template v-else-if="schema.data[layoutName2].id == 'upshelfTime'">
                <el-radio v-model="dataBody[layoutName2].value" :key="key" :label="child.value"
                  v-for="(child, key) in schema.data[layoutName2].fields
                    .dataSource">{{ child.text }}
                  <el-tooltip v-if="child.help" :content="child.help" placement="bottom"
                    effect="light">
                    <el-button class="el-icon-question" type="text"></el-button>
                  </el-tooltip>
                  <!-- <i class="el-icon-question" v-if="child.help"></i> -->
                </el-radio>
              </template>
              <template v-else-if="schema.data[layoutName2].id == 'tradeTemplate'">
                <el-checkbox-group v-model="dataBody[layoutName2]" size="normal">
                  <el-checkbox v-for="(item, key) in schema.data[layoutName2].fields
                      .processTemplateList" :key="key" :label="item.name" :value="item">
                    {{ item.name }}
                    <el-tooltip v-if="item.help" :content="item.help" placement="bottom"
                      effect="light">
                      <el-button class="el-icon-question" type="text"></el-button>
                    </el-tooltip>
                  </el-checkbox>
                </el-checkbox-group>
              </template>
              <template v-else-if="schema.data[layoutName2].id == 'privacy'">
                <el-checkbox-group v-model="dataBody[layoutName2]" size="normal">
                  <el-checkbox v-for="(item, key) in schema.data[layoutName2].fields
                      .dataSource" :key="key" :label="item.text" :value="item">
                    {{ item.text }}
                  </el-checkbox>
                </el-checkbox-group>
              </template>
              <template v-else-if="schema.data[layoutName2].type == 'cbuselect'">
                <el-select v-model="dataBody[layoutName2]" value-key="text" placeholder="" clearable
                  filterable>
                  <el-option v-for="item in schema.data[layoutName2].fields.dataSource"
                    :key="item.value" :label="item.text" :value="item">
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="schema.data[layoutName2].id == 'seven_day'">
                <el-checkbox-group v-model="dataBody[layoutName2]" size="normal">
                  <el-checkbox v-for="(item, key) in schema.data[layoutName2].fields
                      .dataSource" :key="key" :label="item.text" :value="item">
                    {{ item.text }}
                  </el-checkbox>
                </el-checkbox-group>
                <div v-if="schema.data[layoutName2].fields.promote"
                  v-html="schema.data[layoutName2].fields.promote.bottom"></div>
              </template>
              <template v-else-if="schema.data[layoutName2].id == 'cbuSendAddress'">
                <el-select v-model="dataBody[layoutName2]" value-key="text" placeholder=""
                  clearable>
                  <el-option v-for="item in schema.data[layoutName2].fields.dataSource"
                    :key="item.value" :label="item.text" :value="item">
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="schema.data[layoutName2].id == 'freight'">
                <el-select v-model="dataBody[layoutName2].freightType" placeholder="" clearable>
                  <el-option label="使用运费模板" value="T"></el-option>
                  <!-- <el-option v-for="item in schema.data[layoutName2].fields.dataSource" :key="item"
                    :label="item" :value="item">
                  </el-option> -->
                </el-select>
                <el-select v-model="dataBody[layoutName2].freightId" placeholder="" clearable>
                  <el-option label="广州地址" :value="14729534"></el-option>
                </el-select>
              </template>
              <template v-else-if="schema.data[layoutName2].id == 'userCategory'">
                <el-select v-model="dataBody[layoutName2]" multiple placeholder="请选择"
                  value-key="text">
                  <el-option v-for="item in schema.data[layoutName2].fields.dataSource"
                    :key="item.value" :label="item.text" :value="item">
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="schema.data[layoutName2].id == 'weight'">
                <el-input style="width: 200px" v-model="dataBody.weight" placeholder=""
                  size="normal" clearable>
                  <template slot="append">kg/{{ dataBody.cbuUnit.unit }}</template>
                </el-input>
                {{ schema.data[layoutName2].fields.promote.right }}
              </template>
              <template v-else-if="schema.data[layoutName2].id == 'suttleWeight'">
                <el-input style="width: 200px" v-model="dataBody.suttleWeight" placeholder=""
                  size="normal" clearable>
                  <template slot="append">kg/{{ dataBody.cbuUnit.unit }}</template>
                </el-input>
                {{ schema.data[layoutName2].fields.promote.right }}
              </template>
              <template v-else-if="schema.data[layoutName2].id == 'volume'">
                <el-input style="width: 200px" v-model="dataBody.volume.length" placeholder="长"
                  size="normal" clearable>
                  <template slot="append">cm</template>
                </el-input>
                <el-input style="width: 200px" v-model="dataBody.volume.width" placeholder="宽"
                  size="normal" clearable>
                  <template slot="append">cm</template>
                </el-input>
                <el-input style="width: 200px" v-model="dataBody.volume.height" placeholder="高"
                  size="normal" clearable>
                  <template slot="append">cm</template>
                </el-input>
                <div v-html="schema.data[layoutName2].fields.promote.bottom"></div>
              </template>
              <div v-else style="color: #6b0caa"></div>
            </el-form-item>
          </template>
        </el-form-item>
        <template v-else>
          <el-form-item :key="layoutName" v-if="schema.data[layoutName].id == 'supplyType'"
            :label="schema.data[layoutName].fields.label" size="normal" prop="supplyType">
            <template slot="label">
              <el-button type="text" size="default" @click="handleObj(layoutName)"
                class="el-icon-question">{{
              schema.data[layoutName].fields.label }}</el-button>
            </template>

            <el-checkbox-group v-model="dataBody.supplyType">
              <el-checkbox v-for="(item, key) in schema.data[layoutName].fields.dataSource"
                :label="item.text" :key="key" :value="item">{{ item.text
                }}<span style="color: #e6a23c">{{ item.help }}</span>
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item :key="layoutName" v-else-if="schema.data[layoutName].id == 'catNamer'"
            :label="schema.data[layoutName].fields.label" size="normal">
            <template v-for="(item, index) in schema.data[layoutName].fields.value
                .pathList">
              <i :key="index" class="el-icon-arrow-right">{{ item.name }}</i>
            </template>
          </el-form-item>
        </template>
      </div>
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
import CatProp from '../components/CatProp.vue'
import cbu_supply_type from '@/views/leo-alibaba/components/cbu_supply_type'
import LeoVideo from '@/components/LeoVideo/Index.vue'
import priceRange from '@/views/leo-alibaba/components/priceRange.vue'
import primaryPicture from '@/views/leo-alibaba/components/primaryPicture'
export default {
  components: {
    CatProp,
    LeoVideo,
    cbu_supply_type,
    priceRange,
    primaryPicture
  },
  data() {
    return {
      apiOptions,
      schema,
      catPropOptions: [],
      dataBody: {
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
        relationOffer: {},
        tradeTemplate: {},
        privacy: {},
        buyerProtection: {},
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
          height: 20,
          width: 12,
          length: 10
        },
        description: {},
        detailVideo: {},
        userCategory: [],
        title: '',
        catProp: {
          'p-100000729': { value: 21959, text: '否' },
          'p-287': { value: 25423961, text: '半金属' },
          'p-3567': { value: 47673, text: '刹车片' },
          'p-182282223': { value: 21958, text: '是' },
          'p-2176': 'MDTZ'
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
  mounted() {},
  created() {
    this.dataBody.userCategory = [{ value: '152550850', text: '刹车片' }]
  },
  methods: {
    handBltClk(opt) {
      api_alibaba_product_schema(opt).then((res) => {
        console.log(res)
      })
    },

    onSubmit(formName) {
      console.log(this.dataBody)
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
    handleObj(key) {
      console.log(
        JSON.stringify(this.schema.data[key]),
        JSON.stringify(this.dataBody[key])
      )
    },
    mixBatchPreChange(e) {
      if (e) {
        this.dataBody.mixBatch = [
          {
            value: 17026,
            text: '支持混批'
          }
        ]
      } else {
        this.dataBody.mixBatch = []
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
