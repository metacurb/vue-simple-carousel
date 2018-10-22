import Vue from 'vue';
import App from './App.vue';
import '../node_modules/pepjs/dist/pep.min';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
