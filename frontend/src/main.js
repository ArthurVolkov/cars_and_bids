import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
// import './assets/style/main.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
// Styles
import "./styles/styles.scss";

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
