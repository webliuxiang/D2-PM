<template>
  <d2-container>
    <template slot="header">
      <div style="float:left;height:60px;line-height:60px;font-size:20px;margin:-20px 0;">
        <span>课程列表&nbsp;&nbsp;&nbsp;</span>
      </div>
      <div
        style="display:inline-block;height:60px;line-height:60px;margin:-25px 0;"
        class="header__right"
      >
        <div class="class-form-inline">
          <el-radio-group
            v-model="isPublicOrInternalCourse"
            size="mini"
            @change="changeCourse"
          >
            <el-radio-button label="公开课">公开课</el-radio-button>
            <el-radio-button label="内训课">内训课</el-radio-button>
            <el-radio-button label="其他公开课">其他信息</el-radio-button>
            <el-radio-button
              v-if="rolePermission.isAdmin"
              label="课程管理"
            >课程管理</el-radio-button>
            <el-radio-button
              v-if="rolePermission.isAdmin"
              label="课程报表"
            >课程报表</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div
        style="float:right;height:60px;line-height:60px;margin:-20px 0;"
        class="header__right"
      >
        <template v-if="rolePermission.isAdmin">
          <!-- 导入公开课课程 -->
          <template v-if="!isInternalCourse && !isOtherPublicCourse && !isCourseManager && !isCourseReports">
            <el-button
              size="mini"
              type="primary"
              @click="importOtherCourse('导入公开课')"
            ><i class="el-icon-plus"></i> 导入</el-button>
          </template>
          <!-- 导入其他公开课课程 -->
          <template v-if="isOtherPublicCourse && (isInternalCourse || !isInternalCourse) && !isCourseManager && !isCourseReports">
            <el-button
              size="mini"
              type="primary"
              @click="importPublicCourse('导入其他公开课')"
            ><i class="el-icon-plus"></i> 导入</el-button>
          </template>
          <!-- 内训课 -->
          <template v-if="isInternalCourse && !isOtherPublicCourse && !isCourseManager && !isCourseReports">
            <el-button
              size="mini"
              type="primary"
              v-if="isCourseRecordAdmin"
              @click="importOtherCourse('导入内训课记录')"
            ><i class="el-icon-plus"></i> 导入</el-button>
            <!-- 导入课程 -->
            <!-- 新建课程 -->
            <!-- <el-button
              size="mini"
              type="primary"
              v-if="isCourseRecordAdmin"
              @click="createNewCourse"
            ><i class="el-icon-plus"></i> 新建</el-button> -->
            <el-button
              size="mini"
              type="primary"
              v-if="isCourseRecordAdmin"
              @click="exportInternalCourseExcelData"
            ><i class="el-icon-top-right"></i> 导出</el-button>
            <!-- 新建课程 -->
            <el-button
              size="mini"
              type="primary"
              v-if="!isCourseRecordAdmin"
              @click="checkAdmin"
            >记录管理</el-button>
            <el-button
              size="mini"
              type="primary"
              v-if="isCourseRecordAdmin"
              @click="checkBack"
            >返回</el-button>
          </template>
          <!-- 课程管理 -->
          <template v-if="!isOtherPublicCourse && (isInternalCourse || !isInternalCourse) && isCourseManager && !isCourseReports">
            <el-button
              size="mini"
              type="primary"
              @click="importOtherCourse('导入内训课基本信息')"
            ><i class="el-icon-plus"></i> 导入</el-button>
            <!-- 导入课程 -->
            <!-- 新建课程 -->
            <el-button
              size="mini"
              type="primary"
              @click="createNewCourse"
            ><i class="el-icon-plus"></i> 新建</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="exportInternalCourseExcelData"
            ><i class="el-icon-top-right"></i> 导出</el-button>
            <!-- 新建课程 -->
          </template>
          <!-- 导出报表 -->
          <template v-if="isCourseReports && !isOtherPublicCourse && !isCourseManager && (isInternalCourse || !isInternalCourse)">
            <el-button
              size="mini"
              type="primary"
              @click="exportTrainingRecordExcelData"
            ><i class="el-icon-top-right"></i> 导出报表</el-button>
          </template>
        </template>
      </div>
      <br style="clear:both">
    </template>
    <!-- 筛选:公开课 -->
    <template v-if="!isOtherPublicCourse && !isInternalCourse && !isCourseManager && !isCourseReports">
      <div class="searchBox">
        <el-form
          :inline="true"
          size="mini"
          ref="search-form"
          :model="formSearch"
          label-width="100px"
        >
          <!-- 城市 -->
          <el-form-item
            class="searchCity"
            label="城市:"
            prop="city"
          >
            <el-select
              v-model="formSearch.city"
              @change="selectCity"
              class="searchSelect"
            >
              <!-- <el-option
                v-for="(item, key) in cityOptions"
                :key="key"
                :label="item.label"
                :value="item.value"
              >
              </el-option> -->
              <el-option
                value="SH"
                label="上海发布"
              >
              </el-option>
              <el-option
                value="YT"
                label="烟台发布"
              >
              </el-option>
              <el-option
                value="WH"
                label="武汉发布"
              >
              </el-option>
              <el-option
                value="NJ"
                label="南京发布"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 课程类别 -->
          <el-form-item
            class="searchClassification"
            label="课程类别:"
            prop="classification"
          >
            <el-select
              clearable
              v-model="formSearch.classification"
              placeholder="请选择"
              class="searchSelect"
            >
              <el-option
                v-for="(item, key) in formSearch.classificationList"
                :key="key"
                :label="item.value"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 课程编号 -->
          <el-form-item
            class="searchCourseNum"
            label="课程编号:"
            prop="courseNum"
          >
            <el-select
              class="searchInput"
              v-model="formSearch.courseNum"
              filterable
              remote
              clearable
              reserve-keyword
              placeholder="请输入课程编号"
              :remote-method="remoteMethodNum"
              @focus="courseNumFocus"
              :loading="searchLoading"
            >
              <el-option
                v-for="(item, key) in remoteCourseNum.options"
                :key="key"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 课程模块 -->
          <el-form-item
            class="searchCourseModule"
            label="课程模块:"
            prop="courseModule"
          >
            <el-select
              class="searchInput"
              v-model="formSearch.courseModule"
              filterable
              remote
              clearable
              reserve-keyword
              placeholder="请输入课程模块"
              :remote-method="remoteMethodModule"
              @focus="courseModuleFocus"
              :loading="searchLoading"
            >
              <el-option
                v-for="(item, key) in remoteCourseModule.options"
                :key="key"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 课程名称 -->
          <el-form-item
            class="searchCourseName"
            label="课程名称:"
            prop="courseName"
          >
            <el-select
              class="searchInput"
              v-model="formSearch.courseName"
              filterable
              remote
              clearable
              reserve-keyword
              placeholder="请输入课程名称"
              :remote-method="remoteMethodName"
              @focus="courseNameFocus"
              :loading="searchLoading"
            >
              <el-option
                v-for="(item, key) in remoteCourseName.options"
                :key="key"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 日期 -->
          <el-form-item
            class="searchCourseDate"
            label="日期:"
            prop="courseDate"
          >
            <el-date-picker
              class="searchDatepicker"
              v-model="formSearch.courseStartDate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="searchFormSubmit"
            >查 询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </template>
    <!-- 筛选:其他公开课 -->
    <template v-if="isOtherPublicCourse && !isCourseManager && (isInternalCourse || !isInternalCourse) && !isCourseReports">
      <div class="searchBox">
        <el-form
          :inline="true"
          size="mini"
          ref="search-form"
          :model="formSearch"
          label-width="100px"
        >
          <el-form-item
            class="searchCity"
            label="城市:"
            prop="city"
          >
            <el-select
              v-model="formSearch.city"
              @change="selectCity"
              class="searchSelect"
            >
              <!-- <el-option
                v-for="(item, key) in cityOptions"
                :key="key"
                :label="item.label"
                :value="item.value"
              >
              </el-option> -->
              <el-option
                value="SH"
                label="上海发布"
              >
              </el-option>
              <el-option
                value="YT"
                label="烟台发布"
              >
              </el-option>
              <el-option
                value="WH"
                label="武汉发布"
              >
              </el-option>
              <el-option
                value="NJ"
                label="南京发布"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="searchFormSubmit"
            >查 询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </template>
    <!-- 筛选:内训课 -->
    <template v-if="!isOtherPublicCourse && isInternalCourse && !isCourseManager && !isCourseReports">
      <div class="searchBox">
        <el-form
          :inline="true"
          size="mini"
          ref="search-form"
          :model="formSearch"
          label-width="100px"
        >
          <!-- 城市 -->
          <el-form-item
            class="searchCity"
            label="城市:"
            prop="city"
          >
            <!-- 管理员用户 城市选择 限制为 所属城市 -->
            <el-select
              v-if="isCourseRecordAdmin"
              v-model="formSearch.city"
              @change="selectCity"
              class="searchSelect"
            >
              <el-option
                v-for="(item, key) in cityOptions"
                :key="key"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <!-- 普通用户 城市选择 不做限制 -->
            <el-select
              v-if="!isCourseRecordAdmin"
              v-model="formSearch.city"
              @change="selectCity"
              class="searchSelect"
            >
              <el-option
                value="SH"
                label="上海发布"
              >
              </el-option>
              <el-option
                value="YT"
                label="烟台发布"
              >
              </el-option>
              <el-option
                value="WH"
                label="武汉发布"
              >
              </el-option>
              <el-option
                value="NJ"
                label="南京发布"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 课程编号 -->
          <el-form-item
            class="searchCourseNum"
            label="课程编号:"
            prop="courseNum"
          >
            <el-select
              class="searchInput"
              v-model="formSearch.courseNum"
              filterable
              remote
              clearable
              reserve-keyword
              placeholder="请输入课程编号"
              :remote-method="remoteMethodNum"
              @focus="courseNumFocus"
              :loading="searchLoading"
            >
              <el-option
                v-for="(item, key) in remoteCourseNum.options"
                :key="key"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 课程名称 -->
          <el-form-item
            class="searchCourseName"
            label="课程名称:"
            prop="courseName"
          >
            <el-select
              class="searchInput"
              v-model="formSearch.courseName"
              filterable
              remote
              clearable
              reserve-keyword
              placeholder="请输入课程名称"
              :remote-method="remoteMethodName"
              @focus="courseNameFocus"
              :loading="searchLoading"
            >
              <el-option
                v-for="(item, key) in remoteCourseName.options"
                :key="key"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 日期 -->
          <el-form-item
            class="searchCourseDate"
            label="日期:"
            prop="courseDate"
          >
            <el-date-picker
              class="searchDatepicker"
              v-model="formSearch.courseStartDate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="searchFormSubmit"
            >查 询</el-button>
          </el-form-item>

          <el-form-item
            label="课程状态:"
            style="float:right;"
            v-if="isCourseRecordAdmin"
          >
            <el-select
              v-model="formSearch.courseStatus"
              @change="selectCourseStatus"
              class="searchSelect"
            >
              <el-option
                value="0"
                label="新创建"
              >
              </el-option>
              <el-option
                value="1"
                label="调研中"
              >
              </el-option>
              <el-option
                value="2"
                label="已开课"
              >
              </el-option>
              <el-option
                value="3"
                label="已结束"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </template>
    <!-- 筛选:课程管理 -->
    <template v-if="!isOtherPublicCourse && isCourseManager && (isInternalCourse || !isInternalCourse) && !isCourseReports">
      <div class="searchBox">
        <el-form
          :inline="true"
          size="mini"
          ref="search-form"
          :model="formSearch"
          label-width="100px"
        >
          <el-form-item
            class="searchCity"
            label="城市:"
            prop="city"
          >
            <el-select
              v-model="formSearch.city"
              @change="selectCity"
              class="searchSelect"
            >
              <el-option
                v-for="(item, key) in cityOptions"
                :key="key"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
              <!-- <el-option
                value="SH"
                label="上海发布"
              >
              </el-option>
              <el-option
                value="YT"
                label="烟台发布"
              >
              </el-option>
              <el-option
                value="WH"
                label="武汉发布"
              >
              </el-option>
              <el-option
                value="NJ"
                label="南京发布"
              >
              </el-option> -->
            </el-select>
          </el-form-item>

          <el-form-item
            class="searchCourseNum"
            label="课程编号:"
            prop="courseNum"
          >
            <el-select
              class="searchInput"
              v-model="formSearch.courseNum"
              filterable
              remote
              clearable
              reserve-keyword
              placeholder="请输入课程编号"
              :remote-method="remoteMethodNum"
              @focus="courseNumFocus"
              :loading="searchLoading"
            >
              <el-option
                v-for="(item, key) in remoteCourseNum.options"
                :key="key"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            class="searchCourseName"
            label="课程名称:"
            prop="courseName"
          >
            <el-select
              class="searchInput"
              v-model="formSearch.courseName"
              filterable
              remote
              clearable
              reserve-keyword
              placeholder="请输入课程名称"
              :remote-method="remoteMethodName"
              @focus="courseNameFocus"
              :loading="searchLoading"
            >
              <el-option
                v-for="(item, key) in remoteCourseName.options"
                :key="key"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="searchFormSubmit"
            >查 询</el-button>
          </el-form-item>
          <el-form-item
            style="float:right;"
            v-if="isCourseManager"
          >
            <el-button
              type="danger"
              @click="multiDeleteCourseManager"
            >删 除</el-button>
            <el-button
              type="success"
              @click="multiAddCourseManager"
            >新增课程记录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </template>
    <!-- 筛选:课程报表 -->
    <template v-if="isCourseReports && !isOtherPublicCourse && !isCourseManager && (isInternalCourse || !isInternalCourse)">
      <div class="searchBox">
        <el-form
          :inline="true"
          size="mini"
          ref="search-form"
          :model="formSearch"
          label-width="100px"
        >
          <!-- 城市 -->
          <el-form-item
            class="searchCity"
            label="城市:"
            prop="city"
          >
            <el-select
              v-model="formSearch.city"
              @change="selectCity"
              class="searchSelect"
            >
              <el-option
                v-for="(item, key) in cityOptions"
                :key="key"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
              <!-- <el-option
                value="SH"
                label="上海发布"
              >
              </el-option>
              <el-option
                value="YT"
                label="烟台发布"
              >
              </el-option>
              <el-option
                value="WH"
                label="武汉发布"
              >
              </el-option>
              <el-option
                value="NJ"
                label="南京发布"
              >
              </el-option> -->
            </el-select>
          </el-form-item>
          <!-- 课程名称 -->
          <el-form-item
            class="searchCourseName"
            label="课程名称:"
            prop="courseName"
          >
            <el-select
              class="searchInput"
              v-model="formSearch.courseName"
              filterable
              remote
              clearable
              reserve-keyword
              placeholder="请输入课程名称"
              :remote-method="remoteMethodName"
              @focus="courseNameFocus"
              :loading="searchLoading"
            >
              <el-option
                v-for="(item, key) in remoteCourseName.options"
                :key="key"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 日期 -->
          <el-form-item
            class="searchCourseDate"
            label="日期:"
            prop="courseDate"
          >
            <el-date-picker
              class="searchDatepicker"
              v-model="formSearch.courseStartDate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <!-- 查询 -->
          <el-form-item>
            <el-button
              type="primary"
              @click="searchFormSubmit"
            >查 询</el-button>
          </el-form-item>
          <!-- 公开课/内训课 -->
          <el-form-item
            label="公开/内训课:"
            style="float:right;"
          >
            <el-select
              v-model="formSearch.courseType"
              @change="selectCourseType"
              class="searchSelect"
            >
              <el-option
                value="0"
                label="内训课"
              >
              </el-option>
              <el-option
                value="1"
                label="公开课"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </template>
    <!-- 内训课---课程记录 表格 -->
    <internal-table
      class="tableSlot"
      :tableData="internalTableData"
      :roleAdmin="isCourseRecordAdmin"
      :rolePermission="rolePermission"
      v-if="isInternalCourse && !isOtherPublicCourse && !isCourseManager && !isCourseReports"
      @reGetAdminCourseList="reGetAdminCourseList"
      @openCreateClass="openCreateClass(arguments)"
      @openApplyCourse="openApplyCourse"
      @openCourseSummary="openCourseSummary"
      v-loading="loading"
    ></internal-table>
    <!-- 公开课 表格 -->
    <public-table
      class="tableSlot"
      :tableData="publicTableData"
      v-if="!isInternalCourse && !isOtherPublicCourse && !isCourseManager && !isCourseReports"
      @openCreateClass="openPublicDetails(arguments)"
      v-loading="loading"
    ></public-table>
    <!-- 其他公开课 表格 -->
    <other-public-course
      class="tableSlot"
      :currentCity="formSearch.city"
      :rolePermission="rolePermission"
      :tableData="otherPublicTableData"
      @regetCourseData="regetCourseData"
      v-if="isOtherPublicCourse && (isInternalCourse || !isInternalCourse) && !isCourseManager && !isCourseReports"
      v-loading="loading"
    ></other-public-course>
    <!-- 课程管理 表格 -->
    <course-manager
      class="tableSlot"
      @openCreateClass="openCreateCourseManager(arguments)"
      :tableData="courseManagerTableData"
      :multiDeleteCourseManagerStatus="multiDeleteCourseManagerStatus"
      :multiAddCourseManagerStatus="multiAddCourseManagerStatus"
      @multiDone="multiDone"
      v-if="!isOtherPublicCourse && (isInternalCourse || !isInternalCourse) && isCourseManager && !isCourseReports"
      v-loading="loading"
    ></course-manager>
    <!-- 课程报表 表格 -->
    <course-reports
      class="tableSlot"
      :tableData="internalTableData"
      :roleAdmin="isCourseRecordAdmin"
      :rolePermission="rolePermission"
      v-if="isCourseReports && !isOtherPublicCourse && !isCourseManager && (isInternalCourse || !isInternalCourse)"
      @reGetAdminCourseList="reGetAdminCourseList"
      @openCourseReports="openCourseReports(arguments)"
      @openApplyCourse="openApplyCourse"
      @openCourseSummary="openCourseSummary"
      @multiSelected="multiSelectedReports"
      v-loading="loading"
    ></course-reports>
    <!-- 页脚---分页 -->
    <template slot="footer">
      <el-pagination
        :current-page="page.current"
        :page-size="page.size"
        :total="page.total"
        :page-sizes="[10, 50, 100, 200]"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin: -10px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </template>
    <!-- 新建内训课课程 弹出框 -->
    <create-class
      :role="role"
      :formEditable="formEditable"
      :editTableClass="editTableClass"
      :isInternalCourse="isInternalCourse"
      :isCourseManager="isCourseManager"
      :isCourseRecordAdmin="isCourseRecordAdmin"
      @reGetAdminCourseList="reGetAdminCourseList"
      v-model="editFormVisible"
    />
    <course-reports-details
      :role="role"
      :formEditable="formEditable"
      :editTableClass="editTableClass"
      :isInternalCourse="isInternalCourse"
      :isCourseManager="isCourseManager"
      :isReportsInternalCourse="isReportsInternalCourse"
      :isCourseRecordAdmin="isCourseRecordAdmin"
      @reGetAdminCourseList="reGetAdminCourseList"
      v-model="courseReportsDetailsVisible"
    />
    <!-- 新建 课程管理 弹出框 -->
    <create-course-manager
      :courseManagerData="courseManagerData"
      :formEditable="formEditable"
      :editTableClass="editTableClass"
      :isInternalCourse="isInternalCourse"
      :isCourseManager="isCourseManager"
      @reGetAdminCourseList="reGetAdminCourseList"
      v-model="editCourseManagerFormVisible"
    />
    <!-- 其他公开课 课程详情 弹出框 -->
    <publicCourseDetails
      :role="role"
      :formEditable="formEditable"
      :editTableClass="editTableClass"
      v-model="publicCourseDetailsVisible"
    />
    <!-- 上传 弹出框 -->
    <upload-internal
      v-model="uploadModuleCourseVisible"
      :isInternalCourse="isInternalCourse"
      :isOtherPublicCourse="isOtherPublicCourse"
      :isCourseManager="isCourseManager"
      :editTableClass="editTableClass"
      @regetCourseData="regetCourseData"
    ></upload-internal>
    <upload-public
      v-model="uploadPublicVisible"
      :isInternalCourse="isInternalCourse"
      :isOtherPublicCourse="isOtherPublicCourse"
      :isCourseManager="isCourseManager"
      :editTableClass="editTableClass"
      @regetCourseData="regetCourseData"
    ></upload-public>
    <!-- 课程报名 弹出框 -->
    <apply-course
      v-model="applyCourseVisible"
      :applyCourseData="applyCourseData"
      :isCourseRecordAdmin="isCourseRecordAdmin"
      @reGetAdminCourseList="reGetAdminCourseList"
    ></apply-course>
    <!-- 课程小结 弹出框 -->
    <internalCourseRecordSummary
      v-model="courseSummaryVisible"
      :courseSummaryData="courseSummaryData"
      :isCourseRecordAdmin="isCourseRecordAdmin"
      @reGetCourseSummaryList="reGetCourseSummaryList"
    ></internalCourseRecordSummary>
  </d2-container>
</template>
<script>
import { mapState } from "vuex";
import internalTable from "./components/internal/internalTable";
import publicTable from "./components/public/publicTable";
import otherPublicCourse from "./components/otherPublicCourse/otherPublicCourse";
import courseManager from "./components/courseManager/courseManager";
import courseReports from "./components/courseReports/courseReports";
import createClass from "./components/dialogs/createClass";
import courseReportsDetails from "./components/dialogs/courseReportsDetails";
import createCourseManager from "./components/dialogs/createCourseManager";
import publicCourseDetails from "./components/dialogs/publicCourseDetails";
import uploadInternal from "./components/dialogs/uploadInternal";
import uploadPublic from "./components/dialogs/uploadPublic";
import applyCourse from "./components/dialogs/applyCourse";
import internalCourseRecordSummary from "./components/dialogs/internalCourseRecordSummary";
import {
  GetPublicCourse,
  UserGetInternalCourseRecord,
  AdminGetInternalCourseRecord,
  GetCourseID,
  GetClassification,
  ShowExtraCourse,
  GetInternalCourse,
  UncGetPublicCourseName,
  UncGetPublicCourseModule,
  UncGetPublicCourseNum,
  UncGetInternalCourseNum,
  UncGetInternalCourseName,
  UncUserGetInternalRecordNum,
  UncAdminGetInternalRecordNum,
  UncUserGetInternalRecordName,
  UncAdminGetInternalRecordName,
  UncSearchTrainingRecord,
  GetTrainingRecord,
  ExportPublicTrainingRecordForm,
  ExportTrainingRecordForm
} from "@api/sys.courseList";
export default {
  computed: {
    ...mapState("d2admin/user", ["info"])
  },
  name: "coursePage",
  components: {
    internalTable,
    publicTable,
    otherPublicCourse,
    courseManager,
    courseReports,
    createClass,
    courseReportsDetails,
    createCourseManager,
    publicCourseDetails,
    uploadInternal,
    uploadPublic,
    applyCourse,
    internalCourseRecordSummary
  },
  data() {
    return {
      // 表格数据loading
      loading: false,
      // 检索loading
      searchLoading: false,
      // 城市下拉框信息
      cityOptions: [],
      // 用户信息
      rolePermission: {},
      // 公开课数据
      publicTableData: [],
      // 内训课数据
      internalTableData: [],
      // 其他公开课数据
      otherPublicTableData: [],
      // 课程管理数据
      courseManagerTableData: [],
      // 测试远程搜索
      // 课程模块
      remoteCourseModule: {
        options: [],
        value: [],
        list: [],
        states: []
      },
      // 课程名称
      remoteCourseName: {
        options: [],
        value: [],
        list: [],
        states: []
      },
      // 课程编号
      remoteCourseNum: {
        options: [],
        value: [],
        list: [],
        states: []
      },
      // 课程管理员
      isAdmin: false,
      // 课程表格的 可编辑 属性
      formEditable: "editable",
      // 切换 到 课程管理 页面
      checkManager: false,
      // 课程管理 按钮 显示
      isCourseRecordAdmin: false,
      // 切换公开课/内训课
      isInternalCourse: false,
      // 其他公开课
      isOtherPublicCourse: false,
      // 课程管理
      isCourseManager: false,
      // 课程报表
      isCourseReports: false,
      // 表格配置
      page: {
        current: 1,
        size: 50,
        total: 0
      },
      // 课程记录字段
      role: { id: "", name: "" },
      // 课程管理字段
      courseManagerData: { id: "", name: "" },
      // 编辑 弹出框标题
      editTableClass: "",
      // 内训课记录 编辑 弹出框是否弹出
      editFormVisible: false,
      // 内训课管理 编辑 弹出框是否弹出
      editCourseManagerFormVisible: false,
      // 课程报表 查看 弹出框是否弹出
      courseReportsDetailsVisible: false,
      // 课程管理 批量删除 操作标识位
      multiDeleteCourseManagerStatus: false,
      // 课程管理 批量新增 操作标识位
      multiAddCourseManagerStatus: false,
      // 公开课 课程详情 弹出框是否弹出
      publicCourseDetailsVisible: false,
      // 筛选 弹出框 是否弹出
      searchFormVisible: false,
      // 上传 公开课/其他公开课 弹出框是否弹出
      uploadPublicVisible: false,
      // 上传 内训课/课程管理 弹出框是否弹出
      uploadModuleCourseVisible: false,
      // 公开课/内训课
      isPublicOrInternalCourse: "公开课",
      // 查询条件
      formSearch: {
        // 课程分类 查询
        classification: "",
        contentType: "",
        classificationList: [],
        // 课程模块
        courseModule: "",
        // 课程名称
        courseName: "",
        // 课程编号
        courseNum: "",
        // 日期
        courseDate: [],
        courseStartDate: "",
        courseEndDate: "",
        city: "",
        courseStatus: "",
        courseType: "0"
      },
      // 报名弹出框
      applyCourseVisible: false,
      // 报名课程信息
      applyCourseData: {},
      // 课程小结弹出框
      courseSummaryVisible: false,
      // 课程小结信息
      courseSummaryData: {},
      isReportsInternalCourse: true,
      multiSelectedReportsRecords: []
    };
  },
  mounted() {
    this.formSearch.city = this.info.city;
    // 不同地区的管理员权限不同，主要表现在对课程的修改、删除等方面
    if (this.formSearch.city === 'SH') {
      this.cityOptions = [
        {
          value: "SH",
          label: "上海发布"
        }, {
          value: "YT",
          label: "烟台发布"
        }, {
          value: "WH",
          label: "武汉发布"
        }, {
          value: "NJ",
          label: "南京发布"
        }
      ]
    } else if (this.formSearch.city === 'YT') {
      this.cityOptions = [
        {
          value: "YT",
          label: "烟台发布"
        }
      ]
    } else if (this.formSearch.city === 'WH') {
      this.cityOptions = [
        {
          value: "WH",
          label: "武汉发布"
        }
      ]
    } else if (this.formSearch.city === 'NJ') {
      this.cityOptions = [
        {
          value: "NJ",
          label: "南京发布"
        }
      ]
    }
    // 获取classification
    this.getClassificationData(this.info.city);
    // 判断用户角色
    this.rolePermission = this.info.role;
    this.getPublicCourseData();
    // 获取公开课课程列表信息
  },
  methods: {
    // 远程搜索--课程编号
    courseNumFocus() {
      let query = "";
      this.remoteMethodNum(query);
    },
    remoteMethodNum(query) {
      // if (query !== "") {
      this.searchLoading = true;
      // 判断课程类别
      // 课程记录---内训课
      if (
        this.isInternalCourse &&
        !this.isOtherPublicCourse &&
        !this.isCourseManager
      ) {
        if (this.rolePermission.isAdmin) {
          // 管理员---管理员具有普通用户和课程管理员角色的区别
          if (this.isCourseRecordAdmin) {
            let data = {
              CourseNum: query,
              City: this.formSearch.city,
              CourseName: this.formSearch.courseName,
              Status: this.formSearch.courseStatus,
              StartDate: this.formSearch.courseStartDate
            };
            this.getAdminInternalCourseRecordNumData(data);
          } else {
            // 管理员的普通用户权限
            let data = {
              CourseNum: query,
              City: this.formSearch.city,
              CourseName: this.formSearch.courseName,
              StartDate: this.formSearch.courseStartDate
            };
            this.getUserInternalCourseRecordNumData(data);
          }
        } else {
          // 普通用户
          let data = {
            CourseNum: query,
            City: this.formSearch.city,
            CourseName: this.formSearch.courseName,
            StartDate: this.formSearch.courseStartDate
          };
          this.getUserInternalCourseRecordNumData(data);
        }
      } else if (
        // 公开课
        !this.isInternalCourse &&
        !this.isOtherPublicCourse &&
        !this.isCourseManager
      ) {
        // TODO:获取公开课课程编号数据
        let data = {
          CourseNum: query,
          City: this.formSearch.city,
          Classification: this.formSearch.classification,
          CourseName: this.formSearch.courseName,
          CourseModule: this.formSearch.courseModule,
          StartDate: this.formSearch.courseStartDate
        };
        this.getPublicCourseNumData(data);
      } else if (
        // 其他公开课
        this.isOtherPublicCourse &&
        !this.isCourseManager &&
        (!this.isInternalCourse || this.isInternalCourse)
      ) {
        // 没有课程编号的检索
      } else if (
        // 课程管理
        this.isCourseManager &&
        !this.isOtherPublicCourse &&
        (!this.isInternalCourse || this.isInternalCourse)
      ) {
        // TODO:
        let data = {
          CourseNum: query,
          City: this.formSearch.city,
          CourseName: this.formSearch.courseName
        };
        this.getInternalCourseNumData(data);
      }
      // 判断课程类别
      setTimeout(() => {
        this.searchLoading = false;
        this.remoteCourseNum.options = this.remoteCourseNum.list.filter(
          item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          }
        );
      }, 500);
      // } else {
      //   this.remoteCourseModule.options = [];
      // }
    },
    // 课程模块
    courseModuleFocus() {
      let query = "";
      this.remoteMethodModule(query);
    },
    remoteMethodModule(query) {
      // if (query !== "") {
      this.searchLoading = true;
      let data = {
        CourseModule: query,
        City: this.formSearch.city,
        Classification: this.formSearch.classification,
        CourseName: this.formSearch.courseName,
        CourseNum: this.formSearch.courseNum,
        StartDate: this.formSearch.courseStartDate
      };
      this.getCourseModuleData(data);
      setTimeout(() => {
        this.searchLoading = false;
        this.remoteCourseModule.options = this.remoteCourseModule.list.filter(
          item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          }
        );
      }, 500);
      // } else {
      //   this.remoteCourseModule.options = [];
      // }
    },
    // 课程名称 公开课 和 内训课 区分查询
    courseNameFocus() {
      let query = "";
      this.remoteMethodName(query);
    },
    // 远程查询
    remoteMethodName(query) {
      // if (query !== "") {
      this.searchLoading = true;
      // 判断课程类别
      // 内训记录
      if (
        this.isInternalCourse &&
        !this.isOtherPublicCourse &&
        !this.isCourseManager &&
        !this.isCourseReports
      ) {
        if (this.rolePermission.isAdmin) {
          // 管理员
          if (this.isCourseRecordAdmin) {
            // 管理员的课程管理员权限
            let data = {
              CourseName: query,
              City: this.formSearch.city,
              CourseNum: this.formSearch.courseNum,
              Status: this.formSearch.courseStatus,
              StartDate: this.formSearch.courseStartDate
            };
            this.getAdminInternalCourseRecordNameData(data);
          } else {
            // 管理员的普通用户权限
            let data = {
              CourseName: query,
              City: this.formSearch.city,
              CourseNum: this.formSearch.courseNum,
              StartDate: this.formSearch.courseStartDate
            };
            this.getUserInternalCourseRecordNameData(data);
          }
        } else {
          // 普通用户
          let data = {
            CourseName: query,
            City: this.formSearch.city,
            CourseNum: this.formSearch.courseNum,
            StartDate: this.formSearch.courseStartDate
          };
          this.getUserInternalCourseRecordNameData(data);
        }
      } else if (
        // 公开课
        !this.isInternalCourse &&
        !this.isOtherPublicCourse &&
        !this.isCourseManager &&
        !this.isCourseReports
      ) {
        // 获取公开课课程编号数据
        let data = {
          CourseName: query,
          City: this.formSearch.city,
          Classification: this.formSearch.classification,
          CourseModule: this.formSearch.courseModule,
          CourseNum: this.formSearch.courseNum,
          StartDate: this.formSearch.courseStartDate
        };
        this.getPublicCourseNameData(data);
      } else if (
        // 其他公开课
        this.isOtherPublicCourse &&
        !this.isCourseManager &&
        (!this.isInternalCourse || this.isInternalCourse) &&
        !this.isCourseReports
      ) {
        // 其他公开课没有课程名称查询
      } else if (
        // 课程管理
        this.isCourseManager &&
        !this.isOtherPublicCourse &&
        (!this.isInternalCourse || this.isInternalCourse) &&
        !this.isCourseReports
      ) {
        let data = {
          CourseName: query,
          City: this.formSearch.city,
          CourseNum: this.formSearch.courseNum
        };
        this.getInternalCourseNameData(data);
      } else if (
        // 课程报表
        this.isCourseReports &&
        !this.isOtherPublicCourse &&
        (!this.isInternalCourse || this.isInternalCourse) &&
        !this.isCourseManager
      ) {
        let data = {
          CourseName: query,
          City: this.formSearch.city,
          Status: this.formSearch.courseType,
          timestamp: new Date().getTime()
        };
        this.getTrainingRecordNameData(data);
      }
      // 判断课程类别
      setTimeout(() => {
        this.searchLoading = false;
        this.remoteCourseName.options = this.remoteCourseName.list.filter(
          item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          }
        );
      }, 500);
      // } else {
      //   this.remoteCourseName.options = [];
      // }
    },
    // 远程搜索
    // 打开 筛选弹框
    openSearchForm() {
      this.searchFormVisible = true;
    },
    // 关闭 筛选弹框
    searchDialogClose() {
      this.$refs["search-form"].resetFields();
      this.searchFormVisible = false;
    },
    // 查询 筛选
    searchFormSubmit() {
      this.page.current = 1;
      // 内训记录
      if (
        this.isInternalCourse &&
        !this.isOtherPublicCourse &&
        !this.isCourseManager &&
        !this.isCourseReports
      ) {
        if (this.rolePermission.isAdmin) {
          // 管理员
          if (this.isCourseRecordAdmin) {
            // 管理员的课程管理员权限
            this.adminGetInternalCourseRecordData();
          } else {
            // 管理员的普通用户权限
            this.userGetInternalCourseRecordData();
          }
        } else {
          // 普通用户
          this.userGetInternalCourseRecordData();
        }
      } else if (
        // 公开课
        !this.isInternalCourse &&
        !this.isOtherPublicCourse &&
        !this.isCourseManager &&
        !this.isCourseReports
      ) {
        this.getPublicCourseData();
      } else if (
        // 其他公开课
        this.isOtherPublicCourse &&
        !this.isCourseManager &&
        (!this.isInternalCourse || this.isInternalCourse) &&
        !this.isCourseReports
      ) {
        this.getOtherPublicCourseData();
      } else if (
        // 课程管理
        this.isCourseManager &&
        !this.isOtherPublicCourse &&
        (!this.isInternalCourse || this.isInternalCourse) &&
        !this.isCourseReports
      ) {
        this.getCourseManagerData();
      } else if (
        // 课程报表
        this.isCourseReports &&
        !this.isCourseManager &&
        !this.isOtherPublicCourse &&
        (!this.isInternalCourse || this.isInternalCourse)
      ) {
        // TODO:获取课程报表数据
        this.getTrainingRecordData();
      }
      this.searchFormVisible = false;
    },
    // 切换 城市
    selectCity(val) {
      this.formSearch.city = val;
      // 获取classification
      this.getClassificationData(this.formSearch.city);
    },
    // 切换 课程记录 课程管理员 的 课程状态
    selectCourseStatus(val) {
      this.formSearch.courseStatus = val;
      this.formSearch.city = this.info.city;
      this.formSearch.classification = "";
      this.formSearch.contentType = "";
      this.formSearch.courseModule = "";
      this.formSearch.courseNum = "";
      this.formSearch.courseName = "";
      this.formSearch.courseStartDate = "";
      this.formSearch.courseEndDate = "";
      this.formSearch.courseDate = [];
      this.page.current = 1;
      this.adminGetInternalCourseRecordData();
    },
    // 查询 管理类和技术类
    selectContentType(val) {
      this.formSearch.contentType = val;
    },
    // 课程报表 切换 公开课 内训课
    selectCourseType(val) {
      this.formSearch.courseType = val;
      this.getTrainingRecordData();
    },
    // 格式化时间
    formatDate() {
      if (this.formSearch.courseStartDate) {
        let startDate = new Date(this.formSearch.courseStartDate);
        this.formSearch.courseStartDate =
          startDate.getFullYear() +
          "-" +
          (startDate.getMonth() + 1) +
          "-" +
          startDate.getDate();
      }
    },
    // 表格子组件触发的课程弹出框
    openPublicDetails(role) {
      switch (role[1]) {
        case "disabled":
          this.formEditable = "disabled";
          this.editTableClass = "课程详情";
          break;
        case "some":
          this.formEditable = "some";
          this.editTableClass = "编辑课程";
          break;
        default:
          this.formEditable = "editable";
          break;
      }
      this.role = role[0];
      this.publicCourseDetailsVisible = true;
    },
    // 内训课记录 编辑课程弹出框
    openCreateClass(role) {
      switch (role[1]) {
        case "disabled":
          this.formEditable = "disabled";
          this.editTableClass = "课程详情";
          break;
        case "some":
          this.formEditable = "some";
          this.editTableClass = "编辑课程";
          break;
        case "somePartEdit":
          this.formEditable = "somePartEdit";
          this.editTableClass = "编辑课程";
          break;
        default:
          this.formEditable = "editable";
          break;
      }
      this.role = role[0];
      this.editFormVisible = true;
    },
    // 课程报表 查看课程弹出框
    openCourseReports(role) {
      switch (role[1]) {
        case "disabled":
          this.formEditable = "disabled";
          this.editTableClass = "培训记录详情";
          break;
        case "some":
          this.formEditable = "some";
          this.editTableClass = "编辑课程";
          break;
        case "somePartEdit":
          this.formEditable = "somePartEdit";
          this.editTableClass = "编辑课程";
          break;
        default:
          this.formEditable = "editable";
          break;
      }
      this.role = role[0];
      if (this.formSearch.courseType === "0") {
        this.isReportsInternalCourse = true;
      } else if (this.formSearch.courseType === "1") {
        this.isReportsInternalCourse = false;
      }
      this.courseReportsDetailsVisible = true;
    },
    // 内训课 管理 编辑课程弹出框
    openCreateCourseManager(role) {
      switch (role[1]) {
        case "disabled":
          this.formEditable = "disabled";
          this.editTableClass = "课程详情";
          break;
        case "some":
          this.formEditable = "some";
          this.editTableClass = "编辑课程";
          break;
        default:
          this.formEditable = "editable";
          break;
      }
      this.courseManagerData = role[0];
      this.editCourseManagerFormVisible = true;
    },
    // 切换 公开课 内训课
    changeCourse() {
      this.formSearch.city = this.info.city;
      this.formSearch.classification = "";
      this.formSearch.contentType = "";
      this.formSearch.courseModule = "";
      this.formSearch.courseNum = "";
      this.formSearch.courseName = "";
      this.formSearch.courseStartDate = "";
      this.formSearch.courseEndDate = "";
      this.formSearch.courseDate = [];
      this.page.current = 1;
      this.page.size = 50;
      switch (this.isPublicOrInternalCourse) {
        case "公开课":
          // 控制显示的表格视图
          this.isInternalCourse = false;
          this.isOtherPublicCourse = false;
          this.isCourseManager = false;
          this.isCourseReports = false;
          // 获取数据
          this.getPublicCourseData();
          break;
        case "其他公开课":
          // 控制显示的表格视图
          this.isInternalCourse = false;
          this.isOtherPublicCourse = true;
          this.isCourseManager = false;
          this.isCourseReports = false;
          // 获取数据
          this.getOtherPublicCourseData();
          break;
        case "内训课":
          // 控制显示的表格视图
          this.isInternalCourse = true;
          this.isOtherPublicCourse = false;
          this.isCourseManager = false;
          this.isCourseReports = false;
          // 课程记录
          this.isCourseRecordAdmin = false;
          // 获取数据
          this.userGetInternalCourseRecordData();
          break;
        case "课程管理":
          // 控制显示的表格视图
          this.isInternalCourse = false;
          this.isOtherPublicCourse = false;
          this.isCourseManager = true;
          this.isCourseReports = false;
          // 获取数据
          this.getCourseManagerData();
          break;
        case "课程报表":
          // 控制显示的表格视图
          this.isInternalCourse = false;
          this.isOtherPublicCourse = false;
          this.isCourseManager = false;
          this.isCourseReports = true;
          // 获取已结束状态的课程
          this.formSearch.courseStatus = 3;
          // 获取数据
          this.getTrainingRecordData();
          break;
        default:
          break;
      }
    },
    // 切换 课程记录---内训课 管理员
    checkAdmin() {
      this.isCourseRecordAdmin = true;
      this.formSearch.city = this.info.city;
      this.formSearch.classification = "";
      this.formSearch.contentType = "";
      this.formSearch.courseModule = "";
      this.formSearch.courseNum = "";
      this.formSearch.courseName = "";
      this.formSearch.courseStartDate = "";
      this.formSearch.courseEndDate = "";
      this.formSearch.courseDate = [];
      this.formSearch.courseStatus = "0";
      this.page.current = 1;
      this.adminGetInternalCourseRecordData();
    },
    // 返回 普通员工 页面
    checkBack() {
      this.isCourseRecordAdmin = false;
      this.formSearch.city = this.info.city;
      this.formSearch.classification = "";
      this.formSearch.contentType = "";
      this.formSearch.courseModule = "";
      this.formSearch.courseNum = "";
      this.formSearch.courseName = "";
      this.formSearch.courseStartDate = "";
      this.formSearch.courseEndDate = "";
      this.formSearch.courseDate = [];
      this.page.current = 1;
      this.userGetInternalCourseRecordData();
    },
    // 改变表格当前显示的页数
    handleCurrentChange(val) {
      this.page.current = val;
      if (
        this.isInternalCourse &&
        !this.isOtherPublicCourse &&
        !this.isCourseManager
      ) {
        // 管理员
        if (this.rolePermission.isAdmin) {
          if (this.isCourseRecordAdmin) {
            // 管理员的课程管理员权限
            this.adminGetInternalCourseRecordData();
          } else {
            // 管理员的普通用户权限
            this.userGetInternalCourseRecordData();
          }
        } else {
          // 普通用户
          this.userGetInternalCourseRecordData();
        }
      } else if (
        !this.isInternalCourse &&
        !this.isOtherPublicCourse &&
        !this.isCourseManager
      ) {
        this.getPublicCourseData();
      } else if (
        this.isOtherPublicCourse &&
        !this.isCourseManager &&
        (!this.isInternalCourse || this.isInternalCourse)
      ) {
        this.getOtherPublicCourseData();
      } else if (
        this.isCourseManager &&
        !this.isOtherPublicCourse &&
        (!this.isInternalCourse || this.isInternalCourse)
      ) {
        this.getCourseManagerData();
      }
    },
    // 改变表格显示数据行数
    handleSizeChange(val) {
      this.page.size = val;
      if (
        this.isInternalCourse &&
        !this.isOtherPublicCourse &&
        !this.isCourseManager
      ) {
        // 管理员
        if (this.rolePermission.isAdmin) {
          // 管理员的课程管理员权限
          if (this.isCourseRecordAdmin) {
            this.adminGetInternalCourseRecordData();
          } else {
            // 管理员的普通用户权限
            this.userGetInternalCourseRecordData();
          }
        } else {
          // 普通用户
          this.userGetInternalCourseRecordData();
        }
      } else if (
        !this.isInternalCourse &&
        !this.isOtherPublicCourse &&
        !this.isCourseManager
      ) {
        this.getPublicCourseData();
      } else if (
        this.isOtherPublicCourse &&
        !this.isCourseManager &&
        (!this.isInternalCourse || this.isInternalCourse)
      ) {
        this.getOtherPublicCourseData();
      } else if (
        this.isCourseManager &&
        !this.isOtherPublicCourse &&
        (!this.isInternalCourse || this.isInternalCourse)
      ) {
        this.getCourseManagerData();
      }
    },
    // 新建课程
    createNewCourse() {
      this.courseManagerData = {
        id: "",
        courseName: "",
        courseNum: "",
        courseHour: 1,
        vendor: "",
        learnType: "",
        contentType: "",
        trainingType: ""
      };
      GetCourseID({
        timestamp: new Date().getTime()
      }).then(res => {
        this.courseManagerData.id = res;
      });
      this.editTableClass = "新建课程管理";
      // 课程表格的可编辑属性
      this.formEditable = "editable";
      this.editCourseManagerFormVisible = true;
    },
    // 新建课程 后刷新数据
    reGetAdminCourseList(reGet) {
      if (
        this.isInternalCourse &&
        !this.isOtherPublicCourse &&
        !this.isCourseManager
      ) {
        if (reGet) {
          this.adminGetInternalCourseRecordData();
        } else {
          this.userGetInternalCourseRecordData();
        }
      } else if (
        this.isCourseManager &&
        !this.isOtherPublicCourse &&
        (!this.isInternalCourse || this.isInternalCourse)
      ) {
        this.getCourseManagerData();
      }
    },
    // 添加/修改 课程小结 后刷新数据
    reGetCourseSummaryList(reGet) {
      if (
        this.isInternalCourse &&
        !this.isOtherPublicCourse &&
        !this.isCourseManager
      ) {
        if (reGet) {
          // this.formSearch.courseStatus =
          // console.log(this.formSearch.courseStatus);
          this.adminGetInternalCourseRecordData();
        } else {
          this.userGetInternalCourseRecordData();
        }
      } else if (
        this.isCourseManager &&
        !this.isOtherPublicCourse &&
        (!this.isInternalCourse || this.isInternalCourse)
      ) {
        this.getCourseManagerData();
      }
    },
    // 导入 公开课/其他公开课 课程
    importPublicCourse(dialogType) {
      this.editTableClass = dialogType;
      this.uploadPublicVisible = true;
    },
    // 导入 内训课/课程管理 课程
    importOtherCourse(dialogType) {
      this.editTableClass = dialogType;
      this.uploadModuleCourseVisible = true;
    },
    // 导入课程 后刷新当前数据
    regetCourseData(type) {
      switch (type) {
        case "isPublicCourse":
          this.getPublicCourseData();
          break;
        case "isInternalCourse":
          this.adminGetInternalCourseRecordData();
          break;
        case "isOtherPublicCourse":
          this.getOtherPublicCourseData();
          break;
        case "isCourseManager":
          // TODO:获取课程管理数据
          this.getCourseManagerData();
          break;
        default:
          break;
      }
      this.uploadPublicVisible = false;
      this.uploadModuleCourseVisible = false;
    },
    // 批量删除 课程管理
    multiDeleteCourseManager() {
      this.multiDeleteCourseManagerStatus = true;
    },
    // 批量添加 课程管理
    multiAddCourseManager() {
      this.multiAddCourseManagerStatus = true;
    },
    multiDone(val) {
      if (val) {
        this.getCourseManagerData();
      }
      this.multiDeleteCourseManagerStatus = false;
      this.multiAddCourseManagerStatus = false;
    },
    // 获取数据
    // 获取 公开课 课程列表 信息
    getPublicCourseData() {
      this.loading = true;
      GetPublicCourse({
        city: this.formSearch.city,
        Classification: this.formSearch.classification,
        CourseModule: this.formSearch.courseModule,
        CourseNum: this.formSearch.courseNum,
        CourseName: this.formSearch.courseName,
        StartDate: this.formSearch.courseStartDate,
        EndDate: this.formSearch.courseEndDate,
        PageSize: this.page.size,
        PageIndex: this.page.current
      })
        .then(res => {
          this.loading = false;
          if (res.courseList.length > 0) {
            res.courseList.map(item => {
              let startTime = new Date(item.startDate);
              let endTime = new Date(item.endDate);
              item.startDate =
                startTime.getFullYear() +
                "-" +
                ((startTime.getMonth() + 1) > 9 ? (startTime.getMonth() + 1) : "0" + (startTime.getMonth() + 1)) +
                "-" +
                (startTime.getDate() > 9 ? startTime.getDate() : "0" + startTime.getDate());
              item.endDate =
                endTime.getFullYear() +
                "-" +
                ((endTime.getMonth() + 1) > 9 ? (endTime.getMonth() + 1) : "0" + (endTime.getMonth() + 1)) +
                "-" +
                (endTime.getDate() > 9 ? endTime.getDate() : "0" + endTime.getDate());
            });
          }
          this.page.total = res.totalCount;
          this.publicTableData = res.courseList;
          // console.log(this.tableData);
        })
        .catch(err => {
          if (err) {
            this.loading = false;
          }
        });
    },
    // 获取 普通用户 内训课 课程列表 信息
    userGetInternalCourseRecordData() {
      this.loading = true;
      UserGetInternalCourseRecord({
        city: this.formSearch.city,
        ContentType: this.formSearch.contentType,
        CourseName: this.formSearch.courseName,
        CourseNum: this.formSearch.courseNum,
        StartDate: this.formSearch.courseStartDate,
        EndDate: this.formSearch.courseEndDate,
        PageSize: this.page.size,
        PageIndex: this.page.current
      })
        .then(res => {
          this.loading = false;
          if (res.courseList.length > 0) {
            res.courseList.map(item => {
              if (item.startDate) {
                let startTime = new Date(item.startDate);
                item.startDate =
                  startTime.getFullYear() +
                  "-" +
                  (startTime.getMonth() + 1) +
                  "-" +
                  startTime.getDate();
              } else {
                item.startDate = "";
              }
              if (item.endDate) {
                let endTime = new Date(item.endDate);
                item.endDate =
                  endTime.getFullYear() +
                  "-" +
                  (endTime.getMonth() + 1) +
                  "-" +
                  endTime.getDate();
              } else {
                item.endDate = "";
              }
              if (item.deadLine) {
                let deadLineStr = new Date(item.deadLine);
                item.deadLine =
                  deadLineStr.getFullYear() +
                  "-" +
                  (deadLineStr.getMonth() + 1) +
                  "-" +
                  deadLineStr.getDate();
              }
              item.courseDate = [item.startDate, item.endDate];
              item.courseTime = [
                item.startDate + " " + item.startTime,
                item.endDate + " " + item.endTime
              ];
              if (item.internalStatus.length > 1) {
                // 课程状态 已满员 已截止
                item.appliedStatus = "fullPeopleOverTime";
              } else {
                item.internalStatus.map(statusItem => {
                  switch (statusItem) {
                    // 课程状态 正常
                    case 0:
                      if (item.userStatus === 1) {
                        // 可报名
                        item.appliedStatus = "normalEnableApply";
                      } else if (item.userStatus === 3) {
                        // 已报名
                        item.appliedStatus = "normalApplied";
                      }
                      break;
                    // 课程状态 已满员
                    case 2:
                      if (item.userStatus === 1) {
                        // 可报名
                        item.appliedStatus = "fullPeopleEnableApply";
                      } else if (item.userStatus === 3) {
                        // 已报名
                        item.appliedStatus = "fullPeopleApplied";
                      }
                      break;
                    // 课程状态 已截止
                    case 9:
                      if (item.userStatus === 1) {
                        // 可报名
                        item.appliedStatus = "overTimeEnableApply";
                      } else if (item.userStatus === 3) {
                        // 已报名
                        item.appliedStatus = "overTimeApplied";
                      }
                      break;
                  }
                });
              }
            });
          }
          this.page.total = res.totalCount;
          this.internalTableData = res.courseList;
          // console.log(this.tableData);
        })
        .catch(err => {
          if (err) {
            this.loading = false;
          }
        });
    },
    // 获取 管理员用户 内训课 课程列表 信息
    adminGetInternalCourseRecordData() {
      this.loading = true;
      AdminGetInternalCourseRecord({
        city: this.formSearch.city,
        ContentType: this.formSearch.contentType,
        CourseName: this.formSearch.courseName,
        CourseNum: this.formSearch.courseNum,
        StartDate: this.formSearch.courseStartDate,
        EndDate: this.formSearch.courseEndDate,
        Status: this.formSearch.courseStatus,
        PageSize: this.page.size,
        PageIndex: this.page.current
      })
        .then(res => {
          this.loading = false;
          if (res.courseList.length > 0) {
            res.courseList.map(item => {
              if (item.startDate) {
                let startTime = new Date(item.startDate);
                item.startDate =
                  startTime.getFullYear() +
                  "-" +
                  (startTime.getMonth() + 1) +
                  "-" +
                  startTime.getDate();
              } else {
                item.startDate = "";
              }
              if (item.endDate) {
                let endTime = new Date(item.endDate);
                item.endDate =
                  endTime.getFullYear() +
                  "-" +
                  (endTime.getMonth() + 1) +
                  "-" +
                  endTime.getDate();
              } else {
                item.endDate = "";
              }
              if (item.deadLine) {
                let deadLineStr = new Date(item.deadLine);
                item.deadLine =
                  deadLineStr.getFullYear() +
                  "-" +
                  (deadLineStr.getMonth() + 1) +
                  "-" +
                  deadLineStr.getDate();
              }
              item.courseDate = [item.startDate, item.endDate];
              item.courseTime = [
                item.startDate + " " + item.startTime,
                item.endDate + " " + item.endTime
              ];
              // item.courseDate = [Date.parse(item.startDate), Date.parse(item.endDate)];
              switch (item.status) {
                // 新创建
                case 4:
                  item.status = "NotPublished";
                  break;
                // 调研中
                case 5:
                  item.status = "Published";
                  break;
                // 绿色状态可开课
                case 6:
                  item.status = "PublishedGreen";
                  break;
                // 已开课
                case 7:
                  item.status = "Started";
                  break;
                // 已结束
                case 8:
                  item.status = "Ended";
                  break;
              }
            });
          }
          this.page.total = res.totalCount;
          this.internalTableData = res.courseList;
          if (res.totalCount > 0 && res.courseList.length === 0) {
            this.page.current = this.page.current - 1
            this.adminGetInternalCourseRecordData()
          }
          // console.log(this.tableData);
        })
        .catch(err => {
          if (err) {
            this.loading = false;
          }
        });
    },
    // 获取 其他公开课 课程列表 信息
    getOtherPublicCourseData() {
      this.loading = true;
      ShowExtraCourse({
        city: this.formSearch.city,
        PageSize: this.page.size,
        PageIndex: this.page.current
      })
        .then(res => {
          this.loading = false;
          this.page.total = res.totalCount;
          this.otherPublicTableData = res.extraList;
        })
        .catch(err => {
          if (err) {
            this.loading = false;
          }
        });
    },
    // 获取 课程管理 课程列表 信息
    getCourseManagerData() {
      this.loading = true;
      GetInternalCourse({
        city: this.formSearch.city,
        CourseNum: this.formSearch.courseNum,
        CourseName: this.formSearch.courseName,
        PageSize: this.page.size,
        PageIndex: this.page.current
      })
        .then(res => {
          // console.log(res);
          this.loading = false;
          this.page.total = res.totalCount;
          this.courseManagerTableData = res.courseList;
          if (res.totalCount > 0 && res.courseList.length === 0) {
            this.page.current = this.page.current - 1
            this.getCourseManagerData()
          }
          // console.log(this.tableData);
        })
        .catch(err => {
          if (err) {
            this.loading = false;
          }
        });
    },
    // 获取 课程报表 内训课 课程列表数据
    getTrainingRecordData() {
      this.loading = true;
      GetTrainingRecord({
        city: this.formSearch.city,
        CourseName: this.formSearch.courseName,
        StartDate: this.formSearch.courseStartDate,
        Status: this.formSearch.courseType,
        PageSize: this.page.size,
        PageIndex: this.page.current
      })
        .then(res => {
          this.loading = false;
          if (res.trainingRecordList.length > 0) {
            res.trainingRecordList.map(item => {
              if (item.startDate) {
                let startTime = new Date(item.startDate);
                item.startDate =
                  startTime.getFullYear() +
                  "-" +
                  (startTime.getMonth() + 1) +
                  "-" +
                  startTime.getDate();
              } else {
                item.startDate = "";
              }
              if (item.endDate) {
                let endTime = new Date(item.endDate);
                item.endDate =
                  endTime.getFullYear() +
                  "-" +
                  (endTime.getMonth() + 1) +
                  "-" +
                  endTime.getDate();
              } else {
                item.endDate = "";
              }
            });
          }
          this.page.total = res.totalCount;
          this.internalTableData = res.trainingRecordList;
        })
        .catch(err => {
          if (err) {
            this.loading = false;
          }
        });
    },
    // 获取 课程分类 数据
    getClassificationData(city) {
      GetClassification({
        city: city,
        timestamp: new Date().getTime()
      }).then(res => {
        this.formSearch.classificationList = res;
      });
    },
    // 获取 课程模块 数据
    getCourseModuleData(data) {
      UncGetPublicCourseModule(data).then(res => {
        this.remoteCourseModule.states = res;
        this.remoteCourseModule.list = this.remoteCourseModule.states.map(
          item => {
            return { value: item.value, label: item.value };
          }
        );
      });
    },
    // 获取 公开课 课程名称 数据
    getPublicCourseNameData(data) {
      UncGetPublicCourseName(data).then(res => {
        this.remoteCourseName.states = res;
        this.remoteCourseName.list = this.remoteCourseName.states.map(item => {
          return { value: item.value, label: item.value };
        });
      });
    },
    // 获取 课程管理 课程名称 数据
    getInternalCourseNameData(data) {
      UncGetInternalCourseName(data).then(res => {
        this.remoteCourseName.states = res;
        this.remoteCourseName.list = this.remoteCourseName.states.map(item => {
          return { value: item.value, label: item.value };
        });
      });
    },
    // 获取 管理员 课程记录 课程名称 数据
    getAdminInternalCourseRecordNameData(data) {
      UncAdminGetInternalRecordName(data).then(res => {
        this.remoteCourseName.states = res;
        this.remoteCourseName.list = this.remoteCourseName.states.map(item => {
          return { value: item.value, label: item.value };
        });
      });
    },
    // 获取 普通用户 课程记录 课程名称 数据
    getUserInternalCourseRecordNameData(data) {
      UncUserGetInternalRecordName(data).then(res => {
        this.remoteCourseName.states = res;
        this.remoteCourseName.list = this.remoteCourseName.states.map(item => {
          return { value: item.value, label: item.value };
        });
      });
    },
    // 获取 课程报表 课程名称 数据
    getTrainingRecordNameData(data) {
      UncSearchTrainingRecord(data).then(res => {
        this.remoteCourseName.states = res;
        this.remoteCourseName.list = this.remoteCourseName.states.map(item => {
          return { value: item.value, label: item.value };
        });
      });
    },
    // 获取 公开课 课程编号 数据
    getPublicCourseNumData(data) {
      UncGetPublicCourseNum(data).then(res => {
        this.remoteCourseNum.states = res;
        this.remoteCourseNum.list = this.remoteCourseNum.states.map(item => {
          return { value: item.value, label: item.value };
        });
      });
    },
    // 获取 课程管理 课程编号 数据
    getInternalCourseNumData(data) {
      UncGetInternalCourseNum(data).then(res => {
        this.remoteCourseNum.states = res;
        this.remoteCourseNum.list = this.remoteCourseNum.states.map(item => {
          return { value: item.value, label: item.value };
        });
      });
    },
    // 获取 管理员 课程记录 课程编号 数据
    getAdminInternalCourseRecordNumData(data) {
      UncAdminGetInternalRecordNum(data).then(res => {
        this.remoteCourseNum.states = res;
        this.remoteCourseNum.list = this.remoteCourseNum.states.map(item => {
          return { value: item.value, label: item.value };
        });
      });
    },
    // 获取 普通用户 课程记录 课程编号 数据
    getUserInternalCourseRecordNumData(data) {
      UncUserGetInternalRecordNum(data).then(res => {
        this.remoteCourseNum.states = res;
        this.remoteCourseNum.list = this.remoteCourseNum.states.map(item => {
          return { value: item.value, label: item.value };
        });
      });
    },
    // 报名
    openApplyCourse(row) {
      this.applyCourseVisible = true;
      this.applyCourseData = row;
      // console.log(row);
    },
    // 课程小结
    openCourseSummary(row) {
      this.courseSummaryVisible = true;
      this.courseSummaryData = row;
    },
    // 导出内训课列表/课程记录列表
    exportInternalCourseExcelData() {
      if (this.isCourseManager && !this.isInternalCourse) {
        window.location.href =
          process.env.VUE_APP_API + "/api/course/ExportInternalCourse?city=" + this.info.city;
        // ExportInternalCourse().then(res => {
        //   let blob = new Blob([res], {
        //     type: "application/ms-excel"
        //   }); // 转化为blob对象
        //   var filename = "internal.xls"; // 判断是否使用默认文件名
        //   if (typeof window.navigator.msSaveBlob !== "undefined") {
        //     window.navigator.msSaveBlob(blob, filename);
        //   } else {
        //     var blobURL = window.URL.createObjectURL(blob); // 将blob对象转为一个URL
        //     var tempLink = document.createElement("a"); // 创建一个a标签
        //     tempLink.style.display = "none";
        //     tempLink.href = blobURL;
        //     tempLink.setAttribute("download", filename); // 给a标签添加下载属性
        //     if (typeof tempLink.download === "undefined") {
        //       tempLink.setAttribute("target", "_blank");
        //     }
        //     document.body.appendChild(tempLink); // 将a标签添加到body当中
        //     tempLink.click(); // 启动下载
        //     document.body.removeChild(tempLink); // 下载完毕删除a标签
        //     window.URL.revokeObjectURL(blobURL);
        //   }
        // });
      } else if (this.isInternalCourse && !this.isCourseManager) {
        window.location.href =
          process.env.VUE_APP_API + "/api/course/ExportInternalRecord?city=" + this.info.city;
      }
    },
    // 多选导出
    multiSelectedReports(val) {
      this.multiSelectedReportsRecords = val;
    },
    // 导出课程报表列表
    exportTrainingRecordExcelData() {
      let submitData = [];
      if (this.formSearch.courseType === "0") {
        this.multiSelectedReportsRecords.map(item => {
          submitData.push(item.id);
        });
        if (submitData.length === 0) {
          submitData = ["all"]
        }
        ExportTrainingRecordForm({
          RecordID: submitData,
          City: this.formSearch.city
        }).then(res => {
          window.location.href =
          process.env.VUE_APP_API + res.message;
        })
      } else if (this.formSearch.courseType === "1") {
        this.multiSelectedReportsRecords.map(item => {
          submitData.push({
            CourseName: item.courseName,
            StartDate: item.startDate,
            EndDate: item.endDate
          });
        });
        if (submitData.length === 0) {
          console.log(submitData);
          submitData = [{
            CourseName: "all"
          }]
        }
        ExportPublicTrainingRecordForm({
          ListToExportPublic: submitData,
          City: this.formSearch.city
        }).then(res => {
          window.location.href =
          process.env.VUE_APP_API + res.message;
        })
      }
      this.getTrainingRecordData();
    }
    // 获取数据
  },
  created() {
    // console.log(this.info.role);
  }
};
</script>
<style lang="scss" scoped>
.header__right {
  .class-form-inline {
    float: left;
    line-height: 40px;
    margin-top: 10px;
  }
}
.searchDatepicker {
  width: 130px;
}
.searchSelect {
  width: 100px;
}
.searchInput {
  width: 140px;
}
.el-dropdown {
  vertical-align: top;
  top: 1px;
}
.el-dropdown-menu {
  top: 40px !important;
}
.el-dropdown {
  margin: 0 10px 0 0;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-table::before {
  height: 0 !important;
}
.searchBox {
  border-bottom: 1px solid #e4e4e4;
  height: 40px;
  overflow: hidden;
  .searchCity {
    margin-left: -50px;
  }
  .searchClassification {
    margin-left: -30px;
  }
  .searchCourseNum {
    margin-left: -30px;
  }
  .searchCourseModule {
    margin-left: -30px;
  }
  .searchContent {
    margin-left: -10px;
  }
  .searchCourseName {
    margin-left: -30px;
  }
  .searchCourseDate {
    margin-left: -60px;
  }
}
.tableSlot {
  height: calc(100% - 45px) !important;
}
</style>
