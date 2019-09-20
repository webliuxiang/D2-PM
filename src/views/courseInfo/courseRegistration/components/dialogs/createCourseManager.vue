<template>
  <el-dialog
    :title="editTableClass"
    :visible.sync="dialogVisible"
    @open="dialogOpen"
    width="50%"
    :close-on-click-modal="false"
  >
    <el-form
      :rules="createCourseManagerRules"
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
          v-model="formData.courseNum"
          placeholder="请输入课程编号"
        ></el-input>
      </el-form-item>

      <el-form-item
        prop="courseName"
        label="课程名称："
      >
        <el-input
          v-model="formData.courseName"
          placeholder="请填写课程名称"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="课时："
        prop="courseHour"
      >
        <el-input-number
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
          type="text"
          v-model="formData.vendor"
          placeholder="请填写供应商"
        ></el-input>
      </el-form-item>

      <el-form-item
        prop="learnType"
        label="学习类别："
      >
        <el-select
          v-model="formData.learnType"
          placeholder="请选择学习类别"
          clearable
        >
          <el-option
            label="脱产 Spare Time"
            value="脱产 Spare Time"
          ></el-option>
          <el-option
            label="业余 Off-job"
            value="业余 Off-job"
          ></el-option>
          <el-option
            label="半脱产 Half Off-job"
            value="半脱产 Half Off-job"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="管理/技术类："
        prop="contentType"
      >
        <el-select
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
          type="text"
          v-model="formData.trainingType"
          placeholder="请填写培训类别"
        ></el-input>
        <!-- <el-select
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
        label="教学大纲："
        prop="classDagang"
      >
        <div style="margin:10px;"></div>
        <!-- TODO: action="" -->
        <el-upload
          class="upload-dagang"
          :headers="headers"
          :data="CourseInfo"
          :before-upload="addCourseInfo"
          :action="uploadUrl"
          :on-success="handleSuccess"
          :on-error="handleError"
          :show-file-list="false"
          v-loading="loading"
        >
          <el-button
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

      <el-form-item>
        <el-button
          type="primary"
          :loading="loading"
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
  ShowInternalCourse,
  ModifyInternalCourse
} from "@api/sys.courseList";
import util from "@/libs/util.js";
export default {
  name: "createCourseManager",
  props: {
    courseManagerData: Object,
    value: Boolean,
    editTableClass: String,
    isCourseManager: Boolean,
    isInternalCourse: Boolean,
    formEditable: String
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
        courseName: "",
        courseNum: "",
        courseHour: 1,
        vendor: "",
        learnType: "",
        contentType: "",
        trainingType: ""
      },
      CourseInfo: {},
      // 表单验证规则
      createCourseManagerRules: {
        courseNum: [
          { required: true, message: '请输入课程编号', trigger: 'blur' },
          { max: 100, message: "长度应小于 100 个字符", trigger: "blur" }
        ],
        courseName: [
          { required: true, message: '请输入课程名称', trigger: 'blur' },
          { max: 500, message: "长度应小于 500 个字符", trigger: "blur" }
        ],
        learnType: [
          { required: true, message: '请选择学习类别', trigger: 'blur' }
        ],
        contentType: [
          { required: true, message: '请选择管理/技术类', trigger: 'blur' }
        ],
        trainingType: [
          { required: true, message: '请输入培训类别', trigger: 'blur' },
          { max: 50, message: "长度应小于 50 个字符", trigger: "blur" }
        ],
        vendor: [
          { max: 200, message: "长度应小于 200 个字符", trigger: "blur" }
        ]
      },
      uploadUrl: process.env.VUE_APP_API + '/api/course/upload',
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
      this.loading = true
      this.CourseInfo.courseId = this.courseManagerData.id;
    },
    // 上传成功
    handleSuccess(response, file, fileList) {
      // 注意返回数据为数组，可能又多个文件信息
      // 新建 课程管理 时 上传附件 后 显示 的 上传附件列表
      this.loading = false
      if (this.editTableClass === '新建课程管理') {
        this.attachments.push(response.data[0]);
      } else {
        // 编辑 课程管理 时 显示 的 上传附件列表
        this.ShowInternalCourseData();
      }
      this.$message.success(`文件 ${file.name} 上传成功！`);
    },
    // 上传失败
    handleError(file, fileList) {
      // console.log(fileList);
      this.loading = false
      this.$message.error(`文件 ${file.name} 上传失败！`);
    },
    // 下载文件
    downloadFileHandle(data) {
      // console.log(data);
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
    // 删除已上传文件
    delectFileHandle(data, key) {
      DeleteAttachment({
        FileID: data.fileID
      }).then(res => {
        if (res) {
          this.$message.success(`删除成功！`);
          if (this.editTableClass === '新建课程管理') {
            let arrIndex = this.attachments.findIndex(value => {
              return value.fileID === data.fileID
            })
            this.attachments.splice(arrIndex, 1)
          } else {
            // 编辑 课程管理 时 显示 的 上传附件列表
            this.ShowInternalCourseData();
          }
        } else {
          this.$message.error(`删除失败！`);
        }
      });
    },
    // 打开弹出框
    dialogOpen() {
      this.attachments = [];
      this.formData = {};
      if (this.formEditable !== "editable") {
        this.formData = { ...this.courseManagerData }
        // TODO:获取大纲列表
        this.ShowInternalCourseData();
      }
    },
    // 提交数据
    onSubmit() {
      this.$refs["formDialog"].validate((valid) => {
        if (valid) {
          if (this.formEditable === "some") {
            ModifyInternalCourse({
              id: this.formData.id,
              courseNum: this.formData.courseNum,
              courseName: this.formData.courseName,
              learnType: this.formData.learnType,
              contentType: this.formData.contentType,
              trainingType: this.formData.trainingType,
              vendor: this.formData.vendor,
              courseHour: this.formData.courseHour
            }).then(res => {
              if (res) {
                this.dialogClose();
                this.$message.success(`编辑成功！`);
                this.$emit("reGetAdminCourseList", true);
              } else {
                this.$message.error(`编辑失败！`);
              }
            });
          } else {
            AddInternalCourse({
              id: this.courseManagerData.id,
              courseNum: this.formData.courseNum,
              courseName: this.formData.courseName,
              learnType: this.formData.learnType,
              contentType: this.formData.contentType,
              trainingType: this.formData.trainingType,
              vendor: this.formData.vendor,
              courseHour: this.formData.courseHour
            }).then(res => {
              if (res) {
                this.dialogClose();
                this.$emit("reGetAdminCourseList", true);
              } else {
                this.$message.error(`创建失败！`);
              }
            });
          }
        } else {
          return false;
        }
      })
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
    },
    // 获取附件列表
    ShowInternalCourseData() {
      ShowInternalCourse({
        CourseID: this.courseManagerData.id,
        timestamp: new Date().getTime()
      }).then(res => {
        this.attachments = res.attachments;
        // this.formData = res.courseRecordInfo;
      });
    }
  },
  created() {
    // console.log(process.env.VUE_APP_API);
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
