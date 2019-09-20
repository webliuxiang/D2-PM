<template>
  <el-table
    height="100%"
    :data="tableData"
    v-loading="loading"
    size="small"
    stripe
    highlight-current-row
    style="width: 100%;"
    @sort-change="handleSortChange"
  >
    <el-table-column type="index">
    </el-table-column>

    <el-table-column
      label="课程编号"
      prop="courseNum"
      width="100"
      :show-overflow-tooltip="true"
    >
      <template slot-scope="scope">
        <a
          style="cursor:pointer;display:inline-block;width:100%;min-width:40px;min-height:10px;"
          @click="handleRowClick(scope.row)"
        >{{scope.row.courseNum}}</a>
      </template>
    </el-table-column>

    <el-table-column
      label="课程模块"
      prop="courseModule"
      :show-overflow-tooltip="true"
      width="100"
    >
      <template slot-scope="scope">
        <a
          style="cursor:pointer;display:inline-block;width:100%;min-width:40px;min-height:10px;"
          @click="handleRowClick(scope.row)"
        >{{scope.row.courseModule}}</a>
      </template>
    </el-table-column>

    <el-table-column
      label="课程名称"
      prop="courseName"
      :show-overflow-tooltip="true"
    >
      <template slot-scope="scope">
        <a
          style="cursor:pointer;display:inline-block;width:100%;min-width:40px;min-height:10px;"
          @click="handleRowClick(scope.row)"
        >{{scope.row.courseName}}</a>
      </template>
    </el-table-column>

    <!-- <el-table-column
      label="课程分类"
      prop="classification"
      :show-overflow-tooltip="true"
    >
      <template slot-scope="scope">
        {{scope.row.classification}}
      </template>
    </el-table-column> -->

    <el-table-column
      label="开始日期"
      prop="startDate"
      width="100"
    >
      <template slot-scope="scope">
        <a
          style="cursor:pointer;display:inline-block;width:100%;min-width:40px;min-height:10px;"
          @click="handleRowClick(scope.row)"
        >{{scope.row.startDate}}</a>
      </template>
    </el-table-column>

    <el-table-column
      label="结束日期"
      prop="endDate"
      width="100"
    >
      <template slot-scope="scope">
        <a
          style="cursor:pointer;display:inline-block;width:100%;min-width:40px;min-height:10px;"
          @click="handleRowClick(scope.row)"
        >{{scope.row.endDate}}</a>
      </template>
    </el-table-column>

    <el-table-column
      label="天数"
      prop="daysCount"
      width="80"
      align="center"
    >
      <template slot-scope="scope">
        <a
          style="cursor:pointer;display:inline-block;width:100%;min-width:40px;min-height:10px;"
          @click="handleRowClick(scope.row)"
        >{{scope.row.daysCount}}</a>
      </template>
    </el-table-column>

    <el-table-column
      label="培训费用"
      prop="trainingPrice"
      width="100"
      align="center"
    >
      <template slot-scope="scope">
        <a
          style="cursor:pointer;display:inline-block;width:100%;min-width:40px;min-height:10px;"
          @click="handleRowClick(scope.row)"
        >{{scope.row.trainingPrice}}</a>
      </template>
    </el-table-column>

    <el-table-column
      label="培训地点"
      prop="trainingCity"
      width="100"
      align="center"
    >
      <template slot-scope="scope">
        <a
          style="cursor:pointer;display:inline-block;width:100%;min-width:40px;min-height:10px;"
          @click="handleRowClick(scope.row)"
        >{{scope.row.trainingCity}}</a>
      </template>
    </el-table-column>

    <el-table-column
      label="供应商"
      prop="vendor"
      width="100"
      align="center"
    >
      <template slot-scope="scope">
        <a
          style="cursor:pointer;display:inline-block;width:100%;min-width:40px;min-height:10px;"
          @click="handleRowClick(scope.row)"
        >{{scope.row.vendor}}</a>
      </template>
    </el-table-column>

    <el-table-column
      fixed="right"
      label="操作"
      width="100"
    >
      <template slot-scope="scope">
        <div>
          <el-button
            v-if="scope.row.status === 3"
            type="primary"
            title="已报名"
            size="mini"
            disabled
          >已报名</el-button>
          <el-button
            v-if="scope.row.status === 2"
            type="primary"
            title="已结束"
            size="mini"
            disabled
          >已结束</el-button>
          <el-button
            type="primary"
            title="申请"
            size="mini"
            @click="handleSignUp(scope.row)"
          >申请</el-button>
          <el-tag
            v-if="scope.row.comment"
            size="mini"
            effect="plain"
            type="success"
            style="margin-left:10px;"
          >注</el-tag>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
// import { UserGetPublicCourse, AdminGetPublicCourse } from '@api/sys.courseList'
export default {
  name: "publicTable",
  components: {},
  props: {
    tableData: Array,
    roleAdmin: Boolean
  },
  data() {
    return {
      loading: false,
      sort: {
        prop: "",
        order: ""
      }
    };
  },
  mounted() {
    // console.log(this.tableData);
    // 获取课程列表信息
    // this.UserGetPublicCourseData()
  },
  methods: {
    // 报名
    handleSignUp(row) {
      this.role = row;
      this.$confirm(`确认申请 " ${row.courseName} " 课程？`, "申请确认", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      }).then(() => {
        this.$message.success("申请成功!");
        window.open(
          "https://intranet.boschhuayu-steering.com:9002/_layouts/15/BHSS_Portal/SitePage/CreateRedirector.aspx?isdlg=1&ProcessType=ExternalTraining&courseid=" +
            row.id
        );
        // this.role.isSignUp = true
        this.UserGetPublicCourseData();
      });
    },
    // 课程信息展示弹出框
    handleRowClick(row, column) {
      this.$emit("openCreateClass", row, "disabled");
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
    // 表格系列操作
    handleSearchFormSubmit() {
      this.getTableData();
    },
    handleSearchFormReset() {
      this.$refs.searchForm.resetFields();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
    // 表格系列操作
    // 删除功能
    delRole(id) {
      this.$confirm("确认删除？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "删除",
        cancelButtonText: "取消"
      }).then(() => {
        // roleService.delRole(id).then(() => {
        //   this.getTableData();
        // });
      });
    }
  },
  created() {
    // console.log(this.roleAdmin);
  }
};
</script>

<style lang="scss" scoped>
.el-button--mini {
  padding: 3px 5px !important;
}
</style>
