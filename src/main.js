import Vue from "vue";
import App from "./App.vue";
import { BModal, VBModal } from "bootstrap-vue";

import VeeValidate from "vee-validate";

Vue.use(VeeValidate, { inject: false });

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
require("./assets/css/custom.css");
require("./assets/css/creative.min.css");
import 'bootstrap/dist/js/bootstrap.min.js';


Vue.config.productionTip = false;

Vue.component("b-modal", BModal);
// Note that Vue automatically prefixes directive names with `v-`
Vue.directive("b-modal", VBModal);

import VueRouter from 'vue-router';
Vue.use(VueRouter);
import router from './router';
Vue.prototype.router = router;
Vue.prototype.goBack = () => {
  router.go(-1);
};
new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
