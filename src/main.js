import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.css";
// install bootstrap first
import BootstrapVue from "bootstrap-vue";

// Logs to Frontend
import { ApplicationInsights } from "@microsoft/applicationinsights-web";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: process.env.VUE_APP_APPINSIGHTS_INSTRUMENTATIONKEY,
  },
});
appInsights.loadAppInsights();
appInsights.trackPageView(); // Tracks page views

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
