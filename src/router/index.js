import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import(/* webpackChunkName: "login_home_welcome" */ '../views/login/Login')
const Home = () => import(/* webpackChunkName: "login_home_welcome" */ '../views/Home')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
  }
]

const router = new VueRouter({
  routes
})

export default router
