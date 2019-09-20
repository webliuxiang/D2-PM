<template>
  <d2-container class="indexBox">
    <el-row :gutter="20">
      <!-- leftBox -->
      <el-col
        :span="16"
        class="leftBox"
      >
        <!-- userInfo -->
        <el-col :span="12">
          <el-card class="box-card userInfo">
            <div style="margin-bottom:20px;text-align:center;font-size:30px;">
              <el-avatar> S </el-avatar>
              <br>
              <span>Saoziyang</span>
            </div>

            <el-col
              :span="12"
              style="text-align:center;"
            >
              <span>工号：</span>
              <span>gc00900</span>
            </el-col>

            <el-col
              :span="12"
              style="text-align:center;"
            >
              <span>部门：</span>
              <span>FQW</span>
            </el-col>

            <el-col
              :span="12"
              style="text-align:center;"
            >
              <span>职位：</span>
              <span>部门经理</span>
            </el-col>

            <el-col
              :span="12"
              style="text-align:center;"
            >
              <span>城市：</span>
              <span>上海</span>
            </el-col>
          </el-card>
        </el-col>
        <!-- userInfo -->
        <!-- 公告 -->
        <el-col :span="12">
          <el-card class="box-card announcement">
            <div
              slot="header"
              class="clearfix"
            >
              <span>公告</span>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
              >更多</el-button>
            </div>
            <div>
              <el-table
                :data="tableDataAnnouncement"
                stripe
                style="width: 100%"
                height="190"
                :show-header="false"
              >
                <el-table-column
                  prop="info"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="time"
                  width="100"
                >
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-col>
        <!-- 公告 -->
        <!-- 已报名课程 -->
        <el-col :span="24">
          <el-card class="box-card">
            <div
              slot="header"
              class="clearfix"
            >
              <span>已报名课程</span>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
              >更多</el-button>
            </div>
            <div>
              <el-table
                :data="tableDataApplied"
                stripe
                style="width: 100%"
                max-height="400"
              >
                <el-table-column
                  prop="courseNum"
                  label="课程编号"
                  width="150"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="courseName"
                  label="课程名称"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="startTime"
                  label="开始时间"
                  width="100"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="location"
                  label="培训地点"
                  width="80"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="count"
                  label="天数"
                  width="80"
                  align="center"
                >
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-col>
        <!-- 已报名课程 -->
      </el-col>
      <!-- leftBox -->
      <!-- rightBox -->
      <el-col
        :span="8"
        class="rightBox"
      >
        <!-- 日程 -->
        <el-col :span="24">
          <el-card class="box-card">
            <div class="eventCalendar">
              <el-calendar>
                <template
                  slot="dateCell"
                  slot-scope="{date, data}"
                >
                  <div
                    @click="openDialog(data.day.split('-').slice(1)[1])"
                    class="calendarDay"
                  >
                    {{ data.day.split('-').slice(1)[1] }}
                  </div>
                </template>
              </el-calendar>
            </div>
          </el-card>
        </el-col>
        <!-- 日程 -->
        <!-- 通知 -->
        <el-col :span="24">
          <el-card class="box-card">
            <div
              slot="header"
              class="clearfix"
            >
              <span>通知</span>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
              >更多</el-button>
            </div>
            <div>
              <el-table
                :data="tableDataAnnouncement"
                stripe
                style="width: 100%"
                height="190"
                :show-header="false"
              >
                <el-table-column
                  prop="info"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="time"
                  width="100"
                >
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-col>
        <!-- 通知 -->
      </el-col>
      <!-- right -->
    </el-row>
  </d2-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      tableDataAnnouncement: [
        {
          time: "2016-05-02",
          info: "xxx课程明天开课，请准时参加。"
        },
        {
          time: "2016-05-04",
          info: "xxx课程已取消，请合理安排时间。"
        },
        {
          time: "2016-05-01",
          info: "xxx课程下午开课，请准时参加。"
        },
        {
          time: "2016-05-03",
          info:
            "xxx课程取消。由于课程报名人数不能满足开课最低标准，所以xxx课程被暂时取消。后期会根据需求再次安排本课程，如有需求请保持关注。"
        }
      ],
      tableDataApplied: [
        {
          courseNum: "T_VSE_Q7",
          courseName: "逻辑思考与结构化表达",
          startTime: "2016-05-02",
          location: "上海",
          count: "3"
        },
        {
          courseNum: "RFZX_J_235",
          courseName: "让你的分析报告更具说服力——Excel高效数据分析之道",
          startTime: "2016-05-04",
          location: "上海",
          count: "1"
        },
        {
          courseNum: "EFSD_VSE_784",
          courseName: "TTT基础——培训授课技巧1",
          startTime: "2016-05-01",
          location: "上海",
          count: "2"
        },
        {
          courseNum: "DAW_ECX_458",
          courseName: "新生代员工管理",
          startTime: "2016-05-03",
          location: "上海",
          count: "5"
        }
      ]
    };
  },
  methods: {
    openDialog(day) {
      console.log(day);
    }
  }
};
</script>

<style lang="scss" scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.clearfix span {
  font-weight: 700;
}
.el-col {
  padding-bottom: 20px;
}
.el-card {
  color: #606266;
}
.leftBox,
.rightBox {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
// userInfo
.userInfo::v-deep {
  .el-avatar {
    width: 100px;
    height: 100px;
    line-height: 100px;
    font-size: 100px;
    color: #67c23a;
    background-color: #ebeef5;
  }
  .el-card__body {
    overflow: hidden;
  }
}
// 公告
.announcement::v-deep {
  .el-card__body {
    padding-top: 15px;
  }
}
// 日程
.eventCalendar::v-deep {
  .el-calendar__header {
    padding-top: 5px;
  }
  .el-calendar__body {
    padding: 10px;
  }
  .el-calendar-table .el-calendar-day {
    height: 45px;
    padding: 0;
  }
  .calendarDay {
    width: 100%;
    height: 100%;
    padding: 8px;
  }
}
</style>
