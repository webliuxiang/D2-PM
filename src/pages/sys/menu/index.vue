<template>
  <d2-container>
    <template slot="header">MenuPage Header</template>
    <el-table
      :data="tableData"
      style="width: 100%"
      @cell-click="handleCellClick"
    >
      <el-table-column
        prop="date"
        label="日期"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
      >
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.address"
            placeholder="请输入内容"
            v-if="inputVisible"
          ></el-input>
          <span v-if="!inputVisible">{{scope.row.address}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div
      v-for="(item, key) in tableData"
      :key="key"
    >{{item}}</div>
    <template slot="footer">MenuPage Footer</template>
  </d2-container>
</template>

<script>
export default {
  name: "MenuPage",
  components: {},
  data() {
    return {
      inputVisible: false,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    handleCellClick(row, column, cell, event) {
      console.log(column.label);
      if (column.label === "地址") {
        this.inputVisible = true
      }
    }
  },
  created() {}
};
</script>
