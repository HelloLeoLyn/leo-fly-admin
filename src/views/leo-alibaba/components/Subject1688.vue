<template>
  <div class="block">
    <el-input v-model="subject" placeholder="请输入subject" :maxlength="60" :style="{width: '100%'}"
      @change="change" show-word-limit>
      <el-button slot="append" @click="setSubject">set</el-button>
    </el-input>
    <el-dialog :visible.sync="dialogVisible">
      <el-form>
        <el-form-item label="产品名">
          {{product.name}}
        </el-form-item>
        <el-form-item label="原标题">
          {{product.subject}}
        </el-form-item>
        <el-form-item label="新标题">
          <el-input v-model="subject" type="textarea" placeholder="请输入subject" :maxlength="60"
            :style="{width: '100%'}" show-word-limit>

          </el-input>
        </el-form-item>
        <el-button  @click="onConfrimSetSubject">confirm</el-button>
        <el-row :gutter="5">
          <el-col :span="3" v-for="code,key in product.code" :key="key">{{code}}</el-col>
        </el-row>
        <el-form-item label="model">
          <p v-for="model,key in JSON.parse(product.model)" :key="key">{{model.model}}</p>
        </el-form-item>
        <div v-if="product.jsonList&&product.jsonList.length>0">
          {{product.jsonList[0].json.base}}
        </div>

      </el-form>
    </el-dialog>
  </div>
</template>
<script>
// import { listToString } from '@/utils'
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialogVisible: false,
      codeList: [],
      subject: ''
    }
  },
  created() {
    this.subject = this.srcSubject
  },
  methods: {
    sugest(num) {
      return num
    },
    change() {
      this.$emit('change', this.subject)
    },
    setSubject() {
      this.dialogVisible = !this.dialogVisible
    },
    onConfrimSetSubject() {
      this.change()
    }
  }
}
</script>