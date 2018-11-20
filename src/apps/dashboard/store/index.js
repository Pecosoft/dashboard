import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import repair from './modules/repair'
import complain from './modules/complain'
import suggest from './modules/suggest'
import customer from './modules/customer'
import employee from './modules/employee'
import company from './modules/company'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    repair,
    complain,
    suggest,
    customer,
    employee,
    company
  }
})

export default store
