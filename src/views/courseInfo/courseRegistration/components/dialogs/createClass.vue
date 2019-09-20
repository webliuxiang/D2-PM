<template>
  <el-dialog
    :title="editTableClass"
    :visible.sync="dialogVisible"
    @open="dialogOpen"
    width="50%"
    :close-on-click-modal="false"
  >
    <el-form
      :rules="createClassRules"
      ref="formDialog"
      :model="formData"
      label-width="20%"
      size="small"
    >
      <el-form-item
        prop="courseNum"
        label="课程编号："
      >
        <el-input
          disabled
          v-model="formData.courseNum"
          placeholder=""
        ></el-input>
      </el-form-item>

      <el-form-item
        prop="courseName"
        label="课程名称："
      >
        <el-input
          :disabled="formEditable === 'disabled' || formEditable === 'some' || formEditable === 'somePartEdit'"
          v-model="formData.courseName"
          placeholder="请填写课程名称"
        ></el-input>
      </el-form-item>

      <el-form-item
        prop="teacherName"
        label="讲师姓名："
      >
        <el-input
          :disabled="formEditable === 'disabled' || formEditable === 'somePartEdit'"
          type="text"
          v-model="formData.teacherName"
          placeholder="请填写讲师姓名"
        ></el-input>
      </el-form-item>

      <el-form-item
        prop="teacherNumber"
        label="讲师工号："
      >
        <el-input
          :disabled="formEditable === 'disabled' || formEditable === 'somePartEdit'"
          type="text"
          v-model="formData.teacherNumber"
          placeholder="请填写讲师工号"
        ></el-input>
      </el-form-item>

      <el-form-item
        prop="courseDate"
        label="日期："
      >
        <el-date-picker
          :disabled="formEditable === 'disabled' || formEditable === 'somePartEdit'"
          v-model="formData.startDate"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
        <span style="padding: 0 10px;">至</span>
        <el-date-picker
          :disabled="formEditable === 'disabled' || formEditable === 'somePartEdit'"
          v-model="formData.endDate"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item
        prop="courseTime"
        label="时间："
      >
        <el-time-select
          :disabled="formEditable === 'disabled'"
          v-model="formData.startTime"
          :picker-options="{
            start: '08:00',
            step: '00:15',
            end: '17:00'
          }"
          placeholder="请选择时间"
        >
        </el-time-select>
        <span style="padding: 0 10px;">至</span>
        <el-time-select
          :disabled="formEditable === 'disabled'"
          v-model="formData.endTime"
          :picker-options="{
            start: '08:00',
            step: '00:15',
            end: '17:00'
          }"
          placeholder="请选择时间"
        >
        </el-time-select>
      </el-form-item>

      <el-form-item
        label="课时："
        prop="courseHour"
      >
        <el-input-number
          :disabled="formEditable === 'disabled' || formEditable === 'some' || formEditable === 'somePartEdit'"
          v-model="formData.courseHour"
          :min="0"
          :precision="1"
          label="课时"
        ></el-input-number>
      </el-form-item>

      <el-form-item
        prop="vendor"
        label="供应商："
      >
        <el-input
          :disabled="formEditable === 'disabled' || formEditable === 'some' || formEditable === 'somePartEdit'"
          type="text"
          v-model="formData.vendor"
          placeholder="请填写供应商"
        ></el-input>
      </el-form-item>

      <el-form-item
        prop="location"
        label="培训地点："
      >
        <el-input
          :disabled="formEditable === 'disabled' || formEditable === 'somePartEdit'"
          type="text"
          v-model="formData.location"
          placeholder="请填写培训地址"
        ></el-input>
      </el-form-item>

      <el-form-item
        prop="learnType"
        label="学习类别："
      >
        <el-select
          :disabled="formEditable === 'disabled' || formEditable === 'some' || formEditable === 'somePartEdit'"
          v-model="formData.learnType"
          placeholder="请选择学习类别"
          clearable
        >
          <el-option
            label="脱产"
            value="脱产"
          ></el-option>
          <el-option
            label="业余"
            value="业余"
          ></el-option>
          <el-option
            label="半脱产"
            value="半脱产"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="管理/技术类："
        prop="contentType"
      >
        <el-select
          :disabled="formEditable === 'disabled' || formEditable === 'some' || formEditable === 'somePartEdit'"
          v-model="formData.contentType"
          placeholder="请选择管理/技术类"
          clearable
        >
          <el-option
            label="管理类"
            value="管理类"
          ></el-option>
          <el-option
            label="技术类"
            value="技术类"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="培训类别："
        prop="trainingType"
      >
        <el-input
          :disabled="formEditable === 'disabled' || formEditable === 'some' || formEditable === 'somePartEdit'"
          type="text"
          v-model="formData.trainingType"
          placeholder=""
        ></el-input>
        <!-- <el-select
          :disabled="formEditable === 'disabled' || formEditable === 'some'"
          v-model="formData.trainingType"
          placeholder="请选择培训类别"
          clearable
        >
          <el-option
            label="持续"
            value="持续"
          ></el-option>
          <el-option
            label="非持续"
            value="非持续"
          ></el-option>
        </el-select> -->
      </el-form-item>

      <el-form-item
        label="报名截止时间："
        prop="deadLine"
      >
        <el-date-picker
          v-model="formData.deadLine"
          type="date"
          :disabled="formEditable === 'disabled' || formEditable === 'somePartEdit'"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item
        label="最小人数："
        prop="min"
        :min="0"
      >
        <el-input-number
          v-model="formData.min"
          :min="0"
          :disabled="formEditable === 'disabled' || formEditable === 'somePartEdit'"
        ></el-input-number>
      </el-form-item>

      <el-form-item
        label="最大人数："
        prop="max"
        :min="0"
      >
        <el-input-number
          v-model="formData.max"
          :min="0"
          :disabled="formEditable === 'disabled' || formEditable === 'somePartEdit'"
        ></el-input-number>
      </el-form-item>

      <el-form-item
        label="报名人数："
        prop="applyCount"
        v-if="!isCourseRecordAdmin"
        :min="0"
      >
        <el-input-number
          v-model="formData.applyCount"
          :min="0"
          disabled
        ></el-input-number>
      </el-form-item>

      <el-form-item
        label="报名人员："
        v-if="isCourseRecordAdmin"
        :min="0"
      >
        <span v-if="appliedPerson.length < 1">无</span>
        <el-table
          v-if="appliedPerson.length > 0"
          :data="appliedPerson"
          style="width: 100%"
          size="mini"
        >
          <el-table-column
            prop="workNumber"
            label="工号"
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
            prop="dept"
            label="部门"
          >
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item
        label="教学大纲："
        prop="classDagang"
        v-if="formEditable === 'editable'"
      >
        <div style="margin:10px;"></div>
        <el-upload
          class="upload-dagang"
          :disabled="formEditable === 'disabled' || formEditable === 'somePartEdit'"
          :headers="headers"
          :data="CourseInfo"
          :before-upload="addCourseInfo"
          :action="uploadUrl"
          :on-success="handleSuccess"
          :on-error="handleError"
          :show-file-list="false"
        >
          <el-button
            :disabled="formEditable === 'disabled' || formEditable === 'somePartEdit'"
            size="small"
            type="primary"
          >上传教学大纲</el-button>
          <span
            slot="tip"
            class="el-upload__tip"
          > 选中文件，自动上传</span>
        </el-upload>
        <template>
          <div>
            <ul class="uploadList">
              <li
                v-for="(item, key) in attachments"
                :key="key"
              >
                <a
                  @click="downloadFileHandle(item)"
                  style="display:inline-block;width:90%;"
                >
                  <span>{{item.fileName}}</span>
                  <!-- <span>&emsp;<i class="el-icon-download"></i></span> -->
                </a>
                <span
                  @click="delectFileHandle(item, key)"
                  style="float:right;display:inline-block;width:5%;"
                ><i class="el-icon-close"></i></span>
              </li>
            </ul>
          </div>
        </template>
      </el-form-item>

      <el-form-item
        label="教学大纲："
        prop="attachments"
        v-if="formEditable === 'disabled' || formEditable === 'some' || formEditable === 'somePartEdit'"
      >
        <ul
          class="uploadList"
          v-if="attachments.length !== 0"
        >
          <li
            v-for="(item, key) in attachments"
            :key="key"
          >
            <a
              @click="downloadFileHandle(item)"
              style="display:inline-block;width:90%;"
            >
              <span>{{item.fileName}}</span>
              <!-- <span>&emsp;<i class="el-icon-download"></i></span> -->
            </a>
          </li>
        </ul>
        <span v-if="attachments.length === 0">无</span>
      </el-form-item>

      <el-form-item v-if="formEditable !== 'disabled' || formEditable === 'somePartEdit'">
        <el-button
          type="primary"
          :loading="loading"
          :disabled="isDisabled"
          @click="onSubmit"
        >保存</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>

  </el-dialog>

</template>
<script>
import {
  AddInternalCourse,
  DeleteAttachment,
  ShowInternalCourseRecord,
  ModifyInternalCourseRecord,
  ModifyStartedInternalCourseRecord
} from "@api/sys.courseList";
import util from "@/libs/util.js";
export default {
  name: "createClass",
  props: {
    role: Object,
    value: Boolean,
    editTableClass: String,
    isCourseManager: Boolean,
    isCourseRecordAdmin: Boolean,
    isInternalCourse: Boolean,
    formEditable: String
  },
  data() {
    return {
      loading: false,
      isDisabled: false,
      timeOut: "",
      dialogVisible: false,
      dateInputVisible: true,
      // 不能修改的内容
      noEditable: false,
      fileList: [],
      formData: {
        id: "",
        teacherId: "",
        teacherName: "",
        courseName: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        courseHour: 1,
        vendor: "",
        location: "",
        learnType: "",
        contentType: "",
        trainingType: "",
        deadLine: "",
        min: 1,
        max: 1,
        applyCount: "",
        courseTime: []
      },
      CourseInfo: {},
      // 表单验证规则
      createClassRules: {
        teacherName: [
          { max: 50, message: "长度应小于 50 个字符", trigger: "blur" }
        ],
        teacherNumber: [
          { max: 50, message: "长度应小于 50 个字符", trigger: "blur" }
        ],
        location: [
          { max: 200, message: "长度应小于 200 个字符", trigger: "blur" }
        ]
      },
      uploadUrl: process.env.VUE_APP_API + "/course/upload",
      // 附件列表
      attachments: [],
      // 报名人员列表
      appliedPerson: [],
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
      this.ShowInternalCourseRecordData();
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
          this.ShowInternalCourseRecordData();
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
        this.ShowInternalCourseRecordData();
      }
    },
    // 提交数据
    onSubmit() {
      // console.log(this.formEditable);
      this.$refs["formDialog"].validate(valid => {
        if (valid) {
          this.isDisabled = true;
          if (this.formEditable === "some") {
            ModifyInternalCourseRecord({
              id: this.formData.id,
              teacherNumber: this.formData.teacherNumber,
              teacherName: this.formData.teacherName,
              startDate: this.formData.startDate,
              endDate: this.formData.endDate,
              startTime: this.formData.startTime,
              endTime: this.formData.endTime,
              location: this.formData.location,
              deadLine: this.formData.deadLine,
              min: this.formData.min === 0 ? "" : this.formData.min,
              max: this.formData.max === 0 ? "" : this.formData.max
            }).then(res => {
              if (res) {
                this.dialogClose();
                this.$message.success(`编辑成功！`);
                this.$emit("reGetAdminCourseList", true);
              } else {
                this.$message.error(`编辑失败！`);
                this.isDisabled = false;
              }
            });
          } else if (this.formEditable === "somePartEdit") {
            ModifyStartedInternalCourseRecord({
              id: this.formData.id,
              teacherNumber: this.formData.teacherNumber,
              teacherName: this.formData.teacherName,
              startDate: this.formData.startDate,
              endDate: this.formData.endDate,
              startTime: this.formData.startTime,
              endTime: this.formData.endTime,
              location: this.formData.location,
              deadLine: this.formData.deadLine,
              min: this.formData.min === 0 ? "" : this.formData.min,
              max: this.formData.max === 0 ? "" : this.formData.max
            }).then(res => {
              if (res) {
                this.dialogClose();
                this.$message.success(`编辑成功！`);
                this.$emit("reGetAdminCourseList", true);
              } else {
                this.$message.error(`编辑失败！`);
                this.isDisabled = false;
              }
            });
          } else {
            AddInternalCourse({
              id: this.formData.id,
              teacherId: this.formData.teacherId,
              teacherName: this.formData.teacherName,
              courseName: this.formData.courseName,
              startDate: this.formData.startDate,
              endDate: this.formData.endDate,
              startTime: this.formData.startTime,
              endTime: this.formData.endTime,
              courseHour: this.formData.courseHour,
              vendor: this.formData.vendor,
              location: this.formData.location,
              learnType: this.formData.learnType,
              contentType: this.formData.contentType,
              trainingType: this.formData.trainingType,
              deadLine: this.formData.deadLine,
              min: this.formData.min === 0 ? "" : this.formData.min,
              max: this.formData.max === 0 ? "" : this.formData.max
            }).then(res => {
              if (res) {
                this.dialogClose();
                this.$emit("reGetAdminCourseList", true);
              } else {
                this.$message.error(`创建失败！`);
                this.isDisabled = false;
              }
            });
          }
        } else {
          return false;
        }
      });
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
      this.$refs["formDialog"].clearValidate()
      // this.isDisabled = false
      this.timeOut = setTimeout(() => {
        this.isDisabled = false;
      }, 1000);
    },
    // 获取附件列表
    ShowInternalCourseRecordData() {
      ShowInternalCourseRecord({
        RecordID: this.role.id,
        timestamp: new Date().getTime()
      }).then(res => {
        this.attachments = res.attachments;
        this.formData = res.courseRecordInfo;
        this.appliedPerson = res.courseApplierToAdminShow;
      });
    }
  },
  created() {
    // console.log(this.editTableClass);
    if (this.editTableClass === "编辑课程") {
      this.noEditable = true;
    }
  },
  beforeDestroy() {
    clearInterval(this.timeOut);
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
