import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import routes from "./routes";
import store from "@/store/store";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // Check if the user is logged i
  const isUserLoggedIn = store.getters.isAuthenticated;
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isUserLoggedIn) {
      // store.dispatch("logOut");
      next({
        path: "/login",
        query: { redirectFrom: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
