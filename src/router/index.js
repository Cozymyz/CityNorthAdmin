// import Vue from 'vue'
// import Router from 'vue-router'
/*global Vue */
/*global VueRouter */
import store from '@/store/index'
Vue.use(VueRouter)

const AdminLogin = () => import('@views/AdminLogin')
const Admin = () => import('@views/Admin')
const router = new VueRouter({
  mode: 'history',
  routes: [

    {
      path: '/admin/login',
      name: 'AdminLogin',
      component: AdminLogin
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: {
        requireAuth: true
      }
    }
  ]
})
// const originalPush = router.prototype.push
// // 修改原型对象中的push方法
// router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }
router.beforeEach((to, from, next) => {
  const admintoken = store.state.admin.admintoken

  if (to.meta.requireAuth) {
    if (admintoken) {
      next()
    } else {
      console.log('该页面需要登陆')
      next({
        path: '/admin/login'
      })
    }
  } else {
    next()
  }
})
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})
// export function resetRouter() {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher
// }

export default router
