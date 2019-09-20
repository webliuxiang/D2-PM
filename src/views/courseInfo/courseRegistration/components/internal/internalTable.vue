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
    <!-- <el-table-column
      label="序号"
      prop="number"
    >
      <template slot-scope="scope">
        {{scope.row.number}}
      </template>
    </el-table-column> -->
    <el-table-column
      label="讲师工号"
      width="80"
      prop="teacherNumber"
      :show-overflow-tooltip="true"
    >
      <template slot-scope="scope">
        <a
          style="cursor:pointer;display:inline-block;width:100%;min-width:40px;min-height:10px;"
          @click="handleRowClick(scope.row)"
        >{{scope.row.teacherNumber}}</a>
      </template>
    </el-table-column>

    <el-table-column
      label="讲师姓名"
      width="80"
      prop="teacherName"
      :show-overflow-tooltip="true"
    >
      <template slot-scope="scope">
        <a
          style="cursor:pointer;display:inline-block;width:100%;min-width:40px;min-height:10px;"
          @click="handleRowClick(scope.row)"
        >{{scope.row.teacherName}}</a>
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

    <el-table-column
      label="开始日期"
      prop="startDate"
      :show-overflow-tooltip="true"
      width="120"
    >
      <template slot-scope="scope">
        <a
          style="cursor:pointer;display:inline-block;width:100%;min-width:40px;min-height:10px;"
          @click="handleRowClick(scope.row)"
        >{{scope.row.startDate + " " + (scope.row.startTime ? scope.row.startTime : "")}}</a>
      </template>
    </el-table-column>

    <el-table-column
      label="结束日期"
      prop="endDate"
      :show-overflow-tooltip="true"
      width="120"
    >
      <template slot-scope="scope">
        <a
          style="cursor:pointer;display:inline-block;width:100%;min-width:40px;min-height:10px;"
          @click="handleRowClick(scope.row)"
        >{{scope.row.endDate + " " + (scope.row.endTime ? scope.row.endTime : "")}}</a>
      </template>
    </el-table-column>

    <el-table-column
      label="课时"
      prop="courseHour"
      width="60"
      align="center"
    >
      <template slot-scope="scope">
        <a
          style="cursor:pointer;display:inline-block;width:100%;min-width:40px;min-height:10px;"
          @click="handleRowClick(scope.row)"
        >{{scope.row.courseHour}}</a>
      </template>
    </el-table-column>

    <el-table-column
      label="供应商"
      prop="vendor"
      width="70"
      align="center"
      :show-overflow-tooltip="true"
    >
      <template slot-scope="scope">
        <a
          style="cursor:pointer;display:inline-block;width:100%;min-width:40px;min-height:10px;"
          @click="handleRowClick(scope.row)"
        >{{scope.row.vendor}}</a>
      </template>
    </el-table-column>

    <el-table-column
      label="培训地点"
      prop="location"
      width="80"
      :show-overflow-tooltip="true"
    >
      <template slot-scope="scope">
        <a
          style="cursor:pointer;display:inline-block;width:100%;min-width:40px;min-height:10px;"
          @click="handleRowClick(scope.row)"
        >{{scope.row.location}}</a>
      </template>
    </el-table-column>

    <el-table-column
      label="报名截止时间"
      width="100"
      prop="deadLine"
      :show-overflow-tooltip="true"
    >
      <template slot-scope="scope">
        <a
          style="cursor:pointer;display:inline-block;width:100%;min-width:40px;min-height:10px;"
          @click="handleRowClick(scope.row)"
        >{{scope.row.deadLine}}</a>
      </template>
    </el-table-column>

    <el-table-column
      label="最小人数"
      prop="min"
      width="50"
    >
      <template slot-scope="scope">
        <a
          style="cursor:pointer;display:inline-block;width:100%;min-width:40px;min-height:10px;"
          @click="handleRowClick(scope.row)"
        >{{scope.row.min}}</a>
      </template>
    </el-table-column>

    <el-table-column
      label="最大人数"
      prop="max"
      width="50"
    >
      <template slot-scope="scope">
        <a
          style="cursor:pointer;display:inline-block;width:100%;min-width:40px;min-height:10px;"
          @click="handleRowClick(scope.row)"
        >{{scope.row.max}}</a>
      </template>
    </el-table-column>

    <el-table-column
      label="报名人数"
      prop="applyCount"
      width="50"
    >
      <template slot-scope="scope">
        <a
          style="cursor:pointer;display:inline-block;width:100%;min-width:40px;min-height:10px;"
          @click="handleRowClick(scope.row)"
        >{{scope.row.applyCount}}</a>
      </template>
    </el-table-column>

    <el-table-column
      fixed="right"
      label="操作"
      align="center"
      width="240"
    >
      <template slot-scope="scope">
        <!-- 普通用户操作按钮 -->
        <div v-if="!roleAdmin">
          <el-button
            v-if="scope.row.appliedStatus === 'normalApplied' || scope.row.appliedStatus === 'fullPeopleApplied' || scope.row.appliedStatus === 'overTimeApplied'"
            type="primary"
            title="已报名"
            size="mini"
            disabled
          >已报名</el-button>
          <el-button
            v-if="scope.row.appliedStatus === 'fullPeopleOverTime' || scope.row.appliedStatus === 'overTimeEnableApply' || scope.row.appliedStatus === 'overTimeApplied'"
            type="primary"
            title="已截止"
            size="mini"
            disabled
          >已截止</el-button>
          <el-button
            v-if="scope.row.appliedStatus === 'fullPeopleOverTime' || scope.row.appliedStatus === 'fullPeopleEnableApply' || scope.row.appliedStatus === 'fullPeopleApplied'"
            type="primary"
            title="已满员"
            size="mini"
            disabled
          >已满员</el-button>
          <el-button
            v-if="scope.row.appliedStatus === 'normalEnableApply'"
            type="primary"
            title="报名"
            size="mini"
            @click="handleApplyInternalCourse(scope.row)"
          >报&nbsp;&nbsp;&nbsp;名</el-button>
          <el-button
            type="primary"
            title="代报名"
            size="mini"
            v-if="rolePermission.isRegistration && (scope.row.appliedStatus === 'normalEnableApply' || scope.row.appliedStatus === 'normalApplied')"
            @click="handleReplaceApplyInternalCourseRecord(scope.row)"
          >代报名</el-button>
        </div>
        <!-- 管理员页面操作按钮 -->
        <div v-if="roleAdmin">
          <el-button
            type="primary"
            title="编辑课程"
            size="mini"
            v-if="scope.row.status === 'NotPublished' || scope.row.status === 'Published' || scope.row.status === 'PublishedGreen' || scope.row.status === 'Started'"
            :disabled="scope.row.status === 'Ended'"
            @click="openEditForm(scope.row)"
          >编辑</el-button>
          <el-button
            type="danger"
            title="删除课程"
            size="mini"
            v-if="scope.row.status === 'NotPublished' || scope.row.status === 'Published' || scope.row.status === 'PublishedGreen'"
            :disabled="scope.row.status === 'Started'"
            @click="handleDelectInternalCourse(scope.row.id)"
          >删除</el-button>
          <el-button
            type="warning"
            title="课程开课"
            size="mini"
            v-if="scope.row.status !== 'PublishedGreen' && scope.row.status !== 'Started' && scope.row.status !== 'Ended'"
            @click="handleStartInternalCourse(scope.row)"
          >开课</el-button>
          <el-button
            type="success"
            title="课程开课"
            size="mini"
            v-if="scope.row.status === 'PublishedGreen'"
            @click="handleStartInternalCourse(scope.row)"
          >开课</el-button>
          <el-button
            type="warning"
            title="取消开课"
            size="mini"
            v-if="scope.row.status === 'Started'"
            @click="handleCancelStartInternalCourse(scope.row.id)"
          >取消开课</el-button>
          <el-button
            title="课程调研"
            size="mini"
            :disabled="isDisabled"
            v-if="scope.row.status === 'NotPublished'"
            @click="handlePublishInternalCourse(scope.row.id)"
          >调研</el-button>
          <!-- <el-button
            title="调研中"
            size="mini"
            disabled
            v-if="scope.row.status !== 'NotPublished' && scope.row.status !== 'Started' && scope.row.status !== 'Ended'"
            @click="handleCancelPublishInternalCourse(scope.row.id)"
          >调研</el-button> -->
          <el-button
            title="课程小结"
            size="mini"
            v-if="scope.row.status === 'Ended' || scope.row.status === 'Started'"
            @click="handleInternalCourseRecordSummary(scope.row)"
          >课程小结</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {
  PublishInternalCourseRecord,
  StartInternalCourseRecord,
  CancelStartInternalCourseRecord,
  DeleteInternalCourseRecord,
  ApplyInternalCourse
} from "@api/sys.courseList";
export default {
  name: "internalTable",
  components: {},
  props: {
    tableData: Array,
    roleAdmin: Boolean,
    rolePermission: Object
  },
  data() {
    return {
      loading: false,
      isDisabled: false,
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
    // 表格切换页数等操作操作
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
    // 表格切换页数等操作操作
    // 报名
    handleApplyInternalCourse(row) {
      this.role = row;
      this.$confirm(`确认报名 " ${row.courseName} " 课程？`, "报名确认", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      })
        .then(() => {
          ApplyInternalCourse({
            ID: row.id
          }).then(res => {
            // console.log(row);
            if (res) {
              this.$message.success("报名成功!");
              this.$emit("reGetAdminCourseList", false);
            } else {
              this.$message.error("报名失败，请刷新页面或联系管理员!");
              this.$emit("reGetAdminCourseList", false);
            }
          });
        })
        .catch(() => {});
    },
    // 代报名
    handleReplaceApplyInternalCourseRecord(row) {
      this.role = row;
      this.$emit("openApplyCourse", row);
    },
    // 删除课程
    handleDelectInternalCourse(id) {
      this.$confirm("确认删除？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "删除",
        cancelButtonText: "取消"
      })
        .then(() => {
          DeleteInternalCourseRecord({
            ID: id
          }).then(res => {
            if (res) {
              this.$message.success("删除成功!");
              this.$emit("reGetAdminCourseList", true);
            } else {
              this.$message.error("删除失败!");
            }
          });
        })
        .catch(() => {});
    },
    // 开课 --- 教师姓名、培训地点、开始结束时间/日期
    handleStartInternalCourse(row) {
      let id = row.id;
      // let errorMsg;
      // if (!row.teacherName) {
      //   errorMsg = "请填写讲师姓名！";
      // } else if (!row.courseDate[0] || !row.courseDate[1]) {
      //   errorMsg = "请填写正确的开始、结束日期！";
      // } else if (!row.courseTime[0] || !row.courseTime[1]) {
      //   errorMsg = "请填写正确的开始、结束时间！";
      // } else if (!row.location) {
      //   errorMsg = "请填写培训地点！";
      // }
      if (row.status === "NotPublished") {
        this.$emit("openApplyCourse", row);
      } else {
        this.$confirm("确认开课？", "确认信息", {
          distinguishCancelAndClose: true,
          confirmButtonText: "开课",
          cancelButtonText: "取消"
        })
          .then(() => {
            StartInternalCourseRecord({
              ID: id
            }).then(res => {
              if (res.status === "true") {
                this.$message.success("已开课!");
                this.$emit("reGetAdminCourseList", true);
              } else {
                this.$message.error(`开课操作失败! ${res.message}`);
              }
            });
          })
          .catch(() => {});
      }
    },
    // 取消开课
    handleCancelStartInternalCourse(id) {
      this.$confirm("确认取消开课？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      })
        .then(() => {
          CancelStartInternalCourseRecord({
            ID: id
          }).then(res => {
            if (res) {
              this.$message.success("已取消开课!");
              this.$emit("reGetAdminCourseList", true);
            } else {
              this.$message.error("取消开课操作失败!");
            }
          });
        })
        .catch(() => {});
    },
    // 调研
    handlePublishInternalCourse(id) {
      this.isDisabled = true
      PublishInternalCourseRecord({
        ID: id
      }).then(res => {
        if (res) {
          this.isDisabled = false
          this.$message.success("已开始调研!");
          this.$emit("reGetAdminCourseList", true);
        } else {
          this.$message.error("开始调研失败!");
          this.isDisabled = false
        }
      });
      // }).catch(() => {});
    },
    // 课程小结
    handleInternalCourseRecordSummary(row) {
      this.$emit("openCourseSummary", row);
    },
    // 打开编辑课程表单
    openEditForm(role) {
      // console.log(role);
      if (role.status === "Started") {
        this.$emit("openCreateClass", role, "somePartEdit");
      } else {
        this.$emit("openCreateClass", role, "some");
      }
      // this.role = role;
      // this.editFormVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-button--mini {
  padding: 3px 5px !important;
}
</style>
