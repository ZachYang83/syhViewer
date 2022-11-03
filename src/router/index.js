import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'Default',
    redirect: '/home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    meta: { title: "首页", icon: "el-icon-house" },
    component: Home,
    meta: {
      requireAuth: false
    },
    children:[
      {
        path:'/lsaj',
        name:'历史案件',
        meta: { title: "历史案件", icon: "el-icon-files" },
        component:()=>import('@/views/lsaj/index.vue'),
        children:[
          {
            path:'/lsaj/zscq',
            name:'知识产权',
            meta: { title: "知识产权", icon: "el-icon-house" },
            component:()=>import('@/views/lsaj/ZSCQ.vue'),
          },
          {
            path:'/lsaj/hzp',
            name:'化妆品',
            meta: { title: "化妆品", icon: "el-icon-house" },
            component:()=>import('@/views/lsaj/HZP.vue'),
          },
          {
            path:'/lsaj/sp',
            name:'食品',
            meta: { title: "食品", icon: "el-icon-house" },
            component:()=>import('@/views/lsaj/SP.vue'),
          },
          {
            path:'/lsaj/yp',
            name:'药品',
            meta: { title: "药品", icon: "el-icon-house" },
            component:()=>import('@/views/lsaj/YP.vue'),
          },
          {
            path:'/lsaj/yc',
            name:'烟草',
            meta: { title: "烟草", icon: "el-icon-house" },
            component:()=>import('@/views/lsaj/YC.vue'),
          },
        ]
      },
      {
        path:'/rldt',
        name:'热力地图',
        meta: { title: "热力地图", icon: "el-icon-map-location" },
        component:()=>import('@/views/rldt/index.vue'),
        children:[
          {
            path:'/rldt/zscq',
            name:'知识产权',
            meta: { title: "知识产权", icon: "el-icon-house" },
            component:()=>import('@/views/rldt/ZSCQ.vue'),
          },
          {
            path:'/rldt/hzp',
            name:'化妆品',
            meta: { title: "化妆品", icon: "el-icon-house" },
            component:()=>import('@/views/rldt/HZP.vue'),
          },
          {
            path:'/rldt/sp',
            name:'食品',
            meta: { title: "食品", icon: "el-icon-house" },
            component:()=>import('@/views/rldt/SP.vue'),
          },
          {
            path:'/rldt/yp',
            name:'药品',
            meta: { title: "药品", icon: "el-icon-house" },
            component:()=>import('@/views/rldt/YP.vue'),
          },
          {
            path:'/rldt/yc',
            name:'烟草',
            meta: { title: "烟草", icon: "el-icon-house" },
            component:()=>import('@/views/rldt/YC.vue'),
          },
        ]
      },
    ]
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
  },

]

const router = new VueRouter({
  // mode:'history',
  routes
})

export default router
