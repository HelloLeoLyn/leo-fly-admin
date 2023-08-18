<template>
  <div>
    <h1>{{ catProp.fields.label }}</h1>
    <h2>{{ catProp.fields.promote }}</h2>
    <el-form :model="form" ref="form" :rules="rules" label-width="220px" :inline="false"
      size="normal">
      <div v-for="option,key in catProp.fields.dataSource" :key="key">
        <el-form-item v-if="option.uiType=='select'" :label="option.label+'['+option.uiType+']'"
          :prop="option.name">
          <el-select v-model="form[option.name]" value-key="" placeholder="" clearable filterable
            @change="handleChange(option.name)">
            <el-option v-for="item in option.dataSource" :key="item.value" :label="item.text"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-else :label="option.label+'['+option.uiType+']'" :prop="option.name">
          <el-input v-model="form[option.name]"></el-input>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    catProp: {
      type: Object,
      required: true
    },
    rules: {}
  },
  data() {
    return {
      form: {}
    }
  },

  watch: {
    catProp(newVal) {
      if (newVal) {
        setTimeout(() => {
          console.log(newVal)
        }, 1000)
      }
    }
  },
  created() {
    this.catProp.fields.dataSource.forEach((element) => {
      console.log(element)
      this.form[element.name] = null
      this.rules = null
    })
    this.initFormRules()
  },
  mounted() {
    this.initFormRules()
  },
  methods: {
    handleChange(name) {
      console.log(name)
    },
    initFormRules() {
      for (let i = 0; i < this.catProp.fields.dataSource.length; i++) {
        const item = this.catProp.fields.dataSource[i]
        if (item.required == true) {
          this.$set(this.rules, item.name, [
            {
              required: true,
              message: `请输入value${item.label}`,
              trigger: 'blur'
            }
          ])
        }
      }
    }
  }
}
</script>