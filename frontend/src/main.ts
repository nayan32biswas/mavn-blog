import Vue from 'vue';
import App from './App.vue';
import router from "./router";
import store from "./store";
import { GT_GET_IS_AUTHENTICATED } from "./store/getters.names";

import { setAuth } from "./store/modules/auth";
setAuth();

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.name === "Login" || to.name === "Registration") {
    if (!to.query.afterAuth && !from.query.afterAuth) {
      next({ name: to.name, query: { afterAuth: from.path } });
    } else if (from.query.afterAuth && !to.query.afterAuth) {
      next({ name: to.name, query: { afterAuth: from.query.afterAuth } });
    } else {
      next();
    }
  }
  if (to.meta.authRequired) {
    // console.log(store.getters[GT_GET_IS_AUTHENTICATED]);
    if (!store.getters[GT_GET_IS_AUTHENTICATED]) {
      next({ name: "Login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
