import Vue from 'vue'
import Notifications from 'vue-notification'
import router from "@/router";
import App from './App.vue'

Vue.use(Notifications)

// создание объекта Vue и монтирование приложения. Рендерим компонент App.vue
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')