import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta:{
      layout:'main',
      auth: true
    },
    component: ()=> import('@/views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta:{
      layout:'empty'
    },
    component: ()=> import('@/views/Login.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    meta:{
      layout:'main',
      auth: true
    },
    component: ()=> import('@/views/Categories.vue')
  },
  {
    path: '/cardFields',
    name: 'cardFields',
    meta:{
      layout:'main',
      auth: true
    },
    component: ()=> import('@/views/cardFields.vue')
  },
  {
    path: '/cardTypes',
    name: 'cardTypes',
    meta:{
      layout:'main',
      auth: true
    },
    component: ()=> import('@/views/CardTypes.vue')
  },
  {
    path: '/FieldsInCards',
    name: 'FieldsInCards',
    meta:{
      layout:'main',
      auth: true
    },
    component: ()=> import('@/views/FieldsInCards.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    meta:{
      layout:'main',
      auth: true
    },
    component: ()=> import('@/views/Detail.vue')
  },
  {
    path: '/history',
    name: 'history',
    meta:{
      layout:'main',
      auth: true
    },
    component: ()=> import('@/views/History.vue')
  },
  {
    path: '/paymants',
    name: 'paymants',
    meta:{
      layout:'main',
      auth: true
    },
    component: ()=> import('@/views/Paymants.vue')
  },
  {
    path: '/planning',
    name: 'planning',
    meta:{
      layout:'main',
      auth: true
    },
    component: ()=> import('@/views/Planning.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta:{
      layout:'main',
      auth: true
    },
    component: ()=> import('@/views/Profile.vue')
  },
  {
    path: '/records',
    name: 'records',
    meta:{
      layout:'main',
      auth: true
    },
    component: ()=> import('@/views/Records.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta:{
      layout:'empty'
    },
    component: ()=> import('@/views/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) =>{
  // let uid = firebase.auth().currentUser
  let uid = store.getters.USER
  let requiredAuth = to.matched.some(r=>r.meta.auth)
  if(requiredAuth && !uid){
    next('/login?message=loginFirst')
  } else {
    next();
  }
  
})

export default router
