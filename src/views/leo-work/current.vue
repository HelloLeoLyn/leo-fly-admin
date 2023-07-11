<template>
  <div class="app-container">
    <el-divider>
      <el-date-picker v-model="current_day" value-format="yyyyMMdd" :format="$t('format.yyyyMMdd')"
        @change="getWorkTask" clearable />
    </el-divider>
    <div class="components-container board">
      <LeoKanBan :key="1" :list="to_do_list" :group="group" class="kanban todo"
        :header-text="$t('common.todo')" :options="to_do_options" />
      <LeoKanBan :key="2" :list="working_list" :group="group" class="kanban working"
        :header-text="$t('common.working')" :options="working_options" />
      <LeoKanBan :key="3" :list="done_list" :group="group" class="kanban done"
        :header-text="$t('common.done')" :options="done_options" />
      <LeoKanBan :key="4" :list="fail_list" :group="group" class="kanban fail"
        :header-text="$t('common.fail')" :options="fail_options" />
    </div>
  </div>

</template>
<script>
import LeoKanBan from '@/components/LeoKanBan'
import { api_work_date_get } from '@/api/leo-work'
import { parseTime } from '@/utils/index'
export default {
  name: 'LeoWorkCurrent',
  components: {
    LeoKanBan
  },
  data() {
    return {
      to_do_options: {
        class: 'to-do-content'
      },
      working_options: {
        class: 'working-content'
      },
      done_options: {
        class: 'done-content'
      },
      fail_options: {
        class: 'fail-content'
      },
      group: 'mission',
      current_day: null,
      to_do_list: [],
      working_list: [],
      done_list: [],
      fail_list: []
    }
  },
  created() {
    this.current_day = parseTime(new Date(), '{y}{m}{d}')
    this.getWorkTask()
  },
  methods: {
    getWorkTask() {
      api_work_date_get(this.current_day).then((res) => {
        this.to_do_list = res.data.filter((f) => {
          return f.status == 0 || f.status == 10
        })
        this.working_list = res.data.filter((f) => {
          return f.status == 20 || f.status == 30
        })
        this.done_list = res.data.filter((f) => {
          return f.status == 40 || f.status == 90
        })
        this.fail_list = res.data.filter((f) => {
          return f.status == 50 || f.status == 60 || f.status == 70
        })
      })
    }
  }
}
</script>
<style lang="scss">
.board {
  width: 100%;
  margin-left: 20px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: flex-start;
}
.kanban {
  &.todo {
    .board-column-header {
      background: #4a9ff9;
    }
  }
  &.working {
    .board-column-header {
      background: #f9944a;
    }
  }
  &.done {
    .board-column-header {
      background: #2ac06d;
    }
  }
  &.fail {
    .board-column-header {
      background: #e90e0e;
    }
  }
}
</style>

