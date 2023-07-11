<template>
  <div>
    <el-select>
      <el-option v-for="v,k in options" :value="v" :label="k" :key="k" />
    </el-select>
  </div>
</template>
<script>
export default {
  props: {
    options: {
      type: Object,
      required: true
    }
  }
}
</script>
