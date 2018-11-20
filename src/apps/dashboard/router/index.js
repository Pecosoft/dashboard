import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import beforeEach from './beforeEach'
import afterEach from './afterEach'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: routes
})

router.beforeEach(beforeEach)
router.afterEach(afterEach)

export default router
