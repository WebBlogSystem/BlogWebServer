import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import { methods } from '@/mixin'
import { sstorage } from '@/store/storage'

Vue.use(ViewUI)
Vue.config.productionTip = false
Vue.mixin({
  methods
})
var adminInfo = JSON.parse(sstorage.getItem('admin')) || {}
store.commit('admin/setAdminInfo', adminInfo)
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.admin.adminInfo.id) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
