import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import about from '../views/about.vue'
import carApp from '../views/car-app.vue'
import carDetails from '../views/car-details.vue'
import carEdit from '../views/car-edit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/about',
    name: 'about',
    component: about
  },
  {
    path: '/car',
    name: 'carApp',
    component: carApp
  },
  {
    path: '/car/edit/:carId?',
    name: 'carEdit',
    component: carEdit
  },
  {
    path: '/car/details/:carId?',
    name: 'carDetails',
    component: carDetails
  }
]

const router = new VueRouter({
  routes
})

export default router
