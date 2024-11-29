// src/router/index.js (for Vue 3)
import { createRouter, createWebHistory } from 'vue-router';
import LogIn from '../pages/LoginPage.vue'; // adjust the path as necessary
import Dashboard from '../pages/admin/dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'authentication',
    component: LogIn,
  },
  {
    path: '/admin',
    name: 'layout',
    component: () => import('../layout/MainLayout.vue'),
    children : [
        {
          path: '',
          name: 'dashboard',
          component: Dashboard,
        },
        {
          path: 'students',
          name: 'students',
          component: () => import('../pages/admin/StudentsList.vue'),
        },
        {
          path: 'courses',
          name: 'courses',
          component: () => import('../pages/admin/Course&Subjects.vue'),
        },
        {
          path: 'studentsinfo',
          name: 'studentsinfo',
          component: () => import('../pages/admin/StudentsInformationsheet.vue'),
        },
        {
          path: 'subjects',
          name: 'subjects',
          component: () => import('../pages/admin/subjects.vue'),
        },
        {
          path: 'users',
          name: 'users',
          component: () => import('../pages/admin/users.vue'),
        },
    ]
  },
  {
    path: '/select',
    name: 'select',
    component: () => import('../layout/StudentLayout.vue'),
    children : [
      {
        path: 'course',
        name: 'course,',
        component: () => import('../pages/student/IndexPage.vue'),
      }
  ]
  },
  {
    path: '/loginpage',
    name: 'login',
    component: () => import('../pages/admin/LoginPage.vue'),
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../pages/TestPage.vue'),
  },
  {
    path: '/infopage',
    name: 'infopage',
    component: () => import('../pages/student/InformationPage.vue'),
  },
  {
    path: '/createaccount',
    name: 'createaccount',
    component: () => import('../pages/student/CreateAccount.vue'),
  },
  // Add more routes here
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
