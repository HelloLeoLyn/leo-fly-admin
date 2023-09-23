<template>
  <div>
    <el-button :type="type" size="default" @click="handleClick" :size="size">{{
      $t('common.tag')
    }}</el-button>
    <el-dialog title="" :visible.sync="visible" width="80%" :append-to-body="true"
      :modal-append-to-body="false">
      <div>
        <template v-for="(item, index) in tags">
          <el-button :key="index" v-if="item.checked" plain type="warning"
            @click="handleTagClick(index)">{{ item.name }}</el-button>
          <el-button :key="index" v-else plain type="primary"
            @click="handleTagClick(index)">{{ item.name }}</el-button>
        </template>
      </div>
      <span slot="footer">
        <el-button @click="visible = false">Cancel</el-button>
        <el-button type="primary" @click="onConfirm">OK</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { api_tag_page } from '@/api/leo-tag'
export default {
  props: {
    productId: {
      type: [String, Number],
      default: (e) => {
        return e
      }
    },
    type: {
      type: [String],
      default: (e) => {
        return e
      }
    },
    size: {
      type: String,
      default: (e) => {
        return e
      }
    },
    tagIdList: {
      type: Array,
      default: (e) => {
        return e
      }
    }
  },
  watch: {
    productId: {
      handler(val) {
        if (val) {
          if (!this.tagIdList) {
            // this.$message.error('tagIdList is require')
          }
        }
      }
    },
    tagIdList: {
      handler(val) {
        if (val) {
          if (!this.productId) {
            this.$message.error('productId is require')
          }
        }
      }
    }
  },
  methods: {
    handleClick() {
      this.visible = !this.visible
    },
    onConfirm() {
      const checkedList = this.tags.filter((t) => t.checked)
      this.$emit('onConfirm', checkedList)
      this.visible = !this.visible
    },
    handleTagClick(index) {
      // this.tags[index].checked = !this.tags[index].checked
      this.$set(this.tags[index], 'checked', !this.tags[index].checked)
    }
  },
  data() {
    return {
      visible: false,
      tags: [],
      query: {
        current: 1,
        size: 10
      }
    }
  },
  created() {
    api_tag_page(this.query).then(({ data }) => {
      this.tags = data.records
    })
  }
}
</script>
