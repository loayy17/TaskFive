import App from '@/App.vue'
import Cars from '@/Cars.vue'
import Employees from '@/Employees.vue'
import HomaPage from '@/HomaPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomaPage,
      alias: '/Home'
    },
    {
      path: '/Employees',
      name: 'Employees',
      
      component: Employees
    },
    {
      path: '/Cars',
      name: 'Cars',
      component: Cars
    },
  ]
})

export default router
