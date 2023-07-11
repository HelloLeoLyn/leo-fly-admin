<template>
  <div>
    <div>
      <el-button @click="dialogVisible = true" :type="type" :class="iconClass" :size="size">
        {{content}}
      </el-button>
    </div>
    <el-dialog title="Reset" :visible.sync="dialogVisible" :center="false" :modal="false">
      <el-form label-width="180px">
        <el-form-item label="json">
          <el-checkbox v-model="obj.json">勾选表示删除json表中数据</el-checkbox>
        </el-form-item>
        <el-form-item label="image">
          <el-checkbox v-model="obj.image">勾选表示删除image表中数据</el-checkbox>
        </el-form-item>
        <el-form-item label="oe">
          <el-checkbox v-model="obj.oe">勾选表示删除attribute表中oe数据</el-checkbox>
        </el-form-item>
        <el-form-item label="refNo">
          <el-checkbox v-model="obj.refNo">勾选表示删除attribute表中refNo数据</el-checkbox>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button style="margin:0 0 20px 20px;" type="primary" icon="el-icon-document"
          @click="execute">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { api_product_reset } from '@/api/leo-product'
export default {
  name: 'Reset',
  props: {
    id: {
      type: [Number, String],
      required: true
    },
    type: {
      type: String,
      default: () => {
        return 'primary'
      }
    },
    iconClass: {
      type: String,
      default: () => {
        return 'el-icon-refresh'
      }
    },
    content: {
      type: String,
      default: () => {
        return 'Reset/Clear'
      }
    },
    size: {
      type: String,
      default: () => {
        return 'medium'
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      obj: {
        json: true,
        refNo: false,
        oe: false,
        image: true
      }
    }
  },
  mounted() {
    this.obj.id = this.id
  },
  methods: {
    execute() {
      api_product_reset(this.obj).then((res) => {
        this.dialogVisible = false
        this.$notify.success(res.msg)
      })
    }
  }
}
</script>
