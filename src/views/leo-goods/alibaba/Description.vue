<template>
  <div class="leo-goods-alibaba-description">
    <CheckImage :images="images" @input="handleImageChange"></CheckImage>
    <div style="width: 790px;" ref="html" id="html">
      <img style="display: block; width: 100%; height: auto"
        src="https://cbu01.alicdn.com/img/ibank/O1CN01YJx6ZQ1UhwooAiL5R_!!2210530712550-0-cib.jpg?__r__=1687242151475"
        alt="" usemap="#_sdmap_7" />
      <img style="display: block; width: 100%; height: auto"
        src="https://cbu01.alicdn.com/img/ibank/O1CN01TXwNmy1Uhwos1BVLP_!!2210530712550-0-cib.jpg?__r__=1687242151475"
        alt="" usemap="#_sdmap_12" />
      <img style="display: block; width: 100%; height: auto"
        src="https://cbu01.alicdn.com/img/ibank/O1CN01Hj9YUA1UhwooAiGwu_!!2210530712550-0-cib.jpg?__r__=1687242151475"
        alt="" usemap="#_sdmap_10" />
      <img
        src="https://cbu01.alicdn.com/img/ibank/O1CN019fkfcu1UhwoulS6Q0_!!2210530712550-0-cib.jpg"
        style="display: block; width: 100%; height: auto" />
      <div id="images" ref="images">
        <img v-for="image, key in checkedList" :key="key" style="
            display: block;
            padding: 10px;
            width: 790px;
            height: 790px;
          " :src="image.alibaba" alt="" usemap="#_sdmap_2" />
      </div>
      <img style="display: block; width: 100%; height: auto"
        src="https://cbu01.alicdn.com/img/ibank/O1CN01XPX2Ov1Uhwp0mCrmi_!!2210530712550-0-cib.jpg" />
      <table>
        <tbody>
          <tr v-for="item, key in models" :key="key">
            <td>{{ item.model }}</td>
            <td>{{ item.year }}</td>
          </tr>
        </tbody>
      </table>
      <img style="display: block; width: 100%; height: auto"
        src="https://cbu01.alicdn.com/img/ibank/O1CN01txkFmc1UhwolQrtxf_!!2210530712550-0-cib.jpg?__r__=1687242151475"
        alt="" usemap="#_sdmap_9" />

      <img style="display: block; width: 100%; height: auto"
        src="https://cbu01.alicdn.com/img/ibank/O1CN01DuqqSt1UhwolQtF7l_!!2210530712550-0-cib.jpg?__r__=1687242151475"
        alt="" usemap="#_sdmap_11" />

    </div>
  </div>
</template>
<script>
import { api_goods_templates } from '@/api/leo-goods'
import draggable from 'vuedraggable'
import CheckImage from '@/components/LeoImage/CheckImage'
export default {
  components: { CheckImage, draggable },
  props: {
    value: {
      type: String,
      default: (e) => {
        return e
      }
    },
    images: {
      type: Array,
      default: (e) => {
        return e
      }
    },
    models: {
      type: Array,
      default: (e) => {
        return e
      }
    }
  },
  data() {
    return {
      template: '',
      checkedList: []
    }
  },
  watch: {
    images(newVal) {
      if (newVal) {
        this.checkedList = newVal.filter((img) => img.checked)
        setTimeout(() => {
          console.log(this.$refs['html'].outerHTML)
          this.$emit('input', this.$refs['html'].outerHTML)
        }, 1000)
      }
    }
  },
  methods: {
    getTemplate(params) {
      api_goods_templates(params).then((res) => {
        this.template = res.data
      })
    },
    handleImageChange() {
      this.checkedList = this.images.filter((img) => img.checked)
    },
    getVal() {
      return this.$refs['html'].outerHTML
    }
  }
}
</script>