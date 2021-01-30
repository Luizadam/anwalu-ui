import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from "element-ui";
Vue.use(ElementUI);

import Api from './config/api'
Vue.use(Api)

import Currency from './config/currency'
Vue.use(Currency)

import Swal from 'sweetalert2'
// Vue.use(Swal)
window.Swal = Swal;

require("bootstrap-css-only/css/bootstrap.min.css");
require("mdbvue/lib/css/mdb.min.css");
require("@fortawesome/fontawesome-free/css/all.min.css");
import moment from 'moment';

Vue.filter('formatDate', function(value) {
    if (value) {
        return moment(String(value)).format('DD/MM/YYYY hh:mm')
    }
});


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
