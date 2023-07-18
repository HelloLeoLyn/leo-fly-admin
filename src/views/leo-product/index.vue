<template>
  <div class="app-container leo-auto-part-index">
    <div class="filter-container">
      <el-input v-model="listQuery.code" placeholder="oe" style="width: 200px;" class="filter-item"
        @keyup.enter.native="doSearch" @keyup="listQuery.code = listQuery.code.trim()" />
      <el-select v-model="listQuery.status" class="filter-item">
        <el-option v-for="item in product_status" :key='item.status' :label="item.label"
          :value="item.status" />
      </el-select>
      <el-select v-model="listQuery.referStatus" class="filter-item">
        <el-option label="" value="" />
        <el-option label="未上传1688" value="0" />
      </el-select>
      <el-input v-model="listQuery.name" style="width: 200px;" class="filter-item"
        placeholder="name" @keyup.enter.native="doSearch" />
      <el-input v-model="listQuery.subject" style="width: 200px;" class="filter-item"
        placeholder="subject" @keyup.enter.native="doSearch" />
      <Category1688 v-model="listQuery.categoryId"> </Category1688>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="doSearch">
        {{ $t('common.search') }}
      </el-button>
      <leo-export v-waves class="filter-item" type="primary" :list="[]" :columns="[]"
        :label="$t('common.export')" />
      <el-row style="text-align:right;">
        <el-checkbox v-model="more" class="filter-item" style="margin-left:15px;">
          {{ $t('common.more') }}
        </el-checkbox>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
          @click="addProduct">
          {{ $t('common.add') }}
        </el-button>
        <el-button-group class="filter-item" style="margin-left: 10px;">
          <el-button type="primary" @click="handWorkClick">
            {{ $t('common.work') }}
          </el-button>
        </el-button-group>
      </el-row>
    </div>
    <leo-new-task workType="90" :key="workTaskDialog.Key" :workTaskDialog="workTaskDialog.show"
      :confirmBtnTxt="workTaskDialog.confirmBtnTxt" :referNo="workTaskDialog.referNo"
      @childCloseDialog="workTaskDialog.show = false" @onWorkDialogConfirm="onWorkDialogConfirm" />
    <el-dialog title="任务产品" :visible.sync="taskProductDialog.show" width="60%">
      <el-table :data="taskProductDialog.tableData" border stripe>
        <el-table-column label="image" width="80">
          <template slot-scope="{row}">
            <el-image v-if="row.mainImage"
              :src="service + '/product/image/' + row.mainImage + '/50X50'" />
          </template>
        </el-table-column>
        <el-table-column prop="code">
        </el-table-column>
      </el-table>
      <span slot="footer">
        <el-button type="primary" @click="onWorkTaskDialogConfirm">OK</el-button>
      </span>
    </el-dialog>

    <el-table v-loading="loading" border :data="list" style="width: 100%" ref="productsTable">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="id" width="80" />
      <el-table-column prop="categoryId" label="categoryId" width="120" />
      <el-table-column label="code" width="180">
        <template slot-scope="{row}">
          <el-input readonly :value="row.code | codeFilter" size="small">
          </el-input>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="name">
        <template slot-scope="{row,$index}">
          <leo-edit-pane :key="row.id" :options="[{ 'key': 'name', 'value': row.name }]"
            @onConfirmClick="v => updateName(v, $index)" />
        </template>
      </el-table-column>
      <el-table-column prop="brand" label="tag" />
      <el-table-column v-if="more" prop="weight" label="weight" />
      <el-table-column v-if="more" prop="packageSize" label="packageSize" />
      <el-table-column prop="status" label="status" width="80" />
      <el-table-column prop="error" label="error" width="180" v-if="listQuery.status == 400" />
      <el-table-column label="image" width="80">
        <template slot-scope="{row}">
          <el-image v-if="row.mainImage"
            :src="service + '/product/image/' + row.mainImage + '/50X50'" />
        </template>
      </el-table-column>
      <el-table-column label="actions" fixed="right" width="380">
        <template slot-scope="scope">
          <el-row>
            <el-col :span="6">
              <el-button size="small" type="text" plain @click="update(scope.row.id)">修改</el-button>
            </el-col>
            <el-col :span="6">
              <el-button size="small" type="text" plain @click="showHistory(scope.row)">销售记录
              </el-button>
            </el-col>
            <el-col :span="6">
              <el-button @click="$router.push('/leo-goods/add?productId=' + scope.row.id)"
                size="small" type="text" plai>
                商品预处理
              </el-button>
            </el-col>
            <el-col :span="6">
              <el-button @click="sendTo1688(scope.row.id)" size="small" type="text" plai>
                上传1688
              </el-button>
            </el-col>
            <el-col :span="6">
              <el-button @click="sendTo1688(scope.row.id)" size="small" type="text" plai>
                上传亚马逊
              </el-button>
            </el-col>
            <el-col :span="6">
              <el-button @click="$router.push('/leo-goods/aliexpress-prepare/' + scope.row.id)"
                size="small" type="text" plai>
                上传速卖通
              </el-button>
            </el-col>
            <el-col :span="6" v-if="scope.row.status != 666">
              <el-button size="small" type="text" plain
                @click="$router('/leo-goods/aliexpress/prepare')">删除
              </el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.current"
      :limit.sync="listQuery.size" @pagination="doSearch" />

    <el-dialog title="update" :visible.sync="update_dialog" @close="handleUpdateDialogClose" center>
      <el-transfer style="text-align: left; display: inline-block" class="leo-transfer"
        v-model="transfer.value" filterable :titles="['oe', 'refNo']" :format="{
          noChecked: '${total}',
          hasChecked: '${checked}/${total}'
        }" @change="handleChange" :data="transfer.data">
        <el-row slot-scope="{ option }">
          <el-col :span="14">{{ option.label }}</el-col>
          <el-col :span="10">
            <button @click="editCode(option)"><i class="el-icon-edit" /></button>
            <button @click="deleteCode(option)"><i class="el-icon-delete" /></button>
          </el-col>
        </el-row>
        <el-button class="transfer-footer" slot="left-footer" size="small" @click="saveCode">save
        </el-button>
        <el-button class="transfer-footer" slot="left-footer" size="small" @click="addOE">addOE
        </el-button>
        <el-button class="transfer-footer" slot="right-footer" size="small" @click="saveCode">save
        </el-button>
        <el-button class="transfer-footer" slot="right-footer" size="small" @click="addRef">addRef
        </el-button>
      </el-transfer>
    </el-dialog>
    <LeoHistory :productId="history.productId" v-model="history" :key="history.count"></LeoHistory>
  </div>
</template>
<style lang="scss">
.leo-row-center {
  .el-col {
    text-align: center;
  }
}

.leo-auto-part-index {
  .el-transfer-panel {
    width: 250px;
  }

  .leo-transfer-label-btn {
    text-align: right;
  }

  .el-checkbox:last-of-type {
    margin-right: 10px;
  }

  .el-transfer-panel__body.is-with-footer {
    padding-bottom: 40px;
    margin-bottom: 40px;
  }
}
</style>
<script>
import LeoEditPane from '@/components/LeoEditPane'
import LeoWebCollector from '@/components/LeoWebCollector'
import LeoExport from '@/components/LeoExport'
import Category1688 from '@/views/leo-alibaba/components/Category1688.vue'
import waves from '@/directive/waves' // waves directive
import LeoHistory from '@/views/leo-warehouse/components/LeoHistory.vue'
import LeoNewTask from '@/views/leo-work/components/LeoNewTask.vue'
import {
  product_page_api,
  product_update_api,
  product_update_all_api,
  product_valid_api,
  api_product_attributes
} from '@/api/leo-product'
import { service } from '@/api/index'
import Pagination from '@/components/Pagination'
import { product_alibaba_dict } from '@/utils/dict'
import { listToString } from '@/utils/index'
import { product_status } from '@/utils/dict'
import { product_delete_api } from '@/api/leo-product'
import { api_work_post } from '@/api/leo-work'
export default {
  name: 'LeoProductIndex',
  components: {
    LeoNewTask,
    Pagination,
    LeoHistory,
    LeoEditPane,
    LeoExport,
    LeoWebCollector,
    Category1688
  },
  directives: { waves },
  filters: {
    codeFilter: (e) => listToString(e, ' ')
  },
  data() {
    return {
      taskProductDialog: {
        existsId: [],
        show: false,
        tableData: []
      },
      workTaskDialog: {
        key: 2000,
        show: false,
        confirmBtnTxt: 'confirm'
      },
      updatePane: {
        show: false,
        title: '修改'
      },
      history: {
        show: false,
        count: 0,
        productId: 0
      },
      more: false,
      product_status,
      service,
      value: [],
      current_row: -1,
      total: 0,
      listQuery: {
        referStatus: '',
        status: -1,
        name: null,
        size: 10,
        current: 1,
        categoryId: null,
        code: ''
      },
      list: [],
      loading: false,
      current_id: 0,
      form: {},
      editForm: {
        id: -1,
        key: '',
        code: [],
        refNo: []
      },

      transfer: {
        data: [],
        value: []
      },
      update_dialog: false,
      checked_list: [],
      prodcut_keys: [
        'categoryId',
        'code',
        'json',
        'mainImage',
        'model',
        'name',
        'packageSize',
        'status',
        'subject',
        'unit',
        'warranty',
        'weight'
      ],
      product_template: {
        categoryId: true,
        id: true,
        name: true,
        brand: true,
        model: true,
        packageSize: true,
        unit: true,
        warranty: true,
        weight: true,
        code: true,
        codeType: true,
        metaCode: true,
        subject: true,
        mainImage: true
      },
      dict: product_alibaba_dict
    }
  },
  created() {
    this.doSearch()
  },
  methods: {
    onWorkDialogConfirm(work) {
      work.content = JSON.stringify(
        this.taskProductDialog.tableData.map((o) => {
          return { id: o.id, type: 'product' }
        })
      )
      if (work.content.length > 0) {
        work.existContent = 1
      }
      api_work_post(work).then((res) => {
        this.$notify.success(res.msg)
      })
    },
    onWorkTaskDialogConfirm() {
      this.taskProductDialog.show = !this.taskProductDialog.show
      this.workTaskDialog.show = !this.workTaskDialog.show
    },
    handWorkClick() {
      const selection = this.$refs['productsTable'].selection
      if (!selection || selection.length == 0) {
        this.$message.error('请选择要添加任务的数据，最多只能添加20条数据')
        return
      }
      if (this.taskProductDialog.tableData.length > 20) {
        this.$message.error('最多只能添加20条数据')
        return
      }
      if (this.taskProductDialog.tableData.length + selection.length > 20) {
        this.$message.error(
          '已经添加了' +
            this.taskProductDialog.tableData.length +
            '最多还能添加' +
            (20 - this.taskProductDialog.tableData.length) +
            '条数据'
        )
        return
      }
      selection.forEach((product) => {
        if (this.taskProductDialog.existsId.indexOf(product.id) == -1) {
          this.taskProductDialog.existsId.push(product.id)
          this.taskProductDialog.tableData.push(product)
        }
      })
      this.taskProductDialog.show = !this.taskProductDialog.show
      this.$refs['productsTable'].clearSelection()
    },
    parseReferStatus(referStatus, rightIndex) {
      let start = referStatus.length - rightIndex - 1
      return referStatus.substr(start, start + 1)
    },
    values(row) {
      if (!row.mainImage) {
        return {
          code: row.code[0],
          id: row.id,
          codes: row.code,
          isBatch: false,
          platform: 'alibaba',
          dataType: 'image'
        }
      } else {
        return {
          code: row.code[0],
          id: row.id,
          codes: row.code,
          isBatch: false
        }
      }
    },
    done(row, index) {
      const params = {
        id: row.id,
        status: 666
      }
      product_update_api(params).then((res) => {
        this.removeInTableData(index)
        this.$notify.success(res.msg)
      })
    },
    onConfrimDelete(row, index) {
      this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          product_delete_api(row.id).then((res) => {
            this.removeInTableData(index)
            this.$notify.success(res.msg)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    doSearch() {
      this.listQuery.code = this.listQuery.code.replaceAll(' ', '')
      product_page_api(this.listQuery).then((res) => {
        this.list = res.data.records
        this.total = res.data.total
      })
    },
    removeInTableData(index) {
      this.list.splice(index, 1)
      this.total = this.total - 1
      if (this.total < this.listQuery.size || this.list.length <= 1) {
        this.doSearch()
      }
    },
    valid(id) {
      product_valid_api(id).then((res) => {
        if (res.code === '200') {
          this.$message.success(res.msg)
        }
      })
    },
    addToSync(id, site, index) {
      const params = {
        id: id,
        status: 200,
        brand: site
      }
      product_update_api(params).then((res) => {
        this.removeInTableData(index)
        this.$notify.success(res.msg)
      })
    },
    view(id) {
      this.$router.push(`detail/${id}`)
    },
    update(id) {
      this.$router.push(`update/${id}`)
    },
    sendTo1688(id) {
      this.$router.push(`/leo-alibaba/post/${id}`)
    },
    updateBtnClick(row, key, index) {
      this.update_dialog = true
      this.editForm.key = key
      this.editForm.id = row.id
      this.editForm[key] = row[key]
      this.editForm.index = index
      if (key === 'code') {
        this.editForm['refNo'] = row['refNo']
        this.transfer.value = []
        this.transfer.data = []
        let i = 0
        if (this.editForm.code && this.editForm.code.length > 0) {
          this.editForm.code.forEach((oe) => {
            this.transfer.data.push({ label: oe, key: i++ })
          })
        }
        if (this.editForm.refNo && this.editForm.refNo.length > 0) {
          this.editForm.refNo.forEach((no) => {
            this.transfer.value.push(i)
            this.transfer.data.push({ label: no, key: i++ })
          })
        }
      }
    },
    handleUpdateDialogClose() {
      if (this.editForm.key === 'code' || this.editForm.key === 'refNo') {
        this.list[this.editForm.index].code = this.editForm.code
        this.list[this.editForm.index].refNo = this.editForm.refNo
      } else {
        this.list[this.editForm.index][this.editForm.key] =
          this.editForm[this.editForm.key]
      }
    },
    updateOnSubmit() {
      product_update_all_api(this.editForm).then((res) => {
        if (res.code === '200') {
          this.$message.success(res.msg)
        }
      })
    },
    namePolice(name) {
      return name.replaceAll(' ', '_').replaceAll(':', '').toLowerCase()
    },

    keysSync() {
      const f_list = this.checked_list.filter((f) => f.checked)
      const product = {}
      const json = {}
      f_list.forEach((i) => {
        if (this.prodcut_keys.indexOf(i.lable) >= 0) {
          product[i.lable] = i.value
        } else {
          json[i.lable] = i.value
        }
      })
      product.json = JSON.stringify(json)
      product.id = this.current_id
      product_update_api(product).then((res) => {
        console.log(res)
      })
    },

    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
    },
    addCode(codeType) {
      this.$prompt('请输入oe号', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        const index = this.transfer.data.length
        this.transfer.data.push({
          label: value,
          key: index
        })
        if (codeType === 'ref') {
          this.transfer.value.push(index)
        }
      })
    },
    addOE() {
      this.addCode('oe')
    },
    addRef() {
      this.addCode('ref')
    },
    editCode(option) {
      this.$prompt('请输入修改oe号', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: option.label
      }).then(({ value }) => {
        const index = this.transfer.value.findIndex((v) => v === option.key)
        if (index >= 0) {
          // 在右边
          this.transfer.value[index] = value
        }
        const left_index = this.transfer.data.findIndex(
          (d) => d.key === option.key
        )
        this.transfer.data[left_index] = { label: value, key: value }
        this.transfer.data.push({ label: '', key: '' })
        this.transfer.data.splice(this.transfer.data.length - 1, 1)
      })
    },
    deleteCode(option) {
      const index = this.transfer.value.findIndex((v) => v === option.key)
      if (index >= 0) {
        // 在右边
        this.transfer.value.splice(index, 1)
      }
      const left_index = this.transfer.data.findIndex(
        (d) => d.key === option.key
      )
      this.transfer.data.splice(left_index, 1)
    },
    saveCode() {
      let refNo = []
      if (this.transfer.value.length > 0) {
        this.transfer.value.forEach((key) => {
          const index = this.transfer.data.findIndex((data) => {
            return data.key == key
          })
          refNo.push(this.transfer.data[index].label)
        })
      }
      let code = []
      if (this.transfer.data.length > 0) {
        code = this.transfer.data
          .filter((data) => {
            return (
              this.transfer.value.findIndex((key) => key === data.key) == -1
            )
          })
          .map((m) => m.label)
      }
      const { id } = this.editForm
      const product = {
        id,
        code,
        refNo
      }
      this.editForm.code = code
      this.editForm.refNo = refNo
      api_product_attributes(product).then((res) => {
        this.$message({ type: 'success', message: res.msg })
      })
    },
    showHistory(row) {
      this.history.productId = row.id
      this.history.show = true
      this.history.count++
    },
    updateName(v, index) {
      this.list[index].name = v[0].value
      const product = {
        id: this.list[index].id,
        name: this.list[index].name
      }
      product_update_api(product).then((res) => {
        this.$message({ type: 'success', message: res.msg })
      })
    },
    addProduct() {
      this.$router.push('/leo-product/add/' + 0)
    }
  }
}
</script>
