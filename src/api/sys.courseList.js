import request from '@/plugin/axios'
// 公开课
// ------------公开课----------
// 普通用户 公开课 课程列表
export function GetPublicCourse(data) {
  return request({
    url: '/api/course/GetPublicCourse',
    method: 'post',
    data
  })
}
// 上传 公开课
export function ImportPublicCourse(data) {
  return request({
    url: '/api/course/ImportPublicCourse',
    method: 'post',
    data
  })
}
// 获取 GetClassification 数据
export function GetClassification(param) {
  return request({
    url: '/api/course/GetClassification',
    method: 'get',
    params: param
  })
}
// 获取 公开课 课程模块 数据
export function UncGetPublicCourseModule(data) {
  return request({
    url: '/api/course/UncGetPublicCourseModule',
    method: 'post',
    data
  })
}
// 获取 公开课 课程名称 数据
export function UncGetPublicCourseName(data) {
  return request({
    url: '/api/course/UncGetPublicCourseName',
    method: 'post',
    data
  })
}
// 获取 公开课 课程编号 数据
export function UncGetPublicCourseNum(data) {
  return request({
    url: '/api/course/UncGetPublicCourseNum',
    method: 'post',
    data
  })
}
// ------------公开课----------
// 公开课

// 其他公开课
// ------------其他公开课----------
// 获取 其他公开课 课程列表信息
export function ShowExtraCourse(data) {
  return request({
    url: '/api/course/ShowExtraCourse',
    method: 'post',
    data
  })
}
// 导入 其他公开课 课程列表
export function ImportExtraCourse(data) {
  return request({
    url: '/api/course/ImportExtraCourse',
    method: 'post',
    data
  })
}
// 删除 其他公开课 课程列表
export function DeleteExtraCourse(data) {
  return request({
    url: '/api/course/DeleteExtraCourse',
    method: 'post',
    data
  })
}
// ------------其他公开课----------
// 其他公开课

// 课程记录
// ------------课程记录----------
// 导出 课程记录 数据
export function ExportExcelData() {
  return request({
    url: '/api/course/ExportExcelData',
    method: 'get',
    responseType: 'blob'
  })
}
// 普通用户 课程记录 课程列表
export function UserGetInternalCourseRecord(data) {
  return request({
    url: '/api/course/UserGetInternalCourseRecord',
    method: 'post',
    data
  })
}
// 管理员用户 课程记录 课程列表
export function AdminGetInternalCourseRecord(data) {
  return request({
    url: '/api/course/AdminGetInternalCourseRecord',
    method: 'post',
    data
  })
}
// 课程调研
export function PublishInternalCourseRecord(data) {
  return request({
    url: '/api/course/PublishInternalCourseRecord',
    method: 'post',
    data
  })
}
// 取消调研
export function CancelPublishInternalCourse(data) {
  return request({
    url: '/api/course/CancelPublishInternalCourse',
    method: 'post',
    data
  })
}
// 开课
export function StartInternalCourseRecord(data) {
  return request({
    url: '/api/course/StartInternalCourseRecord',
    method: 'post',
    data
  })
}
// 取消开课
export function CancelStartInternalCourseRecord(data) {
  return request({
    url: '/api/course/CancelStartInternalCourseRecord',
    method: 'post',
    data
  })
}
// 删除 课程记录
export function DeleteInternalCourseRecord(data) {
  return request({
    url: '/api/course/DeleteInternalCourseRecord',
    method: 'post',
    data
  })
}
// 修改 课程记录
export function ModifyInternalCourseRecord(data) {
  return request({
    url: '/api/course/ModifyInternalCourseRecord',
    method: 'post',
    data
  })
}
// 修改 课程记录 --- 已开课后的编辑
export function ModifyStartedInternalCourseRecord(data) {
  return request({
    url: '/api/course/ModifyStartedInternalCourseRecord',
    method: 'post',
    data
  })
}
// 课程 记录报名
export function ApplyInternalCourse(data) {
  return request({
    url: '/api/course/ApplyInternalCourse',
    method: 'post',
    data
  })
}
// 获取 单条 课程记录 数据 包括 课程大纲
export function ShowInternalCourseRecord(param) {
  return request({
    url: '/api/course/ShowInternalCourseRecord',
    method: 'get',
    params: param
  })
}
// 获取 课程ID
export function GetCourseID(param) {
  return request({
    url: '/api/course/GetCourseID',
    method: 'get',
    params: param
  })
}
// 获取 课程记录 课程名称 数据（普通用户）
export function UncUserGetInternalRecordName(data) {
  return request({
    url: '/api/course/UncUserGetInternalRecordName',
    method: 'post',
    data
  })
}
// 获取 课程记录 课程名称 数据（管理员）
export function UncAdminGetInternalRecordName(data) {
  return request({
    url: '/api/course/UncAdminGetInternalRecordName',
    method: 'post',
    data
  })
}
// 获取 课程记录 课程编号 数据（管理员）
export function UncAdminGetInternalRecordNum(data) {
  return request({
    url: '/api/course/UncAdminGetInternalRecordNum',
    method: 'post',
    data
  })
}
// 获取 课程记录 课程编号数据（普通用户）
export function UncUserGetInternalRecordNum(data) {
  return request({
    url: '/api/course/UncUserGetInternalRecordNum',
    method: 'post',
    data
  })
}
// 获取 课程记录 课程小结 员工数据
export function UncShowEndedInternalCourse(param) {
  return request({
    url: '/api/course/UncShowEndedInternalCourse',
    method: 'get',
    params: param
  })
}
// 获取 课程记录 课程小结 已添加进去 的 员工数据
export function ShowPeopleInEndedInternalCourse(param) {
  return request({
    url: '/api/course/ShowPeopleInEndedInternalCourse',
    method: 'get',
    params: param
  })
}
// 提交 课程记录 课程小结数据
export function EndInternalRecord(data) {
  return request({
    url: '/api/course/EndInternalRecord',
    method: 'post',
    data
  })
}
// 提交 代报名 数据
export function ApplyPersonForLesson(data) {
  return request({
    url: '/api/course/ApplyPersonForLesson',
    method: 'post',
    data
  })
}
// 提交 开课添加人员 数据
export function AdminAddApplyPersonAsync(data) {
  return request({
    url: '/api/course/AdminAddApplyPersonAsync',
    method: 'post',
    data
  })
}
// ------------课程记录----------
// 课程记录

// 课程管理
// ------------课程管理----------
// 获取 课程管理 列表信息
export function GetInternalCourse(data) {
  return request({
    url: '/api/course/GetInternalCourse',
    method: 'post',
    data
  })
}
// 新建 课程管理
export function AddInternalCourse(data) {
  return request({
    url: '/api/course/AddInternalCourse',
    method: 'post',
    data
  })
}
// 批量删除 课程管理
export function DeleteMultiInternalCourse(data) {
  return request({
    url: '/api/course/DeleteMultiInternalCourse',
    method: 'post',
    data
  })
}
// 批量添加 课程管理
export function AddMultiCourseRecord(data) {
  return request({
    url: '/api/course/AddMultiCourseRecord',
    method: 'post',
    data
  })
}
// 修改 课程管理
export function ModifyInternalCourse(data) {
  return request({
    url: '/api/course/ModifyInternalCourse',
    method: 'post',
    data
  })
}
// 获取 单条 课程记录 数据 包括 课程大纲
export function ShowInternalCourse(param) {
  return request({
    url: '/api/course/ShowInternalCourse',
    method: 'get',
    params: param
  })
}
// 获取 课程管理 课程名称 数据
export function UncGetInternalCourseName(data) {
  return request({
    url: '/api/course/UncGetInternalCourseName',
    method: 'post',
    data
  })
}
// 获取 课程管理 课程编号 数据
export function UncGetInternalCourseNum(data) {
  return request({
    url: '/api/course/UncGetInternalCourseNum',
    method: 'post',
    data
  })
}
// 导出 课程管理 数据
export function ExportInternalCourse() {
  return request({
    url: '/api/course/ExportInternalCourse',
    method: 'get',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
// ------------课程管理----------
// 课程管理

// 课程报表
// ------------课程报表----------
// 获取 课程报表 内训课 列表数据
export function GetTrainingRecord(data) {
  return request({
    url: '/api/course/GetTrainingRecord',
    method: 'post',
    data
  })
}
// 获取 课程报表 公开课 列表数据
export function GetPublicTrainingRecord(data) {
  return request({
    url: '/api/course/GetPublicTrainingRecord',
    method: 'post',
    data
  })
}
// 获取 单条 内训课 课程记录 数据 包括 课程大纲
export function ShowTrainingRecord(param) {
  return request({
    url: '/api/course/ShowTrainingRecord',
    method: 'get',
    params: param
  })
}
// 获取 单条 公开课 课程记录 数据 包括 课程大纲
export function ShowPublicTrainingRecord(param) {
  return request({
    url: '/api/course/ShowPublicTrainingRecord',
    method: 'get',
    params: param
  })
}
// 获取 课程报表 课程名称 数据
export function UncSearchTrainingRecord(param) {
  return request({
    url: '/api/course/UncSearchTrainingRecord',
    method: 'get',
    params: param
  })
}
// 导出 课程报表 内训课 列表数据
export function ExportTrainingRecordForm(data) {
  return request({
    url: '/api/course/ExportTrainingRecordForm',
    method: 'post',
    data
  })
}
// 导出 课程报表 公开课 列表数据
export function ExportPublicTrainingRecordForm(data) {
  return request({
    url: '/api/course/ExportPublicTrainingRecordForm',
    method: 'post',
    data
  })
}
// ------------课程报表----------
// 课程报表

// 共用接口
// ------------共用接口----------
// 获取 员工信息 数据 代报名权限
export function UncSearchEmployee(param) {
  return request({
    url: '/api/course/UncSearchEmployee',
    method: 'get',
    params: param
  })
}
// 获取 员工信息 数据 管理员 开课 添加人员
export function UncAdminUnClearSearchApplier(param) {
  return request({
    url: '/api/course/UncAdminUnClearSearchApplier',
    method: 'get',
    params: param
  })
}
// ------------共用接口----------
// 共用接口

// 上传
export function UploadList(data) {
  return request({
    url: '/api/course/Upload',
    method: 'post',
    data
  })
}

// 下载
export function downloadFile(param) {
  return request({
    url: `/api/course/download?${param}`,
    method: 'get',
    responseType: 'blob'
  })
}

// 删除
export function DeleteAttachment(data) {
  return request({
    url: '/api/course/DeleteAttachment',
    method: 'post',
    data
  })
}
