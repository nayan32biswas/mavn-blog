import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  mode: "history",
  base: "/",
  routes: [
    {
      name: 'Home', path: '/',
      component: () => import("./views/Home.vue")
    },
    {
      name: 'Login', path: '/login/',
      component: () => import('./views/Login.vue')
    },
    {
      name: 'Settings', path: '/settings/',
      component: () => import('./views/Settings.vue'),
      meta: {
        authRequired: true,
        accessLevel: 0,
      },
    },
    {
      name: 'Registration', path: '/registration/',
      component: () => import('./views/Registration.vue')
    },
    {
      name: 'About', path: '/about/',
      component: () => import('./views/About.vue')
    },
    {
      name: 'Profile', path: '/user/:username/',
      component: () => import('./views/Profile.vue')
    },

    {
      name: 'CreatePost', path: '/create/post/',
      component: () => import('./views/CreatePost.vue')
    },
    {
      name: 'PostDetails', path: '/post/:postSlug/',
      component: () => import('./views/PostDetails.vue')
    },
    {
      name: 'PostEdit', path: '/post/edit/:postSlug/',
      component: () => import('./views/PostEdit.vue')
    },
  ]
})

