import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import login from "../views/login.vue"
import Create from "../views/Create.vue"
import registeration from '../views/registeration.vue';
import forgetcertificate from '../views/forgetcertificate.vue'
import verification from '../views/verification.vue'
import dashboard from'../views/dashboard.vue'
import store from "../store"
import certificates from "../views/Certificates.vue"
import organizations from "../views/Organizations"
import notfound from '../views/404.vue'
import ViewCertificate from '../views/ViewCertificate.vue'
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    name: "Login",
    component: login
  },
  {
    path: "/organizations",
    name: "Organizations",
    component: organizations
  },
  {
    path: "/registeration",
    name: "registeration",
    component: registeration,
    meta: { requiresAuth: true }
  },
  {
    path: "/verification",
    name: "verification",
    component: verification
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path:"/create",
    name:"Create",
    component: Create,
    meta: { requiresAuth: true }
  },
  {
    path:"/certificates",
    name:"certificates",
    component:certificates,
    meta: { requiresAuth: true }
  },
  {
    path: "/forgetcertificate",
    name: "forgetcertificate",
    component: forgetcertificate
  },
  {
    path: "/viewcertificate/:id",
    name: "ViewCertificate",
    component: ViewCertificate,
    props:true
  },
  { path: '*', component: notfound}
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters["user_state/IsLoggedIn"]) {
      next({
        path: '/login',
     
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})
export default router;
