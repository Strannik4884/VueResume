import Vue from 'vue'
import App from './App.vue'
// создание объекта Vue и монтирование приложения. Рендерим компонент App.vue
new Vue({
  render: h => h(App),
}).$mount('#app')