<template>
  <el-table
    height="100%"
    :data="tableData"
    v-loading="loading"
    size="small"
    stripe
    highlight-current-row
    style="width: 100%;"
  >
    <el-table-column type="index">
    </el-table-column>
    <el-table-column
      label="文件名称"
      prop="fileName"
      :show-overflow-tooltip="true"
    >
      <template slot-scope="scope">
        {{scope.row.fileName}}
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="300"
    >
      <template slot-scope="scope">
        <div>
          <!-- <el-button
            type="primary"
            title="申请"
            size="mini"
            @click="courseApply"
          >申请</el-button> -->
          <el-button
            type="warning"
            title="下载"
            size="mini"
            @click="courseDownload(scope.row)"
          >下载</el-button>
          <el-button
            type="danger"
            title="删除"
            size="mini"
            v-if="rolePermission.isAdmin && (info.city === 'SH' || info.city === currentCity)"
            @click="courseDelete(scope.row)"
          >删除</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState } from "vuex";
import { DeleteExtraCourse } from "@api/sys.courseList";
export default {
  name: "otherPublicCourse",
  components: {},
  computed: {
    ...mapState("d2admin/user", ["info"])
  },
  props: {
    rolePermission: Object,
    tableData: Array,
    currentCity: String
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    // 下载 其他公开课
    courseDownload(val) {
      window.location.href = process.env.VUE_APP_API + val.downloadUrl + "&city=" + this.info.city;
    },
    // 删除 其他公开课
    courseDelete(val) {
      DeleteExtraCourse({
        fileID: val.fileID,
        City: this.currentCity
      }).then(res => {
        if (res) {
          this.$message.success(`删除成功！`);
          this.$emit("regetCourseData", 'isOtherPublicCourse')
        } else {
          this.$message.error(`删除失败！`);
        }
      })
    }
  },
  created() {
    // console.log(this.currentCity);
  }
};
</script>

<style lang="scss" scoped>
.el-button--mini {
  padding: 3px 5px !important;
}
</style>
