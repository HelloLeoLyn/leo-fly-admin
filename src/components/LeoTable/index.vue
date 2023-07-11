<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form v-model="form">
      <el-row type="flex">
        <el-col>
          <leo-form-item v-model="form.field" /><el-button @click="log" />
        </el-col>
        <el-col>
          <leo-form-item v-model="form.field" /><el-button @click="log" />
        </el-col>
      </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import LeoFormItem from './compoents/LeoFormItem.vue'
export default {
  name: 'AutoTable',
  components: { LeoFormItem },
  data() {
    return {
      option: {
        tag: 'el-input'
      },
      form: {
        field: 'a'
      }
    }
  },
  methods: {
    log() {
      console.log(this.form.field)
    }
  }
}
</script>
