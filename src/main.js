import Vue from 'vue'
import router from './router'
import App from './app/App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'datatables.net-bs4'
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css'
import 'datatables.net-buttons-bs4'
import 'datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
