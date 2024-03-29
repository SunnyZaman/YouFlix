import Vue from 'vue'
import App from './App.vue'
import { router } from './routes'
import vuetify from './plugins/vuetify'
import "@/assets/global.scss"
Vue.config.productionTip = false
Vue.directive('scroll', {
  inserted: function(el, binding) {
    let f = function(evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f);
      }
    }
    window.addEventListener('scroll', f);
  }
});
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
