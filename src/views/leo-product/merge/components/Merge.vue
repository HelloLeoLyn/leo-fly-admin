<template>
  <div class="leo-product-merge">
    <div class="leo-product-merge-sider">
      <el-tabs @tab-click="handleClick" v-model="activeName" tab-position="left">
        <el-tab-pane v-for="(item, index) in menus" :key="index" :name="'tab' + index"
          :class="index == 0 ? 'current' : ''" :label="item.label"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="leo-product-merge-content">
      <div class="section" id="0">
        <el-row :gutter="20">
          <el-col :span="12" :offset="0">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>{{ menus[0].label }}</span>
                <el-checkbox v-model="checked.img0" @change="imgChnage"></el-checkbox>
              </div>
              <img v-for="imageId, key in list[0].images" :key="key"
                :src="'http://localhost:8080/product/image/' + imageId" alt="" style="width: 150px;height: 150px;">
            </el-card>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>{{ menus[0].label }}</span>
                <el-checkbox v-model="checked.img1" label="" @change=""></el-checkbox>
              </div>
              <img v-for="imageId, key in list[1].images" :key="key"
                :src="'http://localhost:8080/product/image/' + imageId" alt="" style="width: 150px;height: 150px;">
            </el-card>
          </el-col>
        </el-row>

      </div>
      <div class="section" id="1">
        <el-row :gutter="20">
          <el-col :span="12" :offset="0">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>{{ menus[1].label }}</span>
                <el-checkbox v-model="checked.code0" label="" @change="codeChnage"></el-checkbox>
              </div>
              <el-col :span="4" v-for="(item, index) in list[0].code" :key="index">
                {{ item }}
              </el-col>
            </el-card>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>{{ menus[1].label }}</span>
                <el-checkbox v-model="checked.code1" label="" @change="codeChnage"></el-checkbox>
              </div>
              <el-col :span="4" v-for="(item, index) in list[1].code" :key="index">
                {{ item }}
              </el-col>
            </el-card>
          </el-col>
        </el-row>

      </div>
      <div class="section" id="2">
        <el-row :gutter="20">
          <el-col :span="12" :offset="0">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>{{ menus[2].label }}</span>
                <el-checkbox v-model="checked.refNo0" @change="refNoChnage"></el-checkbox>
              </div>
              {{ list[0].refNo }}
            </el-card>
          </el-col>
          <el-col :span="12" :offset="0"><el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>{{ menus[2].label }}</span>
                <el-checkbox v-model="checked.refNo1" @change="refNoChnage"></el-checkbox>
              </div>
              {{ list[1].refNo }}
            </el-card></el-col>
        </el-row>
      </div>
      <div class="section" id="3">
        <el-row :gutter="20">
          <el-col :span="12" :offset="0">
            <el-card class="box-card" id="1">
              <div slot="header" class="clearfix">
                <span>{{ menus[3].label }}</span>
                <el-checkbox v-model="checked.model0" @change="modelChange"></el-checkbox>
              </div>
              <el-table v-if='list[0].model' :data="JSON.parse(list[0].model)">
                <el-table-column :label="$t('autoPart.model')" prop="model"></el-table-column>
                <el-table-column :label="$t('autoPart.year')" prop="year"></el-table-column>
                <!-- <el-table-column :label="$t('autoPart.engine')" prop="engine"></el-table-column> -->
                <el-table-column :label="$t('autoPart.displacement')" prop="Displacement"></el-table-column>
                <el-table-column :label="$t('autoPart.power')" prop="power"></el-table-column>
                <el-table-column :label="$t('autoPart.type')" prop="type"></el-table-column>
              </el-table>
            </el-card></el-col>
          <el-col :span="12" :offset="0">
            <el-card class="box-card" id="1">
              <div slot="header" class="clearfix">
                <span>{{ menus[3].label }}</span>
                <el-checkbox v-model="checked.model1" @change="modelChange"></el-checkbox>
              </div>
              <el-table v-if='list[1].model' :data="JSON.parse(list[1].model)">
                <el-table-column :label="$t('autoPart.model')" prop="model"></el-table-column>
                <el-table-column :label="$t('autoPart.year')" prop="year"></el-table-column>
                <!-- <el-table-column :label="$t('autoPart.engine')" prop="engine"></el-table-column> -->
                <el-table-column :label="$t('autoPart.displacement')" prop="Displacement"></el-table-column>
                <el-table-column :label="$t('autoPart.power')" prop="power"></el-table-column>
                <el-table-column :label="$t('autoPart.type')" prop="type"></el-table-column>
              </el-table>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div class="section">
        <el-card class="box-card" id="1">
          <div slot="header" class="clearfix">
            <span>{{ menus[4].label }}</span>
          </div>
          <el-radio-group v-model="info.weight" @change="">
            <el-radio :label="list[0].weight"></el-radio>
            <el-radio :label="list[1].weight"></el-radio>
          </el-radio-group>
        </el-card>
      </div>
      <div class="section">
        <el-card class="box-card" id="1">
          <div slot="header" class="clearfix">
            <span>{{ menus[4].label }}</span>
          </div>
          <el-radio-group v-model="info.packageSize" @change="">
            <el-radio :label="list[0].packageSize"></el-radio>
            <el-radio :label="list[1].packageSize"></el-radio>
          </el-radio-group>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: (e) => {
        return e
      }
    }
  },
  data() {
    return {
      menus: [
        {
          'label': '图片',
        }, {
          'label': 'oe',
        }, {
          'label': 'refNo',
        }, {
          'label': 'model',
        }, {
          'label': 'others',
        }],
      activeName: 'tab0',
      checked: {
        img0: true,
        img1: true,
        code0: true,
        code1: true,
        refNo0: true,
        refNo1: false,
        model0: true,
        model1: false,
      },
      info: {
        model: '',
        code: [],
        refNo: [],
        images: [],
        weight: '',
        packageSize: ''
      }
    }
  },
  created() {
    this.info.images = this.list[0].images.concat(this.list[1].images)
    this.info.code = this.list[0].code.concat(this.list[1].code)
    this.info.refNo = [...this.list[0].refNo]
    this.info.model = JSON.stringify(this.list[0].model)
    if (this.list[0].weight) {
      this.info.weight = this.list[0].weight
      this.$set(this.info, 'weight', this.list[0].weight)
    } else {
      this.$set(this.info, 'weight', this.list[1].weight)
    }
    if (this.list[0].packageSize) {
      this.$set(this.info, 'packageSize', this.list[0].packageSize)
    } else {
      this.$set(this.info, 'packageSize', this.list[1].packageSize)
    }
  },
  methods: {
    imgChnage() {
      this.info.images = []
      if (this.checked.img0) {
        this.info.images = this.list[0].images
      }
      if (this.checked.img1) {
        this.info.images = this.info.images.concat(this.list[1].images)
      }
    },
    codeChnage() {
      this.info.code = []
      if (this.checked.code0) {
        this.info.code = this.list[0].code
      }
      if (this.checked.code1) {
        this.info.code = this.info.code.concat(this.list[1].code)
      }
    },
    refNoChnage() {
      this.info.refNo = []
      if (this.checked.refNo0) {
        this.info.refNo = this.list[0].refNo
      }
      if (this.checked.refNo1) {
        this.info.refNo = this.info.code.concat(this.list[1].refNo)
      }
    },
    modelChange() {
      this.info.model = ''
      if (this.checked.model0) {
        this.info.model = this.list[0].model
      }
      if (this.checked.model1) {
        this.info.model = this.list[1].model
      }
    },
    weightChange() {
      this.info.weight = ''
      if (this.checked.model0) {
        this.info.weight = this.list[0].weight
      }
      if (this.checked.model1) {
        this.info.weight = this.list[1].weight
      }
    },
    handleClick(tab) {
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
<style lang="scss" scoped>
.leo-product-merge {
  background: unset;
  width: 100%;
  padding: 20px;
  display: flex;

  &-sider {
    padding-top: 20px;
    width: 180px;
    position: relative;
    float: right;
    position: fixed;
    right: 0;
    z-index: 1;
  }

  &-content {
    flex: 1;
  }

  .box-card {
    min-width: 600px;
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>