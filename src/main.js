import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import VueSweetalert2 from 'vue-sweetalert2';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'


Vue.config.productionTip = false
Vue.use(VueMaterial)
Vue.use(VueSweetalert2);
Vue.use(BootstrapVue)

new Vue({
  render: h => h(App),
}).$mount('#app')
