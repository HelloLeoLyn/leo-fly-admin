<template>
  <div>
    <el-form :model="value" ref="catProp" label-width="180px" :inline="false" size="normal">
      <el-row :gutter="20">
        <el-col :span="12" :offset="0" v-for="option, key in catProp.fields.dataSource" :key="key">
          <el-form-item class="leo-inner-form-item"
            :label="option.label + '[' + option.uiType + ']' + '[' + option.required + ']'"
            :prop="option.name" :rules="option.required ? [{
              required: true,
              message: `请输入${option.label}`,
              trigger: 'blur'
            }] : null" inline-message>
            <template slot="label">
              {{ option.label }}
              <!-- {{ option.label + '[' + option.uiType + ']' }} -->
              <el-button type="text" size="default" @click="showNotice(option)"><i
                  class="el-icon-info" /></el-button>
            </template>
            <el-select v-if="option.uiType == 'select'" v-model="value[option.name]"
              value-key="value" placeholder="" clearable filterable @change="e => handleChange(e)"
              @input="input">
              <el-option v-for="item, key in option.dataSource" :key="key" :label="item.text"
                :value="item">{{ item.text
              }}
              </el-option>
            </el-select>
            <el-input v-else v-model="value[option.name]" @input="input"></el-input>
          </el-form-item></el-col>
      </el-row>
      <el-form-item label="" size="normal">
        <el-button type="primary" @click="submitForm('catProp')">立即创建</el-button>
      </el-form-item>
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
    }
  },
  data() {
    return {
      form: {}
    }
  },

  watch: {
    value(newVal) {
      console.log(newVal + '---------')
    }
  },
  // mounted() {
  //   console.log(this.value)
  // },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('success submit!!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleChange(name) {
      console.log(name)
    },
    input() {
      this.$emit('input', this.value)
    },
    showNotice(item) {
      console.log(item)
    }
  }
}
</script>
<style lang="scss">
.leo-inner-form-item {
  margin-bottom: 40px;
}
</style>