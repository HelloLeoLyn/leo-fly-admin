<template>
  <div class="leo-goods-alibaba-description">
    <el-button type="primary" size="default" @click="visible = !visible">选择图片</el-button>
    <el-dialog title="" :visible.sync="visible" width="80%">
      <ImageSteward v-if="product" @onConfirm="onConfirmcheckedImages" :count="5"
        :product="product"></ImageSteward>
      <span slot="footer">
        <el-button @click="visible = false">Cancel</el-button>
        <el-button type="primary">OK</el-button>
      </span>
    </el-dialog>
    <div style="width: 790px" ref="html" id="html">
      <div ref="first">
        <img v-for="(el, index) in list" :key="index"
          style="display: block; width: 100%; height: auto" :src="el.url" alt=""
          usemap="#_sdmap_7" />
        <img style="display: block; width: 100%; height: auto"
          src="https://cbu01.alicdn.com/img/ibank/O1CN01XPX2Ov1Uhwp0mCrmi_!!2210530712550-0-cib.jpg"
          usemap="#_sdmap_7" />
      </div>
      <table ref="models">
        <tbody>
          <tr v-for="(item, key) in models" :key="key">
            <td>{{ item.model }}</td>
            <td>{{ item.year }}</td>
          </tr>
        </tbody>
      </table>
      <div ref="last">
        <img style="display: block; width: 100%; height: auto"
          src="https://cbu01.alicdn.com/img/ibank/O1CN01txkFmc1UhwolQrtxf_!!2210530712550-0-cib.jpg?__r__=1687242151475"
          alt="" usemap="#_sdmap_9" />
        <img style="display: block; width: 100%; height: auto"
          src="https://cbu01.alicdn.com/img/ibank/O1CN01DuqqSt1UhwolQtF7l_!!2210530712550-0-cib.jpg?__r__=1687242151475"
          alt="" usemap="#_sdmap_11" />
      </div>
    </div>
  </div>
</template>
<script>
import ImageSteward from '@/views/leo-image/components/ImageSteward.vue'
export default {
  components: { ImageSteward },
  props: {
    product: {
      type: Object,
      default: (e) => {
        return e
      }
    },
    value: {
      type: Object,
      default: (e) => {
        return e
      }
    }
  },
  data() {
    return {
      newProduct: null,
      visible: false,
      elements: [
        {
          url: 'https://cbu01.alicdn.com/img/ibank/O1CN01YJx6ZQ1UhwooAiL5R_!!2210530712550-0-cib.jpg'
        },
        {
          url: 'https://cbu01.alicdn.com/img/ibank/O1CN01TXwNmy1Uhwos1BVLP_!!2210530712550-0-cib.jpg'
        },
        {
          url: 'https://cbu01.alicdn.com/img/ibank/O1CN01Hj9YUA1UhwooAiGwu_!!2210530712550-0-cib.jpg'
        },
        {
          url: 'https://cbu01.alicdn.com/img/ibank/O1CN019fkfcu1UhwoulS6Q0_!!2210530712550-0-cib.jpg'
        }
      ],
      list: [],
      models: [],
      description: {
        detailList: [
          {
            id: '0',
            title: '图文详情',
            contentUrl: null,
            content: '<p>1111122224444</p>',
            isRequired: true
          }
        ]
      }
    }
  },
  methods: {
    onConfirmcheckedImages(images) {
      this.list = this.elements.concat(
        images.map((img) => {
          return { url: img.url }
        })
      )
      this.getDescription()
      this.visible = false
    },
    getDescription() {
      let html = '<div style="width: 790px" >'
      for (let index = 0; index < this.list.length; index++) {
        const element = this.list[index]
        html =
          html +
          '<img style="display: block; width: 100%; height: auto" src="' +
          element.url +
          '" usemap="#_sdmap_7"/>'
      }
      html = html + '<table><tbody>'
      for (let index = 0; index < this.models.length; index++) {
        const item = this.models[index]
        html =
          html +
          '<tr><td>' +
          item.model +
          '</td><td>' +
          item.year +
          '</td></tr>'
      }
      html = html + '</tbody></table>'
      html = html + this.$refs.last.outerHtml
      console.log(this.description)
      this.description.detailList[0].content = html
      this.$emit('input', this.description)
    }
  }
}
</script>
