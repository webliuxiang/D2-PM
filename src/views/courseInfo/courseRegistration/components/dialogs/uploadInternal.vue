<template>
  <el-dialog
    :title="editTableClass"
    :visible.sync="dialogVisible"
    @opened="dialogOpen"
    width="30%"
    v-cloak
  >
    <div v-if="courseType !== 'isOtherPublicCourse'">
      <span
        v-cloak
        class="dialogText"
      >请先下载导入模板！</span>
      <div>
        <el-button
          v-cloak
          size="small"
          type="primary"
          @click="downloadTemplate"
        >下载模板</el-button>
        <el-upload
          v-cloak
          class="uploadFile"
          :action="importUrl"
          :headers="headers"
          :before-upload="handleBefore"
          :before-remove="beforeRemove"
          :multiple="multipleStatus"
          :file-list="fileList"
          :show-file-list="false"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          v-loading="loading"
        >
          <el-button
            size="small"
            type="primary"
          >点击上传</el-button>
          <!-- <span
          slot="tip"
          class="el-upload__tip"
        >&nbsp;限制文件格式为&nbsp;<code style="padding:3px;background:#e4e4e4;border-radius:5px;">.xlsx</code>&nbsp;或&nbsp;<code style="padding:3px;background:#e4e4e4;border-radius:5px;">.xls</code></span> -->
          <div
            slot="tip"
            class="el-upload__tip"
            style="margin:10px;"
          ></div>
        </el-upload>
      </div>
    </div>
  </el-dialog>
</template>
<script>
// import { ImportPublicCourse } from '@api/sys.courseList'
import util from "@/libs/util.js";
export default {
  name: "uploadInternal",
  props: {
    value: Boolean,
    // 弹出框标题
    editTableClass: String,
    // 课程类别
    isInternalCourse: Boolean,
    // 课程管理
    isCourseManager: Boolean,
    // 其他公开课
    isOtherPublicCourse: Boolean
  },
  data() {
    return {
      loading: false,
      dialogVisible: false,
      multipleStatus: false,
      courseType: "",
      fileList: [],
      importUrl: "",
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
    }
  },
  methods: {
    // 弹出框打开
    dialogOpen() {
      // TODO:内训课时需要添加提示信息
      if (
        this.isInternalCourse &&
        !this.isOtherPublicCourse &&
        !this.isCourseManager
      ) {
        this.courseType = "isInternalCourse";
        this.multipleStatus = false;
        this.importUrl =
          process.env.VUE_APP_API + "/api/course/ImportInternalRecord";
      } else if (
        !this.isInternalCourse &&
        !this.isOtherPublicCourse &&
        !this.isCourseManager
      ) {
        this.courseType = "isPublicCourse";
        this.multipleStatus = false;
        this.importUrl =
          process.env.VUE_APP_API + "/api/course/ImportPublicCourse";
      } else if (
        this.isOtherPublicCourse &&
        !this.isCourseManager &&
        (this.isInternalCourse || !this.isInternalCourse)
      ) {
        this.courseType = "isOtherPublicCourse";
        this.multipleStatus = true;
        this.importUrl =
          process.env.VUE_APP_API + "/api/course/ImportExtraCourse";
      } else if (
        this.isCourseManager &&
        !this.isOtherPublicCourse &&
        (this.isInternalCourse || !this.isInternalCourse)
      ) {
        this.courseType = "isCourseManager";
        this.multipleStatus = false;
        this.importUrl = process.env.VUE_APP_API + "/api/course/ImportInternalCourse";
      }
    },
    // uploadFile(item) {
    //   console.log(item);
    //   let formData = new FormData()
    //   formData.append('file', item.file)
    //   console.log();
    //   ImportPublicCourse({
    //     data: formData,
    //   }).then(res => {
    //     console.log(res);
    //   }).catch(err => {
    //     console.log(err);
    //   })
    // },
    // 下载模板
    downloadTemplate() {
      let downUrl;
      if (this.courseType === "isInternalCourse") {
        downUrl =
          process.env.VUE_APP_API +
          "/api/course/BasicMould?Type=isInternalCourse";
      } else if (this.courseType === "isCourseManager") {
        downUrl =
          process.env.VUE_APP_API +
          "/api/course/BasicMould?Type=isCourseManager";
      } else if (this.courseType === "isPublicCourse") {
        downUrl =
          process.env.VUE_APP_API +
          "/api/course/BasicMould?Type=isPublicCourse";
      }
      window.location.href = downUrl;
    },
    // loading
    handleBefore() {
      this.loading = true;
    },
    // // 删除上传的附件
    // handleRemove(file, fileList) {
    //   console.log(file, fileList);
    // },
    // // 点击文件列表中已上传的文件时
    // handlePreview(file) {
    //   console.log(file);
    // },
    beforeRemove(file, fileList) {
      //   return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 上传成功
    uploadSuccess(response, file, fileList) {
      this.loading = false;
      if (response.data.status === "true") {
        this.$message.success(`文件上传成功！`);
        this.$emit("regetCourseData", this.courseType);
      } else {
        this.$message.error(`${response.data.message}`);
      }
    },
    // 上传失败
    uploadError(err, file, fileList) {
      if (err) {
        this.loading = false;
        this.$message.error(`文件 ${file.name} 上传失败！`);
      }
    },
    // 弹出框关闭
    dialogClose() {
      this.dialogVisible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.dialogText {
  display: inline-block;
  margin-top: -20px;
  margin-bottom: 10px;
}
.uploadFile {
  display: inline-block;
  margin-left: 15px;
}
[v-cloak] {
  display: none;
}
</style>
