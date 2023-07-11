<template>
  <div class="leo-goods-aliexpress-preview">
    <el-button type="primary" icon="el-icon-document" @click="handleCopy('', $event)">
      copy
    </el-button>
    <div v-for="item in sections" :key="item.label">
      <el-checkbox v-model="item.checked"></el-checkbox>
      <div v-html="item.html"></div>
    </div>
    <div id="FAQ" class="section">
      <h1>FAQ</h1>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.leo-goods-aliexpress-preview {
  width: 800px;
  margin: 0 auto;
}
</style>
<script>
import clip from '@/utils/clipboard'
const getStringNvl = function (str) {
  if (str) {
    return str
  } else {
    return ''
  }
}
export default {
  props: {
    form: {
      type: Object,
      required: true
    },
    models: {
      type: Array,
      required: true
    },
    images: {
      type: Array,
      required: true
    },
    package: {
      type: Object,
      required: true
    },
    company: {
      type: Object,
      required: true
    },
    factory: {
      type: Object,
      required: false,
      default: () => { }
    },
    cert: {
      type: Object,
      required: false,
      default: () => { }
    },
    faq: {
      type: Object,
      required: false,
      default: () => { }
    },
    codes: {
      type: Array,
      required: true
    },

  },
  name: 'LeoGoodsAliexpressPreview',
  data() {
    return {
      htmlStr: '',
      sections: [
        {
          label: 'Notice',
          required: true,
          checked: true,
          html: ''
        },
        {
          label: 'Features',
          required: true,
          checked: true,
        },
        {
          label: 'Product Detail',
          checked: true,
          required: true
        },
        {
          label: 'Car Fitment',
          checked: true,
          required: true
        },
        {
          label: 'Product Images',
          checked: true,
          required: false
        },
        {
          label: 'Packing & Delivery',
          checked: true,
          required: true
        },
        {
          label: 'Company',
          checked: true,
          required: false
        },
        {
          label: 'Factory',
          checked: true,
          required: false
        },
        {
          label: 'Cert',
          checked: true,
          required: false
        }
      ],
    }
  },

  created() {
    this.sections[0].html = '<div style="fontFamily:math"></h1><h1>Notice</h1>\n' +
      '        <p>&nbsp;&nbsp;Friends, welcome, before placing an order, please check carefully whether the product you need to buy is correct, If you don\'t know if the product is suitable for your car, you can send the VIN number of your car to customer service for inspection. </p>\n' +
      '        <p> &nbsp;&nbsp;If you have any questions about the product, or if you want to order in large quantities, you can contact me and I will give you the best price. Email: 541124712@qq.com wechat:+8618507568775.</p></div>'

    this.sections[1].html = '<div><h1>Features</h1>\n' +
      '        <p>Revitalize Your Vehicle: Find the Perfect Auto Components</p>\n' +
      '        <div style="   display: flex;  grid-column: auto;">\n' +
      '          <div style=" border: 1px solid ;  min-width: 0; padding: 10px;height: 280px;width: 25%;text-align: center;">\n' +
      '            <img src="https://ae01.alicdn.com/kf/S8b910b280e9a4e01aea2c173b7c98a0bZ.png" alt="" />\n' +
      '            <p>Highest Standards for Safety and Reliability</p>\n' +
      '          </div>\n' +
      '          <div style=" border: 1px solid;\n' +
      '    min-width: 0;\n' +
      '    padding: 10px;height: 280px;width: 25%;text-align: center;">\n' +
      '            <img src="https://ae01.alicdn.com/kf/Sb0cef13e329b4b5a89754b8a97b3a3efR.png" alt="" />\n' +
      '            <p>\n' +
      '              Long-Lasting Brake Pads that Endure the Toughest Driving Conditions\n' +
      '            </p>\n' +
      '          </div>\n' +
      '          <div style=" border: 1px solid ;\n' +
      '    min-width: 0;\n' +
      '    padding: 10px;height: 280px;width: 25%;text-align: center;">\n' +
      '            <img src="https://ae01.alicdn.com/kf/S417cb9d3f9e5459bb10fe728e1045833Q.png" alt="" />\n' +
      '            <p>\n' +
      '              Superior Heat Dissipation: Our Brake Pads Maintain Optimal Performance under Intense\n' +
      '              Braking!\n' +
      '            </p>\n' +
      '          </div>\n' +
      '          <div style=" border: 1px solid ;\n' +
      '    min-width: 0;\n' +
      '    padding: 10px;height: 280px;width: 25%;text-align: center;">\n' +
      '            <img src="https://ae01.alicdn.com/kf/S3f6976653db6442da840d29c838870e7B.png" slate-data-type="image">\n' +
      '            <p>Say Goodbye to Squeaky and Worn-out Pads</p>\n' +
      '          </div>\n' +
      '        </div></div>'


    let detail = ''
    detail = detail + '<h1>Product Detail</h1>\n'
    detail = detail + '<table><tbody>'
    const keys = Object.keys(this.form)
    for (let i = 0; i < keys.length; i++) {
      detail = detail + '<tr><td style="width:400px;background-color:#dbd3d3;border-bottom: 1px solid;">' + getStringNvl(keys[i]) + '</td><td style="width:500px;background-color:#f1f1f1;border-bottom: 1px solid;">' + getStringNvl(this.form[keys[i]]) + '</td></tr>'
    }
    detail = detail + '</tbody></table>'
    this.sections[2].html = detail


    let html = ''
    if (this.codes) {
      html = ' <div><h1>OEM:</h1><table>'
      for (let i = 0; i < this.codes.length;) {
        html = html + '<tr><td style="width:200px">' + getStringNvl(this.codes[i + 0]) + '</td><td style="width:200px">' + getStringNvl(this.codes[i + 1]) + '</td><td style="width:200px">' + getStringNvl(this.codes[i + 2]) + '</td><td style="width:200px">' + getStringNvl(this.codes[i + 3]) + '</td></tr>'
        i = i + 4
      }
      html = html + '</table></div>'
    }

    html = html + ' <div><h1>Car Fitments</h1>\n'
    html = html + '<table><thead style="text-align: left;"><tr><th>Model</th><th>Year</th><th>Engine</th><th>Displacement</th><th>Power</th><th>Type</th></tr></thead>'
    for (let i = 0; i < this.models.length; i++) {
      const obj = this.models[i]
      html = html + '<tr><td>' + obj.model + '</td><td>' + obj.year + '</td><td>' + getStringNvl(obj.engine) + '</td><td>' + getStringNvl(obj.displacement) + '</td><td>' + getStringNvl(obj.power) + '</td><td>' + getStringNvl(obj.type) + '</td></tr>'
    }
    html = html + '</table></div>'
    this.sections[3].html = html


    // this.sections[4].html = this.htmlImages
    let images = '<div id="Product Images" class="section"> <h1>Product Images</h1>'
    for (let i = 0; i < this.images.length; i++) {
      images = '<img src="' + this.images[i].url + '">'
    }
    images = images + '</div>'
    this.sections[4].html = images

    // this.sections[5].html = this.htmlPackingAndDelivery
    let packing = '<div id="Packing & Delivery" class="section">\n' +
      '      <h1>Packing & Delivery</h1>\n' +
      '      <div style="display: flex;">\n' +
      '        <div style="width:50%">\n' +
      '          <img src="' + this.package.cover + '" alt="">\n' +
      '        </div>\n' +
      '        <div style="width: 50%;">\n' +
      '          <p>packageSize:' + this.package.size + '</p>\n' +
      '          <p>weight:' + this.package.weight + '</p>\n' +
      '        </div>\n' +
      '      </div><img src="' + this.package.sizeUrl + '"style="width: 100%;"></div>'
    this.sections[5].html = packing


    // this.sections[6].html = this.htmlCompany
    this.sections[6].html = '<div id="Company" class="section">\n' +
      '      <h1>Company</h1>\n' +
      '      <div style="padding:20px 0;">\n' +
      '        Guangzhou JXT(MDTZ) is a young upcoming company with excellent network to major manufacturers in China\n' +
      '        operating in the field of auto parts.\n' +
      '\n' +
      // "        JXT was founded by Guangzhou BenBenUnion Supply Chain Management Co., Ltd. operating in\n" +
      // "        the RHD & LHD motor vehicles spare parts industry since 2005.\n" +
      // "\n" +
      '        We are constantly looking for new developments and innovations of online shopping for the\n' +
      '        purpose of providing you a unique experience while shopping with us.\n' +
      '\n' +
      '        Why buy from us ?\n' +
      '\n' +
      '        1. JXT established Sales office & Warehouse in Guangzhou to provide better service for\n' +
      '        clients.\n' +
      '\n' +
      '        2. We stock 50,000+ different parts in China . Parts deliver to Guangzhou/Shenzhen Port\n' +
      '        within 7 days after order confirmed. You are benefit from China factory direct price and\n' +
      '        immediate delivery service.\n' +
      '\n' +
      '        3. NO MOQ requested ! No need to buy big volume in one shipment.\n' +
      '\n' +
      '        JXT stands for the highest standards at competitive market prices.\n' +
      '\n' +
      '        We are currently looking for distributors wordwide if you are interested, please add\n' +
      '        WhatsApp: +86 185 0756 8775 or WeChat: +86 185 0756 8775; please email us 541124712@qq.com\n' +
      '      </div>\n' +
      '      <img src="' + this.company.image + '" alt="" style="width:100%" >\n' +
      '    </div>'

    // this.sections[7].html = this.htmlFactory
    let htmlFactory = '<div id="Factory" class="section"></div>'
    htmlFactory = htmlFactory + '<h1>Factory</h1></h1>\n'
    if (this.factory.video) {
      htmlFactory = htmlFactory + '<!-- <video src="' + this.factory.video + '" controls></video> --></video>\n'
    }
    for (let i = 0; i < this.factory.images.length; i++) {
      htmlFactory = htmlFactory + '<img src="' + this.factory.images[i] + '" alt="" style="width:100%">'
    }
    htmlFactory = htmlFactory + '</div>'
    this.sections[7].html = htmlFactory

    // cert
    let cert = '<div id="Cert" class="section"><h1>Cert</h1>'
    for (let i = 0; i < this.cert.images.length; i++) {
      cert = cert + '<img src="' + this.cert.images[i] + '" alt="" style="width:100%">'
    }
    cert = cert + '</div>'
    this.sections[8].html = cert
  },

  methods: {
    handleCopy(text, event) {
      const str = this.html()
      clip(str, event)
    },
    html() {
      let html = ''
      for (let i = 0; i < this.sections.length; i++) {
        if (this.sections[i].checked) {
          html = html + this.sections[i].html
        }
      }
      return html
    }

  }
}
</script>