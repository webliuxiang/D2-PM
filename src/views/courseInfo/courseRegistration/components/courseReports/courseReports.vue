<template>
  <el-table
    height="100%"
    ref="courseReports"
    :data="tableData"
    v-loading="loading"
    size="small"
    stripe
    highlight-current-row
    style="width: 100%;"
    @sort-change="handleSortChange"
    @selection-change="handleSelectionChange"
    @cell-click="handleSelectClick"
  >
    <el-table-column
      type="selection"
      width="55"
    >
    </el-table-column>

    <el-table-column type="index">
    </el-table-column>
    <!-- <el-table-column
      label="序号"
      prop="number"
    >
      <template slot-scope="scope">
        {{scope.row.number}}
      </template>
    </el-table-column> -->
    <!-- <el-table-column
      label="讲师工号"
      width="80"
      prop="teacherNumber"
      :show-overflow-tooltip="true"
    >
      <template slot-scope="scope">
        {{scope.row.teacherNumber}}
      </template>
    </el-table-column>

    <el-table-column
      label="讲师姓名"
      width="80"
      prop="teacherName"
      :show-overflow-tooltip="true"
    >
      <template slot-scope="scope">
        {{scope.row.teacherName}}
      </template>
    </el-table-column> -->

    <el-table-column
      label="课程名称"
      prop="courseName"
      width="300"
      :show-overflow-tooltip="true"
    >
      <template slot-scope="scope">
        {{scope.row.courseName}}
      </template>
    </el-table-column>

    <el-table-column
      label="开始日期"
      prop="startDate"
      :show-overflow-tooltip="true"
    >
      <template slot-scope="scope">
        {{scope.row.startDate}}
      </template>
    </el-table-column>

    <el-table-column
      label="结束日期"
      prop="endDate"
      :show-overflow-tooltip="true"
    >
      <template slot-scope="scope">
        {{scope.row.endDate}}
      </template>
    </el-table-column>

    <!-- <el-table-column
      label="课时"
      prop="courseHour"
      width="80"
      align="center"
    >
      <template slot-scope="scope">
        {{scope.row.courseHour}}
      </template>
    </el-table-column> -->

    <el-table-column
      label="供应商"
      prop="vendor"
      width="80"
      align="center"
      :show-overflow-tooltip="true"
    >
      <template slot-scope="scope">
        {{scope.row.vendor}}
      </template>
    </el-table-column>

    <el-table-column
      label="培训地点"
      prop="location"
      :show-overflow-tooltip="true"
    >
      <template slot-scope="scope">
        {{scope.row.location}}
      </template>
    </el-table-column>

    <el-table-column
      label="管理类/技术类"
      prop="contentType"
      align="center"
    >
      <template slot-scope="scope">
        {{scope.row.contentType}}
      </template>
    </el-table-column>

    <el-table-column
      label="培训类别"
      prop="trainingType"
      align="center"
    >
      <template slot-scope="scope">
        {{scope.row.trainingType}}
      </template>
    </el-table-column>

    <el-table-column
      label="学习类别"
      prop="learnType"
      align="center"
    >
      <template slot-scope="scope">
        {{scope.row.learnType}}
      </template>
    </el-table-column>

    <el-table-column
      fixed="right"
      label="操作"
      align="center"
      width="80"
    >
      <template slot-scope="scope">
        <el-button
          title="查看"
          size="mini"
          @click="handleRowClick(scope.row)"
        >查看</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
// import {
//   PublishInternalCourseRecord
// } from "@api/sys.courseList";
export default {
  name: "courseReports",
  components: {},
  props: {
    tableData: Array,
    roleAdmin: Boolean,
    rolePermission: Object
  },
  data() {
    return {
      loading: false,
      // 多选后所有数据
      multipleSelection: [],
      sort: {
        prop: "",
        order: ""
      }
    };
  },
  mounted() {
    // console.log(this.tableData);
    // 获取课程列表信息
  },
  methods: {
    // 展示课程信息弹出框
    handleRowClick(row, column) {
      // console.log(row);
      // console.log(column);
      this.$emit("openCourseReports", row, "disabled");
    },
    // 获取表格基础数据
    getTableData() {
      let query = {
        pageIndex: this.page.current,
        pageSize: this.page.size,
        sortBy: this.sort.prop,
        descending: this.sort.order === "descending",
        filter: this.searchForm
      };
      console.log(query);
    },
    // 表格切换页数等操作操作
    handleSearchFormSubmit() {
      this.getTableData();
    },
    handleSearchFormReset() {
      this.$refs.searchForm.resetFields();
    },
    // 多选操作
    handleSelectClick(row, column) {
      if (column.label === '操作') {
        return
      }
      this.$refs.courseReports.toggleRowSelection(row);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.$emit("multiSelected", this.multipleSelection);
    },
    handleSortChange(val) {
      this.sort.prop = val.prop;
      this.sort.order = val.order;
      this.getTableData();
    },
    handleSizeChange(val) {
      this.page.size = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.getTableData();
    },
    // 表格切换页数等操作操作
    // 点击行实现选择
    handleClickRowSelection(row) {
      this.$refs.courseReports.toggleRowSelection(row);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-button--mini {
  padding: 3px 5px !important;
}
</style>
