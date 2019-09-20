<template>
  <el-dialog
    :title="editTableClass"
    :visible.sync="dialogVisible"
    @open="dialogOpen"
    width="50%"
    :close-on-click-modal="false"
  >
    <el-form
      ref="formDialog"
      :model="formData"
      label-width="20%"
      size="small"
    >
      <el-form-item
        prop="courseName"
        label="课程名称："
      >
        <el-input
          readonly
          v-model="formData.courseName"
        ></el-input>
      </el-form-item>

      <el-form-item
        prop="courseType"
        label="公开课/内训课："
      >
        <el-input
          readonly
          v-model="formData.courseType"
        ></el-input>
      </el-form-item>

      <el-form-item
        prop="courseDate"
        label="日期："
      >
        <el-date-picker
          readonly
          v-model="formData.startDate"
          type="date"
        >
        </el-date-picker>
        <span style="padding: 0 10px;">至</span>
        <el-date-picker
          readonly
          v-model="formData.endDate"
          type="date"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item
        label="课时："
        prop="courseHour"
      >
        <el-input
          readonly
          type="text"
          v-model="formData.courseHour"
        ></el-input>
      </el-form-item>

      <el-form-item
        prop="vendor"
        label="供应商："
      >
        <el-input
          readonly
          type="text"
          v-model="formData.vendor"
        ></el-input>
      </el-form-item>

      <el-form-item
        prop="location"
        label="培训地点："
      >
        <el-input
          readonly
          type="text"
          v-model="formData.location"
        ></el-input>
      </el-form-item>

      <el-form-item
        prop="learningType"
        label="学习类别："
      >
        <el-input
          readonly
          type="text"
          v-model="formData.learningType"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="管理/技术类："
        prop="contentType"
      >
        <el-input
          readonly
          type="text"
          v-model="formData.contentType"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="培训类别："
        prop="trainingType"
      >
        <el-input
          readonly
          type="text"
          v-model="formData.trainingType"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="参加培训人员："
        :min="0"
      >
        <span v-if="courseApplier.length < 1">无</span>
        <el-table
          v-if="courseApplier.length > 0"
          :data="courseApplier"
          style="width: 100%"
          height="250"
          size="mini"
          border
          stripe
        >
          <el-table-column type="index" fixed>
          </el-table-column>
          <el-table-column
            prop="workNumber"
            label="工号"
            fixed
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="100"
            fixed
          >
          </el-table-column>
          <el-table-column
            prop="dept"
            label="部门"
          >
          </el-table-column>
          <el-table-column
            prop="joinDate"
            label="入职日期"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="stuName"
            label="文化程度"
          >
          </el-table-column>
          <el-table-column
            prop="positionCode"
            label="职务/工种"
          >
          </el-table-column>
          <el-table-column
            prop="totalGrade"
            label="课程评估分"
            width="100"
          >
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { DeleteAttachment, ShowTrainingRecord, ShowPublicTrainingRecord } from "@api/sys.courseList";
import util from "@/libs/util.js";
export default {
  name: "courseReportsDetails",
  props: {
    role: Object,
    value: Boolean,
    editTableClass: String,
    isCourseManager: Boolean,
    isCourseRecordAdmin: Boolean,
    isInternalCourse: Boolean,
    formEditable: String,
    isReportsInternalCourse: Boolean
  },
  data() {
    return {
      loading: false,
      dialogVisible: false,
      dateInputVisible: true,
      // 不能修改的内容
      noEditable: false,
      fileList: [],
      formData: {
        recordID: "",
        courseName: "",
        startDate: "",
        endDate: "",
        courseHour: 0,
        vendor: "",
        location: "",
        courseType: "",
        contentType: "",
        trainingType: "",
        learningType: ""
      },
      // 课程小结人员
      courseApplier: [],
      CourseInfo: {},
      uploadUrl: process.env.VUE_APP_API + "/course/upload",
      // 附件列表
      attachments: [],
      headers: {
        Authorization: "Bearer " + util.cookies.get("token")
      }
    };
  },
  watch: {
    value(val) {
      this.dialogVisible = val;
    },
    dialogVisible(val) {
      this.$emit("input", val);
    },
    formEditable(newVal, oldVal) {
      // console.log(newVal);
      // console.log(oldVal);
    }
  },
  methods: {
    // 添加课程信息
    addCourseInfo() {
      this.CourseInfo.courseId = this.formData.id;
    },
    // 上传成功
    handleSuccess(response, file, fileList) {
      // 注意返回数据为数组，可能又多个文件信息
      this.ShowTrainingRecordData();
      this.$message.success(`文件 ${file.name} 上传成功！`);
    },
    // 上传失败
    handleError(file, fileList) {
      // console.log(fileList);
      this.$message.error(`文件 ${file.name} 上传失败！`);
    },
    // 下载上传的附件
    downloadFileHandle(data) {
      window.location.href = process.env.VUE_APP_API + data.downUrl;
      // let downLoadUrl = "fileID=" + data[0].fileID;
      // console.log(downLoadUrl);
      // downloadFile(downLoadUrl).then(res => {
      //   let blob = new Blob([res]);
      //   var fileName = data[0].fileName;
      //   if (window.navigator.msSaveOrOpenBlob) {
      //     navigator.msSaveBlob(blob, fileName);
      //   } else {
      //     let link = document.createElement("a");
      //     let evt = document.createEvent("HTMLEvents");
      //     evt.initEvent("click", false, false);
      //     link.href = URL.createObjectURL(blob);
      //     link.download = fileName;
      //     link.style.display = "none";
      //     document.body.appendChild(link);
      //     link.click();
      //     window.URL.revokeObjectURL(link.href);
      //   }
      // });
    },
    // 删除已经上传的附件
    delectFileHandle(data, key) {
      DeleteAttachment({
        FileID: data.fileID
      }).then(res => {
        if (res) {
          this.$message.success(`删除成功！`);
          this.ShowTrainingRecordData();
        } else {
          this.$message.error(`删除失败！`);
        }
      });
    },
    // 弹出框打开
    dialogOpen() {
      this.attachments = [];
      this.formData = {};
      if (
        this.formEditable !== "editable" ||
        this.formEditable === "somePartEdit"
      ) {
        this.ShowTrainingRecordData();
      }
    },
    // 关闭弹出框
    close() {
      this.dialogClose();
    },
    // 关闭弹出框
    dialogClose() {
      this.formData = {};
      // this.$refs["formDialog"].resetFields();
      this.dialogVisible = false;
    },
    // 获取课程详情
    ShowTrainingRecordData() {
      if (this.isReportsInternalCourse) {
        ShowTrainingRecord({
          RecordID: this.role.id,
          timestamp: new Date().getTime()
        }).then(res => {
          // console.log(res.attachments);
          this.formData = res;
          this.courseApplier = res.courseApplier;
        });
      } else if (!this.isReportsInternalCourse) {
        ShowPublicTrainingRecord({
          CourseName: this.role.courseName,
          startDate: this.role.startDate,
          endDate: this.role.endDate,
          city: this.role.city,
          timestamp: new Date().getTime()
        }).then(res => {
          // console.log(res.attachments);
          this.formData = res;
          this.courseApplier = res.courseApplier;
        });
      }
    }
  },
  created() {
    // console.log(this.editTableClass);
    if (this.editTableClass === "编辑课程") {
      this.noEditable = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.uploadList {
  list-style-type: none;
  margin: 10px 0 0 0;
  padding: 0;
  li {
    padding: 0 10px;
    border-radius: 5px;
  }
  li:hover {
    background: #f5f7fa;
    cursor: pointer;
  }
}
</style>
