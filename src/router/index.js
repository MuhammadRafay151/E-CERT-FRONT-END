import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import login from "../views/login.vue"
import Create from "../views/Create.vue"
import registeration from '../views/registeration.vue';
import forgetcertificate from '../views/forgetcertificate.vue'
import verification from '../views/verification.vue'
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: login
  },
  {
    path: "/registeration",
    name: "registeration",
    component: registeration
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
    component: Create
  },
  {
    path: "/forgetcertificate",
    name: "forgetcertificate",
    component: forgetcertificate
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
