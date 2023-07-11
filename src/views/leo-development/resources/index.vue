<template>
    <div class="leo-navigation">
        <div class="leo-navigation-sider">
            <div v-for="menu,key in json" style="padding: 10px 0;text-align: center;"><a :href="'#'+key">{{ menu.title }}</a></div>
        </div>
        <div class="leo-navigation-content">
            <div v-for="menu,key in json">
                <el-card class="box-card" :id="key">
                    <div slot="header" class="clearfix">
                        <span>{{ menu.title }}</span>
                    </div>
                    <el-row>
                        <el-col :span="4" v-for="child,key in menu.children" :key="key" style="padding: 5px 0;">
                            <img :src="child.img" style="width:26px;height: 26px;">
                            <a :href="child.url" target="_blank" >{{ child.label }}</a></el-col>
                    </el-row>
                </el-card>
            </div>
        </div>
    </div>
</template>
<script>
const json = require('@/views/leo-development/navigation/data.json');
export default {
  data() {
    return {
      json
    }
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