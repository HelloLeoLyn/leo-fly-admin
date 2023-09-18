<template>
  <div>
    <el-form
      :model="model"
      ref="catProp"
      label-width="180px"
      :inline="false"
      size="normal"
    >
      <el-row :gutter="20">
        <el-col
          :span="12"
          :offset="0"
          v-for="(option, key) in catProp.fields.dataSource"
          :key="key"
        >
          <el-form-item
            class="leo-inner-form-item"
            :label="
              option.label +
              '[' +
              option.uiType +
              ']' +
              '[' +
              option.required +
              ']'
            "
            :prop="option.name"
            :rules="
              option.required
                ? [
                    {
                      required: true,
                      message: `请输入${option.label}`,
                      trigger: 'blur'
                    }
                  ]
                : null
            "
            inline-message
          >
            <template slot="label">
              {{ option.label }}
              <!-- {{ option.label + '[' + option.uiType + ']' }} -->
              <el-button type="text" size="default" @click="showNotice(option)"
                ><i class="el-icon-info"
              /></el-button>
            </template>
            <el-select
              v-if="option.uiType == 'select'"
              v-model="model[option.name]"
              value-key="value"
              placeholder=""
              clearable
              filterable
              @change="e => handleChange(e)"
              @input="input"
            >
              <el-option
                v-for="(item, key) in option.dataSource"
                :key="key"
                :label="item.text"
                :value="item"
                >{{ item.text }}
              </el-option>
            </el-select>
            <el-input
              v-else
              v-model="model[option.name]"
              @input="input"
            ></el-input> </el-form-item
        ></el-col>
      </el-row>
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
  data () {
    return {
      model: {}
    }
  },
  watch: {
    // 监听外部传递的对象变化
    value: {
      handler (newValue) {
        // 将外部传递的对象值更新到内部
        console.log(newValue)
        this.model = Object.assign({}, newValue)
      },
      immediate: true // 立即触发一次，以确保初始化时同步
    },
    // 监听内部对象的变化，并将变化传递给父组件
    catProp: {
      handler (newInternalValue) {
        console.log(newInternalValue)
        this.$emit('input', newInternalValue)
      },
      deep: true // 开启深度监听
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('success submit!!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleChange (name) {
      console.log(name)
    },
    input () {
      this.$emit('input', this.model)
    },
    showNotice (item) {
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