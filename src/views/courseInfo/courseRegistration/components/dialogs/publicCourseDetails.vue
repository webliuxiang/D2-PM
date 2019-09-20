<template>
  <el-dialog
    :title="editTableClass"
    :visible.sync="dialogVisible"
    @opened="dialogOpen"
    @closed="dialogClose"
    width="50%"
  >
    <el-form
      ref="form"
      :model="form"
      label-width="20%"
      size="small"
    >
      <el-form-item
        prop="courseNum"
        label="课程编号："
      >
        <el-input
          :disabled="formEditable !== 'editable'"
          v-model="form.courseNum"
        ></el-input>
      </el-form-item>

      <el-form-item
        prop="classification"
        label="课程分类："
      >
        <el-input
          :disabled="formEditable !== 'editable'"
          v-model="form.classification"
        ></el-input>
      </el-form-item>

      <el-form-item
        prop="courseName"
        label="课程名称："
      >
        <el-input
          :disabled="formEditable !== 'editable'"
          v-model="form.courseName"
        ></el-input>
      </el-form-item>

      <el-form-item
        prop="courseModule"
        label="课程模块："
      >
        <el-input
          :disabled="formEditable !== 'editable'"
          v-model="form.courseModule"
        ></el-input>
      </el-form-item>

      <el-form-item
        prop="courseDate"
        label="日期："
      >
        <!-- <el-date-picker
          v-model="form.courseDate"
          :disabled="formEditable === 'disabled'"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker> -->
        <el-date-picker
          :disabled="formEditable === 'disabled' || formEditable === 'somePartEdit'"
          v-model="form.startDate"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
        <span style="padding: 0 10px;">至</span>
        <el-date-picker
          :disabled="formEditable === 'disabled' || formEditable === 'somePartEdit'"
          v-model="form.endDate"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item
        prop="trainingCity"
        label="培训地点："
      >
        <el-input
          :disabled="formEditable === 'disabled'"
          type="text"
          v-model="form.trainingCity"
        ></el-input>
      </el-form-item>

      <el-form-item
        prop="vendor"
        label="供应商："
      >
        <el-input
          :disabled="formEditable === 'disabled'"
          type="text"
          v-model="form.vendor"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="天数："
        prop="daysCount"
      >
        <el-input-number
          :disabled="formEditable === 'disabled'"
          v-model="form.daysCount"
          :precision="1"
          label="天数"
        ></el-input-number>
      </el-form-item>

      <el-form-item
        label="价格："
        prop="trainingPrice"
      >
        <el-input-number
          :disabled="formEditable === 'disabled'"
          v-model="form.trainingPrice"
          :min="0"
          :precision="0"
          label="价格"
        ></el-input-number>
      </el-form-item>

      <el-form-item
        prop="comment"
        label="备注："
      >
        <el-input
          :disabled="formEditable === 'disabled'"
          type="text"
          v-model="form.comment"
        ></el-input>
      </el-form-item>

    </el-form>

  </el-dialog>

</template>
<script>
export default {
  name: "publicCourseDetails",
  props: {
    role: Object,
    value: Boolean,
    editTableClass: String,
    formEditable: String
  },
  data() {
    return {
      loading: false,
      dialogVisible: false,
      // 不能修改的内容
      noEditable: false,
      fileList: [],
      form: {
        id: "",
        courseNum: "",
        classification: "",
        courseModule: "",
        courseName: "",
        daysCount: "",
        vendor: "",
        startDate: "",
        endDate: "",
        trainingPrice: "",
        courseDate: "",
        trainingCity: ""
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
    // 上传成功
    handleSuccess(response, file, fileList) {
      this.$message.success(`文件 ${file.name} 上传成功！`);
    },
    // 弹出框打开
    dialogOpen() {
      this.form = this.role;
      this.form.courseDate = [this.form.startDate, this.form.endDate];
    },
    // 弹出框关闭
    close() {
      this.dialogClose();
    },
    // 弹出框关闭
    dialogClose() {
      // this.$refs["form"].resetFields();
      this.dialogVisible = false;
    }
  },
  created() {
    if (this.editTableClass === "编辑课程") {
      this.noEditable = true;
    }
  }
};
</script>
