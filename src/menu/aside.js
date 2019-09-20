// 菜单 侧边栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  { path: '/userCenter', title: '个人中心', icon: 'user' },
  {
    title: '课程信息',
    icon: 'book',
    children: [
      { path: '/courseRegistration', title: '课程报名', icon: 'bookmark' },
      { path: '/trainingRecords', title: '培训记录', icon: 'tasks' },
      { path: '/trainingPlan', title: '培训计划', icon: 'paper-plane' }
    ]
  },
  { path: '/examination', title: '考试', icon: 'mortar-board' },
  // { path: '/notice', title: '公告', icon: 'feed' },
  { path: '/templateDownload', title: '模板下载', icon: 'cloud-download' },
  { path: '/knowledgeBase', title: '知识库', icon: 'database' }
]
