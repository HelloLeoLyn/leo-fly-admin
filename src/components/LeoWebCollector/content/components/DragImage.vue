<template>
  <div>
    <label>{{headerText}}:</label>
    <el-row :gutter="20" style="background-color: black;">
      <draggable :list="list" v-bind="$attrs" :set-data="setData">
        <el-col :span="4" v-for="element in list" :key="element.id" class="image-item">
          <img :src="element.url" />
        </el-col>
      </draggable>
    </el-row>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'DragKanbanDemo',
  components: {
    draggable,
  },
  props: {
    headerText: {
      type: String,
      default: 'Header'
    },
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    setData(dataTransfer) {
      // to avoid Firefox bug
      // Detail see : https://github.com/RubaXa/Sortable/issues/1012
      dataTransfer.setData('Text', '')
    }
  }
}
</script>
<style lang="scss" scoped>
.image-item {
  border: 1px solid;
  background-color: black;
}
</style>

