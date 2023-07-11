<template>
  <div>
    <el-dropdown>
      <el-badge :is-dot="isDot" class="leo-badge">
          <svg-icon class-name="search-icon " icon-class="message" @click.stop="click" />
        </el-badge>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>私信</el-dropdown-item>
        <el-dropdown-item>任务</el-dropdown-item>
        <el-dropdown-item>公告</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

  </div>
</template>

<script>


export default {
  name: 'HeaderSearch',
  data() {
    return {
      ws: null,
      isDot: false
    }
  },
  created() {
    // 连接WebSocket服务端，然后初始化监听事件
    this.ws = new WebSocket('ws://localhost:8080/websocket/test');
    this.wsInit();
  },
  methods: {
    click() {
      // this.$routes()
      this.isDot = false
    },
    wsInit() {
      this.ws.onopen = () => {
        this.ws.send('服务已连接');
        console.log(this.ws.readyState)
      }
      this.ws.onclose = () => {
        console.log('服务器关闭')
        console.log(this.ws.readyState)
      }
      this.ws.onmessage = (message) => {
        console.log('收到服务器消息')
        console.log(message)
        console.log(this.ws.readyState)
        this.$notify({
          title: '收到服务器消息',
          message: message.data,
          position: 'bottom-right'
        });
        this.isDot = true
      }
      this.ws.onerror = (error) => {
        console.log('报错了')
        console.log(error)
        console.log(this.ws.readyState)
      }
    }
  }
}
</script>

<style lang="scss">
.leo-badge {
  .el-badge__content.is-dot {
    margin-top: 16px;
  }
}
</style>
