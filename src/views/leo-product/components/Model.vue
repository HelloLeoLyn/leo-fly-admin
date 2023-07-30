<template>
  <div class="leo-product-model">
    <el-tabs v-model="modelYearName" type="card" tab-position="top" @tab-click="handleModelYearClick">
      <el-tab-pane label="详情" name="all">
        <el-table :data="data">
          <el-table-column :label="$t('autoPart.model')" prop="model"></el-table-column>
          <el-table-column :label="$t('autoPart.year')" prop="year"></el-table-column>
          <el-table-column :label="$t('autoPart.engine')" prop="engine"></el-table-column>
          <el-table-column :label="$t('autoPart.displacement')" prop="Displacement"></el-table-column>
          <el-table-column :label="$t('autoPart.power')" prop="power"></el-table-column>
          <el-table-column :label="$t('autoPart.type')" prop="type"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="Model&Year" name="modelYear">
        <el-button type="danger" v-for="(text, key) in selectedArray" :key="key" icon="el-icon-delete"
          @click="selectedArray.splice(key, 1)">{{ text }}</el-button>
        <el-row v-for="(value, key) in modelYear" :key="key">
          <el-col :span="8">
            <p @mouseup="handleMouseUp">{{ key }}</p>
          </el-col>
          <el-col :span="8">
            <p>{{ value }}</p>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { listToString } from '@/utils/index'
export default {
  props: {
    list: {
      type: Array,
      default: (e) => {
        return e
      }
    }
  },
  watch: {
    list: {
      immediate: true,
      handler(value) {
        // this.store.commit('setData', value);
        this.data = value
      }
    }
  },
  data() {
    return {
      data: null,
      modelYearName: 'all',
      selectedArray: [],
      modelYear: null,
    }
  },
  methods: {
    genrateHtml() {
      let html = '';
      this.data.forEach(item => {
        html = html + '<tr><td>' + item.model + '</td><td>' + item.year + '</td></tr>'
      })
      console.log(html);
    },
    handleMouseUp() {
      const selectedText = window.getSelection().toString();
      if (!this.selectedArray.includes(selectedText)) {
        this.selectedArray.push(selectedText)
      }
      const keys = Object.keys(this.modelYear);
      let years = []
      new Promise((resolve) => {
        for (let key of keys) {
          const value = this.modelYear[key];
          if (key.indexOf(selectedText) >= 0) {
            value.forEach(year => years.push(year))
            delete this.modelYear[key]
          }
        }
        years = new Set(years)
        resolve(years)
      })
      this.modelYear[selectedText] = listToString([...years], '  ')
    },
    handleModelYearClick() {
      this.extractModel()
    },

    extractModel() {
      if (this.modelYear) {
        return
      }
      let list = this.data.map(element => {
        const { model, year } = element
        return { model, year }
      })

      this.modelYear = list.reduce((result, obj) => {
        const key = obj.model
        if (!result[key]) {
          result[key] = []
        }
        if (!result[key].includes(obj.year)) {
          result[key].push(obj.year)
        }

        return result;
      }, {});
    },
  },
}
</script>