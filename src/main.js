import Vue from 'vue'
import iview from 'iview'
import axios from 'axios'
import 'iview/dist/styles/iview.css';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from './store'
import '@/icons' // icon
import '@/permission' // 权限

Vue.use(ElementUI)
Vue.use(iview)
Vue.config.productionTip = false

// axios.defaults.baseURL = "http://118.24.119.16:8888"

axios.defaults.baseURL = "http://localhost:8888"

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
