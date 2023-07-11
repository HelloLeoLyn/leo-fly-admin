<template>
  <el-dialog title="新增任务" :visible.sync="workTaskDialog" width="1000" :before-close="handleClose">
    <el-form ref="dataForm" :rules="rules" :model="task" label-position="left" label-width="120px"
      style="width: 400px; margin-left:50px;">
      <el-form-item label="任务" prop="type">
        <el-select v-model="task.type" v-if="!worKTypeReadonly">
          <el-option v-for="v, k in works_type" :key="k" :label="v" :value="k" />
        </el-select>
        <el-input v-else readonly :value="works_type[task.type]" />
      </el-form-item>
      <el-form-item label="开始日期" prop="start">
        <el-date-picker v-model="task.start" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
          value-format="yyyyMMdd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束日期" prop="end">
        <el-date-picker v-model="task.end" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
          value-format="yyyyMMdd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input type="textarea" v-model="task.description" :rows="3" />
      </el-form-item>
      <el-form-item label="成员" prop="description">
        <el-select v-model="selectedMembers" multiple filterable reserve-keyword :loading="loading"
          :loading-text="'Searching...'" :popper-append-to-body="false" :popper-class="'select-popover'"
          placeholder="Select members" style="width: 200px;">
          <el-option v-for="member in searchResults" :key="member.value" :label="member.label" :value="member.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关联号" prop="referNo">
        <el-input v-model="task.referNo" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">
        Cancel
      </el-button>
      <el-button type="primary" @click="confirm">
        Confirm
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import { works_type } from '@/utils/dict'
export default {
  props: {
    workType: {
      type: [String, Number],
      required: true
    },
    workTaskDialog: {
      type: Boolean,
      required: true,
      default: false
    },
    worKTypeReadonly: {
      type: Boolean,
      default: false
    },
    confirmBtnTxt: {
      type: String,
      default: 'Confirm'
    },
    referNo: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      works_type,
      task: {
        type: '',
        description: '数据采集',
        start: '',
        end: '',
        referNo: ''
      },
      rules: {
        type: [{ required: true }],
        start: [{ length: 8, required: true }],
        end: [{ length: 8, required: true }]
      },
      selectedMembers: [],
      searchResults: [{
        value: 'Beijing',
        label: '北京'
      }, {
        value: 'Shanghai',
        label: '上海'
      }, {
        value: 'Nanjing',
        label: '南京'
      },],
      loading: false
    }
  },
  mounted() {
    this.task.type = this.workType
    this.task.referNo = this.referNo
  },
  methods: {
    handleClose() {
      this.$emit('childCloseDialog', !this.workTaskDialog)
    },
    confirm() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$emit('onWorkDialogConfirm', this.task)
        } else {
          return false
        }
      })
    }
  }
}
</script>