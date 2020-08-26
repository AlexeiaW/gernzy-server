import Login from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";
import store from "@/store/store";

export default [
  {
    path: "/dashboard",
    component: Dashboard,
    beforeEnter: (to: any, from: any, next: any) => {
      /**
       * Persist the session data from vuex mutation for use
       * */

      let is_admin = 0;
      let token = 0;

      try {
        if (localStorage.getItem("session")) {
          let session = JSON.parse(localStorage.getItem("session") || "");
          token = session.token.length;
          is_admin = session.user.is_admin;
        }
      } catch (error) {
        console.log(error);
      }

      if (token <= 0 || is_admin == 0) {
        next({
          path: "/login", // back to safety
          query: {
            redirectFrom: to.fullPath,
          },
        });
      } else {
        next();
      }
    },
  },
  {
    path: "/login",
    component: Login,
  },
];