<template>
  <el-table
    height="100%"
    ref="courseManger"
    :data="tableData"
    v-loading="loading"
    size="small"
    stripe
    highlight-current-row
    style="width: 100%;"
    @selection-change="handleSelectionChange"
    @row-click="handleClickRowSelection"
  >
    <el-table-column
      type="selection"
      width="55"
    >
    </el-table-column>

    <el-table-column
      label="课程编号"
      prop="courseNum"
      width="150"
      :show-overflow-tooltip="true"
    >
      <template slot-scope="scope">
        {{scope.row.courseNum}}
      </template>
    </el-table-column>

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
      label="课时"
      prop="courseHour"
      align="center"
    >
      <template slot-scope="scope">
        {{scope.row.courseHour}}
      </template>
    </el-table-column>

    <el-table-column
      label="学习类别"
      prop="learnType"
    >
      <template slot-scope="scope">
        {{scope.row.learnType}}
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
      label="供应商"
      prop="vendor"
      align="center"
    >
      <template slot-scope="scope">
        {{scope.row.vendor}}
      </template>
    </el-table-column>

    <el-table-column
      fixed="right"
      label="操作"
      width="100"
      align="center"
    >
      <template slot-scope="scope">
        <div>
          <el-button
            type="primary"
            title="编辑"
            size="mini"
            @click="editCourse(scope.row)"
          >编辑</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {
  AddMultiCourseRecord,
  DeleteMultiInternalCourse
} from "@api/sys.courseList";
export default {
  name: "courseManagerTable",
  components: {},
  props: {
    tableData: Array,
    multiAddCourseManagerStatus: Boolean,
    multiDeleteCourseManagerStatus: Boolean
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
  watch: {
    multiAddCourseManagerStatus(val) {
      if (val) {
        this.multiAddCourse();
      }
    },
    multiDeleteCourseManagerStatus(val) {
      if (val) {
        this.multiDelCourse();
      }
    }
  },
  mounted() {
    // console.log(this.tableData);
    // 获取课程列表信息
    // this.UserGetPublicCourseData()
  },
  methods: {
    // 批量删除
    multiDelCourse() {
      if (this.multipleSelection.length < 1) {
        this.$message.error("请选择!");
        this.$emit("multiDone", false);
      } else {
        this.$confirm("确认删除？", "确认信息", {
          distinguishCancelAndClose: true,
          confirmButtonText: "删除",
          cancelButtonText: "取消"
        })
          .then(res => {
            DeleteMultiInternalCourse(this.multipleSelection).then(res => {
              if (res) {
                this.$message.success("已删除!");
                this.$emit("multiDone", true);
              }
            });
          })
          .catch(err => {
            if (err) {
              this.$emit("multiDone", false);
            }
          });
      }
    },
    // 批量添加
    multiAddCourse() {
      if (this.multipleSelection.length < 1) {
        this.$message.error("请选择!");
        this.$emit("multiDone", false);
      } else {
        this.$confirm("确认添加？", "确认信息", {
          distinguishCancelAndClose: true,
          confirmButtonText: "添加",
          cancelButtonText: "取消"
        })
          .then(res => {
            AddMultiCourseRecord(this.multipleSelection).then(res => {
              if (res) {
                this.$message.success("已添加!");
                this.$emit("multiDone", true);
              }
            });
          })
          .catch(err => {
            if (err) {
              this.$emit("multiDone", false);
            }
          });
      }
    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // 获取多选的课程信息
      // console.log(this.multipleSelection);
    },
    // 点击行实现选择
    handleClickRowSelection(row, column) {
      if (column.label === "操作") {
        return;
      }
      this.$refs.courseManger.toggleRowSelection(row);
    },
    // 编辑课程管理
    editCourse(row) {
      this.$emit("openCreateClass", row, "some");
    }
  },
  created() {
    // console.log(this.tableData);
  }
};
</script>

<style lang="scss" scoped>
.el-button--mini {
  padding: 3px 5px !important;
}
</style>
