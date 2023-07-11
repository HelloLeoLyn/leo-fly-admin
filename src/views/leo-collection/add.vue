<template>
  <div>
    <el-form ref="dataForm" :rules="rules" :model="product" label-position="left"
      label-width="120px" style="width: 800px; margin-left:50px;">
      <!-- <el-form-item label="id" prop="id">
        <el-input v-model="product.id" />
      </el-form-item> -->

      <el-form-item label="categoryId" prop="categoryId">
        <Category1688 @change="setCategoryID" :value="product.categoryId" v-if="flag" />
      </el-form-item>
      <el-form-item label="产品图">
        <el-upload action="#" list-type="picture-card" :auto-upload="false">
          <i slot="default" class="el-icon-plus" />
          <div slot="file" slot-scope="{ file }">
            <img :src="file.url" alt="" class="el-upload-list__item-thumbnail">
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                <i class="el-icon-zoom-in" />
              </span>
              <span v-if="!disabled" class="el-upload-list__item-delete"
                @click="handleDownload(file)">
                <i class="el-icon-download" />
              </span>
              <span v-if="!disabled" class="el-upload-list__item-delete"
                @click="handleRemove(file)">
                <i class="el-icon-delete" />
              </span>
            </span>
          </div>
        </el-upload>
      </el-form-item>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <el-form-item label="name" prop="name">
        <el-input v-model="product.name" />
      </el-form-item>
      <el-form-item label="weight" prop="weight">
        <el-input v-model="product.weight" />
      </el-form-item>
      <el-form-item label="width" prop="width">
        <el-input v-model="product.width" />
      </el-form-item>
      <el-form-item label="height" prop="height">
        <el-input v-model="product.height" />
      </el-form-item>
      <el-form-item label="length" prop="length">
        <el-input v-model="product.length" />
      </el-form-item>
      <el-form-item label="unitQuantity" prop="unitQuantity">
        <el-input v-model="product.unitQuantity" />
      </el-form-item>
      <el-form-item label="unit" prop="unit">
        <el-input v-model="product.unit" />
      </el-form-item>
      <el-form-item label="color" prop="color">
        <el-checkbox v-model="product.color" />
      </el-form-item>
      <el-form-item label="brandCode" prop="brandCode">
        <el-input v-model="product.brandCode" />
      </el-form-item>
      <el-form-item label="images" prop="images">
        <el-input v-model="product.images" />
      </el-form-item>
      <el-form-item label="keyword" prop="keyword">
        <el-input v-model="product.keyword" />
      </el-form-item>
      <el-form-item label="refers" prop="refers">
        <el-input v-model="product.refers" />
      </el-form-item>
      <el-form-item label="purchasePrices" prop="purchasePrices">
        <leo-table-purchace />
      </el-form-item>
      <el-form-item label="salePrices" prop="salePrices">
        <el-input v-model="product.salePrices" />
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
import Category1688 from '@/views/leo-alibaba/components/Category1688.vue'
import LeoTablePurchace from '@/components/LeoTable/purchace.vue'
export default {
  components: { Category1688, LeoTablePurchace },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      flag: true,
      product: {
        images: '',
        color: '',
        salePrices: '',
        unit: 'piece',
        refers: '',
        name: '',
        purchasePrices: '',
        unitQuantity: '1',
        keyword: '',
        brandCode: ''
      },
      rules: {}
    }
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    setCategoryID(e) {
      console.log(e)
    },
    handleDownload(file) {
      console.log(file)
    },
    handleRemove(file) {
      console.log(file)
    }
  }
}
</script>

<style>
</style>