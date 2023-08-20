<template>
  <div>
    <h1>{{ catProp.fields.label }}</h1>
    <h2>{{ catProp.fields.promote }}</h2>
    <el-form :model="value" ref="ruleForm" label-width="220px" :inline="false" size="normal" :rules="rules">
      <el-form-item v-for="option, key in catProp.fields.dataSource" :key="key"
        :rules="option.required ? [{ required: true, message: `请输入${option.label}`, trigger: 'blur' }] : null"
        :prop="option.name">
        <template slot="label">
          {{ option.label }}<el-button type="text" size="default" @click="showNotice(option)"><i
              class="el-icon-bell"></i></el-button>
        </template>
        <el-select v-if="option.uiType == 'select'" v-model="value[option.name]" value-key="text" placeholder="" clearable
          filterable @change="handleChange">
          <el-option v-for="item in option.dataSource" :key="item.value" :label="item.text" :value="item">
          </el-option>
        </el-select>
        <el-input v-else v-model="value[option.name]"></el-input>
      </el-form-item>
      <el-form-item label="" size="normal">
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => { }
    },
    catProp: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      form: {},
      rules: {}
    }
  },

  watch: {
    value(newVal) {
    }
  },

  methods: {
    showNotice(item) {
      console.log(item);
    },
    handleChange() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          console.log('success submit!!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submitForm(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          console.log('success submit!!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>