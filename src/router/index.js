import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import login from "../views/login.vue"
import Create from "../views/Create.vue"
import forgetcertificate from '../views/forgetcertificate.vue'
import verification from '../views/verification.vue'
import dashboard from '../views/dashboard.vue'
import store from "../store"
import certificates from "../views/Certificates.vue"
import organizations from "../views/Organizations"
import notfound from '../views/404.vue'
import forbidden from '../views/forbidden.vue'
import ViewCertificate from '../views/ViewCertificate.vue'
import Edit from '../views/Edit.vue'
import BatchCerts from '../views/BatchCertificates.vue'
import published from '../views/publish.vue'
import BatchCertPublication from '../views/BatchCertPublication.vue'
import RegisterOrganization from '../views/RegisterOrganization.vue'
import OrganizationConfig from '../views/OrganizationConfig.vue'
import UserProfile from "../views/UserProfile.vue"
import NProgress from 'nprogress'
import { CheckAuthorization } from '../js/Authorization'
import { Roles } from '../js/Roles'
import 'nprogress/nprogress.css';
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
    component: organizations,
    meta: {
      requiresAuth: true,
      roles: [Roles.SuperAdmin]
    }
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
    path: "/create",
    name: "Create",
    component: Create,
    meta: { requiresAuth: true, roles: [Roles.Issuer, Roles.Admin], }
  },
  {
    path: "/certificates",
    name: "certificates",
    component: certificates,
    meta: {
      requiresAuth: true,
      roles: [Roles.Issuer, Roles.Admin],
    }
  },
  {
    path: "/forgetcertificate",
    name: "forgetcertificate",
    component: forgetcertificate
  },
  {
    path: "/viewcertificate/:id/:batch_id?",
    name: "ViewCertificate",
    component: ViewCertificate,
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: "/vieworgcertificate/:orgid/:id/:batch_id?",
    name: "vieworgcertificate",
    component: ViewCertificate,
    meta: {
      requiresAuth: true,
      roles: [Roles.SuperAdmin]
    },
    props: true
  },
  {
    path: "/edit/:id/:IsBatch",
    name: "Edit",
    component: Edit,
    meta: { requiresAuth: true, roles: [Roles.Issuer, Roles.Admin], },
    props: true
  },
  {
    path: "/BatchCerts/:id",
    name: "BatchCerts",
    component: BatchCerts,
    meta: { requiresAuth: true, roles: [Roles.Issuer, Roles.Admin] },
    props: true
  },
  {
    path: "/BatchCerts/publications/:id",
    name: "BCP_VIEW",
    component: BatchCertPublication,
    meta: { requiresAuth: true, roles: [Roles.Issuer, Roles.Admin] },
    props: true
  },
  {
    name: "publications",
    path: "/publications",
    component: published,
    meta: { requiresAuth: true, roles: [Roles.Issuer, Roles.Admin] },
  },
  {
    name: "RegisterOrganization",
    path: "/register/organization",
    component: RegisterOrganization,
    meta: {
      requiresAuth: true,
      roles: [Roles.SuperAdmin],
    },
  },
  {
    name: "OrganizationConfig",
    path: "/organization/Config/:id",
    component: OrganizationConfig,
    props: true,
    meta: {
      requiresAuth: true,
      roles: [Roles.SuperAdmin]
    },
  },
  {
    name: "MyOrganizationConfig",
    path: "/organization/config",
    component: OrganizationConfig,
    meta: {
      requiresAuth: true,
      roles: [Roles.Admin]
    },
  },
  {
    name: "OrganizationPublications",
    path: "/organization/publications/:id",
    component: published,
    meta: {
      requiresAuth: true,
      roles: [Roles.SuperAdmin]
    },
    props: true
  },
  {
    name: "OrganizationBCP",
    path: "/organization/BCP_View/:id/:orgid",
    component: BatchCertPublication,
    meta: {
      requiresAuth: true,
      roles: [Roles.SuperAdmin]
    },
    props: true
  },
  {
    name: "UserProfile",
    path: "/userprofile",
    component: UserProfile,
    meta: {
      requiresAuth: true,
    },
    props: true
  },
  { name: "403", path: "/forbidden", component: forbidden },
  { name: "404", path: '*', component: notfound }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if (to.name) {
    NProgress.start()
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters["user_state/IsLoggedIn"]) {
      return next({ path: '/login' })
    }
  }
  if (to.matched.some(record => record.meta.roles)) {
    var x = store.state.user_state.user.roles
    if (!CheckAuthorization(x, to.meta.roles))
      return next({ path: '/forbidden' })
  }
  next() // make sure to always call next()!
})
router.afterEach(() => {
  NProgress.done()
});
export default router;
