<template>
  <div class="leo-product-attributes">
    <el-button type="primary" size="default" @click="handleClick" class="fix">查看车型</el-button>
    <el-dialog title="车型" :visible.sync="visible" width="60%">
      <template slot="title">
        <div>
          <el-input v-model="note" placeholder="" size="normal" clearable @change="" style="width: 80%;"></el-input>
        </div>
      </template>
      <Model :list="model" style="height: 500px;overflow: scroll;"></Model>
      <span slot="footer">
        <el-button @click="visible = false">Cancel</el-button>
        <el-button type="primary" @click="">OK</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Model from './Model.vue';
export default {
  components: { Model },
  props: {
    productId: {
      type: [Number, String],
      default: (e) => {
        return e
      }
    },
    product: {
      type: Object,
      default: (e) => {
        return e
      }
    }
  },
  watch: {
    product(newval) {
      if (newval && newval.model) {
        if (typeof newval.model === 'string') {
          this.model = JSON.parse(newval.model)
        } else {
          this.model = newval.model
        }
      }
    },
    productId(newval) {
      console.log(newval);
    },
  },
  data() {
    return {
      key: {
        model: 0,
      },
      note:'',
      model: null,
      visible: false,
    }
  },
  methods: {
    handleClick() {
      this.visible = !this.visible
    }
  }
}
</script>
<style lang="scss">
.leo-product-attributes {
  .fix {
    position: fixed;
    bottom: 500px;
    right: 0;
    z-index: 1;
    // background-color: rgb(244, 250, 250);
  }
}
</style>