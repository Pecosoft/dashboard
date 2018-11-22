// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI  from 'element-ui'
import VueProgressBar from 'vue-progressbar'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './apps/dashboard/router'
import store from './apps/dashboard/store'
import './apps/dashboard/style.styl'

Vue.use(ElementUI)

Vue.config.productionTip = false

if (process.env.NODE_ENV !== 'production') {
  // require('./apps/dashboard/services/mock').default.bootstrap()
}

const options = {
  color: '#28a745',
  failedColor: '#874b4b',
  thickness: '3px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

Vue.use(VueProgressBar, options)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
