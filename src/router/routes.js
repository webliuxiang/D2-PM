import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: 'index',
        name: 'index',
        meta: {
          auth: true
        },
        component: _import('system/index')
      },
      // 个人中心
      {
        path: 'userCenter',
        name: 'userCenter',
        meta: {
          title: '个人中心',
          auth: true
        },
        component: _import('userCenter/index')
      },
      // 课程报名
      {
        path: 'courseRegistration',
        name: 'courseRegistration',
        meta: {
          title: '课程报名',
          auth: true
        },
        component: _import('courseInfo/courseRegistration')
      },
      // 培训记录
      {
        path: 'trainingRecords',
        name: 'trainingRecords',
        meta: {
          title: '培训记录',
          auth: true
        },
        component: _import('courseInfo/trainingRecords')
      },
      // 培训计划
      {
        path: 'trainingPlan',
        name: 'trainingPlan',
        meta: {
          title: '培训计划',
          auth: true
        },
        component: _import('courseInfo/trainingPlan')
      },
      // 考试
      {
        path: 'examination',
        name: 'examination',
        meta: {
          title: '考试',
          auth: true
        },
        component: _import('examination')
      },
      // 公告
      {
        path: 'notice',
        name: 'notice',
        meta: {
          title: '公告',
          auth: true
        },
        component: _import('notice')
      },
      // 模板下载
      {
        path: 'templateDownload',
        name: 'templateDownload',
        meta: {
          title: '模板下载',
          auth: true
        },
        component: _import('templateDownload')
      },
      // 知识库
      {
        path: 'knowledgeBase',
        name: 'knowledgeBase',
        meta: {
          title: '知识库',
          auth: true
        },
        component: _import('knowledgeBase')
      },
      // 系统 前端日志
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志',
          auth: true
        },
        component: _import('system/log')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: {
          beforeRouteEnter (to, from, next) {
            next(vm => vm.$router.replace(from.fullPath))
          },
          render: h => h()
        }
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: {
          beforeRouteEnter (to, from, next) {
            next(vm => vm.$router.replace(JSON.parse(from.params.route)))
          },
          render: h => h()
        }
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
