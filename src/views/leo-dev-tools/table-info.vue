<template>
  <div class="app-container">
    <div class="fillter">
      <el-button @click="onSearch">Search</el-button>
      <el-button @click="json">json</el-button>
      <el-button @click="key_list">key_list</el-button>
      <el-button @click="key_list_hump">key_list_hump</el-button>
      <!-- <el-dropdown>
        <el-button type="text" class="el-icon-s-grid">
          <i class="el-icon-arrow-down el-icon--right" />
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item>双皮奶</el-dropdown-item>
          <el-dropdown-item>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
    </div>
    <el-table ref="multipleTable" border :data="list" style="width: 100%" tooltip-effect="dark"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" />
      <el-table-column label="comment" prop="comment" align="center" />
      <el-table-column label="name" prop="name" align="center" />
      <el-table-column label="text" prop="text" align="center" />
      <el-table-column label="id" prop="id" align="center" />
      <el-table-column label="key" prop="key" align="center" />
      <el-table-column label="read" prop="read" align="center" />
      <el-table-column label="htmlTag" prop="htmlTag" align="center" />
      <el-table-column label="dataType" prop="dataType" align="center" />
      <el-table-column label="query" prop="query" align="center" />
      <el-table-column label="length" prop="length" align="center" />
      <el-table-column label="show" prop="show" align="center" />
      <el-table-column label="update" prop="update" align="center" />
      <el-table-column label="point" prop="point" align="center" />
      <el-table-column label="isPK" prop="isPK" align="center" />
      <el-table-column label="isNullable" prop="isNullable" align="center" />
      <el-table-column label="checked" prop="checked" align="center" />
      <el-table-column label="create" prop="create" align="center" />
    </el-table>
  </div>
</template>
<script>
import { api_table_list } from '@/api/leo-table';
import { toHump } from '@/utils/index';
export default {
  name: 'TableInfo',
  data() {
    return {
      list: [],
      multipleSelection: [],
    };
  },
  mounted() {
    this.onSearch();
  },
  methods: {
    onSearch() {
      api_table_list({ tableName: 'leo_product' }).then((res) => {
        this.list = res.data;
      });
    },
    json() {
      const json = {};
      this.multipleSelection.forEach((i) => {
        json[toHump(i.name)] = '';
      });
      console.log(json);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    key_list() {
      const keys = this.multipleSelection.map((i) => toHump(i.key));
      console.log(keys);
    },
    key_list_hump() {
      const keys = this.multipleSelection.map((i) => toHump(i.key));
      console.log(keys);
    },
  },
};
</script>
