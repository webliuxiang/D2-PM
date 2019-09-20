<template>
  <el-dialog
    title="课程小结"
    :visible.sync="dialogVisible"
    @open="dialogOpen"
    width="50%"
    :close-on-click-modal="false"
  >
    <el-form
      v-if="courseSummaryData.status === 'Started' || courseSummaryData.status === 'Ended'"
      ref="formDialog"
      label-width="20%"
      size="small"
      v-loading="submitLoading"
    >
      <el-form-item
        label="已报名人员："
        v-if="courseSummaryData.status === 'Started'"
      >
        <el-table
          class="peopleBox"
          height="300px"
          :data="courseApplieded"
          v-loading="loading"
          size="small"
          stripe
          border
          highlight-current-row
          style="width: 90%;"
          :row-class-name="tableRowClassName"
        >
          <el-table-column type="index">
          </el-table-column>
          <el-table-column
            label="姓名"
            prop="name"
            :show-overflow-tooltip="true"
          ><template slot-scope="scope">{{scope.row.name}}</template></el-table-column>
          <el-table-column
            label="工号"
            prop="workNumber"
            :show-overflow-tooltip="true"
          ><template slot-scope="scope">{{scope.row.workNumber}}</template></el-table-column>
          <el-table-column
            label="部门"
            prop="dept"
            :show-overflow-tooltip="true"
          ><template slot-scope="scope">{{scope.row.dept}}</template></el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                type="danger"
                title="删除"
                size="mini"
                @click="delectPeople(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item
        label="已添加人员："
        v-if="courseSummaryData.status === 'Ended'"
      >
        <el-table
          class="peopleBox"
          height="300px"
          :data="replaceCourseSelected"
          v-loading="loading"
          size="small"
          stripe
          border
          highlight-current-row
          style="width: 90%;"
          :row-class-name="tableRowClassName"
        >
          <el-table-column type="index">
          </el-table-column>
          <el-table-column
            label="姓名"
            prop="name"
            :show-overflow-tooltip="true"
          ><template slot-scope="scope">{{scope.row.name}}</template></el-table-column>
          <el-table-column
            label="工号"
            prop="workNumber"
            :show-overflow-tooltip="true"
          ><template slot-scope="scope">{{scope.row.workNumber}}</template></el-table-column>
          <el-table-column
            label="部门"
            prop="dept"
            :show-overflow-tooltip="true"
          ><template slot-scope="scope">{{scope.row.dept}}</template></el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="添加人员：">
        <el-select
          class="selectBox"
          v-model="replaceCourseSelectWorkNumber"
          filterable
          multiple
          remote
          clearable
          reserve-keyword
          placeholder="请输入员工工号"
          :remote-method="remoteMethodWorkNumber"
          @focus="workNumberFocus"
          :loading="loading"
        >
          <el-option
            v-for="(item, key) in remoteWorkNumber.options"
            :key="key"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="large">
        <el-button
          type="primary"
          size="mini"
          :disabled="isDisabled"
          @click="submitSummary"
        >提交</el-button>
        <el-button
          size="mini"
          @click="dialogClose"
        >取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {
  UncShowEndedInternalCourse,
  ShowPeopleInEndedInternalCourse,
  EndInternalRecord
} from "@api/sys.courseList";
export default {
  name: "InternalCourseRecordSummary",
  components: {},
  props: {
    value: Boolean,
    isCourseRecordAdmin: Boolean,
    courseSummaryData: Object
  },
  data() {
    return {
      loading: false,
      submitLoading: false,
      isDisabled: false,
      timeOut: '',
      dialogVisible: false,
      // 已 报名 的 员工数据
      courseApplieded: [],
      // 已 报名 的 员工工号
      courseAppliededWorkNumber: [],
      // 已添加 到 小结 的 员工工号
      replaceCourseSelected: [],
      // 选择的 员工工号
      replaceCourseSelectWorkNumber: [],
      // 选择的 员工工号
      submitWorkNumber: [],
      remoteWorkNumber: {
        options: [],
        value: [],
        list: [],
        states: []
      }
    };
  },
  watch: {
    value(val) {
      this.dialogVisible = val;
    },
    dialogVisible(val) {
      this.$emit("input", val);
    }
  },
  methods: {
    // 提交小结
    submitSummary() {
      this.isDisabled = true
      this.submitLoading = true
      let applierStatus;
      if (this.courseSummaryData.status === "Started") {
        this.submitWorkNumber = [
          ...this.replaceCourseSelectWorkNumber,
          ...this.courseAppliededWorkNumber
        ];
        applierStatus = 0;
      } else if (this.courseSummaryData.status === "Ended") {
        this.submitWorkNumber = this.replaceCourseSelectWorkNumber
        applierStatus = 1;
      }
      EndInternalRecord({
        ParentID: this.courseSummaryData.id,
        ApplierNumber: this.submitWorkNumber,
        applierStatus: applierStatus
      }).then(res => {
        if (res) {
          this.$emit("reGetCourseSummaryList", true);
          this.dialogClose();
          this.$message.success(`课程小结发送成功！`)
          this.submitLoading = false
        }
      });
    },
    // 获取员工工号
    workNumberFocus() {
      let query = "";
      this.remoteMethodWorkNumber(query);
    },
    // 获取员工工号
    remoteMethodWorkNumber(query) {
      if (query !== "") {
        this.loading = true;
        // 获取工号数据
        this.GetWorkNumberData(query);
        setTimeout(() => {
          this.loading = false;
          this.remoteWorkNumber.options = this.remoteWorkNumber.list.filter(
            item => {
              return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
            }
          );
        }, 500);
      } else {
        this.remoteWorkNumber.options = [];
      }
    },
    // 获取员工工号数据
    GetWorkNumberData(data) {
      let applierStatus;
      if (this.courseSummaryData.status === "Started") {
        applierStatus = 0;
      } else if (this.courseSummaryData.status === "Ended") {
        applierStatus = 1;
      }
      UncShowEndedInternalCourse({
        UnClearWords: data,
        id: this.courseSummaryData.id,
        applierStatus: applierStatus,
        timestamp: new Date().getTime()
      }).then(res => {
        this.remoteWorkNumber.states = res;
        this.remoteWorkNumber.list = this.remoteWorkNumber.states.map(item => {
          return {
            value: item.workNumber,
            label: item.workNumber + " / " + item.name
          };
        });
      });
    },
    // 打开弹出框
    dialogOpen() {
      this.replaceCourseSelectWorkNumber = [];
      let applierStatus;
      if (this.courseSummaryData.status === "Started") {
        applierStatus = 0;
      } else if (this.courseSummaryData.status === "Ended") {
        applierStatus = 1;
      }
      ShowPeopleInEndedInternalCourse({
        id: this.courseSummaryData.id,
        applierStatus: applierStatus,
        timestamp: new Date().getTime()
      }).then(res => {
        if (this.courseSummaryData.status === "Started") {
          this.courseApplieded = res;
          this.courseAppliededWorkNumber = this.courseApplieded.map(item => {
            return item.workNumber;
          });
        }
        this.replaceCourseSelected = res;
      });
    },
    // 删除报名人员
    delectPeople(row) {
      this.courseApplieded.splice(row.index, 1);
      this.courseAppliededWorkNumber = this.courseApplieded.map(item => {
        return item.workNumber;
      });
    },
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex;
    },
    // 关闭弹出框
    dialogClose() {
      this.dialogVisible = false;
      this.timeOut = setTimeout(() => {
        this.isDisabled = false
      }, 1000);
    }
  }
};
</script>
<style lang="scss" scoped>
.selectBox {
  width: 90%;
}
.peopleBox {
  // min-height: 130px;
  max-height: 560px;
}
</style>
