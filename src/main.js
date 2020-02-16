import Vue from 'vue'
import App from './App.vue'
import { BModal, VBModal } from 'bootstrap-vue'

require('./assets/css/custom.css')
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.component('b-modal', BModal)
// Note that Vue automatically prefixes directive names with `v-`
Vue.directive('b-modal', VBModal)

new Vue({
  el: '#app',
  render: h => h(App)
})
