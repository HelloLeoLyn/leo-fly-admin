<template>
  <div>
    <el-row>
      <el-col :span="8">
        <el-select multiple v-model="groupID"  style="width:100%" @change="change">
          <el-option  :label="opt.groupName" :value="opt.id" v-for="opt, key in options"
            :key="key"></el-option>
        </el-select>
      </el-col>
      <el-col :span="12">
        <Category1688Edit class="filter-item" :data="options" />
      </el-col>
    </el-row>

  </div>
</template>
<script>
import { category1688Group, categoryToGroup } from '@/utils/category'
import Category1688Edit from '@/views/leo-alibaba/category/components/Edit.vue'
export default {
  components: { Category1688Edit },
  props: {
    value: {
      type: [String, Number, Array],
      default: (e) => {
        return e
      }
    },
    categoryID: {
      type: [String, Number, Array],
      default: (e) => {
        return e
      }
    }
  },
  data() {
    return {
      category1688AddVisible: false,
      options: category1688Group,
      groupID: []
    }
  },
  created() {
    if (this.value) {
      this.groupID = this.value
    } else if (categoryToGroup[this.categoryID]) {
      this.groupID = [categoryToGroup[this.categoryID]]
      this.$emit('change', this.groupID)
    }
  },
  methods: {
    change(e) {
      console.log(this.groupID);
      this.$emit('change', e)
    }
  }
}
</script>