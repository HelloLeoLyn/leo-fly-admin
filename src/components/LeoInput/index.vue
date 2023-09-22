<template>
  <div>
    <el-input
      v-model="content"
      placeholder=""
      size="normal"
      clearable
      @change="counter(content, maxLength)"
      @keyup.native="counter(content, maxLength)"
    >
      <template slot="append" v-if="showWordLimit">
        <div>{{ currentLgt }}/{{ maxLength }}</div>
      </template>
    </el-input>
  </div>
</template>
<script>
export default {
  props: {
    maxLength: {
      type: Number,
      default: e => {
        return e
      }
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Number, String],
      default: e => {
        return e
      }
    }
  },
  data () {
    return {
      content: null,
      currentLgt: 0
    }
  },
  watch: {
    maxLength: {
      handler (val) {
        console.log(val)
      }
    },
    value: {
      handler (val) {
        this.content = val
        this.counter(this.content, this.maxLength)
      }
    }
  },
  methods: {
    counter (value) {
      // 中文、中文标点、全角字符按1长度，英文、英文符号、数字按0.5长度计算
      let cnReg = /([\u4e00-\u9fa5]|[\u3000-\u303F]|[\uFF00-\uFF60])/
      let length = 0
      let strArr = value.split('')
      strArr.map(str => {
        if (cnReg.test(str)) {
          // 中文
          length += 2
        } else {
          // 英文
          length++
        }
      })
      this.currentLgt = length
      this.$emit('input', value)
    }
  }
}
</script>
