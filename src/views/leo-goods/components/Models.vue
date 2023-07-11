<template>
  <div>
    <el-table :data="list">
      <el-table-column :label="$t('autoPart.model')" prop="model"></el-table-column>
      <el-table-column :label="$t('autoPart.year')" prop="year"></el-table-column>
      <el-table-column :label="$t('autoPart.engine')" prop="engine"></el-table-column>
      <el-table-column :label="$t('autoPart.displacement')" prop="Displacement"></el-table-column>
      <el-table-column :label="$t('autoPart.power')" prop="power"></el-table-column>
      <el-table-column :label="$t('autoPart.type')" prop="type"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { listToString } from '@/utils/index'
export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      modelYearName: 'all',
      selectedArray: [],
      modelYear: null,
    }
  },
  methods: {
    genrateHtml() {
      let html = '';
      this.list.forEach(item => {
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
      let list = this.list.map(element => {
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