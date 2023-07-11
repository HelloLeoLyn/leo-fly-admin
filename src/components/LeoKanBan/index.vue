<template>
  <div class="board-column">
    <div class="board-column-header">
      {{ headerText }}
    </div>
    <draggable :list="list" v-bind="$attrs" :class="options.class" :ref="headerText"
      :set-data="setData" @add="onAdd">
      <div v-for="element in list" :key="element.id" class="board-item">
        <el-row>
          <el-col :span="12" class="leo-col-left">
            <span>{{element.id}}</span>:{{works_type[element.type]}}
          </el-col>
          <el-col :span="12" class="leo-col-right">状态[<span>{{work_status[element.status]}}</span>]
          </el-col>
        </el-row>
        <div style="height:60px">
          {{element.description}}
        </div>
        <el-row>
          <el-col :span="5">
            <el-dropdown>
              <span class="el-dropdown-link">
                成员:<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="3" v-for="menber in element.menbers" :key="menber">
            <a>{{menber.name}}</a>
          </el-col>
          <el-col v-if="element.menbers&&element.menbers.length>5" :span="3">
            <a>...</a>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">{{element.start}}</el-col>
          <el-col :span="12" class="leo-col-right">{{element.end}}</el-col>
        </el-row>
        <el-link v-if="element.refNo" :src="element.refNo">{{element.refNo}}</el-link>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { api_work_put } from '@/api/leo-work'
import { works_type, work_status } from '@/utils/dict'
export default {
  name: 'LeoDragKanban',
  components: {
    draggable
  },
  data() {
    return {
      works_type,
      work_status
    }
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
    onAdd(e) {
      // console.log(e)
      // console.log(e.from.className, e.to.className, e.clone.innerText)
      const id = e.clone.innerText.split(':')[0]
      let status = 0
      if ('to-do-content' == e.to.className) {
        status = 10
      } else if ('working-content' == e.to.className) {
        status = 20
      } else if ('done-content' == e.to.className) {
        status = 90
      } else if ('fail-content' == e.to.className) {
        status = 70
      }
      const work = { id, status }
      api_work_put(work).then(() => {
        const index = this.list.findIndex((item) => {
          return item.id == id
        })
        this.list[index].status = status
        this.$notify({
          title: 'Success',
          message: 'Created Successfully',
          type: 'success',
          duration: 2000
        })
      })
    },
    setData(dataTransfer) {
      dataTransfer.setData('Text', '')
    }
  }
}
</script>
<style lang="scss" scoped>
.leo-col-right {
  text-align: right;
  span {
    color: crimson;
  }
}
.board-column {
  width: 400px;
  min-height: 100px;
  height: auto;
  overflow: hidden;
  background: #f0f0f0;
  border-radius: 3px;

  .board-column-header {
    height: 50px;
    line-height: 50px;
    overflow: hidden;
    padding: 0 20px;
    text-align: center;
    background: #333;
    color: #fff;
    border-radius: 3px 3px 0 0;
  }

  .to-do-content,
  .working-content,
  .done-content,
  .fail-content {
    height: auto;
    overflow: hidden;
    border: 10px solid transparent;
    min-height: 60px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;

    .board-item {
      cursor: pointer;
      width: 100%;
      min-height: 160px;
      margin: 5px 0;
      background-color: #fff;
      text-align: left;
      line-height: 30px;
      padding: 5px 10px;
      box-sizing: border-box;
      box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
    }
  }
}
</style>

