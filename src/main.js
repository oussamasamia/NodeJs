import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import VueSweetalert2 from 'vue-sweetalert2';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import 'leaflet/dist/leaflet.css';

import VueRouter from 'vue-router'


import ListOfRestaurants from './components/RestaurantsList.vue'
import RestaurantsCard from './components/RestaurantsCard.vue'





import { Icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

Vue.config.productionTip = false
Vue.use(VueMaterial)
Vue.use(VueSweetalert2);
Vue.use(BootstrapVue)
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: ListOfRestaurants,
    },
    {
      path: '/card',
      component: RestaurantsCard,
    }
  ],
  mode: 'history'
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
