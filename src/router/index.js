import Vue from "vue";
import VueRouter from "vue-router";
import Skull from "../components/Skull.vue";
import AppAccounts from "../components/AppAccounts.vue";
import HomePage from "../components/HomePage.vue";
import Authentication from "../components/Authenticate.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Authenticate",
    component: Authentication,
  },
  {
    path: "/skull",
    name: "Skull",
    component: Skull,
  },
  {
    path: "/accounts",
    name: "AppAccounts",
    component: AppAccounts,
  },
  {
    path: "/HomePage",
    name: "HomePage",
    component: HomePage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
