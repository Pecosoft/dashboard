import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import repair from './modules/repair'
import complain from './modules/complain'
import suggest from './modules/suggest'
import customer from './modules/customer'
import department from './modules/department'
import employee from './modules/employee'
import company from './modules/company'
import product from './modules/product'
import productcate from './modules/productcate'
import district from './modules/district'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    repair,
    complain,
    suggest,
    customer,
    department,
    employee,
    company,
    product,
    productcate,
    district
  }
})

export default store
