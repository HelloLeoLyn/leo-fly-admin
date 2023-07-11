<template>
  <div class="leo-goods-aliexpress">
    <div class="leo-goods-aliexpress-sider">
      <el-tabs @tab-click="handleClick" v-model="activeName" tab-position="left">
        <el-tab-pane :name="item.label" :class="index == 0 ? 'current' : ''" v-for="(item, index) in sections"
          :key="item.label" :label="item.label"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="leo-goods-aliexpress-content">
      <div style="font-family: math;" id="Notice" class="section">
        <h1>Notice</h1>
        <p>
          &nbsp;&nbsp;Friends, welcome, before placing an order, please check carefully whether the
          product you need to
          buy is correct, If you don't know if the product is suitable for your car, you can send
          the VIN number of your
          car to customer service for inspection.
        </p>
        <p>
          &nbsp;&nbsp;If you have any questions about the product, or if you want to order in large
          quantities, you can
          contact me and I will give you the best price. Email: 541124712@qq.com wechat:
          +8618507568775.
        </p>
      </div>
      <div id="Features" class="section">
        <h1>Features</h1>
        <p>Revitalize Your Vehicle: Find the Perfect Auto Components</p>
        <div style="   display: flex;
  grid-column: auto;">
          <div style=" border: 1px solid ;
    min-width: 0;
    padding: 10px;height: 280px;width: 25%;text-align: center;">
            <img src="https://ae01.alicdn.com/kf/S8b910b280e9a4e01aea2c173b7c98a0bZ.png" alt="" />
            <p>Highest Standards for Safety and Reliability</p>
          </div>
          <div style=" border: 1px solid;
    min-width: 0;
    padding: 10px;height: 280px;width: 25%;text-align: center;">
            <img src="https://ae01.alicdn.com/kf/Sb0cef13e329b4b5a89754b8a97b3a3efR.png" alt="" />
            <p>
              Long-Lasting Brake Pads that Endure the Toughest Driving Conditions
            </p>
          </div>
          <div style=" border: 1px solid ;
    min-width: 0;
    padding: 10px;height: 280px;width: 25%;text-align: center;">
            <img src="https://ae01.alicdn.com/kf/S417cb9d3f9e5459bb10fe728e1045833Q.png" alt="" />
            <p>
              Superior Heat Dissipation: Our Brake Pads Maintain Optimal Performance under Intense
              Braking!
            </p>
          </div>
          <div style=" border: 1px solid ;
    min-width: 0;
    padding: 10px;height: 280px;width: 25%;text-align: center;">
            <img src="https://ae01.alicdn.com/kf/S3f6976653db6442da840d29c838870e7B.png" slate-data-type="image">
            <p>Say Goodbye to Squeaky and Worn-out Pads</p>
          </div>
        </div>
      </div>
      <div id="Product Detail" class="section">
        <el-form :model="form" ref="form" :rules="rules" label-width="180px" :inline="false" size="normal">
          <h1>Product Detail</h1>
          <el-form-item label="subject" prop="subject">
            <Subject v-if="product && product.model" @change="e => subject = e" :carFitment="this.preview.models"
              :product="product" :key="key.subject" />
          </el-form-item>

          <el-row :gutter="20">
            <el-col :span="12" :offset="0">
              <el-form-item label="Brand">
                <el-input v-model="form.brand"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="0">
              <el-form-item label="Material Type">
                <el-input v-model="form.material"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="0">
              <el-form-item label="Country/Region">
                <el-input v-model="form.region"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="0">
              <el-form-item label="CN">
                <el-input v-model="form.cn"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="0">
              <el-form-item label="Certification">
                <el-input v-model="form.certification"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="0">
              <el-form-item label="Placement On Vechicle">
                <el-input v-model="form.placement"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="0">
              <el-form-item label="Width">
                <el-input v-model="form.width"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="0">
              <el-form-item label="Height">
                <el-input v-model="form.height"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="0">
              <el-form-item label="Length">
                <el-input v-model="form.lenght"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="0">
              <el-form-item label="Weight">
                <el-input v-model="form.weight"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="0">
              <el-form-item label="Manufacturer Part Number">
                <el-input v-model="form.mpn"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="" size="normal">
            <el-input v-html="form.others" placeholder="" size="normal" clearable type="textarea"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div id="Car Fitment" class="section">
        <h1>OEM & Car Fitment</h1>
        <p>{{ this.listToString(oe,',')}}</p>
        <Models v-if="product && product.model" :list="this.preview.models"></Models>
      </div>
      <div id="Product Images" class="section">
        <h1>Product Images</h1>
        <Images :ref="$route.params.id" :product-id="$route.params.id" @newImageUrl="e => package.main = e"
          @getImages="e => preview.images = e" />
      </div>
      <div id="Packing & Delivery" class="section">
        <h1>Packing & Delivery</h1>
        <div style="display: flex;">
          <div class="image-container">
            <img :src="package.main" alt="">
          </div>
          <div style="width: 50%;">
            <p>packageSize:{{ form.packageSize }}</p>
            <p>weight:{{ form.weight }}</p>
          </div>
        </div>

        <img :src="package.size" alt="" style="width: 100%;">
        <el-select v-model="form.packageSize" @change="packageSizeChange" style="width: 500px;">
          <el-option label="21cm*12cm*9.5cm" value="21cm*12cm*9.5cm">
          </el-option>
          <el-option label="16cm*11cm*8cm" value="16cm*11cm*8cm">
          </el-option>
        </el-select>
      </div>
      <div id="Company" class="section">
        <h1>Company</h1>
        <div>
          China Auto Parts Wholesaler | China Auto Parts Distributor

          BBmart is a young upcoming company with excellent network to major manufacturers in China
          operating in the field of auto parts.

          BBmart was founded by Guangzhou BenBenUnion Supply Chain Management Co., Ltd. operating in
          the RHD & LHD motor vehicles spare parts industry since 2005.

          We are constantly looking for new developments and innovations of online shopping for the
          purpose of providing you a unique experience while shopping with us.

          Why buy from us ?

          1. BBmart established Sales office & Warehouse in Guangzhou to provide better service for
          clients.

          2. We stock 50,000+ different parts in China . Parts deliver to Guangzhou/Shenzhen Port
          within 7 days after order confirmed. You are benefit from China factory direct price and
          immediate delivery service.

          3. NO MOQ requested ! No need to buy big volume in one shipment.

          BBmart stands for the highest standards at competitive market prices.

          We are currently looking for distributors wordwide if you are interested, please add
          WhatsApp: +86 134-5047-3308; please email us ann.wu@apware.cn
        </div>
        <img src="http://localhost:8080/img/0/office.png" alt="">
        <div style="display:flex">
          <div style=" width:50%;height:300px">
            <img src="" alt="">
          </div>
          WhatsApp: +86 134-5047-3308
          email us ann.wu@apware.cn
        </div>
      </div>
      <div id="Factory" class="section">
        <h1>Factory</h1>
        <!-- <video src="http://localhost:8080/video/0/刹车检测1.mp4" controls></video> -->
        <img src="http://localhost:8080/img/0/factory.png" alt="" style="width:100%">
        <img src="http://localhost:8080/img/0/factory2.png" alt="" style="width:100%">
        <img src="http://localhost:8080/img/0/factory3.png" alt="" style="width:100%">
      </div>
      <div id="Cert" class="section">
        <h1>Cert</h1>
        <img src="http://localhost:8080/img/0/cert.png" alt="" width="100%">
        <img src="http://localhost:8080/img/0/cert2.png" alt="" width="100%">
        <!-- <img src="http://localhost:8080/img/0/cert3.jpg" alt=""> -->
      </div>
      <div id="FAQ" class="section">
        <h1>FAQ</h1>
      </div>
      <div id="Preview" class="section">
        <el-button type="primary" size="default" @click="handlePreview">Preview</el-button>

      </div>
    </div>
    <el-dialog :title="preview.title" :visible.sync="preview.visible" width="70%" @close="">
      <Preview v-if="preview.visible" :images="preview.images" :form="preview.form" :models="preview.models"
        :package="preview.packing" :company="preview.company" :factory="preview.factory" :cert="preview.cert" :codes="oe">
      </Preview>
      <span slot="footer">
        <el-button @click=" preview.visible = false">Cancel</el-button>
        <el-button type="primary" @click="onConfirmPreview">OK</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<style lang="scss" scoped>
.leo-goods-aliexpress {
  padding: 20px;
  background: unset;
  width: 100%;
  padding: 20px;
  display: flex;

  &-sider {
    padding-top: 20px;
    width: 180px;
    position: relative;
    float: left;
    position: fixed;
  }

  &-content {
    padding-left: 180px;
    flex: 1;
  }

  .box-card {
    min-width: 600px;
    width: 100%;
    margin-bottom: 20px;
  }

  .image-container {
    position: relative;
    width: 500px;
    /* 根据需要设置容器的宽度 */
    height: 500px;
    /* 根据需要设置容器的高度 */
    background-image: url("http://localhost:8080/img/0/package-cover.png");
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;

    // align-items: center;
    img {
      position: absolute;
      top: 250px;
      height: 200px;
    }
  }
}
</style>
<script>
import Preview from './components/Preview.vue'
import Subject from '@/views/leo-goods/aliexpress/components/Subject'
import Images from './components/Images.vue'
import { api_get_product_more } from '@/api/leo-product'
import { api_goods_post } from '@/api/leo-goods'
import Models from '@/views/leo-goods/aliexpress/components/Models'
import { listToString } from '@/utils'
export default {
  name: 'LeoGoodsAliexpressPrepare',
  components: { Images, Subject, Models, Preview },
  data() {
    return {
      package: {
        size: 'http://localhost:8080/img/0/package-normal.png',
        cover: 'http://localhost:8080/img/0/package-cover.png',
        main: ''
      },
      activeName: '',
      sections: [
        {
          label: 'Notice',
          required: true
        },
        {
          label: 'Features',
          required: true
        },
        {
          label: 'Product Detail',
          required: true
        },
        {
          label: 'Car Fitment',
          required: true
        },
        {
          label: 'Product Images',
          required: true
        },
        {
          label: 'Packing & Delivery',
          required: true
        },
        {
          label: 'Company',
          required: false
        },
        {
          label: 'Factory',
          required: false
        },
        {
          label: 'Cert',
          required: false
        },
        {
          label: 'FAQ',
          required: false
        },
        {
          label: 'Preview',
          required: false
        }
      ],
      key: {
        productImage: 0,
        subject: 1000
      },
      form: {
        weight: '',
        lenght: '',
        height: '',
        width: '',
        packageSize: ''
      },
      rules: {
        subject: [
          { required: true, message: '请输入', trigger: 'blur' },
          {
            require: true,
            min: 60,
            max: 128,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur'
          }
        ],
        images: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      jsonList: [],
      jsonListIndex: 0,
      product: {},
      preview: {
        visible: false,
        title: 'Preview',
        html: '',
        images: [],
        form: {},
        cert: {},
        factory: {},
        company: {},
        packing: {},
        models: []
      },
      base: '',
      oe: null
    }
  },
  created() {
    if (this.$route.query.subject) {
      this.subject = this.$route.query.subject
    }
    api_get_product_more(this.$route.params.id).then((res) => {
      this.product = res.data
      if (this.product.jsonList&&this.product.jsonList.lenght>0) {
        this.jsonList = this.product.jsonList
        if (this.jsonList[this.jsonListIndex].json) {
          this.base = this.jsonList[this.jsonListIndex].json.base
          let size = this.jsonList[this.jsonListIndex].json.base
          this.form.width = size['Width : ']
          this.form.height = size['Height : ']
          this.form.lenght = size['Thickness : ']
          this.form.thickness = size['Thickness : ']
        }
      }
      this.form.brand = 'MDTZ'
      this.form.material = 'Ceramics/Semimetal'
      this.form.region = 'China'
      this.form.cn = 'Guang Dong'
      this.form.weight = this.product.weight
      this.form.packageSize = this.product.packageSize
      this.preview.models = JSON.parse(this.product.model)
      this.oe = this.product.code
    })
  },
  methods: {
    listToString,
    handlePreview() {
      this.preview.form = this.form
      this.preview.form = this.form
      // images
      const img = {
        url: '@{images[i]}'
      }
      this.preview.images[0] = img
      // packing
      this.preview.packing.sizeUrl = this.package.size
      this.preview.packing.weight = this.form.weight
      this.preview.packing.size = this.form.packageSize
      this.preview.packing.cover = '@{packing.cover}'

      // company
      this.preview.company.image = 'https://ae01.alicdn.com/kf/S95d3f25cb00d415c991a5031280f38505.png'
      // Factory
      this.preview.factory.images = ['https://ae01.alicdn.com/kf/S1664da71095c4341b2a6e24924e6e85f5.png',
        'https://ae01.alicdn.com/kf/Sa537edb987d3409d922525e6992040dfJ.png',
        'https://ae01.alicdn.com/kf/S95cc1031bf8843c39dd468efbab787eef.png']


      // cert
      this.preview.cert.images = ['https://ae01.alicdn.com/kf/Sfc6c53c7858b47618f3e1f8deda63b0cF.png',
        'https://ae01.alicdn.com/kf/Se6fb480ff2944e8f9423b3a6b243564dM.png',
        'https://ae01.alicdn.com/kf/S1af74204154c45ff96951dd8f6ab53963.png']
      this.preview.visible = !this.preview.visible
    },
    onConfirmPreview() {


      // faq
    },
    packageSizeChange(e) {
      if (e == '21cm*12cm*9.5cm') {
        this.package.size = 'https://ae01.alicdn.com/kf/Se74b334a2a66473ebe5505e8e9d32b04m.png'
      } else {
        this.package.size = 'https://ae01.alicdn.com/kf/Se74b334a2a66473ebe5505e8e9d32b04m.png'
      }
    },
    handleClick(tab) {
      this.jump(tab.index)
    },
    jump(index) {
      let jump = document.getElementsByClassName('section')
      // 获取需要滚动的距离
      let total = jump[index].offsetTop
      // Chrome
      document.body.scrollTop = total
      // Firefox
      document.documentElement.scrollTop = total
      // Safari
      window.pageYOffset = total
      // $('html, body').animate({
      // 'scrollTop': total
      // }, 400);
    },
    nextBase() {
      this.jsonListIndex++
      if (this.jsonListIndex == this.jsonList.lenght) {
        this.jsonListIndex = 0
      }
      this.form.others = this.jsonList[this.jsonListIndex].json.base
    },

    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (!valid) return
        api_goods_post(this.form).then((res) => {
          this.$message.success(res.msg)
        })
      })
    },
    getImages(e) {
      this.form.Images = JSON.stringify(e)
    }
  }
}
</script>