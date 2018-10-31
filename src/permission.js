import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken,setToken } from '@/utils/auth' // 验权

// const whiteList = ['/login'] // 不重定向白名单
// router.beforeEach((to, from, next) => {
//   NProgress.start()
//   if (localStorage.getItem("Admin-Token")) {
//     if (to.path === '/dashboard') {
//       next({ path: '/home' })
//     } else {
//       if (store.getters.roles.length === 0) {
//         store.dispatch('GetInfo').then(res => { // 拉取用户信息
//           next()
//         }).catch(() => {
//           store.dispatch('FedLogOut').then(() => {
//             Message.error('验证失败,请重新登录')
//             next({ path: '/login' })
//           })
//         })
//       } else {
//         next()
//       }
//     }
//   } else {
//     if (whiteList.indexOf(to.path) !== -1) {
//       next()
//     } else {
//       next('/login')
//       NProgress.done()
//     }
//   }
// })
//
// router.afterEach(() => {
//   NProgress.done() // 结束Progress
// })

const whiteList = ['/login']; // 不重定向白名单

  router.beforeEach((to, from, next) => {
    NProgress.start()
    if (localStorage.getItem("Admin-Token")) {
      //已登录
      next();
    } else {
      //未登录
      if (whiteList.indexOf(to.path) !== -1) {
        next();
      } else {
        next('/login');
      }
}
});

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

