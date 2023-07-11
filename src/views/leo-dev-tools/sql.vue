<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :span="6" v-for="sql,key in sql_set" :key="key">
        <el-card shadow="hover" body-style="height:180px">
          <p>{{sql.comment}}</p>
          <el-button type="primary" plain @click="handleBtnClk(sql)">点击显示</el-button>
          <el-button v-clipboard:copy="copy(sql.code)" v-clipboard:success="clipboardSuccess"
            type="primary" icon="el-icon-document">
            复制
          </el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :title="sql_dialog.title" :visible.sync="sql_dialog.show" width="800">
      <el-input type="textarea" :value="sql_dialog.content" :rows="sql_dialog.input_row" />
      <el-button v-clipboard:copy="sql_dialog.content" v-clipboard:success="clipboardSuccess"
        type="primary" icon="el-icon-document">
        复制
      </el-button>
    </el-dialog>
  </div>
</template>
<script>
import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive
export default {
  directives: {
    clipboard
  },
  data() {
    return {
      sql_set: [
        {
          comment: '字段不区分大小写',
          key: 'ignore_upper&lower',
          code: 'ALTER TABLE 表名 MODIFY COLUMN 字段名 VARCHAR(255) CHARACTER SET UTF8 COLLATE UTF8_GENERAL_CI;'
        },
        {
          comment: '添加字段',
          key: 'add_column',
          code: 'ALTER TABLE 表名 ADD 字段名 字段类型(字段长度) DEFAULT 默认值 COMMENT 注释'
        },
        {
          comment: '添加careteby updateby...',
          key: 'create_update',
          code: [
            'ALTER TABLE 表名 ADD create_by bigint COMMENT 创建者;',
            'ALTER TABLE 表名 ADD create_time datetime COMMENT 创建时间;',
            'ALTER TABLE 表名 ADD update_by bigint COMMENT 修改者;',
            'ALTER TABLE 表名 ADD update_time datetime COMMENT 修改时间;'
          ]
        },
        {
          comment: '修改字段',
          key: 'update_column',
          code: 'ALTER TABLE 表名 CHANGE 旧字段名  新字段名/ALTER TABLE 表名 MODIFY 字段名 字段类型(字段长度)'
        },
        {
          comment: '删除重复',
          key: 'delete_repeat',
          code:
            'DELETE\n' +
            'FROM\n' +
            '     leo_image\t# 表A\n' +
            'WHERE\n' +
            '    id NOT IN ( # 需要删除数据的id，不包含下面查询出来的id\n' +
            '              SELECT\t# 此条SELECT查询不可省，否则报错：You cant specify target table A for update in FROM clause。\n' +
            '                      # 内层SELECT分组后，再次查询C表获得id\n' +
            '                     id\n' +
            '              FROM\n' +
            '                   (\n' +
            '                   SELECT\n' +
            '                          MAX(id) AS id\t# 保留相同数据中，id最小的数据。AS不可省，命名别名为id。\n' +
            '                       # 若省略，运行2个SELECT报错：Unknown column id in field list。\n' +
            '                       # 整体语句执行不会报错，但无效果。\n' +
            '                   FROM\n' +
            '                        leo_image\n' +
            '                   GROUP BY\n' +
            '                            NAME\n' +
            '                   ) C\t  # 此处的C，不可省。分组后的数据，生成表C，外层SELECT查询C表，获取最终的id\n' +
            '              );\n' +
            '\n'
        },
        {
          comment: '唯一序列',
          key: 'seq',
          code:
            'create function current_val(v_sq_name varchar(255))\n' +
            '  returns integer\n' +
            '  begin\n' +
            '    declare value integer;\n' +
            '    set value = 0;\n' +
            '    select val into value from leo_seq where name=v_sq_name;\n' +
            '    return value;\n' +
            '  end;\n\n' +
            'create function nextval(v_seq_name varchar(255))\n' +
            '  returns integer\n' +
            'begin\n' +
            '  update leo_seq set val = val + increment_val where name = v_seq_name;\n' +
            '  return current_val(v_seq_name);\n' +
            'end;'
        }
      ],
      sql_dialog: {
        title: '',
        show: false,
        content: {
          code: null
        },
        input_row: 5
      }
    }
  },
  methods: {
    handleBtnClk(sql) {
      this.sql_dialog.show = true
      this.sql_dialog.title = sql.comment
      this.sql_dialog.content = this.objToString(sql.code)
      const length = this.sql_dialog.content.split('\n').length
      console.log(length)
      this.sql_dialog.input_row = length > 5 ? length : 5
    },
    copy(obj) {
      return this.objToString(obj)
    },
    objToString(obj) {
      if (typeof obj === 'object') {
        let temp = ''
        if (obj.constructor === Array) {
          obj.forEach((no) => {
            temp = temp + no + '\n'
          })
        }
        return temp
      } else {
        return obj
      }
    },
    clipboardSuccess() {
      this.$message({
        message: 'Copy successfully',
        type: 'success',
        duration: 1500
      })
    }
  }
}
</script>