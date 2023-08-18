<template>
  <div class="app-container">
    <el-form label-width="130px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="表名" prop="name">
            <el-select v-model="tableName" placeholder="请选择活动区域" @change="tableChange">
              <el-option v-for="table in tables" :key="table.name" :label="table.name"
                :value="table.name" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型">
            <el-select v-model="projectType" @change="projectTypeChange">
              <el-option label="module" value="module" />
              <el-option label="package" value="package" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="java项目名称">
            <el-input placeholder="请输入内容" v-model="dataForm.javaProjectName" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="java项目路径">
            <el-input placeholder="请输入内容" v-model="dataForm.javaProjectPath" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="projectType=='module'" label="java模块名称">
            <el-input placeholder="请输入内容" v-model="dataForm.javaModuleName" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="projectType=='module'" label="java模块路径">
            <el-input placeholder="请输入内容" v-model="dataForm.javaModulePath" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="java包名称">
            <el-input placeholder="请输入内容" v-model="dataForm.javaPackageName" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="java包路径">
            <el-input placeholder="请输入内容" v-model="dataForm.javaPackagePath" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="vue工程名称">
            <el-input v-model="dataForm.vueProjectName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="vue工程路径">
            <el-input v-model="dataForm.vueProjectPath"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="vue模块名称">
            <el-input v-model="dataForm.vueModuleName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="vue模块路径">
            <el-input v-model="dataForm.vueModulePath"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="vue模块主文件">
            <el-input v-model="dataForm.vueModuleFileName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="已选择生成的文件">
        <el-row>
          <el-col :span="6" v-for="item in fileList" :key="item.key">
            <el-checkbox v-model="item.checked" :disabled="item.disable">{{item.key}}</el-checkbox>
          </el-col>
        </el-row>
      </el-form-item>

    </el-form>
    <el-table class="leo-column-btn" :header-row-style="{'font-size': 'small'}"
      header-align="center" :data="fields" border :highlight-current-row="true">
      <el-table-column label="dbKey" prop="dbKey" />
      <el-table-column label="inTable">
        <template slot="header" slot-scope="">
          <span>table</span>
          <el-button type="text" size="small" @click="handleCheckAllChange('inTable')">全选
          </el-button>
          <el-button type="text" size="small" @click="reverseCheck('inTable')">反选</el-button>
        </template>
        <template slot-scope="{row}">
          <el-checkbox v-model="row.inTable" />
        </template>
      </el-table-column>
      <el-table-column label="inTable">
        <template slot="header" slot-scope="">
          <span>query</span>
          <el-button type="text" size="small" @click="handleCheckAllChange('inQuery')">全选
          </el-button>
          <el-button type="text" size="small" @click="reverseCheck('inQuery')">反选</el-button>
        </template>
        <template slot-scope="{row}">
          <el-checkbox v-model="row.inQuery" />
        </template>
      </el-table-column>
      <el-table-column label="inAdd">
        <template slot="header" slot-scope="">
          <span>add</span>
          <el-button type="text" size="small" @click="handleCheckAllChange('inAdd')">全选
          </el-button>
          <el-button type="text" size="small" @click="reverseCheck('inAdd')">反选</el-button>
        </template>
        <template slot-scope="{row}">
          <el-checkbox v-model="row.inAdd" />
        </template>
      </el-table-column>
      <el-table-column label="inTable">
        <template slot="header" slot-scope="">
          <span>update</span>
          <el-button type="text" size="small" @click="handleCheckAllChange('inUpdate')">全选
          </el-button>
          <el-button type="text" size="small" @click="reverseCheck('inUpdate')">反选</el-button>
        </template>
        <template slot-scope="{row}">
          <el-checkbox v-model="row.inUpdate" />
        </template>
      </el-table-column>
      <el-table-column label="htmlTag" prop="htmlTag" width="140">
        <template slot-scope="{row}">
          <el-select v-model="row.htmlTag">
            <el-option v-for="item,key in htmlTag" :label="item.label" :key="key"
              :value="item.key" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="javaKey" prop="javaKey" />
      <el-table-column label="javaType" prop="javaType" />
      <el-table-column label="isNullable">
        <template slot-scope="{row}">
          <el-checkbox v-model="row.isNullable" disabled />
        </template>
      </el-table-column>
      <el-table-column label="isPk">
        <template slot-scope="{row}">
          <el-checkbox v-model="row.isPk" disabled />
        </template>
      </el-table-column>
      <el-table-column label="columnType" prop="columnType" />
      <el-table-column label="comment" prop="comment" />
    </el-table>

    <el-button type="primary" @click="generateCode">生成代码</el-button>
    <el-button type="primary" @click="onGenerateJson()">generateJson</el-button>
    <el-dialog :visible.sync="generateDialogVisible" title="代码生成" width="80%"
      v-if="generateDialogVisible">
      <el-table v-if="params.files.length>0" :data="params.files" border>
        <el-table-column v-for="key in Object.keys(params.files[0])" :key="key" :label="key">
          <template slot-scope="{row}">
            <span v-if="key!=='overwrite'">{{row[key]}}</span>
            <div v-else>
              <el-checkbox v-if="row.exists" v-model="row.overwrite" />
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer">
        <el-button @click="onConfirmGenerate()">Confirm</el-button>

      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss">
.item {
  margin-top: 10px;
  margin-right: 60px;
}
.demo-modelForm {
  .el-form-item {
    width: 800px;
  }
  .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
    background-color: #d32876;
    border-color: #dcdfe6;
  }
}
.leo-column-btn {
  .el-button {
    padding: 0;
    margin-left: 2px;
  }
  th > .cell {
    padding-left: 0px;
    padding-right: 0px;
  }
}
</style>
<script>
import { htmlTag } from '@/utils/html'
import { api_table_list, api_table_info } from '@/api/leo-table'
import { exists } from '@/api/leo-file'
import { javaProjectPath, vueProjectPath } from '@/api/local-setting'
const constant = {
  javaProjectName: 'leo-fly',
  javaProjectPath,
  javaSource: '/src/main/java',
  vueProjectPath,
  vueProjectName: 'vue-element-admin',
  javaBasePackage: 'com.leo.fly.db'
}

import { api_system_setting_get } from '@/api/leo-system-setting'
import {
  fileTabs,
  getModuleByTableName,
  getPackageByTableName,
  getNameByTableName
} from './auto-code'
import { toHump, getJavaType, getHtmlTag } from '@/utils/index'
import { api_auto_code_generate } from '@/api/leo-auto-code'
export default {
  data() {
    return {
      temp: 60000,
      tableName: '',
      projectType: 'package',
      dataForm: {
        name: '',
        javaProjectName: '',
        javaProjectPath: '',
        javaModuleName: '',
        javaModulePath: '',
        javaPackageName: '',
        javaPackagePath: '',
        vueProjectPath: '',
        vueProjectName: '',
        vueModuleName: '',
        vueModulePath: '',
        vueModuleFileName: ''
      },
      generateDialogVisible: false,
      fileList: [],
      htmlTag,
      i: 0,
      tables: [],
      fields: [],
      lombokModel: true,
      fileTabs: fileTabs,
      overwrite: false,
      files: [],
      params: {
        currentIndex: 0
      }
    }
  },
  created() {
    this.fileList = this.fileTabs.keys.map((m) => {
      return { key: m, checked: true, disable: false }
    })
    api_table_list({ schema: 'leo_fly' }).then((res) => {
      api_system_setting_get('LEO_AUTO_CODE_EXISTS_MODULES').then((exists) => {
        this.tables = []
        res.data.forEach((table) => {
          const temp_list = JSON.parse(exists.data.value)
          const index = temp_list.findIndex((key) => {
            return key == table.name
          })
          if (index == -1) {
            this.tables.push({ name: table.name })
          }
        })
      })
    })
  },
  methods: {
    projectTypeChange() {
      if (this.tableName == '') {
        return
      }
      if (this.projectType == 'package') {
        this.fileList.forEach((item) => {
          if (item.key == 'pom') {
            item.disable = true
            item.checked = false
          }
        })
      }
      this.setProps(this.tableName, this.projectType)
    },
    tableChange() {
      this.getTableData()
      if (this.projectType == '') {
        return
      }
      if (this.projectType == 'package') {
        this.fileList.forEach((item) => {
          if (item.key == 'pom') {
            item.disable = true
            item.checked = false
          }
        })
      }
      this.setProps(this.tableName, this.projectType)
    },
    getTableData() {
      api_table_info({ name: this.tableName, schema: 'leo_fly' }).then(
        (res) => {
          this.fields = res.data
            .map((f) => {
              return {
                dbKey: f.COLUMN_NAME,
                dbType: f.DATA_TYPE,
                columnType: f.COLUMN_TYPE,
                comment: f.COLUMN_COMMENT,
                javaKey: toHump(f.COLUMN_NAME),
                javaType: getJavaType(f.DATA_TYPE),
                isNullable: f.IS_NULLABLE == 'YES' ? true : false,
                isPk: f.COLUMN_KEY == 'PRI' ? true : false,
                inTable: true,
                inQuery: true,
                inAdd: true,
                inUpdate: true,
                htmlTag: getHtmlTag(f.DATA_TYPE)
              }
            })
            .filter((f) => {
              return (
                f.dbKey != 'create_by' &&
                f.dbKey != 'create_time' &&
                f.dbKey != 'update_by' &&
                f.dbKey != 'update_time'
              )
            })
        }
      )
    },
    setProps(tableName, projectType) {
      this.resetProps()
      const { javaProjectName, javaProjectPath } = constant
      this.dataForm.name = getNameByTableName(tableName)
      if (projectType == 'package') {
        this.dataForm.javaProjectName = javaProjectName
        this.dataForm.javaProjectPath = javaProjectPath
        this.dataForm.javaPackageName = getPackageByTableName(
          constant.javaBasePackage,
          tableName
        )
        this.dataForm.javaPackagePath =
          constant.javaProjectPath +
          constant.javaSource +
          '/' +
          this.dataForm.javaPackageName.replaceAll('.', '/')
      } else {
        this.dataForm.javaProjectName = javaProjectName + '-db'
        this.dataForm.javaProjectPath =
          javaProjectPath + '/' + this.dataForm.javaProjectName
        this.dataForm.javaModuleName =
          'leo-fly-db-' + tableName.substr(4).replaceAll('_', '-')
        this.dataForm.javaModulePath =
          constant.javaProjectPath +
          '/leo-fly-db/' +
          this.dataForm.javaModuleName
        this.dataForm.javaPackageName = getPackageByTableName(
          constant.javaBasePackage,
          tableName
        )
        this.dataForm.javaPackagePath =
          this.dataForm.javaModulePath +
          constant.javaSource +
          '/' +
          this.dataForm.javaPackageName.replaceAll('.', '/')
      }
      this.dataForm.vueProjectName = constant.vueProjectName
      this.dataForm.vueProjectPath = constant.vueProjectPath
      this.dataForm.vueModuleName = getModuleByTableName(this.tableName)
      this.dataForm.vueModulePath =
        constant.vueProjectPath + '/src/views/' + this.dataForm.vueModuleName
      this.dataForm.vueModuleFileName = 'index.vue'
    },
    resetProps() {
      Object.keys(this.dataForm).forEach((key) => {
        this.dataForm[key] = ''
      })
    },

    handleCheckAllChange(key) {
      this.fields.forEach((f) => {
        f[key] = true
      })
    },
    reverseCheck(key) {
      this.fields.forEach((f) => {
        f[key] = !f[key]
      })
    },
    handleColumnsChange(value, key) {
      let checkedCount = value.length
      this[key].checkAll = checkedCount === this.fields.length
      this[key].isIndeterminate =
        checkedCount > 0 && checkedCount < this.fields.length
    },
    generateCode() {
      const {
        name,
        javaModuleName,
        vueModuleName,
        javaPackageName,
        javaModulePath,
        javaPackagePath,
        vueModuleFileName,
        vueModulePath,
        vueProjectPath
      } = this.dataForm
      const params = {
        javaModuleName: javaModuleName,
        underscoreName: this.tableName.substr(4),
        name: name,
        label: name.slice(0, 1).toUpperCase() + name.slice(1),
        javaPackageName: javaPackageName,
        vueModuleName: vueModuleName,
        tableName: this.tableName,
        fields: this.fields,
        files: []
      }
      this.fileList.forEach((item) => {
        if (item.checked) {
          const obj = this.fileTabs[item.key]
          const temp = {}
          temp.filename = params.label + obj.label + '.' + obj.fileType
          if (obj.key == 'entity') {
            temp.filename = params.label + '.' + obj.fileType
            temp.filepath =
              javaPackagePath + obj.childPackage.replaceAll('.', '/')
          } else if (obj.key == 'pom') {
            temp.filename = 'pom.xml'
            temp.filepath = javaModulePath
          } else if (obj.key == 'vue') {
            temp.filename = vueModuleFileName
            temp.filepath = vueModulePath
          } else if (obj.key == 'api') {
            temp.filename = vueModuleName + '.js'
            temp.filepath = vueProjectPath + '/src/api'
          } else {
            temp.filepath =
              javaPackagePath + obj.childPackage.replaceAll('.', '/')
            temp.filename = params.label + obj.label + '.' + obj.fileType
            temp.classPackage = params.javaPackageName + obj.childPackage
          }
          temp.fileType = obj.fileType
          temp.templateName = obj.templateName
          temp.key = obj.key
          params.files.push(temp)
        }
      })
      this.generateDialogVisible = true
      this.params = params
      this.params.currentObj = this.params.files[0]
      this.params.currentIndex = 0
      this.params.files.forEach((file) => {
        const { filepath, filename } = file
        exists({ filepath, filename }).then(({ data }) => {
          this.$set(file, 'exists', data)
          this.$set(file, 'badge', data ? 'exists' : '')
          this.$set(file, 'overwrite', false)
        })
      })
    },
    onConfirmGenerate() {
      this.$confirm('确定生成代码？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.params.files = this.params.files.filter((file) => {
          return !file.exists || file.overwrite
        })
        console.log(this.params)
        api_auto_code_generate(this.params).then((res) => {
          this.$message({ type: 'success', message: res.msg })
        })
      })
    },
    onGenerateJson() {
      console.log(this.fields)
      let json = {}
      this.fields.forEach((e) => {
        json[e.dbKey] = null
      })
      console.log(json)
    },

    onChangeFileShow(item, index) {
      this.temp = this.temp + 1
      this.$set(this.params, 'currentObj', item)
      this.$set(this.params, 'currentIndex', index)
    },
    onSetFileOverWrite(currentIndex) {
      this.params.files[currentIndex].overwrite =
        !this.params.files[currentIndex].overwrite
      if (this.params.files[currentIndex].exists) {
        if (
          this.params.files[currentIndex].exists &&
          this.params.files[currentIndex].overwrite
        ) {
          this.params.files[currentIndex].badge = 'overwrite'
        } else {
          this.params.files[currentIndex].badge = 'exists'
        }
      }
    }
  }
}
</script>