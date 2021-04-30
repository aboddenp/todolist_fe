import Vue from 'vue'
import VueRouter from 'vue-router'
import TodoList from '../components/TodoList'
import Edit from '../components/Edit'
import Folder from '../components/Folder'

Vue.use(VueRouter)

const routes = [
  {
    path: '/folders',
    name: 'folders',
    component: Folder
  },
  {
    path: '/folder/:id',
    name: 'todos',
    component: TodoList
  },
  {
    path: '/folder/item/:id/:description',
    name: 'Item',
    component: Edit
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/',
    redirect: "/folders"
  }

]

const router = new VueRouter({
  routes
})

export default router
