<template>
  <div>
    <el-row>
      <el-col :span="10">
        <el-card>
          <h2>分隔符号</h2>
          <el-checkbox v-for="symbol in delimiters" :key="symbol.key" v-model="symbol.checked">
            {{symbol.label}}</el-checkbox>
          <el-checkbox v-model="specialSymbol.checked">
            {{specialSymbol.label}}<input v-if="specialSymbol.checked"
              v-model="specialSymbol.symbol" style="width:50px" />
          </el-checkbox>
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card>
          <h2>截留</h2>
          <el-checkbox v-for="symbol in cuts" :key="symbol.key" v-model="symbol.checked">
            {{symbol.label}}<input v-if="symbol.checked" v-model="symbol.length"
              style="width:50px" />位
          </el-checkbox>
        </el-card>
      </el-col>
    </el-row>
    <div>
      <el-button @click="preview">预览结果</el-button>
      <!-- <el-button @click="preview">导出结果</el-button> -->
      <el-dropdown @command="handleExport">
        <el-button type="primary">
          导出结果<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="xlsx">excel</el-dropdown-item>
          <el-dropdown-item command="txt">txt</el-dropdown-item>
          <el-dropdown-item command="csv">csv</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div>
      <h2>输入字符串</h2>
      <el-input v-model="str" type="textarea" :rows="10" />
    </div>
    <div>
      <h2>结果</h2>
      <el-table :data="data">
        <el-table-column v-for="i,key in length" :key="i">
          <template slot-scope="{row}">
            <span>{{row[key]}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      filename: '',
      str: '',
      length: 0,
      data: [],
      delimiters: [
        { label: 'Tab键', checked: false, key: 'tab', bz: '\t' },
        { label: '分号', checked: false, key: 'semicolon', bz: ';' },
        { label: '逗号', checked: false, key: 'comma', bz: ',' },
        { label: '空格', checked: false, key: 'space', bz: ' ' },
        { label: '中杆', checked: false, key: 'pole', bz: '-' },
        { label: '下划线', checked: false, key: 'underline', bz: '_' }
      ],
      specialSymbol: { label: '特殊符号', checked: false, symbol: '' },
      cuts: [
        { label: '去除左边', checked: false, key: 'cutLefe', length: 0 },
        { label: '留取左边', checked: false, key: 'KeepLefe', length: 0 },
        { label: '去除右边', checked: false, key: 'cutRight', length: 0 },
        { label: '留取右边', checked: false, key: 'KeepRight', length: 0 },
        {
          label: '根据特殊符号去除左边',
          checked: false,
          key: 'cutSymbolLefe',
          length: 0
        },
        {
          label: '根据特殊符号去除右边',
          checked: false,
          key: 'KeepSymbolLefe',
          length: 0
        },
        {
          label: '根据特殊符号留取左边',
          checked: false,
          key: 'cutSymbolRight',
          length: 0
        },
        {
          label: '根据特殊符号留取右边',
          checked: false,
          key: 'KeepSymbolRight',
          length: 0
        }
      ]
    }
  },
  methods: {
    preview() {
      this.data = []
      const lines = this.str.split('\n')
      lines.forEach((line) => {
        this.delimiters.forEach((symbol) => {
          if (symbol.checked) {
            try {
              const temp = line.split(symbol.bz)
              line = this.listToStrSymbol(temp)
            } catch (error) {}
          }
        })
        const rowList = line.split('symbol')
        const row = []
        rowList.forEach((cell) => {
          if (cell && cell != '') {
            row.push(cell)
          }
        })
        if (this.length < row.length) {
          this.length = row.length
        }
        this.data.push(row)
      })
    },
    listToStrSymbol(list) {
      let str = ''
      list.forEach((o) => {
        str = str + o + 'symbol'
      })
      return str
    },
    handleExport(e) {
      this.handleDownload(e)
    },
    handleDownload(bookType) {
      this.downloadLoading = true
      const tHeader = []
      for (let i = 0; i < this.length; i++) {
        tHeader.push('a' + i)
      }
      import('@/vendor/Export2Excel').then((excel) => {
        const data = this.data
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: bookType
        })
        this.downloadLoading = false
      })
    }
  }
}
</script>