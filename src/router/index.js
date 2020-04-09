import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: () => import("@/views/admin/Login")
  },
  {
    path: "/home",
    component: () => import("@/views/admin/Home"),
    children: [
      {
        path: "",
        component: () => import("@/views/admin/pages/EssayList"),
        meta: { requiresAuth: true }
      },
      {
        path: "essay",
        component: () => import("@/views/admin/pages/EssayList"),
        meta: { requiresAuth: true }
      },
      {
        path: "comment",
        component: () => import("@/views/admin/pages/CommentList"),
        meta: { requiresAuth: true }
      },
      {
        path: "essayhistory",
        component: () => import("@/views/admin/pages/EssayHistoryList"),
        meta: { requiresAuth: true }
      },
      {
        path: "commenthistory",
        component: () => import("@/views/admin/pages/CommentHistoryList"),
        meta: { requiresAuth: true }
      },
      {
        path: "setpassword",
        component: () => import("@/views/admin/pages/SetPassword"),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: "/*",
    component: () => import("@/views/error/404")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
