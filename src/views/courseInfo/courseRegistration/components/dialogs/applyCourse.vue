<template>
  <el-dialog
    :visible.sync="dialogVisible"
    @open="dialogOpen"
    width="50%"
    :close-on-click-modal="false"
  >
    <!-- 管理员用户 的 普通员工 权限 （报名） -->
    <el-form
      v-if="!isCourseRecordAdmin"
      ref="formDialog"
      label-width="20%"
      size="small"
    >
      <el-form-item label="选择人员：">
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
          @click="replaceApplyCourse"
        >代报名</el-button>
        <el-button
          size="mini"
          @click="dialogClose"
        >取消</el-button>
      </el-form-item>
    </el-form>
    <!-- 管理员用户 的 课程管理员 权限 （开课） -->
    <el-form
      v-if="isCourseRecordAdmin"
      ref="formDialog"
      label-width="20%"
      size="small"
    >
      <el-form-item label="请选择参加人员：">
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
          size="mini"
          type="primary"
          :disabled="isDisabled"
          @click="replaceApplyCourseAdmin"
        >确认</el-button>
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
  UncSearchEmployee,
  ApplyPersonForLesson,
  ApplyInternalCourse,
  UncAdminUnClearSearchApplier,
  AdminAddApplyPersonAsync
} from "@api/sys.courseList";
export default {
  name: "appleCourse",
  components: {},
  props: {
    value: Boolean,
    isCourseRecordAdmin: Boolean,
    applyCourseData: Object
  },
  data() {
    return {
      loading: false,
      isDisabled: false,
      timeOut: '',
      dialogVisible: false,
      replaceApplySwitch: 3,
      replaceApplyCourseBox: false,
      // 员工工号
      replaceCourseSelectWorkNumber: [],
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
        if (this.isCourseRecordAdmin) {
          this.GetAdminWorkNumberData(query);
        } else {
          this.GetWorkNumberData(query);
        }
        setTimeout(() => {
          this.loading = false;
          this.remoteWorkNumber.options = this.remoteWorkNumber.list.filter(
            item => {
              return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
            }
          );
        }, 500);
      } else {
        this.remoteWorkNumber.options = []
      }
    },
    // 获取 员工工号 数据 --- 代报名
    GetWorkNumberData(data) {
      UncSearchEmployee({
        ID: this.applyCourseData.id,
        UnClearWords: data,
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
    // 获取 员工工号 数据 --- 开课添加人员
    GetAdminWorkNumberData(data) {
      UncAdminUnClearSearchApplier({
        ID: this.applyCourseData.id,
        UnClearWords: data,
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
    // 提交 员工工号 数据 --- 代报名权限用户
    SubmitWorkNumberData(data) {
      this.isDisabled = true
      ApplyPersonForLesson({
        ParentID: this.applyCourseData.id,
        ApplierNumber: data
      }).then(res => {
        if (res) {
          this.$message.success("报名成功!");
          this.$emit("reGetAdminCourseList", false);
          this.dialogClose();
        } else {
          this.$message.error("请检查添加人数！");
          this.isDisabled = false
        }
      });
    },
    // 提交 员工工号 数据 --- 管理员
    SubmitWorkNumberDataAdmin(data) {
      this.isDisabled = true
      AdminAddApplyPersonAsync({
        ParentID: this.applyCourseData.id,
        ApplierNumber: data
      }).then(res => {
        if (res.status === "true") {
          this.$emit("reGetAdminCourseList", true);
          this.dialogClose();
          this.$message.success(`已开课！`);
        } else {
          this.$message.error(`${res.message}`);
          this.isDisabled = false
        }
      });
    },
    // 普通报名
    applyCourse() {
      this.isDisabled = true
      ApplyInternalCourse({
        ID: this.applyCourseData.id
      }).then(res => {
        // console.log(row);
        if (res) {
          this.dialogClose();
          this.$message.success("报名成功!");
          this.$emit("reGetAdminCourseList", false);
        } else {
          this.$message.error("报名失败，请刷新页面或联系管理员!");
          this.$emit("reGetAdminCourseList", false);
          this.isDisabled = false
        }
      });
    },
    // 开课
    replaceApplyCourseAdmin() {
      this.SubmitWorkNumberDataAdmin(this.replaceCourseSelectWorkNumber);
    },
    // 代报名
    replaceApplyCourse() {
      if (this.replaceCourseSelectWorkNumber.length === 0) {
        this.dialogClose();
        return
      }
      this.SubmitWorkNumberData(this.replaceCourseSelectWorkNumber);
    },
    //   切换代报名
    checkReplaceApplyCourse(val) {
      switch (val) {
        case 3:
          this.replaceApplyCourseBox = false;
          break;
        case 6:
          this.replaceApplyCourseBox = true;
          break;

        default:
          break;
      }
    },
    // 弹出框打开
    dialogOpen() {
      this.replaceCourseSelectWorkNumber = [];
      this.remoteWorkNumber = {
        options: [],
        value: [],
        list: [],
        states: []
      };
      this.replaceApplySwitch = 3;
      this.replaceApplyCourseBox = false;
    },
    // 关闭弹出框
    dialogClose() {
      this.dialogVisible = false;
      this.timeOut = setTimeout(() => {
        this.isDisabled = false
      }, 1000)
    }
  },
  beforeDestroy() {
    clearInterval(this.timeOut);
  }
};
</script>
<style lang="scss" scoped>
.selectBox {
  width: 90%;
}
</style>
