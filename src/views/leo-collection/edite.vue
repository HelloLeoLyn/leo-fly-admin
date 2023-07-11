<template>
  <div>
    <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px"
      style="width: 600px; margin-left:50px;">
      <el-form-item label="id" prop="id">
        <el-input v-model="temp.id" />
      </el-form-item>
      <el-form-item label="categoryId" prop="categoryId">
        <el-select v-model="temp.categoryId" />
      </el-form-item>
      <el-form-item label="name" prop="name">
        <el-input v-model="temp.name" />
      </el-form-item>
      <el-form-item label="weight" prop="weight">
        <el-input v-model="temp.weight" />
      </el-form-item>
      <el-form-item label="width" prop="width">
        <el-input v-model="temp.width" />
      </el-form-item>
      <el-form-item label="height" prop="height">
        <el-input v-model="temp.height" />
      </el-form-item>
      <el-form-item label="length" prop="length">
        <el-input v-model="temp.length" />
      </el-form-item>
      <el-form-item label="unitQuantity" prop="unitQuantity">
        <el-input v-model="temp.unitQuantity" />
      </el-form-item>
      <el-form-item label="unit" prop="unit">
        <el-select v-model="temp.unit" />
      </el-form-item>
      <el-form-item label="color" prop="color">
        <el-checkbox v-model="temp.color" />
      </el-form-item>
      <el-form-item label="brandCode" prop="brandCode">
        <el-input v-model="temp.brandCode" />
      </el-form-item>
      <el-form-item label="images" prop="images">
        <el-input v-model="temp.images" />
      </el-form-item>
      <el-form-item label="keyword" prop="keyword">
        <el-input v-model="temp.keyword" />
      </el-form-item>
      <el-form-item label="refers" prop="refers">
        <el-input v-model="temp.refers" />
      </el-form-item>
      <el-form-item label="purchasePrices" prop="purchasePrices">
        <el-input v-model="temp.purchasePrices" />
      </el-form-item>
      <el-form-item label="salePrices" prop="salePrices">
        <el-input v-model="temp.salePrices" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">
        Cancel
      </el-button>
      <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
        Confirm
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      temp: {
        images: '',
        color: '',
        salePrices: '',
        unit: '',
        refers: '',
        name: '',
        purchasePrices: '',
        keyword: '',
        brandCode: ''
      },
      rules: {}
    }
  }
}
</script>

<style>
</style>