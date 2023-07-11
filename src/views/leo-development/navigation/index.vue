<template>
    <div class="leo-navigation">
        <div class="leo-navigation-sider">
            <el-tabs @tab-click="handleClick" v-model="activeName" tab-position="left">
                <el-tab-pane :name="'tab' + index" :class="index == 0 ? 'current' : ''" v-for="(item, index) in json"
                    :key="index" :label="item.title"></el-tab-pane>
            </el-tabs>
        </div>
        <div class="leo-navigation-content">
            <div class="section" v-for="(item, index) in json" :key="index"
                >
                <div><el-card class="box-card" :id="key">
                        <div slot="header" class="clearfix">
                            <span>{{ item.title }}</span>
                        </div>
                        <el-row>
                            <el-col :span="4" v-for="child, key in item.children" :key="key" style="padding: 5px 0;">
                                <img :src="child.img" style="width:26px;height: 26px;">
                                <a :href="child.url" target="_blank" style="font-size: 12px;color: gray;padding-left: 5px;">{{ child.label }}</a></el-col>
                        </el-row>
                    </el-card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
const json = require('@/views/leo-development/navigation/data.json');
export default {
  data() {
    return {
      json,
      activeName: 'tab0',
      scroll: ''
    }
  },
  methods: {
    handleClick(tab) {
      console.log(tab.index)
      this.jump(tab.index)
    },
    dataScroll() {
      this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
    },
    jump(index) {
      let jump = document.getElementsByClassName('section');
      // 获取需要滚动的距离
      let total = jump[index].offsetTop;
      // Chrome
      document.body.scrollTop = total;
      // Firefox
      document.documentElement.scrollTop = total;
      // Safari
      window.pageYOffset = total;
      // $('html, body').animate({
      // 'scrollTop': total
      // }, 400);
    },
    // 用循环的方式将每个标题离顶部的距离与滚动条当前位置对比来确定哪个标题需要变为高亮
    loadScroll: function () {
      let self = this;
      let sections = document.getElementsByClassName('section');
      for (let i = sections.length - 1; i >= 0; i--) {
        if (self.scroll >= sections[i].offsetTop - 100) {
          // 我在上面规定了每个el-tab-pane标签的name属性值为tab+该标签的index值
          self.activeName = 'tab' + i
          break;
        }
      }
    }
  }, watch: {
    // 监听scroll变量，只要滚动条位置变化就会执行方法loadScroll
    scroll: function () {
      this.loadScroll()
    }
  },
  mounted() {
    // scroll代表滚动条距离页面顶部距离
    window.addEventListener('scroll', this.dataScroll);
  }
}
</script>
<style lang="scss">
.leo-navigation {
    background: unset;
    width: 100%;
    padding: 20px;
    display: flex;

    &-sider {
        padding-top: 20px;
        width: 180px;
        position: relative;
        float: left;
        position: fixed;
    }

    &-content {
        padding-left: 180px;
        flex: 1;
    }

    .box-card {
        min-width: 600px;
        width: 100%;
        margin-bottom: 20px;
    }
}
</style>