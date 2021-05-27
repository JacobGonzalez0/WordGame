import Vue from 'vue'
import VueRouter from 'vue-router'
import LocalGameScreen from '../components/LocalGameScreen'
import MultiGameScreen from '../components/MultiGameScreen'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home'
  },
  {
    path: '/local',
    name: 'Local',
    component: LocalGameScreen
  },
  {
    path: '/m/*',
    name: 'Multiplayer',
    component: MultiGameScreen
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
