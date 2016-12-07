import './bootstrap'

import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'

import App from './components/App.vue'
import Visualizations from './components/Visualizations.vue'

Vue.use(Router)
Vue.use(Resource)

const routes = [{
  path: '/',
  name: 'visualizations',
  component: Visualizations
}, {
  path: '*',
  redirect: {
    name: 'visualizations'
  }
}]

const router = new Router({
  mode: 'history',
  routes: routes
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  next()
})

Object.assign(App, {
  el: '#app',
  router: router
})

const app = new Vue(App)
